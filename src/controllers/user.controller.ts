import { Request, Response } from "express";
import { User } from "../entities/User"
import { SALT_ROUNDS } from "../config";

// jwt
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const jwtSecret = 'somesecrettoken';
const jwtRefreshTokenSecret = 'somesecrettokenrefresh';
let refreshTokens: (string | undefined)[] = [];



const createToken = (user: User) => {
  // Se crean el jwt y refresh token y devuelve el rol del usuario
  const rol = user.rol.name_rol
  const token = jwt.sign({ id: user.id_user, username: user.username }, jwtSecret, {expiresIn: '1d'});
  const refreshToken = jwt.sign({ username: user.username }, jwtRefreshTokenSecret, {expiresIn: '90d'});
  
  refreshTokens.push(refreshToken);
  return {
      rol,
      token,
      refreshToken
  }
}


//OBTIENE TODOS LOS USUARIOS
/**
 * La función `getUsers` es una función asíncrona que recupera usuarios de una base de datos y devuelve
 * como una respuesta JSON, o devuelve un mensaje de error si hay un error.
 * @devuelve una respuesta JSON que contiene los usuarios recuperados de la base de datos.
 */
export const getUsers = async (req: Request, res: Response) => {
  console.log('obteniendo usuarios...');
  try {
    const users = await User.find({
    relations: {
        rol: true
    },
  });
    return res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//OBTIENE UN USUARIO
/**
* La función `getUser` es una función asíncrona que recupera un usuario por su ID y lo devuelve
 * como una respuesta JSON, manejando errores en el camino.
 * @devuelve una respuesta JSON con el objeto de usuario si se encuentra el usuario. Si no se encuentra el usuario, se
 * devuelve un código de estado 404 con una respuesta JSON que contiene el mensaje "Usuario no encontrado". Si hay
 * un error durante la ejecución de la función, devuelve un código de estado 500 con una respuesta JSON
 * que contiene el mensaje de error.
 */
export const getUser = async (req: Request, res: Response) => {
   console.log('buscando usuario...');
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id_user: parseInt(id)},
       relations: ['rol']
      });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//CREA UN USUARIO
/**
 * Esta función crea un nuevo usuario en una base de datos con el nombre de usuario y la contraseña proporcionados, y devuelve el
 * usuario creado.
 * @devuelve un objeto de respuesta con el código de estado apropiado y datos JSON.
 */
export const createUser = async (req: Request, res: Response) => {
  console.log('creando usuario')
  try {
    const { username, password} = req.body;
    if (!username || !password) {
    return res.status(400).json({ msg: "Please. Send your username and password" });
    }
    const verifieduser = await User.findOneBy({ username });
    if (verifieduser) {
      return res.status(400).json({ msg: "The User already Exists" });
    }
    const user = new User();
    user.username = username;
    user.password = await createHash(req.body.password);
    await user.save();
    return res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }

};


//ACTUALIZA UN USUARIO
/**
* La función actualiza un usuario en una base de datos según la identificación proporcionada.
 * @devuelve una respuesta con un código de estado de 204 (Sin contenido) si el usuario se actualiza correctamente. Si
 * hay un error, devolverá una respuesta con un código de estado de 500 (Error interno del servidor) y un
 * Objeto JSON que contiene el mensaje de error.
 */
export const updateUser = async (req: Request, res: Response) => {
  console.log('actualizando usuario')
  const { id } = req.params;
  try {
    const user = await User.findOneBy({ id_user: parseInt(id) });
    if (!user) return res.status(404).json({ message: "Not user found" });
    await User.update({ id_user: parseInt(id) }, req.body);
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//ELIMINA UN USUARIO
/**
 * Esta función elimina un usuario de la base de datos según la ID de usuario proporcionada.
 * @devuelve una respuesta con un código de estado y un objeto JSON. Si no se encuentra el usuario, devuelve un 404
 * código de estado con un mensaje "Usuario no encontrado". Si el usuario se elimina con éxito, devuelve un 204
 * código de estado con mensaje "Usuario eliminado". Si hay un error, devuelve un código de estado 500 con
 * el mensaje de error.
 */
export const deleteUser = async (req: Request, res: Response) => {
  console.log('eliminando usuario...');
  const { id } = req.params;
  try {
    const result = await User.delete({ id_user: parseInt(id) });
    if (result.affected === 0)
      return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ message: "User eliminado" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//INICIA SESION DE USUARIO
/**
 * Esta función se utiliza para el inicio de sesión y la autenticación del usuario, comprobando si el nombre de usuario y
 * la contraseña coincide con un usuario existente en la base de datos y devuelve un token si las credenciales son
 * correcto.
 * @devuelve una promesa que se resuelve en un objeto de respuesta.
 */
export const signIn = async (req: Request, res: Response): Promise<Response> => {
  console.log('signin...');
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please. Send your email and password" });
  }

  const user = await User.findOne({
      where: { username: req.body.username},
       relations: [ 'rol' ]
      });
  if (!user) {
    return res.status(400).json({ msg: "The User does not exists" });
  }

  const isMatch = await comparePassword(user, req.body.password);
  if (isMatch) {
    //const rol= user.rol.name_rol
    //return res.status(400).json({ user,credentials: createToken(user) });
    //return res.status(400).json({ rol,credentials: createToken(user) });
    return res.status(400).json({ credentials: createToken(user) });
  }

  return res.status(400).json({
    msg: "The username or password are incorrect"
  });
};


const createHash = async (password: string ): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (user: User, password: string ): Promise<Boolean> => {
  return await bcrypt.compare(password, user.password);
};

export const protectedEndpoint = async (req: Request, res: Response): Promise<Response> => {
  
  return res.status(200).json({ msg: 'ok'});
}

 // Create new access token from refresh token
export const refresh = async (req: Request, res: Response): Promise<any>  => {
  // const refreshToken = req.header("x-auth-token");

  const refreshToken = req.body.refresh;


  // If token is not provided, send error message
  if (!refreshToken) {
    res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }

  console.log(refreshTokens);
  // If token does not exist, send error message
  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid refresh token",
        },
      ],
    });
  }


  try {
    const user = jwt.verify(refreshToken, jwtRefreshTokenSecret);
    const { username } = <any>user;

    const userFound = <User> await User.findOneBy({ username: username });
    if (!userFound) {
      return res.status(400).json({ msg: "The User does not exists" });
    }

    const accessToken = jwt.sign({ id: userFound.id_user, username: userFound.username }, jwtSecret, {expiresIn: '40s'});

    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
};
import { Request, Response } from "express";
import { Afiliado } from "../entities/Afiliado";
import { Domicilio } from "../entities/Domicilio";


//OBTIENE TODOS LOS AFILIADOS
/**
 * La función `getAfiliados` es una función asíncrona que recupera una lista de afiliados y
 * los devuelve como una respuesta JSON.
 * @devuelve una respuesta con un código de estado de 200 y un objeto JSON que contiene los comercios
 * (negocios).
 */
export const getAfiliados = async (req: Request, res: Response) => {
  console.log('obteniendo afiliados...');
  try {
    const afiliados = await Afiliado.find();
    /*const afiliados = await Afiliado.find({
    relations: {
        user : true
    },
    });*/
    return res.status(200).json(afiliados);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//OBTIENE UN AFILIADO
/**
 * Esta función de TypeScript recupera un afiliado por su ID y lo devuelve como una respuesta JSON.
 * @devuelve una respuesta JSON con el objeto de afiliado si se encuentra, o una respuesta JSON con un error
 * mensaje si hay un error o si no se encuentra el afiliado.
 */
export const getAfiliado = async (req: Request, res: Response) => {
  console.log('buscando afiliado...');
  try {
    const { id } = req.params;
    const afiliado = await Afiliado.findOneBy({ id_afiliado: parseInt(id) });
    /*const afiliado = await Afiliado.findOne({
      where: { id_afiliado: parseInt(id)},
      relations: ['user']
    })*/
    if (!afiliado) return res.status(400).json({ message: "affiliate not found" });
    return res.status(200).json(afiliado);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//CREA UN AFILIADO
/**
 * Esta función de TypeScript crea un afiliado (afiliado) al extraer los campos requeridos del
 * cuerpo de la solicitud, verificando si el afiliado ya existe y guardando el afiliado en la base de datos.
 * @devuelve una respuesta JSON con un mensaje de éxito si el afiliado se crea correctamente o un error
 * mensaje si hay un error.
 */
export const createAfiliado = async (req: Request, res: Response) => {
  console.log('creando afiliado...')
  console.log(req.body)
  try {
    const { name, lastname,  birthdate, phone, mail, cuil, saldo, user } = req.body;
    if (!name || !lastname || !birthdate || !phone || !mail || !cuil || !saldo || !user) {
      return res.status(400).json({ msg: "Please. All fields are required" });
    }
    const verifiedAfiliado = await Afiliado.findOneBy({ cuil });
    if (verifiedAfiliado) {
      return res.status(400).json({ msg: "The Affiliate already Exists" });
    }
    /*const domicilioComercio = new Domicilio()
    domicilioComercio.barrio = domicilio.barrio;
    domicilioComercio.calle = domicilio.calle;
    domicilioComercio.numero = domicilio.numero;
    domicilioComercio.nro_depto = domicilio.nro_depto;
    domicilioComercio.localidad = domicilio.localidad;
    await domicilioComercio.save();*/

    const afiliado = new Afiliado();
    afiliado.name = name;
    afiliado.lastname = lastname;
    afiliado.birthdate = birthdate;
    afiliado.phone = phone;
    afiliado.mail = mail;
    afiliado.cuil = cuil;
    afiliado.saldo = saldo;
    afiliado.user = user;
    await afiliado.save();
    //return res.status(201).json(afiliado);
    return res.status(201).json({ msg: "Affiliate created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }

};


//ACTUALIZA UN AFILIADO
/**
 * Esta función de TypeScript actualiza un registro de afiliado en una base de datos.
 * @devuelve una respuesta JSON con un código de estado y un mensaje. Si el afiliado se actualiza con éxito,
 * devolverá un código de estado 200 y el mensaje "Affiliate actualizado con éxito". Si el afiliado es
 * no encontrado, devolverá un código de estado 404 y el mensaje "No afiliado encontrado". si hay un
 * error, devolverá un código de estado 500
 */
export const updateAfiliado = async (req: Request, res: Response) => {
  console.log('actualizando afiliado')
  const { id } = req.params;
  try {
    const afiliado = await Afiliado.findOneBy({ id_afiliado: parseInt(id) });
      /*const afiliado = await Afiliado.findOne({
      where: { id_afiliado: parseInt(id)},
      relations: ['user']
    })*/
    if (!afiliado) return res.status(404).json({ message: "Not affiliate found" });
    await Afiliado.update({ id_afiliado: parseInt(id) },req.body);
    //return res.sendStatus(204);
    return res.status(200).json({ message: "Affiliate updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//ELIMINA UN AFILIADO
/**
 * Esta función de TypeScript elimina un registro de afiliado de una base de datos según la identificación proporcionada.
 * @devuelve una respuesta JSON con un mensaje que indica el resultado de la operación de eliminación. Si el
 * el borrado es exitoso, devuelve un código de estado 200 con el mensaje "Affiliate eliminado
 * con éxito". Si no encuentra el afiliado, devuelve un código de estado 404 con el mensaje "Affiliate
 * no encontrado". si hay un error, devolverá un código de estado 500
 */
export const deleteAfiliado = async (req: Request, res: Response) => {
  console.log('eliminando afiliado...')
  const { id } = req.params;
  try {
    const result = await Afiliado.delete({ id_afiliado: parseInt(id) });
    if (result.affected === 0){
       return res.status(404).json({ message: "Affiliate not found" });
    }
    return res.status(200).json({ message: "Affiliate removed successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

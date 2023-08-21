import { Request, Response } from "express";
import { Comercio } from "../entities/Comercio";
import { Domicilio } from "../entities/Domicilio";


//OBTIENE TODOS LOS COMERCIOS
/**
 * La función `getComercios` es una función asíncrona que recupera una lista de comercios y
 * los devuelve como una respuesta JSON.
 * @devuelve una respuesta con un código de estado de 200 y un objeto JSON que contiene los comercios
 * (negocios).
 */
export const getComercios = async (req: Request, res: Response) => {
  console.log('obteniendo comercios...');
  try {
    const comercios = await Comercio.find();
    /*const comercios = await Comercio.find({
    relations: {
        domicilio : true
    },
    });*/
    return res.status(200).json(comercios);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//OBTIENE UN COMERCIO
/**
 * Esta función de TypeScript recupera un comercio por su ID y lo devuelve como una respuesta JSON.
 * @devuelve una respuesta JSON con el objeto de comercio si se encuentra, o una respuesta JSON con un error
 * mensaje si hay un error o si no se encuentra el comercio.
 */
export const getComercio = async (req: Request, res: Response) => {
  console.log('buscando comercio...');
  try {
    const { id } = req.params;
    const comercio = await Comercio.findOneBy({ id_comercio: parseInt(id) });
    /*const comercio = await Comercio.findOne({
      where: { id_comercio: parseInt(id)},
      relations: ['domicilio']
    })*/
    if (!comercio) return res.status(400).json({ message: "trade not found" });
    return res.status(200).json(comercio);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//CREA UN COMERCIO
/**
 * Esta función de TypeScript crea un comercio (negocio) al extraer los campos requeridos del
 * cuerpo de la solicitud, verificando si el comercio ya existe y guardando el comercio en la base de datos.
 * @devuelve una respuesta JSON con un mensaje de éxito si el comercio se crea correctamente o un error
 * mensaje si hay un error.
 */
export const createComercio = async (req: Request, res: Response) => {
  console.log('creando comercio...')
  console.log(req.body)
  try {
    const { name, cuit, phone, barrio, calle, numero, nro_depto, localidad } = req.body;
    if (!name || !cuit || !phone || !barrio || !calle || !numero || !nro_depto || !localidad) {
      return res.status(400).json({ msg: "Please. All fields are required" });
    }
    const verifiedComercio = await Comercio.findOneBy({ cuit });
    if (verifiedComercio) {
      return res.status(400).json({ msg: "The Trade already Exists" });
    }
    /*const domicilioComercio = new Domicilio()
    domicilioComercio.barrio = domicilio.barrio;
    domicilioComercio.calle = domicilio.calle;
    domicilioComercio.numero = domicilio.numero;
    domicilioComercio.nro_depto = domicilio.nro_depto;
    domicilioComercio.localidad = domicilio.localidad;
    await domicilioComercio.save();*/

    const comercio = new Comercio();
    comercio.name = name;
    comercio.cuit = cuit;
    comercio.phone = phone;
    comercio.barrio = barrio;
    comercio.calle = calle;
    comercio.numero = numero;
    comercio.nro_depto = nro_depto;
    comercio.localidad = localidad;
    await comercio.save();
    //return res.status(201).json(comercio);
    return res.status(201).json({ msg: "Trade created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }

};


//ACTUALIZA UN COMERCIO
/**
 * Esta función de TypeScript actualiza un registro de comercio en una base de datos.
 * @devuelve una respuesta JSON con un código de estado y un mensaje. Si el comercio se actualiza con éxito,
 * devolverá un código de estado 200 y el mensaje "Comercio actualizado con éxito". Si el comercio es
 * no encontrado, devolverá un código de estado 404 y el mensaje "No comercio encontrado". si hay un
 * error, devolverá un código de estado 500
 */
export const updateComercio = async (req: Request, res: Response) => {
  console.log('actualizando comercio')
  const { id } = req.params;
  try {
    const comercio = await Comercio.findOneBy({ id_comercio: parseInt(id) });
      /*const comercio = await Comercio.findOne({
      where: { id_comercio: parseInt(id)},
      relations: ['domicilio']
    })*/
    if (!comercio) return res.status(404).json({ message: "Not trade found" });
    await Comercio.update({ id_comercio: parseInt(id) },req.body);
    //return res.sendStatus(204);
    return res.status(200).json({ message: "Trade updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//ELIMINA UN COMERCIO
/**
 * Esta función de TypeScript elimina un registro de comercio de una base de datos según la identificación proporcionada.
 * @devuelve una respuesta JSON con un mensaje que indica el resultado de la operación de eliminación. Si el
 * el borrado es exitoso, devuelve un código de estado 200 con el mensaje "Comercio eliminado
 * con éxito". Si no encuentra el comercio, devuelve un código de estado 404 con el mensaje "Comercio
 * no encontrado". Si hay un error durante el proceso de eliminación, devuelve un
 */
export const deleteComercio = async (req: Request, res: Response) => {
  console.log('eliminando comercio...')
  const { id } = req.params;
  try {
    const result = await Comercio.delete({ id_comercio: parseInt(id) });
    if (result.affected === 0){
       return res.status(404).json({ message: "Trade not found" });
    }
    return res.status(200).json({ message: "Trade removed successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

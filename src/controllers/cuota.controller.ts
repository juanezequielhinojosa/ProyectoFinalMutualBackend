import { Request, Response } from "express";
import { Cuota } from "../entities/Cuota";
import { Orden } from "../entities/Orden";

//OBTIENE TODOS LAS CUOTAS
/**
 * La función `getCuotas` recupera las cuotas de la base de datos y las devuelve como una respuesta JSON.
 * @devuelve una respuesta JSON que contiene los datos de las cuotas.
 */
export const getCuotas = async (req: Request, res: Response) => {
  console.log('obteniendo cuotas...');
  try {
    const cuotas = await Cuota.find({
    relations: {
        orden: true
    },
  });
    return res.status(200).json(cuotas);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//OBTIENE UNA CUOTA
/**
 * La función `getCuota` es una función asíncrona que recupera una cuota basada en la información proporcionada
 * ID y lo devuelve como una respuesta JSON.
 * @devuelve una respuesta JSON que contiene el objeto de cuota si se encuentra. Si no se encuentra la cuota,
 * devuelve un código de estado 404 con un mensaje que indica que no se encontró la cuota. Si hay
 * un error durante el proceso, devuelve un código de estado 500 con un mensaje de error.
 */
export const getCuota = async (req: Request, res: Response) => {
  console.log('obteniendo una cuota...');
  try {
    const { id } = req.params;
    const cuota = await Cuota.findOne({
      where: { id_cuota : parseInt(id)},
       relations: [ 'orden' ]
      });
    if (!cuota) return res.status(404).json({ message: "Cuota not found" });
    return res.status(200).json(cuota);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//PAGAR CUOTA
/**
 * La función `pagarCuota` es una función asíncrona que actualiza el estado del pago y la
 * fecha de pago de una cuota en una base de datos.
 * @devuelve una respuesta JSON con un mensaje de éxito si la cuota se pagó correctamente o un error
 * mensaje si hay algún error.
 */
export const pagarCuota = async (req: Request, res: Response) => {
  console.log('pagando cuota')
  const { id } = req.params;
  const { fecha_pago } = req.body;
  try {
    const cuota = await Cuota.findOneBy({ id_cuota: parseInt(id) });
    if (!cuota) return res.status(404).json({ message: "Not cuota found" });
    cuota.estado_pagado = true;
    cuota.fecha_pago = fecha_pago;
    await Cuota.update({ id_cuota: parseInt(id) }, cuota);
    return res.status(200).json({ message: "Cuota paid successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//ACTUALIZA UNA CUOTA
/**
 * Esta función de TypeScript actualiza un registro de cuota en una base de datos.
 * @devuelve una respuesta JSON con un código de estado y un mensaje. Si la cuota se actualiza con éxito,
 * devolverá un código de estado 200 y el mensaje "Cuota actualizado con éxito". Si la cuota es
 * no encontrado, devolverá un código de estado 404 y el mensaje "No se encontro la cuota". si hay un
 * error, devolverá un código de estado 500
 */
export const updateCuota = async (req: Request, res: Response) => {
  console.log('actualizando cuota')
  const { id } = req.params;
  try {
    const cuota = await Cuota.findOneBy({ id_cuota: parseInt(id) });
    if (!cuota) return res.status(404).json({ message: "Not Cuota found" });
    await Cuota.update({ id_cuota: parseInt(id) },req.body);
    //return res.sendStatus(204);
    return res.status(200).json({ message: "Cuota updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//ELIMINA UNA CUOTA
/**
 * Esta función de TypeScript elimina un registro de cuota de una base de datos según la identificación proporcionada.
 * @devuelve una respuesta JSON con un mensaje que indica el resultado de la operación de eliminación. Si el
 * el borrado es exitoso, devuelve un código de estado 200 con el mensaje "Cuota eliminada
 * con éxito". Si no encuentra la cuota, devuelve un código de estado 404 con el mensaje "Cuota
 * no encontrada". si hay un error, devolverá un código de estado 500
 */
export const deleteCuota = async (req: Request, res: Response) => {
  console.log('eliminando cuota...')
  const { id } = req.params;
  try {
    const result = await Cuota.delete({ id_cuota: parseInt(id) });
    if (result.affected === 0){
       return res.status(404).json({ message: "Cuota not found" });
    }
    return res.status(200).json({ message: "Cuota removed successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getCuotasByAfiliadoId = async (req: Request, res: Response) => {
  console.log('obteniendo cuotas por id de afiliado...')
  const { id } = req.params

  try {
    const cuota = await Cuota.find({
      where: { orden: { afiliado: { id_afiliado: parseInt(id)} } },
      relations: {
        orden: {
          comercio: true,
          afiliado: true
        }
      }
      });
    if (!cuota) return res.status(404).json({ message: "Cuota not found" });
    return res.status(200).json(cuota);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

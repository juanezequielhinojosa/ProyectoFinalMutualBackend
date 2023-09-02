import { Request, Response } from "express";
import { Orden } from "../entities/Orden";
import { Afiliado } from "../entities/Afiliado";
import { Comercio } from "../entities/Comercio";
import { Cuota } from "../entities/Cuota";

//OBTIENE TODOS LAS ORDENES
/**
 * La función `getOrdenes` recupera las ordenes de la base de datos y las devuelve como una respuesta JSON.
 * @devuelve una respuesta JSON que contiene los datos de las ordenes.
 */
export const getOrdenes = async (req: Request, res: Response) => {
  console.log('obteniendo ordenes...');
  try {
    const ordenes = await Orden.find({
    relations: {
        afiliado: true,
        comercio:true,
        cuota:true
    },
  });
    return res.status(200).json(ordenes);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//OBTIENE UNA ORDEN
/**
 * La función `getOrden` es una función asíncrona que recupera una orden basada en la información proporcionada
 * ID y lo devuelve como una respuesta JSON.
 * @devuelve una respuesta JSON que contiene el objeto de orden si se encuentra. Si no se encuentra la orden,
 * devuelve un código de estado 404 con un mensaje que indica que no se encontró la orden. Si hay
 * un error durante el proceso, devuelve un código de estado 500 con un mensaje de error.
 */
export const getOrden = async (req: Request, res: Response) => {
  console.log('obteniendo una orden...');
  try {
    const { id } = req.params;
    const orden = await Orden.findOne({
      where: { id_orden: parseInt(id)},
       relations: [ 'afiliado','comercio','cuota' ]
      });
    if (!orden) return res.status(404).json({ message: "Orden not found" });
    return res.status(200).json(orden);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//CREA UNA ORDEN

/**
 * Esta función de TypeScript crea una orden validando el afiliado y el comercio, verificando el
 *saldo disponible, y guardando el pedido y sus cuotas.
 * @devuelve una respuesta JSON con un mensaje de éxito si el pedido se creó correctamente. Si hay
 * cualquier error, devolverá una respuesta JSON con un mensaje de error.
 */
export const createOrden = async (req: Request, res: Response) => {
  console.log('creando orden...');
  try {
    const { id_afiliado, id_comercio, monto_credito, interes, cuota} = req.body;
     if (!id_afiliado || !id_comercio || !monto_credito || !interes || !cuota ) {
      return res.status(400).json({ msg: "Please. All fields are required" });
    }
    console.log(req.body)
    const afiliadoAvailable = await Afiliado.findOneBy({ id_afiliado: parseInt(id_afiliado) });
    if (!afiliadoAvailable) return res.status(400).json({ message: "affiliate not found" });
    const comercioAvailable = await Comercio.findOneBy({ id_comercio: parseInt(id_comercio) });
    if (!comercioAvailable) return res.status(400).json({ message: "trade not found" });

    const arrayCuotas : Cuota [] = []
    console.log(afiliadoAvailable?.saldo)
    let saldoDisponible = afiliadoAvailable?.saldo || 0
    if(saldoDisponible < parseFloat(monto_credito))res.status(200).json({ message: "insufficient balance to approve order" })
    for (let index = 0; index < cuota.length; index++) {
      const element = cuota[index];
      const cuotaElement = new Cuota();
      cuotaElement.fecha_vencimiento = element.fecha_vencimiento;
      cuotaElement.monto = element.monto;
      arrayCuotas.push(cuotaElement)
      await cuotaElement.save();
    }

    const orden = new Orden()
    orden.afiliado = id_afiliado;
    orden.comercio = id_comercio;
    orden.monto_credito = monto_credito;
    orden.interes = interes;
    orden.cuota = arrayCuotas

    await orden.save()
    return res.status(200).json({ msg: "Order created successfully" });
    
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//PAGAR ORDEN


/**
 * La función `pagarOrder` es una función asíncrona que actualiza el estado del pago y el pago
 * fecha de un pedido en una base de datos.
 * @devuelve una respuesta JSON con un mensaje de éxito si el pedido se pagó correctamente o un error
 *mensaje si hay algún error.
 */
export const pagarOrden = async (req: Request, res: Response) => {
  console.log('pagando orden')
  const { id } = req.params;
  const { fecha_pago } = req.body;
  try {
    const orden = await Orden.findOneBy({ id_orden: parseInt(id) });
    if (!orden) return res.status(404).json({ message: "Not orden found" });
    orden.estado_pagado = true;
    orden.fecha_pago = fecha_pago;
    await Orden.update({ id_orden: parseInt(id) }, orden);
    return res.status(200).json({ message: "Order paid successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};


//ELIMINA UN  AORDEN
/**
 * La función `deleteOrden` es una función asíncrona que elimina una orden en función de la
 * ID proporcionado y devuelve una respuesta adecuada.
 * @devuelve una respuesta con un código de estado y un objeto JSON. Si no se encuentra la orden, devuelve un
 * Código de estado 404 con mensaje "Orden no encontrada". Si la orden se elimina con éxito, se
 * devuelve un código de estado 204 con un mensaje "Orden eliminada". Si hay un error, devuelve un 500
 * código de estado con el mensaje de error.
 */

export const deleteOrden = async (req: Request, res: Response) => {
  console.log('eliminando orden')
  const { id } = req.params;
  try {
    const result = await Orden.delete({ id_orden: parseInt(id) });
    if (result.affected === 0)
      return res.status(404).json({ message: "Order not found" });
    return res.status(200).json({ message: "The order was deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
  
};

export const getOrdenesByAfiliado = async (req: Request, res: Response) => {
  console.log('obteniendo una orden...');
  try {
    const { id } = req.params;
    const ordenes = await Orden.find({
      where: { afiliado: {id_afiliado: parseInt(id)}},
       relations: [ 'afiliado','comercio','cuota' ]
      });
    if (!ordenes) return res.status(404).json({ message: "Ordenes not found" });
    return res.status(200).json(ordenes);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

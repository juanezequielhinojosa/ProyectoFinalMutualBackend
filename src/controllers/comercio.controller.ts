import { Request, Response } from "express";
import { Comercio } from "../entities/Comercio";
import { Domicilio } from "../entities/Domicilio";


//OBTIENE TODOS LOS COMERCIOS
export const getComercios = async (req: Request, res: Response) => {
  console.log('obteniendo comercios...');
  try {
    //const comercios = await Comercio.find();
    const comercios = await Comercio.find({
    relations: {
        domicilio : true
    },
    });
    return res.status(200).json(comercios);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//OBTIENE UN COMERCIO
export const getComercio = async (req: Request, res: Response) => {
  console.log('buscando comercio...');
  try {
    const { id } = req.params;
    //const comercio = await Comercio.findOneBy({ id_comercio: parseInt(id) });
    const comercio = await Comercio.findOne({
      where: { id_comercio: parseInt(id)},
      relations: ['domicilio']
    })
    if (!comercio) return res.status(404).json({ message: "trade not found" });
    return res.status(200).json(comercio);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//CREA UN COMERCIO
export const createComercio = async (req: Request, res: Response) => {
  console.log('creando comercio...')
  try {
    const { name, cuit, phone, domicilio } = req.body;
    if (!name || !cuit || !phone || !domicilio) {
      return res.status(400).json({ msg: "Please. All fields are required" });
    }
    const verifiedComercio = await Comercio.findOneBy({ cuit });
    if (verifiedComercio) {
      return res.status(400).json({ msg: "The Comercio already Exists" });
    }
    const domicilioComercio = new Domicilio()
    domicilioComercio.barrio = domicilio.barrio;
    domicilioComercio.calle = domicilio.calle;
    domicilioComercio.numero = domicilio.numero;
    domicilioComercio.nro_depto = domicilio.nro_depto;
    domicilioComercio.localidad = domicilio.localidad;
    await domicilioComercio.save();

    const comercio = new Comercio();
    comercio.name = name;
    comercio.cuit = cuit;
    comercio.phone = phone;
    comercio.domicilio = domicilioComercio;
    await comercio.save();
    //return res.status(201).json(comercio);
    return res.status(201).json({ msg: "Comercio created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }

};


//ACTUALIZA UN COMERCIO
export const updateComercio = async (req: Request, res: Response) => {
  console.log('actualizando comercio')
  const { id } = req.params;
  try {
    const comercio = await Comercio.findOneBy({ id_comercio: parseInt(id) });
    if (!comercio) return res.status(404).json({ message: "Not comercio found" });
    await Comercio.update({ id_comercio: parseInt(id) }, req.body);
    //return res.sendStatus(204);
    return res.status(204).json({ message: "Comercio updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

//ELIMINA UN COMERCIO
export const deleteComercio = async (req: Request, res: Response) => {
  console.log('eliminando comercio...')
  const { id } = req.params;
  try {
    const result = await Comercio.delete({ id_comercio: parseInt(id) });
    if (result.affected === 0)
      return res.status(404).json({ message: "Comercio not found" });
    return res.status(204).json({ message: "Comercio removed successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

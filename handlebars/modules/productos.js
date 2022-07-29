const express = require('express');
const { Router } = express;

const productos = [
  { title: 'Pantalon', price: '$1500', thumbnail: 'http://random1.com', id: 1 },
  { title: 'Sombrero', price: '$950', thumbnail: 'http://random2.com', id: 2 },
  { title: 'Corbata', price: '$875', thumbnail: 'http://random3.com', id: 3 },
];

const router = Router();

// res.status(400).send({ error: 'El parámetro no es un número' });

class Productos {
  constructor(productos) {
    this.idNuevo = productos.length;
    this.productos = productos;

    router.get('/', this.getAllProducts);
    router.get('/:id', this.getProduct);
    router.post('/', this.setProduct);
    router.put('/:id', this.updateProduct);
    router.delete('/:id', this.deleteProduct);
  }

  getAllProducts = (req, res) => {
    console.log('Get all products received OK');
    res.status(201).send(this.productos);
  };

  getProduct = (req, res) => {
    console.log('Get product by Id received OK');
    const { id } = req.params;
    if (id >= 1 && id <= this.productos.length) {
      res.status(201).send(this.productos[id - 1]);
    } else {
      res.status(400).send({ error: 'producto no encontrado' });
    }
  };
  setProduct = (req, res) => {
    console.log('Post product received OK');
    const productoRecibido = req.body;
    this.idNuevo++;

    const productoAGuardar = { ...productoRecibido, id: this.idNuevo };
    this.productos.push(productoAGuardar);
    res.writeHead(301, { Location: '/productos' });
    return res.end();
  };

  updateProduct = (req, res) => {
    console.log('Put product received OK');
    const { id } = req.params;
    const productoRecibido = req.body;

    if (id >= 1 && id <= this.productos.length) {
      const productoAGuardar = { ...productoRecibido, id: parseInt(id) };
      productos.splice(id - 1, 1, productoAGuardar);
      res.status(201).send(productoAGuardar);
    } else {
      res.status(400).send({ error: 'producto no encontrado' });
    }
  };

  deleteProduct = (req, res) => {
    console.log('Delete product received OK');
    const { id } = req.params;

    if (id >= 1 && id <= this.productos.length) {
      productos.splice(id - 1, 1, { error: 'producto inexistente' });
      res.status(201).send({ message: 'Deleted product OK' });
    } else {
      res.status(400).send({ error: 'producto no encontrado' });
    }
  };
}

new Productos(productos);

module.exports = router;

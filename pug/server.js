const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

const productos = [
  { title: 'Calculadora', price: '$123.45', thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-512.png', id: 1 },
  { title: 'Escuadra', price: '$243.56', thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png', id: 2 },
  { title: 'Reloj', price: '$345', thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-512.png', id: 3 },
];

const server = app.listen(PORT, () => {
  console.log(`Corriendo en el puerto ${PORT}`);
});

app.set('views', './views');
app.set('view engine', 'pug');

app.post('/productos', (req, res) => {
  const id = productos.length !== 0 ? productos[productos.length - 1].id + 1 : 1;
  const productoRecibido = req.body;
  const productoAGuardar = { ...productoRecibido, id: id };
  productos.push(productoAGuardar);
  res.writeHead(301, { Location: '/productos' });
  return res.end();
});

app.get('/', (req, res) => {
  res.render('formulario.pug');
});

app.get('/productos', (req, res) => {
  res.render('productos.pug', {
    productos: productos,
  });
});

server.on('error', (error) => console.log(`Error en el servidor: ${error}`));

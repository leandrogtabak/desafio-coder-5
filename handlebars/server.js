const express = require('express');

const app = express();

const handlebars = require('express-handlebars');

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
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

// establecemos el motor de plantilla que se utiliza
app.set('view engine', 'hbs');
// establecemos directorio donde se encuentran los archivos de plantilla
app.set('views', './views');

app.post('/productos', (req, res) => {
  const id = productos.length !== 0 ? productos[productos.length - 1].id + 1 : 1;
  const productoRecibido = req.body;
  const productoAGuardar = { ...productoRecibido, id: id };
  productos.push(productoAGuardar);
  res.writeHead(301, { Location: '/productos' });
  return res.end();
});

app.get('/', (req, res) => {
  res.render('formulario');
});

app.get('/productos', (req, res) => {
  res.render('productos', {
    productos: productos,
  });
});

server.on('error', (error) => console.log(`Error en el servidor: ${error}`));

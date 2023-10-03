import express from 'express';
import usersRouter from './router/users.router.js';
import productsRouter from './router/products.router.js';
import cartsRouter from './router/carts.router.js';
import viewsRouter from './router/views.router.js';
import { __dirname } from './utils.js';
import { engine } from 'express-handlebars';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));

app.engine('handlebars',engine());
app.set('view engine','handlebars');
app.set('views', __dirname+'/views');

app.use('/api/users',usersRouter);
app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);
app.use('/api',viewsRouter);

app.listen(8080,()=>{
    console.log('Escuchando al puerto 8080 con Express')
})
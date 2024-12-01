import express from 'express'
import morgan from 'morgan'
import { engine } from 'express-handlebars'
import {join, dirname} from 'path'
import { fileURLToPath } from 'url'

//Intialization
const app = express();
const __dirname =dirname(fileURLToPath(import.meta.url));

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialDir: join(app.get('views'),'partial'),
    extname: 'hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.get('/', (req, res)=>{
    res.json({"message": "Hola"});
})

//public files
app.use(express.static(join(__dirname, 'public')));

//run server
app.listen(app.get('port'), ()=> 
console.log('server listening on port', app.get('port')));
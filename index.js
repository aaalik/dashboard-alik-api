import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';


import indexController from './src/routes/index';
import userController from './src/routes/user';


const errorhandler = require('errorhandler');

const app = express();

/**
 * @param undefined it's means fetch origin came from browser or postman etc.
 */

const siteUrl = ['http://127.0.0.1:8080', undefined];

const corsOptions = {
    origin(origin, callback) {
        if (siteUrl.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};


/**
 * @constant combined to see all infomation
 * @constant dev to see only http code response
 */

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.redirect('/api');
});

const checkError = (req, res, next) => {
    // console.log(res);
};


app.use('/api', indexController);
app.use('/api/user', userController);

app.use(checkError);


if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler());
}

const listener = app.listen(3001, () => {
    console.log(`Listening on port ${listener.address().port}`);
});

export default app;

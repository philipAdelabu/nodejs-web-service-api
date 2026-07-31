import  express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { getDB, closeDB } from './src/config/db.js';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import router from './src/routes/index.js';
import { readFile } from "fs/promises";
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
// import Passport from './src/config/passport.js';




const app = express();
//Passport(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: true,
}));
/*
app.use(passport.initialize());
app.use(passport.session());  */
app.use(flash());

// Global variables Middleware
app.use((req, res, next) => {
  res.locals.error = req.flash('error');  // buit-in passport error
  res.locals.error_msg = req.flash('error_msg'); // custom manual regisration error
  res.locals.success_msg = req.flash('success_msg');
  next();
});

function ensureAuthenticated(req, res, next) {
   if(req.isAuthenticated()) return next();
   req.flash('error', 'Please log in to view that resource.');
   res.redirect('/');
}


/*
// -- monolith view -- 
app.get('/', (req, res) => {
 if(req.isAuthenticated()) return 
})  */

app.use(cors({
  origin: `${process.env.NODE_ENV === 'development' ? process.env.SWAGGER_HOST_LOCAL : process.env.SWAGGER_HOST}`,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

const swaggerFile = await readFile("./swagger-output.json", "utf-8"); 

// Swagger UI setup - This should be early in your middleware stack
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(JSON.parse(swaggerFile), {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "CSE341 API Documentation"
}));    


app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', {
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl
  });
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred'
  });
});

const port = process.env.PORT || 8080;

async function startServer(){
      await getDB();

     const server = app.listen(port, () =>{
       console.log(`Server is running on port ${port}`);
     })

     process.on("SIGINT", async () => {
         console.log('Server shutting down.. ');
          await closeDB();
         server.close(() => process.exit(0));
     })

     process.on("SIGTERM", async () => {
         console.log('Server Shutting down..');
         await closeDB();
         server.close(() => process.exit(0));
     })

}

startServer();




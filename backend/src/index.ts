import express, {type Express, type Request, type Response } from "express";
const bodyParser = require('body-parser');

const app: Express = express();
const port = process.env.PORT || 5000;

const authRouter = require('./routes/auth.route');
const adminRouter = require('./routes/admin.route');
const rhRouter = require('./routes/rh.route');

app.use(bodyParser.json());


app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/rh', rhRouter);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

import express, {type Express, type Request, type Response } from "express";
const bodyParser = require('body-parser');

const app: Express = express();
const port = process.env.PORT || 5000;

const adminRouter = require('./routes/admin.route');

app.use(bodyParser.json());
app.use('/admin', adminRouter);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

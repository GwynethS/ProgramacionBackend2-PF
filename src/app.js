import express from "express";
import session from 'express-session'
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import { mongoConnection } from "./connection/mongo.js";
import  errorHandler  from "./middlewares/errorHandler.js";
import passport from "passport";
import MongoStore from "connect-mongo";

import "dotenv/config";
import './passport/jwt.js';

const PORT = process.env.PORT || 8080;
const app = express();

const storeConfig = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    dbName: "Ecommerce2", 
    crypto: { secret: process.env.SECRET_KEY },
    ttl: 180,
  }),
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session(storeConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.use(errorHandler); 

mongoConnection();

app.listen(PORT, () => {
  console.log(`Start Server in Port ${PORT}`);
});

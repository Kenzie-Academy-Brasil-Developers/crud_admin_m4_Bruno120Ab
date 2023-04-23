import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors";

const ensureTokenIsValidMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
     let token: string | undefined = req.headers.authorization;

     if(!token){
          throw new AppError("Missing Bearer Token", 401);
     }

     token = token.split(" ")[1];

     jwt.verify(token,  process.env.SECRET_KEY!, (err: any, decoded: any) => {
          if (err) {
            throw new AppError(err.message, 401);
          }
          res.locals.admin = decoded.admin;
          res.locals.id = decoded.sub;
     });

     return next();
};

export default ensureTokenIsValidMiddleware;

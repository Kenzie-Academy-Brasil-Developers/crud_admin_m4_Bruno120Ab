import { NextFunction, Request, Response } from "express";

import { QueryConfig, QueryResult } from "pg";

import { IEmail } from "../interfaces/user";

import { client } from "../database";

import { AppError } from "../errors";

async function ensureEmailNotExistsMiddleware( req: Request, res: Response, next: NextFunction): Promise<Response | void> {
     const { email }:IEmail = req.body;

     const queryTemplate:string = ` SELECT * FROM users WHERE email = $1; `

     const queryConfig:QueryConfig = {
          text: queryTemplate,
          values:[email]
     };

     const queryResult:QueryResult = await client.query(queryConfig);

     if(queryResult.rowCount !== 0){
         throw new AppError("E-mail already registered",409)
     }

     return next()
}

export default ensureEmailNotExistsMiddleware;

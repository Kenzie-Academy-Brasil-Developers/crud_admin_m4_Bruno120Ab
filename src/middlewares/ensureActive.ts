import { ZodTypeAny } from "zod";

import { NextFunction, Request, Response } from "express";

import { IActive, IEmail, ILoginUser, IPassword } from "../interfaces/user";

import { QueryConfig, QueryResult } from "pg";

import { client } from "../database";

import { AppError } from "../errors";

import * as encripta from "bcryptjs"


//TODOS: Este middleware está completo para rota post/login.

const ensureActiveUserMiddleware =  (schema: ZodTypeAny) => async (req:Request, res:Response, next:NextFunction): Promise<void> => {
     const Body:ILoginUser = schema.parse(req.body);

     const queryTemplateEmail = `
          SELECT email FROM users WHERE email = $1;
     `

     const queryConfigE:QueryConfig = {
          text: queryTemplateEmail,
          values: [Body.email]
     }   

     const queryResultEmail:QueryResult<IEmail> = await client.query(queryConfigE);

     if(queryResultEmail.rowCount === 0) {
          throw new AppError("Wrong email/password",401)
     }

     const queryTemplateActive = `
          SELECT active FROM users  WHERE  email = $1;
     `
     
     const queryConfigA:QueryConfig = {
          text: queryTemplateActive,
          values: [Body.email]
     }   

     const queryResultActive:QueryResult<IActive> = await client.query(queryConfigA);

     if(!queryResultActive.rows[0].active){
          throw new AppError("Wrong email/password",401)
     }

     const queryTemplatePassword = `
          SELECT password FROM users WHERE email = $1;
     `

     const queryConfigP:QueryConfig = {
          text: queryTemplatePassword,
          values: [Body.email]
     }

     const queryResultPassword:QueryResult<IPassword> = await client.query(queryConfigP);

     const user:string =  queryResultPassword.rows[0].password;

     if(queryResultPassword.rowCount === 0){
          throw new AppError("Wrong email/password",401)
     }

     const comparePassword = await encripta.compare(
          Body.password,
          user
     );

     console.log(user, Body.password, comparePassword)

     if (comparePassword === false) {
          throw new AppError("Wrong email/password", 401);
     }

     return next();
}

export default ensureActiveUserMiddleware;
import { ZodTypeAny } from "zod";

import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { IId } from "../interfaces/user";
import { AppError } from "../errors";

const ensureIdUserMiddleware =  (schema: ZodTypeAny) => async (req:Request, res:Response, next:NextFunction): Promise<void> => { 
     const id :number = parseInt(req.body.id);

     const queryTemplate:string = `
          SELECT 
               id
          FROM
               users
          WHERE
               id = $1;
     `

     const queryConfig:QueryConfig = {
          text: queryTemplate,
          values: [id]
     }

     const queryResult:QueryResult<IId> = await client.query(queryConfig);

     if(queryResult.rowCount === 0) {
          throw new AppError("User not found",404 )
     }

     return next()
}

export default ensureIdUserMiddleware;

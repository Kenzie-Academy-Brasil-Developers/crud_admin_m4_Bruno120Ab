import { NextFunction, Request, Response } from "express";

import { ZodTypeAny } from "zod";

//TODOS: Este middleware está completo ppara validar se os dados de cadastro estão correto.


const ensureBodyIsValidMiddleware = (schema: ZodTypeAny) => (req:Request, res:Response, next:NextFunction): void=> {
     const Body = schema.parse(req.body);

     req.body = Body;

     return next();
}

export default ensureBodyIsValidMiddleware;
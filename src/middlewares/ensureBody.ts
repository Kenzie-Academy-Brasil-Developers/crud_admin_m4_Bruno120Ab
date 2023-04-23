import { NextFunction, Request, Response } from "express";

import { ZodTypeAny } from "zod";

const ensureBodyIsValidMiddleware = (schema: ZodTypeAny) => (req:Request, res:Response, next:NextFunction): void => {
     const Body = schema.parse(req.body);
     req.body = Body;

     return next();
}

export default ensureBodyIsValidMiddleware;
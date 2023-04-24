import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors";

const ensureIsAdminMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { admin } = res.locals;          
  const { id } = res.locals;

  if (admin === false) {
    if( req.method === 'PATCH' || req.method === 'DELETE' ){
      if( id !== req.params.id ){
        throw new AppError("Insufficient Permission", 403);
      }
      return next();
    }

    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};
   
   export default ensureIsAdminMiddleware;
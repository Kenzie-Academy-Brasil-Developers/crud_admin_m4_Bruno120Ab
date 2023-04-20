import { Router } from "express";

import ensureActiveUserMiddleware from "../middlewares/ensureActive";

import { loginUserSchema } from "../schemas/users";

import { generatorTokenController } from "../controllers/users.controllers";

const loginRouter = Router();

loginRouter.post('', ensureActiveUserMiddleware(loginUserSchema), generatorTokenController);   

export default loginRouter;

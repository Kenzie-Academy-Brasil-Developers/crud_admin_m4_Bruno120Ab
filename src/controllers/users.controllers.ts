import { Request, Response } from "express";

import { ICreateUser, ILoginUser, IUpdateUser } from "../interfaces/user";

import jwt from "jsonwebtoken";

import "dotenv/config";

import createUserService from "../services/users/createUser.service";
import readAllUsersService from "../services/users/readAllUsers.service";
import updateUserService from "../services/users/updateUser.service";
import recoverUserService from "../services/users/recoverUser.service";
import readOneUsersService from "../services/users/readOneUser.service";
import readUserService from "../services/users/readUser.service";
import deleteUserService from "../services/users/deleteUser.service";

async function createUserController(req: Request, res: Response): Promise<Response>{
     const dataUser:ICreateUser = req.body;

     const queryService = await createUserService(dataUser);

     return res.status(201).json(queryService);
}

async function readAllUsersController(req: Request, res: Response): Promise<Response>{
     const allUsers = await readAllUsersService();

     return res.status(200).json(allUsers);
}

async function readOneUsersController(req: Request, res: Response): Promise<Response>{
     const { id } = res.locals;

     const OneUser = await readUserService(id);

     return res.status(200).json(OneUser);
}

async function updateUserController(req: Request, res: Response): Promise<Response>{
     const dataUser:IUpdateUser = req.body;
     const userIdParams:number = parseInt(req.params.id);

     const queryService = await updateUserService(dataUser, userIdParams);

     return res.status(200).json(queryService);
}

async function deleteUserController(req: Request, res:Response): Promise<Response>{
     const userIdParams:number = parseInt(req.params.id);
     
     await deleteUserService(userIdParams);

     return res.status(204 ).send();
}

async function recoverUserController(req: Request, res: Response): Promise<Response>{
     const userId:number = parseInt(req.params.id);

     const queryResult = await recoverUserService(userId);

     return res.status(200).json(queryResult);
}

async function generatorTokenController(req: Request, res: Response): Promise<Response>{

     const dataUser:ILoginUser= req.body;

     const user = await readOneUsersService(dataUser);

     const token: string = jwt.sign(
          {
            admin: user.admin,
          },
          process.env.SECRET_KEY!, 
          {
            expiresIn: "1d",
            subject: user.id.toString(),
          }
        );
      
     return res.status(200).json({token});
}

export {
     createUserController,    readAllUsersController,
     updateUserController,    deleteUserController,
     recoverUserController,   generatorTokenController,
     readOneUsersController
}    
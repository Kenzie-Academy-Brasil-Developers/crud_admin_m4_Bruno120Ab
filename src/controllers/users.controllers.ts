import { Request, Response } from "express";

import { ICreateUser, ILoginUser, IUserNoPassword } from "../interfaces/user";

import jwt from "jsonwebtoken";

import "dotenv/config";


import createUserService from "../services/users/createUser.service";
import readAllUsersService from "../services/users/readAllUsers.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import recoverUserService from "../services/users/recoverUser.service";
import readOneUsersService from "../services/users/readOneUser.service";


async function createUserController(req: Request, res: Response): Promise<Response>{
     const dataUser:ICreateUser = req.body;

     const queryService = await createUserService(dataUser);

     return res.status(201).json(queryService);
}

async function readAllUsersController(): Promise<IUserNoPassword[]>{
     const allUsers = await readAllUsersService();

     return allUsers;
}

async function updateUserController(req: Request, res: Response): Promise<Response>{
     const dataUser:Partial<ICreateUser> = req.body;
     const userId:number = parseInt(req.params.id);

     const queryService = await updateUserService(dataUser, userId);

     return res.status(200).json(queryService);
}

async function deleteUserController(req: Request, res:Response): Promise<Response>{
     const userId:number = parseInt(req.params.id);

     await deleteUserService(userId);

     return res.status(204).send();
}

async function recoverUserController(req: Request, res: Response): Promise<Response>{
     const userId:number = parseInt(req.params.id);

     await recoverUserService(userId);

     return res.status(204).send();
}

async function generatorTokenController(req: Request, res: Response) {

     const dataUser:ILoginUser= req.body;

     const user = await readOneUsersService(dataUser);

     const token: string = jwt.sign(
          {
            admin: user.admin,
          },
          process.env.SECRET_KEY!, //TODOS: Passe para o .env
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
     recoverUserController,   generatorTokenController
}    
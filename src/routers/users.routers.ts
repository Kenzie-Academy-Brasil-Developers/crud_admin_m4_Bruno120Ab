import { Router } from 'express';

import { createUserSchema } from '../schemas/users';

import { createUserController,     deleteUserController,
         readAllUsersController,   recoverUserController,
         updateUserController } from '../controllers/users.controllers';

import ensureBodyIsValidMiddleware from '../middlewares/ensureBody';
import ensureEmailNotExistsMiddleware from '../middlewares/ensureEmail';

const userRoutes: Router = Router();

userRoutes.post('',           ensureBodyIsValidMiddleware(createUserSchema),     ensureEmailNotExistsMiddleware,   createUserController);                                           //TODOS:  OK!.               
// userRoutes.get('',);                                                                                                                                                              //TODOS: Conclua o middleware(só falta validar a senha). Construa o controller. 
userRoutes.get('',                                                                                                 readAllUsersController);
userRoutes.patch('/:id',                                                                                           updateUserController );
userRoutes.delete('/:id',                                                                                          deleteUserController);                                     //TODOS: Realizar um softDelete (active = FALSE).
userRoutes.put('/:id/recover',                                                                                     recoverUserController);                                   //TODOS: Realizar um softRecover (active = TRUE).

export default userRoutes;    



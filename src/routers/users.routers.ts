import { Router } from 'express';

import { createUserSchema, updateUserSchema } from '../schemas/users';

import { createUserController,     deleteUserController,
         readAllUsersController,   readOneUsersController,   recoverUserController,
         updateUserController } from '../controllers/users.controllers';

import ensureBodyIsValidMiddleware from '../middlewares/ensureBody';
import ensureEmailNotExistsMiddleware from '../middlewares/ensureEmail';
import ensureTokenIsValidMiddleware from '../middlewares/ensureToken';
import ensureIsAdminMiddleware from '../middlewares/ensureIsAdmin';
import ensureIdUserMiddleware from '../middlewares/ensureId';

const userRoutes: Router = Router();

userRoutes.post('',                
     ensureBodyIsValidMiddleware(createUserSchema),    
     ensureEmailNotExistsMiddleware,                                                 
     createUserController);   

userRoutes.get('',                 
     ensureTokenIsValidMiddleware,                     
     ensureIsAdminMiddleware,                                                       
     readAllUsersController);

userRoutes.get('/profile',         
     ensureTokenIsValidMiddleware,                     
     ensureIsAdminMiddleware,                                                        
     readOneUsersController);      
                                                                                                                                                            
userRoutes.patch('/:id',           
     ensureTokenIsValidMiddleware, 
     ensureIsAdminMiddleware,                                                        
     ensureIdUserMiddleware,                          
     ensureBodyIsValidMiddleware(updateUserSchema),    
     updateUserController); 

userRoutes.delete('/:id', 
     ensureTokenIsValidMiddleware ,  
     ensureIsAdminMiddleware,              
     ensureIdUserMiddleware,                                             
     deleteUserController);                                    
     
userRoutes.put('/:id/recover',                         
     ensureIdUserMiddleware,                           
     ensureTokenIsValidMiddleware,                    
     ensureIsAdminMiddleware,      
     recoverUserController);                                   

export default userRoutes;    



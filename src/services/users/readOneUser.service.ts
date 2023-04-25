import jwt from "jsonwebtoken";

import { QueryConfig } from "pg";

import { client } from "../../database";

import { ILoginUser } from "../../interfaces/user";

async function readOneUsersService(data:ILoginUser){

     const queryTemplate = 
          `SELECT  
               "id", "admin" 
          FROM 
               users 
          WHERE 
               email = $1; `;

     const queryConfig:QueryConfig = {
          text: queryTemplate,
          values: [data.email]
     }

     const queryResult = await client.query(queryConfig);
     
     const user = queryResult.rows[0]

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

     return token;
}

export default readOneUsersService;
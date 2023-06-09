import { QueryConfig, QueryResult } from "pg";

import { IUser } from "../../interfaces/user";

import { client } from "../../database";

async function deleteUserService(userId:number): Promise<IUser> {

     const queryTemplate: string = 
          `UPDATE 
               users 
          SET 
               active = 'false' 
          WHERE 
               id = $1 `;

     const queryConfig:QueryConfig = {
          text: queryTemplate,
          values: [userId]
     };

     const queryResult:QueryResult<IUser> = await client.query(queryConfig);

     return queryResult.rows[0];
}

export default deleteUserService;
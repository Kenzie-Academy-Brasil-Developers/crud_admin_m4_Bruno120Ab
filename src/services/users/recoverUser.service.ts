import { IUser } from "../../interfaces/user";

import { client } from "../../database";

import { QueryConfig, QueryResult } from "pg";

async function recoverUserService(userId:number){

     const queryTemplate: string = ` UPDATE users SET active = 'true' WHERE id = $1 `;

     const queryConfig:QueryConfig = {
          text: queryTemplate,
          values: [userId]
     };

     const queryResult:QueryResult<IUser> = await client.query(queryConfig);

     return queryResult.rows[0];
}

export default recoverUserService;
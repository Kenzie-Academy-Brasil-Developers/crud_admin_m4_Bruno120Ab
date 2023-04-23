import { IUserNoPassword } from "../../interfaces/user";

import { client } from "../../database";

import { QueryConfig, QueryResult } from "pg";

async function recoverUserService(userId:number): Promise<IUserNoPassword>{

     const queryTemplate: string = ` UPDATE users SET active = 'true' WHERE id = $1 RETURNING  "id", "name", "email", "admin", "active" `;

     const queryConfig:QueryConfig = {
          text: queryTemplate,
          values: [userId]
     };

     const queryResult:QueryResult<IUserNoPassword> = await client.query(queryConfig);

     return queryResult.rows[0];
}

export default recoverUserService;
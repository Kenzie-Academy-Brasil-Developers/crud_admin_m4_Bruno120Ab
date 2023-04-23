import { QueryResult } from "pg";

import { client } from "../../database";

import { IUserNoPassword } from "../../interfaces/user";

async function readUserService(id:number): Promise<IUserNoPassword> {

     const queryTemplate = ` SELECT "id", "name", "email", "admin", "active" FROM users WHERE id = $1; `;

     const queryConfig = {
          text: queryTemplate,
          values: [id]
     };

     const queryResult:QueryResult<IUserNoPassword> = await client.query(queryConfig);

     return queryResult.rows[0];
}

export default readUserService;
import { QueryConfig, QueryResult } from "pg";

import { client } from "../../database";

import { IActive } from "../../interfaces/user";

async function statusUsersService(userId: number): Promise<IActive> {

     const queryTemplate = ` SELECT "active" FROM users WHERE id = $1; `

     const queryConfig:QueryConfig = {
          text: queryTemplate,
          values: [userId]
     }

     const queryResult:QueryResult<IActive> = await client.query(queryConfig);

     return queryResult.rows[0];
}

export default statusUsersService;
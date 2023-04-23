import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";

import { IUpdateUser, IUser } from "../../interfaces/user";

import { client } from "../../database";

async function updateUserService(data: IUpdateUser, userId:number){

     const queryTemplate: string = format(` UPDATE users SET(%I) = ROW(%L) WHERE id = $1 RETURNING "id", "name", "email", "admin", "active"; `,
          Object.keys(data),
          Object.values(data)
     )

     const queryConfig:QueryConfig = {
          text: queryTemplate,
          values: [userId]
     };

     const queryResult:QueryResult<IUser> = await client.query(queryConfig);

     return queryResult.rows[0];
}

export default updateUserService;

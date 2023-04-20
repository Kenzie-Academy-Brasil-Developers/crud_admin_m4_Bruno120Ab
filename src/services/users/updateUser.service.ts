import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { ICreateUser, IUser } from "../../interfaces/user";
import { client } from "../../database";



async function updateUserService(data: Partial<ICreateUser>, userId:number){

     const queryTemplate: string = format(
          `
               UPDATE users
                    SET(%I) = ROW(%L)
               WHERE
                    id = $1
               RETURNING
                    *;
          `,
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

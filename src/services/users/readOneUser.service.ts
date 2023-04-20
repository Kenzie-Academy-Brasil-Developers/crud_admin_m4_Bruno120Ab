import { QueryConfig } from "pg";

import { client } from "../../database";
import { ILoginUser } from "../../interfaces/user";


async function readOneUsersService(data:ILoginUser){

     const queryTemplate = `
          SELECT 
               "id",
               "admin"
          FROM
               users
          WHERE
               email = $1;
     `

     const queryConfig:QueryConfig = {
          text: queryTemplate,
          values: [data.email]
     }

     const queryResult = await client.query(queryConfig);

     return queryResult.rows[0];
}

export default readOneUsersService;
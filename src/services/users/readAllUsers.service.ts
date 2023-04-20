import { client } from "../../database";

import { IUserNoPassword } from "../../interfaces/user";

async function readAllUsersService(): Promise<Array<IUserNoPassword>> {

     const queryTemplate = `
          SELECT 
               "id",
               "name",
               "email",
               "admin",
               "active",
          FROM
               users;
     `

     const queryResult = await client.query(queryTemplate);

     return queryResult.rows;
}

export default readAllUsersService;
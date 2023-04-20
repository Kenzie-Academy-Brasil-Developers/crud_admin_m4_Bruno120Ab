import format from "pg-format";
import { QueryResult } from "pg";

import { client } from "../../database";

import { ICreateUser, IUser } from "../../interfaces/user";

import * as encripta from "bcryptjs"

async function createUserService(data:ICreateUser): Promise<IUser>{
     data.password = await encripta.hash(data.password, 10);

     const queryTemplate: string = format(`INSERT INTO users(%I) VALUES (%L) RETURNING "id", "name", "email", "admin", "active";`,
          Object.keys(data),
          Object.values(data)
     );

     const queryResult: QueryResult<IUser> = await client.query(queryTemplate);

     return queryResult.rows[0];
}

export default createUserService;  
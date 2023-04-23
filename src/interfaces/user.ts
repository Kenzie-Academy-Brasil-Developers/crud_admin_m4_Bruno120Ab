import { z } from "zod";

import { userSchema, updateUserSchema } from "../schemas/users";

export type IUser = z.infer<typeof userSchema>;
export type IUpdateUser = z.infer<typeof updateUserSchema>

export type ICreateUser = Omit<IUser, 'id' | 'active'>;
export type IUserNoPassword = Omit<IUser, 'password'>;

export type IId = Pick<IUser, 'id'>;
export type IEmail = Pick<IUser, 'email'>;
export type IActive = Pick<IUser, 'active'>;
export type IPassword = Pick<IUser, 'password'>;
export type ILoginUser = Pick<IUser, 'email' | 'password'>;


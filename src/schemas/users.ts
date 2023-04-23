import { z } from "zod";

const userSchema = z.object({
     id: z.number(),
     name: z.string(),
     email: z.string().email(),
     password: z.string().min(3),
     admin: z.boolean(),
     active: z.boolean()
});

const readAllUsers = userSchema.omit({password: true});
const createUserSchema = userSchema.omit({id: true, active: true}).partial({admin:true})

const loginUserSchema = userSchema.pick({email:true, password:true})
const updateUserSchema = userSchema.pick({name:true, email:true, password:true}).partial();

export {
     userSchema,    createUserSchema,
     readAllUsers,  updateUserSchema,
     loginUserSchema
};
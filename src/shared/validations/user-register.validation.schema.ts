import z from "zod";
import { nameSchema } from "./name-validtion.js";
import { emailSchema } from "./email-validation.js";
import { passwordSchema } from "./password-validation.js";

export const userRegisterSchema = z.object({
    userName: nameSchema,
    email: emailSchema,
    password: passwordSchema
});

export const userEditSchema = userRegisterSchema.partial().omit({ password: true });
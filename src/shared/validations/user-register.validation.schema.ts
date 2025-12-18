import z from "zod";
import { nameSchema } from "./name-validtion";
import { emailSchema } from "./email-validation";
import { passwordSchema } from "./password-validation";

export const userRegisterSchema = z.object({
    userName: nameSchema,
    email: emailSchema,
    password: passwordSchema
});

export const userEditSchema = userRegisterSchema.partial().omit({ password: true });
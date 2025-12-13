import z from "zod";

export const nameSchema = z
  .string()
  .min(3, { message: "Name must be atleast 3 characters " })
  .regex(/^[a-zA-Z\s]+$/, {
    message: "Name should only contain alphabets and spaces",
  });

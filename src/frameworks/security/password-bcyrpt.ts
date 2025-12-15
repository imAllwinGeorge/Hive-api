import type { IBcrypt } from "../../entities/security/bcrypt.interface.js";
import bcrypt from "bcrypt";

export class PasswordBcrypt implements IBcrypt {
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt)
    }

    async compare(password: string, original: string): Promise<boolean> {
        return await bcrypt.compare(password, original)
    }
}
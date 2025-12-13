export interface IBcrypt {
    hash (password: string): Promise<string>;
    compare(password: string, origina: string): Promise<boolean>;
}
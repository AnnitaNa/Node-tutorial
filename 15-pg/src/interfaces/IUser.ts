import { Optional } from "sequelize";

export interface IUser {
    id: number,
    name: string,
    email: string,
    password_hash:string,
    provider: boolean,
    created_at?: Date,
    updated_at?: Date
}

export interface IUserInput extends Optional<IUser, 'id'>{}
export interface IUserOutput extends Required<IUser>{}
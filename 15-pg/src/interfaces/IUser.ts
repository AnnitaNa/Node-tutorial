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

export type IUserInput = Optional<IUser, "id">
export type IUserOutput = Required<IUser>
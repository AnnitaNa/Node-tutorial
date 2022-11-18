import { IuserModel } from "./IuserModel";

export interface IuserDB {
    users: IuserModel[],
    setUsers: Function
}
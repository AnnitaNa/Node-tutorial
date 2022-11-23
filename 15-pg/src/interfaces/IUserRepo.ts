import { IUserInput, IUserOutput } from "./IUser";

interface IUserRepo {
	getAll(): Promise<IUserOutput[]>,
    // getById(id: number): IUserOutput,
    create(data: IUserInput): void,
    // update(data: IUserInput, id: number): IUserOutput,
    // remove(id: number): void
}

export default IUserRepo;
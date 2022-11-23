import { IUserInput, IUserOutput } from "./IUser";

interface IUserRepo {
	getAll(): Promise<IUserOutput[]>,
    getById(id: number): Promise<IUserOutput | null>,
    create(data: IUserInput): void,
    update(data: IUserInput, id: number): Promise<[number, IUserOutput[]]>,
    remove(id: number): void
}

export default IUserRepo;
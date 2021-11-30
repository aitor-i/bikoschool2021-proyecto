import Meme from "./meme";

export default interface MemeRepository {
    getAll(): Meme[];
    getSome(amount:number, page?:number): Meme[];
    getSomeByFilter(amount:number, page?:number, searchText?:string): Meme[];
}
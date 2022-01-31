import { Item } from "./item";

export class Agenda{
    constructor(
        private items:Array<Item> = [],
        private stats:Array<String> = [],
    ){}
}
import { DateTimeGateway } from "./datetime.gateway";

export class ProdDateTimeGateway implements DateTimeGateway{
    
    current(): Date {
        return new Date;
    }

    setTime(date:Date):void{
        throw 'not implemented';
    }
}
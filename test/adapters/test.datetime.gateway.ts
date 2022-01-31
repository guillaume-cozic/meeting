import { DateTimeGateway } from "src/shared/datetime.gateway";


export class TestDateTimeGateway implements DateTimeGateway{
    
    private date:Date;

    current(): Date {
        return this.date;
    }

    setTime(date:Date):void{
        this.date = date;
    }
}
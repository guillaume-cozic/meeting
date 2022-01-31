export const DATE_TIME_GATEWAY = 'DATE_TIME_GATEWAY';

export interface DateTimeGateway{
    current():Date;
    setTime(date:Date):void;
}


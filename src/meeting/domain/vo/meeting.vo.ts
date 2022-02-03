export interface MeetingVo{
    id: string;
    name:string;
    date:Date;
    agenda: Array<any>,
    participants:Array<any>,
    actions: Array<String>
}
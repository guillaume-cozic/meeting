import Meeting from "../meeting";

export const MEETING_REPOSITORY = "MEETING_REPOSITORY"; 

export interface MeetingRepository{
    get(id:string):Promise<Meeting>;
    save(meeting:Meeting):void;
    getVo(id:string):Promise<{id, date, title, agenda, participants, actions}>;
}
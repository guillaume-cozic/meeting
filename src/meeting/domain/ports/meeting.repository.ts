import Meeting from "../meeting";
import { MeetingVo } from "../vo/meeting.vo";

export const MEETING_REPOSITORY = "MEETING_REPOSITORY"; 

export interface MeetingRepository{
    get(id:string):Promise<Meeting>;
    save(meeting:Meeting):void;
    getVo(id:string):Promise<MeetingVo>;
}
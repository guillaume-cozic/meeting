import { Injectable } from "@nestjs/common";
import { MeetingVo } from "src/meeting/domain/vo/meeting.vo";
import Meeting from "./../../domain/meeting";
import { MeetingRepository } from "./../../domain/ports/meeting.repository";

@Injectable()
export class InMemoryMeetingRepository implements MeetingRepository{
    
    private meetings:Array<Meeting> = [];

    async get(id:string):Promise<Meeting> {
        return this.meetings.find((meeting) => meeting.getId() === id);
    }

    async save(meeting:Meeting){
        this.meetings.push(meeting);
    }

    getVo(id: string): Promise<MeetingVo> {
        throw new Error("Method not implemented.");
    }

}
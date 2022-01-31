import { Injectable } from "@nestjs/common";
import Meeting from "./../../domain/meeting";
import { MeetingRepository } from "./../../domain/ports/meeting.repository";

@Injectable()
export class InMemoryMeetingRepository implements MeetingRepository{
    
    private meetings:Array<Meeting> = [];

    async get(id:string):Promise<Meeting> {
        let meetingToReturn:Meeting;
        this.meetings.forEach((meeting) => {
            if(meeting.getId() === id) meetingToReturn = meeting;
        });
        return meetingToReturn ?? null;
    }

    async save(meeting:Meeting){
        this.meetings.push(meeting);
    }

    getVo(id: string): Promise<{ id: any; date: any; title: any; agenda: any; participants: any; actions:any }> {
        throw new Error("Method not implemented.");
    }

}
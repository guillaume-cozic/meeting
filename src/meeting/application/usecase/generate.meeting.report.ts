import { Inject, Injectable } from "@nestjs/common";
import { MeetingNotFound } from "../../domain/exception/meeting.not.found";
import Meeting from "../../domain/meeting";
import { MeetingRepository, MEETING_REPOSITORY } from "../../domain/ports/meeting.repository";

@Injectable()
export class GenerateMeetingReport{
    
    constructor(@Inject(MEETING_REPOSITORY) private readonly meetingRepository:MeetingRepository){}
    
    async execute(id:string){
        let meeting:Meeting = await this.meetingRepository.get(id);
        if(meeting === undefined){
            throw new MeetingNotFound('Meeting : '+ id +' not found')
        }
        return [];
    }
}
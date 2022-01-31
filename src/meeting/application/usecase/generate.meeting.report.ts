import { Inject, Injectable } from "@nestjs/common";
import Meeting from "../../domain/meeting";
import { MeetingRepository, MEETING_REPOSITORY } from "../../domain/ports/meeting.repository";

@Injectable()
export class GenerateMeetingReport{
    
    constructor(@Inject(MEETING_REPOSITORY) private readonly meetingRepository:MeetingRepository){}
    
    async execute(id:string){
        let meeting:Meeting = await this.meetingRepository.get(id);
        if(meeting === null){
            throw 'meeting not found';
        }
        return [];
    }
}
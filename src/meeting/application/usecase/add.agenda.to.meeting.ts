import { Inject, Injectable } from "@nestjs/common";
import Meeting from "./../../domain/meeting";
import { MeetingRepository, MEETING_REPOSITORY } from "./../../domain/ports/meeting.repository";

@Injectable()
export class AddAgendaToMeeting{
    
    constructor(
        @Inject(MEETING_REPOSITORY) private meetingRepository:MeetingRepository
    ){}

    async execute(id:string, items:Array<string>, stats:Array<string>):Promise<void>{
        let meeting:Meeting = await this.meetingRepository.get(id);
        if(meeting === null){
            throw 'meeting not found';
        }
        meeting.addAgenda(items, stats, this.meetingRepository);
    }
}
import { Inject } from "@nestjs/common";
import { MeetingNotFound } from "../../domain/exception/meeting.not.found";
import { DomainError } from "src/shared/Domain/Error";
import Meeting from "./../../domain/meeting";
import { MeetingRepository, MEETING_REPOSITORY } from "./../../domain/ports/meeting.repository";

export class InviteParticipantsToMeeting{
    
    constructor(
        @Inject(MEETING_REPOSITORY) private readonly meetingRepository:MeetingRepository 
    ){}

    async execute(id:string, participants:Array<Object>):Promise<DomainError[]>{
        let meeting:Meeting = await this.meetingRepository.get(id);
        if(meeting === undefined){
            throw new MeetingNotFound('meeting : '+ id +' not found');
        }
        return meeting.inviteParticipants(participants, this.meetingRepository);
    }
}
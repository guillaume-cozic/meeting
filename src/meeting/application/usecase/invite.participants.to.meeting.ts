import { Inject } from "@nestjs/common";
import { MeetingNotFound } from "../../domain/exception/meeting.not.found";
import { DomainError } from "src/shared/Domain/Error";
import Meeting from "./../../domain/meeting";
import { MeetingRepository, MEETING_REPOSITORY } from "./../../domain/ports/meeting.repository";
import { Participant } from "../../../meeting/domain/participant";
import { MAIL_SERVICE, MailService } from "../../../shared/Domain/port/mail.service";

export class InviteParticipantsToMeeting{
    
    constructor(
        @Inject(MEETING_REPOSITORY) private readonly meetingRepository:MeetingRepository,
        @Inject(MAIL_SERVICE) private readonly mailService:MailService  
    ){}

    async execute(id:string, participants:Array<Object>):Promise<DomainError[]>{
        let meeting:Meeting = await this.meetingRepository.get(id);
        if(meeting === undefined){
            throw new MeetingNotFound('meeting : '+ id +' not found');
        }
        let participantsToInvite:Array<Participant> = [];
        participants.forEach((participant:{email; firstname; lastname}) => {
            participantsToInvite = [...participantsToInvite, new Participant(participant.email, participant.firstname, participant.lastname)]
        });
        return meeting.inviteParticipants(participantsToInvite, this.meetingRepository, this.mailService);
    }
}
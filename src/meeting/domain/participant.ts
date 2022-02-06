import { MailService } from "src/shared/Domain/port/mail.service";
import { MailInvitation } from "./mail/mail.invitation";

export class Participant{
    constructor(
        private email:string, 
        private firstname:string, 
        private lastname:string
    ){}

    inviteToMeeting(meetingId:string, mailService:MailService){
        mailService.send(new MailInvitation(meetingId, this.email, this.firstname, this.lastname));
    }
}
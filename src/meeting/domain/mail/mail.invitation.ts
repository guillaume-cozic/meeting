import { Mailable } from "../../../shared/Domain/port/mailable";

export class MailInvitation implements Mailable{
    constructor(
        private meetingId:string,
        private to:string,
        private firstname:string,
        private lastname:string
    ){}
}
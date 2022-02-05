import { Mailable } from "./mailable";
export const MAIL_SERVICE = 'MAIL_SERVICE';

export interface MailService{
    send(mail:Mailable):void;
}
import { MailService } from "../../src/shared/Domain/port/mail.service";
import { Mailable } from "../../src/shared/Domain/port/mailable";

export class TestMailService implements MailService{
    
    private mailables:Array<Mailable> = [];

    send(mail: Mailable): void {
        this.mailables = [...this.mailables, mail];
    }

    lastSent(): Mailable {
        return this.mailables[this.mailables.length - 1];
    }
}
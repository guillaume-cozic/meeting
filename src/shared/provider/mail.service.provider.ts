import { TestMailService } from "../../../test/adapters/test.mail.service";
import { MAIL_SERVICE } from "../Domain/port/mail.service";

export const MailServiceProvider = {
    provide: MAIL_SERVICE,
    useClass:
      process.env.NODE_ENV === 'development'
        ? TestMailService
        : TestMailService,
  };
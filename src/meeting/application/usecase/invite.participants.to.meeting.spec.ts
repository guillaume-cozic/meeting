import { Test, TestingModule } from "@nestjs/testing";
import Meeting from "./../../domain/meeting";
import { MeetingRepository, MEETING_REPOSITORY } from "./../../domain/ports/meeting.repository";
import { MeetingRepositoryProvider } from "../providers/provider";
import { InviteParticipantsToMeeting } from "./invite.participants.to.meeting";
import { DomainError } from "./../../../shared/Domain/Error";
import { ConfigModule } from '@nestjs/config';
import { MeetingNotFound } from "../../domain/exception/meeting.not.found";
import { Participant } from "../../domain/participant";
import { MAIL_SERVICE } from "../../../shared/Domain/port/mail.service";
import { MailServiceProvider } from "../../../shared/provider/mail.service.provider";
import { Mailable } from "../../../shared/Domain/port/mailable";
import { TestMailService } from "../../../../test/adapters/test.mail.service";
import { MailInvitation } from "../../../meeting/domain/mail/mail.invitation";

function newParticipant(participant){
    return new Participant(participant.email, participant.firstname, participant.lastname);
}

describe('invite participants to meeting', () => {
    let inviteParticipantsToMeeting:InviteParticipantsToMeeting;
    let meetingRepository:MeetingRepository;
    let mailService:TestMailService;
    let now:number = Date.now();

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            imports: [ConfigModule.forRoot()],
            providers: [MeetingRepositoryProvider, InviteParticipantsToMeeting, MailServiceProvider],
          }).compile();
        inviteParticipantsToMeeting = app.get(InviteParticipantsToMeeting);
        mailService = app.get(MAIL_SERVICE);
        meetingRepository = app.get(MEETING_REPOSITORY);
    })

    describe('should invite participants', () => {

        it('should invite one participant', async () => {
            const participant = {lastname:'name', firstname: 'firstname', email: 'test@example.com'};
            let participants:Array<Object> = [participant];

            let meetingScheduled:Meeting = new Meeting('123456', now, 'name'); 
            meetingRepository.save(meetingScheduled);

            await inviteParticipantsToMeeting.execute('123456', participants);

            let meetingExpected:Meeting = new Meeting('123456', now, 'name', null, [newParticipant(participant)]); 
            let meetingSaved:Meeting = await meetingRepository.get('123456'); 
            expect(meetingSaved).toEqual(meetingExpected);

            let mailSent:Mailable = mailService.lastSent();
            expect(mailSent).toEqual(new MailInvitation('123456', participant.email, participant.firstname, participant.lastname));
        });
    });

    describe('should not invite participant', () => {

        it('meeting not found', async () => {
            try{
                await inviteParticipantsToMeeting.execute('1', []);
                expect(false).toEqual(true);
            }catch(error){
                expect(error).toEqual(new MeetingNotFound('meeting : 1 not found'));
            }
        });

        it('should not invite participant twice', async () => {
            const participant = {lastname:'name', firstname: 'firstname', email: 'p1@example.com'};
            const participant2 = {lastname:'name', firstname: 'firstname', email: 'p2@example.com'};
            const participant3 = {lastname:'name', firstname: 'firstname', email: 'p3@example.com'};

            let meetingScheduled:Meeting = new Meeting('123456', now, 'name', null, [newParticipant(participant), newParticipant(participant2)]); 
            meetingRepository.save(meetingScheduled);

            let errorsSaved:Array<DomainError> = await inviteParticipantsToMeeting.execute('123456', [participant3, participant]);

            let errorsExpected:Array<DomainError> = [new DomainError('participant already invited', newParticipant(participant))];
            expect(errorsExpected).toEqual(errorsSaved);
        });
    });

    
});
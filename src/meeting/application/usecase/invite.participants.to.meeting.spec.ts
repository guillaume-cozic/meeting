import { Test, TestingModule } from "@nestjs/testing";
import Meeting from "./../../domain/meeting";
import { MeetingRepository, MEETING_REPOSITORY } from "./../../domain/ports/meeting.repository";
import { MeetingRepositoryProvider } from "../providers/provider";
import { InviteParticipantsToMeeting } from "./invite.participants.to.meeting";
import { DomainError } from "./../../../shared/Domain/Error";
import { ConfigModule } from '@nestjs/config';

describe('invite participants to meeting', () => {
    let inviteParticipantsToMeeting:InviteParticipantsToMeeting;
    let meetingRepository:MeetingRepository;
    let now:number = Date.now();

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            imports: [ConfigModule.forRoot()],
            providers: [MeetingRepositoryProvider, InviteParticipantsToMeeting],
          }).compile();
        inviteParticipantsToMeeting = app.get(InviteParticipantsToMeeting);
        meetingRepository = app.get(MEETING_REPOSITORY);
    })

    describe('should not invite participants', () => {
        it('meeting not found', async () => {
            try{
                await inviteParticipantsToMeeting.execute('1', []);
                expect(false).toEqual(true);
            }catch(error){
                expect(error).toEqual('meeting not found');
            }
        });
    })

    describe('should invite participants', () => {

        it('should invite one participant', async () => {
            let participants:Array<Object> = new Array<Object>();
            const participant = {name:'name', firstname: 'firstname', email: 'test@example.com'};
            participants.push(participant);

            let meetingScheduled:Meeting = new Meeting('123456', now, 'name'); 
            meetingRepository.save(meetingScheduled);

            await inviteParticipantsToMeeting.execute('123456', participants);

            let meetingExpected:Meeting = new Meeting('123456', now, 'name', null, participants); 
            let meetingSaved:Meeting = await meetingRepository.get('123456'); 
            expect(meetingSaved).toEqual(meetingExpected);
        });
    });

    describe('should not invite participant', () => {
        it('should not invite participant twice', async () => {
            const participant = {name:'name', firstname: 'firstname', email: 'p1@example.com'};
            const participant2 = {name:'name', firstname: 'firstname', email: 'p2@example.com'};
            const participant3 = {name:'name', firstname: 'firstname', email: 'p3@example.com'};

            let meetingScheduled:Meeting = new Meeting('123456', now, 'name', null, [participant, participant2]); 
            meetingRepository.save(meetingScheduled);

            let errorsSaved:Array<DomainError> = await inviteParticipantsToMeeting.execute('123456', [participant3, participant]);

            let errorsExpected:Array<DomainError> = [new DomainError('participant already invited', participant)];
            expect(errorsExpected).toEqual(errorsSaved);

            let meetingExpected:Meeting = new Meeting('123456', now, 'name', null, [participant, participant2, participant3]); 
            let meetingSaved:Meeting = await meetingRepository.get('123456'); 
            expect(meetingSaved).toEqual(meetingExpected);
        });
    });

    
});
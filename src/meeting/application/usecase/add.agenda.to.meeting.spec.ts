import { Test, TestingModule } from "@nestjs/testing";
import Meeting from "./../../domain/meeting";
import { MeetingRepositoryProvider } from "../providers/provider";
import { AddAgendaToMeeting } from "./add.agenda.to.meeting";
import { MeetingRepository, MEETING_REPOSITORY } from "./../../domain/ports/meeting.repository";
import { Agenda } from "./../../domain/agenda";
import { Item } from "./../../domain/item";
import { ConfigModule } from '@nestjs/config';

describe('Add agenda meeting', () => {
    let addAgendaToMeeting:AddAgendaToMeeting;
    let meetingRepository:MeetingRepository; 
    let now:number;

    beforeEach(async() => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            imports: [ConfigModule.forRoot()],
            providers: [MeetingRepositoryProvider, AddAgendaToMeeting],
          }).compile();

        addAgendaToMeeting = app.get(AddAgendaToMeeting);
        meetingRepository = app.get(MEETING_REPOSITORY);

        now = Date.now();
        let meeting:Meeting = new Meeting('123456', now, 'meeting name');
        meetingRepository.save(meeting);
    })

    describe('should add agenda to meeting', () => {
        it('with items', async () => {
            let items:Array<string> = ['point 1', 'point 2']
            addAgendaToMeeting.execute('123456', items, []);
        
            let itemsExpected:Array<Item> = [new Item('p01', 'point 1'), new Item('p02', 'point 2')];
            let meetingExpected:Meeting = new Meeting('123456', now, 'meeting name', new Agenda(itemsExpected)); 
            let meetingSaved:Meeting = await meetingRepository.get('123456');
            expect(meetingSaved).toEqual(meetingExpected); 
        });

        it('with stats', async () => {
            let stats:Array<string> = ['chiffre 1', 'chiffre 2'];

            addAgendaToMeeting.execute('123456', [], stats);

            let meetingExpected:Meeting = new Meeting('123456', now, 'meeting name', new Agenda([], stats)); 
            let meetingSaved:Meeting = await meetingRepository.get('123456');
            expect(meetingSaved).toEqual(meetingExpected); 
        });
    });

    describe('should not add agenda to meeting', () => {
        it('meeting does not exists', async() => {
            try{
                await addAgendaToMeeting.execute('123424246', [], []);
                expect(false).toEqual(true);
            }catch(e){
                expect(true).toEqual(true);
            }
        });
    });
})
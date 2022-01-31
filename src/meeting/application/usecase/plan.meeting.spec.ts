import Meeting from "../../domain/meeting";
import { PlanMeeting } from "./plan.meeting";
import { MeetingRepository, MEETING_REPOSITORY } from "../../domain/ports/meeting.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { MeetingRepositoryProvider } from "../providers/provider";
import { DateTimeGatewayProvider } from "../../../shared/provider/datetime.gateway.provider";
import { DateTimeGateway, DATE_TIME_GATEWAY } from "../../../shared/datetime.gateway";
import { ConfigModule, ConfigService } from '@nestjs/config';


describe('plan a meeting', () => {
    let planMeeting: PlanMeeting;
    let meetingRepository: MeetingRepository;
    let dateTimeGateway: DateTimeGateway; 

    beforeEach(async () => {

        const app: TestingModule = await Test.createTestingModule({
          controllers: [],
          imports: [ConfigModule.forRoot()],
          providers: [MeetingRepositoryProvider, PlanMeeting, DateTimeGatewayProvider],
        }).compile();
    
        meetingRepository = app.get<MeetingRepository>(MEETING_REPOSITORY);
        planMeeting = app.get<PlanMeeting>(PlanMeeting);
        dateTimeGateway = app.get<DateTimeGateway>(DATE_TIME_GATEWAY);
        
        let dateMeeting:Date = new Date();
        dateMeeting.setTime(Date.now()+86400);
        dateTimeGateway.setTime(dateMeeting);
      });

    describe('should plan a meeting', () => {
        it('', async () => {
            let dateMeeting:number = dateTimeGateway.current().getTime();
            let nameMeeting:string = 'name'; 

            await planMeeting.execute('meeting_id', dateMeeting, nameMeeting);

            let meeting = await meetingRepository.get('meeting_id');
            expect(meeting).toEqual(new Meeting('meeting_id', dateMeeting, nameMeeting));
        });
    });

    describe('should not plan a meeting', () => {
        it('meeting is already planned', async() => {
            try{
                await meetingRepository.save(new Meeting('meeting_id', Date.now(), 'name'));
                await planMeeting.execute('meeting_id', Date.now(), 'name');
                expect(false).toEqual(true);
            }catch(error){
                expect(error).toEqual('id already exist');
            }
        });

        it('date in the past', async() => {
            try{
                await planMeeting.execute('meeting_id', Date.now() - 100, 'name');
                expect(false).toEqual(true);
            }catch(error){
                expect(error).toEqual('date in the past');
            }
        });
    });
});
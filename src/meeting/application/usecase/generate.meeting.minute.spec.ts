import { Test, TestingModule } from "@nestjs/testing";
import Meeting from "./../../domain/meeting";
import { MeetingRepository, MEETING_REPOSITORY } from "./../../domain/ports/meeting.repository";
import { MeetingRepositoryProvider } from "../providers/provider";
import { GenerateMeetingReport } from "./generate.meeting.report";
import { ConfigModule } from '@nestjs/config';

describe('generate meeting minute', () => {
    let generateMeetingReport:GenerateMeetingReport;
    let meetingRepository:MeetingRepository;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            imports: [ConfigModule.forRoot()],
            providers: [GenerateMeetingReport, MeetingRepositoryProvider],
          }).compile();

        generateMeetingReport = app.get(GenerateMeetingReport); 
        meetingRepository = app.get(MEETING_REPOSITORY);
    });

    describe('should not generate meeting report', () => {
        it('meeting not found', async () => { 
            try{
                await generateMeetingReport.execute('123456');
                fail();
            }catch(error){
                expect(error).toEqual('meeting not found');
            }
        });
        
        it('agenda items is empty', async () => {
            let meeting:Meeting = new Meeting('123456', Date.now(), 'name');
            meetingRepository.save(meeting);

            let report = await generateMeetingReport.execute('123456');
            expect(report).toHaveLength(0);
        });
    });
});
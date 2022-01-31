import { Test, TestingModule } from "@nestjs/testing";
import { MeetingRepositoryProvider } from "../../application/providers/provider";
import Meeting from "../../domain/meeting";
import { MeetingRepository, MEETING_REPOSITORY } from "../../domain/ports/meeting.repository";
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingEntity } from "./entity/meeting.entity";
import { ConfigModule } from "@nestjs/config";


describe('Should save meeting', () => {
    let meetingRepository: MeetingRepository;
    let app:TestingModule; 

    beforeAll(async () => {
         app = await Test.createTestingModule({
          imports: [TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'meeting',
            password: 'azertyui',
            database: 'meeting',
            synchronize: false,
            entities: [MeetingEntity]
          }), ConfigModule.forRoot()],  
          controllers: [],
          providers: [MeetingRepositoryProvider],
        }).compile();
    
        meetingRepository = app.get<MeetingRepository>(MEETING_REPOSITORY);
    });


    afterAll(async () => {
        await app.close();
    });

    it('should save a meeting and retrieve it', async () => {
        let date:Date = new Date;
        date.setMilliseconds(0);
        let meetingToSave:Meeting = new Meeting('meeting_id', date.getTime(), 'name')
        await meetingRepository.save(meetingToSave);

        let meetingSaved:Meeting = await meetingRepository.get('meeting_id');

        expect(meetingSaved).toEqual(meetingToSave);
    });

    it('should not get a meeting when meeting does not exist', async () => {
        let meetingSaved:Meeting = await meetingRepository.get('azertyui');
        expect(meetingSaved).toBeUndefined();
    });
});

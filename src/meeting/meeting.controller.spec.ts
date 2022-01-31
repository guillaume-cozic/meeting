import { Test, TestingModule } from '@nestjs/testing';
import { MeetingRepositoryProvider } from './application/providers/provider';
import { PlanMeeting } from './application/usecase/plan.meeting';
import { MeetingController } from './meeting.controller';


describe('MeetingController', () => {
  let meetingController: MeetingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MeetingController],
      providers: [PlanMeeting,  MeetingRepositoryProvider],
    }).compile();

    meetingController = app.get<MeetingController>(MeetingController);
  });

  it('', async () => {
      expect(true).toEqual(true);
  });
});

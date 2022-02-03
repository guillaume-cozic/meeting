import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MeetingRepositoryProvider } from '../providers/provider';
import { PlanMeeting } from '../usecase/plan.meeting';
import { MeetingController } from './meeting.controller';
import * as request from 'supertest';
import { GetMeeting } from '../query/get.meeting';
import { InviteParticipantsToMeeting } from '../usecase/invite.participants.to.meeting';

describe('MeetingController', () => {
  let app: INestApplication;


  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [MeetingController],
      providers: [GetMeeting, PlanMeeting, InviteParticipantsToMeeting,  MeetingRepositoryProvider],
    })
    .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('retrieve a meeting', () => {
    it('should not get a meeting when it does not exist', async () => {
      const getMeeting = await app.resolve(GetMeeting);
      jest.spyOn(getMeeting, 'execute').mockImplementation(jest.fn(() => undefined));

      return request(app.getHttpServer())
        .get('/meeting/123456')
        .expect(404);
    });

    it('should not get a meeting when it does not exist', async () => {
      const getMeeting = await app.resolve(GetMeeting);
      let meeting = {id:123, date:123, title:123, agenda:null, participants:[], actions:[]};
      let promise = Promise.resolve(meeting)
      jest.spyOn(getMeeting, 'execute').mockImplementation(() => promise);


        return await request(app.getHttpServer())
        .get('/meeting/123456')
        .expect(200)
        .expect(meeting);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

import { Module } from '@nestjs/common';
import { MeetingController} from './application/http/meeting.controller';
import { PlanMeeting } from './application/usecase/plan.meeting';
import { MeetingRepositoryProvider } from './application/providers/provider';
import { GenerateMeetingReport } from './application/usecase/generate.meeting.report';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetMeeting } from './application/query/get.meeting';
import { InviteParticipantsToMeeting } from './application/usecase/invite.participants.to.meeting';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [MeetingController],
  providers: [MeetingRepositoryProvider, PlanMeeting, GenerateMeetingReport, GetMeeting, InviteParticipantsToMeeting],
})
export class MeetingModule {}
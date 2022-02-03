import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res, UseFilters } from '@nestjs/common';
import { PlanMeeting } from '../usecase/plan.meeting';
import { v4 as uuid } from 'uuid';
import { Request, Response } from "express";
import { GetMeeting } from '../query/get.meeting';
import { InviteParticipantsToMeeting } from '../usecase/invite.participants.to.meeting';
import { PlanMeetingDto } from './plan.meeting.dto';
import { InviteParticipantsDto } from './invite.participants.dto';
import { NotFoundExceptionFilter } from 'src/shared/application/not.found.exception.filter';

@Controller('/meeting')
export class MeetingController {

  constructor(
    private readonly planMeeting:PlanMeeting,
    private readonly getMeeting:GetMeeting,
    private readonly inviteParticipants:InviteParticipantsToMeeting,
  ) {}

  @Post('plan')
  async planMeetingRoute(@Body() planMeetingDto:PlanMeetingDto, @Res() res: Response, @Req() req: Request): Promise<Response> {
    try{
      let id:string = uuid();
      await this.planMeeting.execute(id, planMeetingDto.date, planMeetingDto.name);
      return res.status(HttpStatus.CREATED).send({id:id, uri: 'http://'+req.hostname+':3000/meeting/'+id});
    }catch(error){
      return res.status(HttpStatus.EXPECTATION_FAILED).send(error);
    }
  }

  @Get(':id')
  @UseFilters(new NotFoundExceptionFilter())
  async getMeetingRoute(@Param('id') id: string, @Res() res: Response):Promise<Response>{
    let meetingVo = await this.getMeeting.execute(id);
    return res.status(HttpStatus.OK).send(meetingVo);
  }

  @Put(':id/invite/participants')
  @UseFilters(new NotFoundExceptionFilter())
  async inviteParticipantsRoute(@Param('id') id: string, @Body() inviteParticipantsDto:InviteParticipantsDto, @Res() res: Response, @Req() req: Request): Promise<Response> {
      let errors = await this.inviteParticipants.execute(id, inviteParticipantsDto.participants);
      return res.status(HttpStatus.OK).send({id:id, uri: 'http://'+req.hostname+':3000/meeting/'+id, errors:errors});
  }
}
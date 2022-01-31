import { Controller, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { PlanMeeting } from './application/usecase/plan.meeting';
import { v4 as uuid } from 'uuid';
import { Request, Response } from "express";
import { GetMeeting } from './application/query/get.meeting';
import { InviteParticipantsToMeeting } from './application/usecase/invite.participants.to.meeting';

@Controller('/meeting')
export class MeetingController {

  constructor(
    private readonly planMeeting:PlanMeeting,
    private readonly getMeeting:GetMeeting,
    private readonly inviteParticipants:InviteParticipantsToMeeting,
  ) {}

  @Post('plan')
  async planMeetingRoute(@Res() res: Response, @Req() req: Request): Promise<Response> {
    try{
      let id:string = uuid();
      await this.planMeeting.execute(id, Date.now() + 86400*1000, 'name of the meeting');
      return res.status(HttpStatus.CREATED).send({id:id, uri: 'http://'+req.hostname+':3000/meeting/'+id});
    }catch(error){
      return res.status(HttpStatus.EXPECTATION_FAILED).send(error);
    }
  }

  @Get(':id')
  async getMeetingRoute(@Param('id') id: string, @Res() res: Response):Promise<Response>{
    let meetingVo = await this.getMeeting.execute(id);
    if(meetingVo === undefined){
      return res.status(HttpStatus.NOT_FOUND).send('not found');
    }
    return res.status(HttpStatus.OK).send(meetingVo);
  }

  @Put(':id/invite/participants')
  async inviteParticipantsRoute(@Param('id') id: string, @Res() res: Response, @Req() req: Request): Promise<Response> {
    try{
      let errors = await this.inviteParticipants.execute(id, [{email:'g@gmail.com', firstname: 'firstname', lastname: 'lastname'}] );
      return res.status(HttpStatus.OK).send({id:id, uri: 'http://'+req.hostname+':3000/meeting/'+id, errors:errors});
    }catch(error){
      return res.status(HttpStatus.EXPECTATION_FAILED).send(error);
    }
  }
}
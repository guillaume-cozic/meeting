import { Inject } from "@nestjs/common";
import { MeetingNotFound } from "src/meeting/domain/exception/meeting.not.found";
import { MeetingVo } from "src/meeting/domain/vo/meeting.vo";
import { MeetingRepository, MEETING_REPOSITORY } from "./../../domain/ports/meeting.repository";

export class GetMeeting{
    constructor(
        @Inject(MEETING_REPOSITORY) private readonly meetingRepository:MeetingRepository
    ){}

    async execute(id:string):Promise<MeetingVo>{
        let vo:MeetingVo = await this.meetingRepository.getVo(id);
        if(vo === undefined){
            throw new MeetingNotFound('Meeting : '+ id + ' not found');
        }
        vo.actions = [...vo.actions, 'invite_participant'];
        if(vo.agenda === null){
            vo.actions = [...vo.actions, 'add_agenda'];
        }
        return vo;
    }
}
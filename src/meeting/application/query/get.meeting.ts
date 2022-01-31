import { Inject } from "@nestjs/common";
import { MeetingRepository, MEETING_REPOSITORY } from "src/meeting/domain/ports/meeting.repository";

export class GetMeeting{
    constructor(
        @Inject(MEETING_REPOSITORY) private readonly meetingRepository:MeetingRepository
    ){}

    async execute(id:string):Promise<{id, date, title, agenda, participants, actions}>{
        let vo:{id, date, title, agenda, participants, actions} = await this.meetingRepository.getVo(id);
        if(vo === undefined){
            return undefined;
        }
        vo.actions = [...vo.actions, 'invite_participant'];
        if(vo.agenda === null){
            vo.actions = [...vo.actions, 'add_agenda'];
        }
        return vo;
    }
}
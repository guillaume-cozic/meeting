import { Inject, Injectable } from "@nestjs/common";
import { MeetingRepository, MEETING_REPOSITORY } from "../../domain/ports/meeting.repository";
import Meeting from "../../domain/meeting";

@Injectable()
export class PlanMeeting{

    constructor(
        @Inject(MEETING_REPOSITORY) private meetingRepository: MeetingRepository
    ){}
    
    async execute(id:string, dateMeeting:number, nameMeeting:string):Promise<void>{
        await this.checkIfMeetingAlreadyRegistered(id);
        let newMeeting:Meeting = new Meeting(id, dateMeeting, nameMeeting);
        newMeeting.plan(this.meetingRepository);
    }

    private async checkIfMeetingAlreadyRegistered(id: string):Promise<void> {
        let meeting: Meeting = await this.meetingRepository.get(id);
        if (meeting !== undefined) throw 'id already exist';
    }
}
import Meeting from "./../../domain/meeting";
import { MeetingRepository } from "./../../domain/ports/meeting.repository";
import { MeetingEntity } from "./entity/meeting.entity";
import {Connection, getRepository} from 'typeorm';


import { Injectable } from "@nestjs/common";
import { MeetingVo } from "src/meeting/domain/vo/meeting.vo";

@Injectable()
export class SqlMeetingRepository implements MeetingRepository{
    
    constructor(private connection: Connection) {}

    async get(id: string): Promise<Meeting> {
        const entity = await getRepository(MeetingEntity).findOne({where : {uuid:id}});
        return entity?.toDomain();
    }

    async save(meeting: Meeting): Promise<void> {
        let meetingEntity:MeetingEntity = await getRepository(MeetingEntity).findOne({where : {uuid:meeting.getId()}});

        if(meetingEntity !== undefined){
            meetingEntity.merge(meeting.memento());
        }else{
            meetingEntity = MeetingEntity.fromMemento(meeting.memento());
        }

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.save(meetingEntity);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    async getVo(id: string): Promise<MeetingVo> {
        const entity = await getRepository(MeetingEntity).findOne({where : {uuid:id}});
        return entity?.toVo();
    }

}
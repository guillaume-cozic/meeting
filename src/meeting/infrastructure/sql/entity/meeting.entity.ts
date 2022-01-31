import Meeting from './../../../domain/meeting';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'meeting'})
export class MeetingEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 200 })
    title: string;

    @Column({ unique: true })
    uuid: string;

    @Column("datetime")
    date: Date;

    @Column({type :"json", default: null})
    agenda;

    @Column({type :"json", default: null})
    participants;

    merge(memento:{id, name, date, agenda, participants}){
        let date:Date = new Date();
        date.setTime(memento.date);
        date.setMilliseconds(0);
        this.uuid = memento.id;
        this.title = memento.name;
        this.date = date;
        this.agenda = memento.agenda;
        this.participants = memento.participants;
    }

    static fromMemento(memento:{id, name, date, agenda, participants}):MeetingEntity{
        let entity:MeetingEntity = new MeetingEntity();
        let date:Date = new Date();
        date.setTime(memento.date);
        date.setMilliseconds(0);
        entity.uuid = memento.id;
        entity.title = memento.name;
        entity.date = date;
        entity.agenda = memento.agenda;
        entity.participants = memento.participants;
        return entity;
    }

    toDomain():Meeting{
        this.date.setMilliseconds(0);
        return new Meeting(this.uuid, this.date.getTime(), this.title, this.agenda, this.participants);
    }

    toVo():{id, date, title, agenda, participants, actions}{
        return {
            id: this.uuid,
            date: this.date,
            title: this.title,
            agenda: this.agenda,
            participants: this.participants,
            actions: []
        }
    }
}
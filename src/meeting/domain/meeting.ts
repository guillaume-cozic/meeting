import { DomainError } from "./../../shared/Domain/Error";
import { Agenda } from "./agenda";
import { Item } from "./item";
import { MeetingRepository } from "./ports/meeting.repository";

export default class Meeting {
    
    constructor(
        private id:string,
        private date:number,
        private name:string,
        private agenda:Agenda = null,
        private participants:Array<Object> = []
    ){}

    getId():string{
        return this.id;
    }

    plan(meetingRepository:MeetingRepository):void{
        if(this.date < Date.now()){
            throw 'date in the past';
        }
        meetingRepository.save(this);
    }

    addAgenda(items:Array<String>, stats:Array<string>, meetingRepository:MeetingRepository){
        let itemsToAdd:Array<Item> = [];
        items.forEach((item:string, key:number) => {
            itemsToAdd = [...itemsToAdd, new Item('p0' + (key + 1), item)];
        });
        this.agenda = items.length > 0 || stats.length > 0 ? new Agenda(itemsToAdd, stats) : null;
        meetingRepository.save(this);
    }

    inviteParticipants(participantsToInvite:Array<Object>, meetingRepository:MeetingRepository):Array<DomainError>{
        let errors:Array<DomainError> = [];
        participantsToInvite.forEach((participant) => {
            if(this.isParticipantAlreadyInvited(participant)){
                errors.push(new DomainError('participant already invited', participant));
                return;
            }
            this.participants = [...this.participants, participant];    
        })    
        meetingRepository.save(this);
        return errors;
    }

    private isParticipantAlreadyInvited(participant: Object):Boolean {
        return typeof this.participants.find(e => e['email'] === participant['email']) !== "undefined";
    }

    memento():{id, name, date, agenda, participants}{
        return {
            id:this.id,
            name:this.name,
            date:this.date,
            agenda:this.agenda,
            participants:this.participants,
        }
    }
}
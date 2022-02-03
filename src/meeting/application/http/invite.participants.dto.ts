import { IsNotEmpty, ValidateNested } from "class-validator";
import { ParticipantDto } from "./participant.dto";

export class InviteParticipantsDto {
    @IsNotEmpty()
    id: String;

    @ValidateNested()
    participants: ParticipantDto[];
}
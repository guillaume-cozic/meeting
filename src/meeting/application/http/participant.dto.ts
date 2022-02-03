import { IsEmail, IsNotEmpty } from "class-validator";

export class ParticipantDto {
    @IsNotEmpty()
    firstname: String;

    @IsNotEmpty()
    lastname: String;

    @IsEmail()
    @IsNotEmpty()
    email: String;
}
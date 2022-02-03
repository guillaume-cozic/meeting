import { IsNotEmpty } from "class-validator";

export class PlanMeetingDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    date: number;
}
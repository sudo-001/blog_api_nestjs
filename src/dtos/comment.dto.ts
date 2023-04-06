import { ApiProperty } from "@nestjs/swagger";

export class CommentDto {

    @ApiProperty()
    message: string;
}
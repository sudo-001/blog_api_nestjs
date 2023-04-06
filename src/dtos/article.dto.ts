import { ApiProperty } from "@nestjs/swagger";

export class ArticleDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    body: string;
}
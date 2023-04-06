import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ArticleEntity } from "./article.entity";

@Entity('tags')
export class TagEntity {
    @PrimaryGeneratedColumn({ name: 'tag_id'})
    id: number;

    @Column('text')
    name: string;

    @ManyToMany(type => ArticleEntity)
    articles: ArticleEntity[];

}
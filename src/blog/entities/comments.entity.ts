import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ArticleEntity } from "./article.entity";

@Entity('comments')
export class CommentEntity {

    @PrimaryGeneratedColumn({name: 'comments_id'})
    id: number;

    @Column('text')
    message: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(type => ArticleEntity, article => article.comments, { onDelete: 'CASCADE'})
    article: ArticleEntity;
    
}

import { CommentEntity } from './comments.entity';
import { TagEntity } from './tag.entity';
export declare class ArticleEntity {
    id: number;
    title: string;
    body: string;
    createdAt: Date;
    published: boolean;
    likes: number;
    comments: CommentEntity[];
    tags: TagEntity[];
}

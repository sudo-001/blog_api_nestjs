import { ArticleEntity } from "./article.entity";
export declare class CommentEntity {
    id: number;
    message: string;
    createdAt: Date;
    article: ArticleEntity;
}

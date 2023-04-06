import { ArticleDto } from 'src/dtos/article.dto';
import { CommentDto } from 'src/dtos/comment.dto';
import { BlogService } from './blog.service';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    getAll(limit?: number, offset?: number): Promise<import("./entities/article.entity").ArticleEntity[]>;
    getOne(id: string): Promise<import("./entities/article.entity").ArticleEntity>;
    update(id: string, atcicleDto: ArticleDto): Promise<any>;
    create(articleDto: ArticleDto): Promise<ArticleDto & import("./entities/article.entity").ArticleEntity>;
    delete(id: string): Promise<import("./entities/article.entity").ArticleEntity>;
    addComment(articleId: string, comment: CommentDto): Promise<import("./entities/comments.entity").CommentEntity>;
    addTag(name: string): Promise<import("./entities/tag.entity").TagEntity>;
    tagArticle(articleId: string, tagId: string): Promise<import("./entities/article.entity").ArticleEntity>;
}

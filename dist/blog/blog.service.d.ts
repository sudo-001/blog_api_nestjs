import { ArticleDto } from 'src/dtos/article.dto';
import { CommentDto } from 'src/dtos/comment.dto';
import { Repository } from 'typeorm';
import { ArticleEntity } from './entities/article.entity';
import { CommentEntity } from './entities/comments.entity';
import { TagEntity } from './entities/tag.entity';
export declare class BlogService {
    private readonly articlesRepository;
    private readonly commentsRepository;
    private readonly tagRepository;
    constructor(articlesRepository: Repository<ArticleEntity>, commentsRepository: Repository<CommentEntity>, tagRepository: Repository<TagEntity>);
    findAll(limit: number, offset: number): Promise<ArticleEntity[]>;
    findOne(id: number): Promise<ArticleEntity>;
    createArticle(articleDto: ArticleDto): Promise<ArticleDto & ArticleEntity>;
    updateArticle(id: number, articleDto: ArticleDto): Promise<any>;
    remove(id: number): Promise<ArticleEntity>;
    addComment(articleId: number, commentDto: CommentDto): Promise<CommentEntity>;
    addTag(tagName: string): Promise<TagEntity>;
    tagArticle(articleId: any, tagId: any): Promise<ArticleEntity>;
}

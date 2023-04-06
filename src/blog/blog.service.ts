import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleDto } from 'src/dtos/article.dto';
import { CommentDto } from 'src/dtos/comment.dto';
import { Repository } from 'typeorm';
import { ArticleEntity } from './entities/article.entity';
import { CommentEntity } from './entities/comments.entity';
import { TagEntity } from './entities/tag.entity';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articlesRepository: Repository<ArticleEntity>,
        @InjectRepository(CommentEntity)
        private readonly commentsRepository: Repository<CommentEntity>,
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>
    ) {}

    findAll(limit: number, offset: number) {
        return this.articlesRepository.find({ 
            skip: offset,
            take: limit,
            relations: ['comments', 'tags']
        });
    }

    async findOne(id: number) {
        const article = await this.articlesRepository.findOneBy({id: id});
        if (article)
            return article;
        return null;
    }

    async createArticle(articleDto: ArticleDto) {
        const article = await this.articlesRepository.save(articleDto);
        return article;
    }

    async updateArticle(id: number, articleDto: ArticleDto) {
        const article = await  this.articlesRepository.findOneBy({id: id});

        if (!article)
            return null;
        // Si on est icic c'est qu'on a trouvé l'article 
        // On attend qu'il soit mis à jour
        await this.articlesRepository.update(id, articleDto);
    }

    async remove(id: number) {
        const article = await this.articlesRepository.findOneBy({id: id});

        if (!article)
            return null;
        
        // Le fait qu'on soit entrain de supprimer un article nous laisse la possibilité d'enlever le await    
        this.articlesRepository.remove(article);

        return article;
    }

    // Ajouter un commentaire
   async addComment(articleId: number, commentDto: CommentDto) {
    const article = await this.articlesRepository.findOneBy({ id: articleId });

    if(!article)
        return null;
        
    const comment = new CommentEntity();
    comment.message = commentDto.message;
    comment.article = article;
    return this.commentsRepository.save(comment);
   }

   async addTag(tagName: string) {
    let tmpTag = new TagEntity();

    tmpTag.name = tagName;
    const tag = await this.tagRepository.save(tmpTag)

    if (tag)
        return tag;
    return null
   }

   async tagArticle(articleId, tagId) {
    const article = await this.articlesRepository.findOne({where: {id: articleId}, relations: ['tags', 'comments']});

    if (!article)
        return null;
    
    const tag = await this.tagRepository.findOneBy({id: tagId});

    if (!tag)
        return null;
    
    
    article.tags.push(tag);
    await this.articlesRepository.save(article);
    return this.articlesRepository.findOne({
        where: { id: articleId},
        relations: ['tags', 'comments']
    })
    
   }
}

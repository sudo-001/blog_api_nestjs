"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("./entities/article.entity");
const comments_entity_1 = require("./entities/comments.entity");
const tag_entity_1 = require("./entities/tag.entity");
let BlogService = class BlogService {
    constructor(articlesRepository, commentsRepository, tagRepository) {
        this.articlesRepository = articlesRepository;
        this.commentsRepository = commentsRepository;
        this.tagRepository = tagRepository;
    }
    findAll(limit, offset) {
        return this.articlesRepository.find({
            skip: offset,
            take: limit,
            relations: ['comments', 'tags']
        });
    }
    async findOne(id) {
        const article = await this.articlesRepository.findOneBy({ id: id });
        if (article)
            return article;
        return null;
    }
    async createArticle(articleDto) {
        const article = await this.articlesRepository.save(articleDto);
        return article;
    }
    async updateArticle(id, articleDto) {
        const article = await this.articlesRepository.findOneBy({ id: id });
        if (!article)
            return null;
        await this.articlesRepository.update(id, articleDto);
    }
    async remove(id) {
        const article = await this.articlesRepository.findOneBy({ id: id });
        if (!article)
            return null;
        this.articlesRepository.remove(article);
        return article;
    }
    async addComment(articleId, commentDto) {
        const article = await this.articlesRepository.findOneBy({ id: articleId });
        if (!article)
            return null;
        const comment = new comments_entity_1.CommentEntity();
        comment.message = commentDto.message;
        comment.article = article;
        return this.commentsRepository.save(comment);
    }
    async addTag(tagName) {
        let tmpTag = new tag_entity_1.TagEntity();
        tmpTag.name = tagName;
        const tag = await this.tagRepository.save(tmpTag);
        if (tag)
            return tag;
        return null;
    }
    async tagArticle(articleId, tagId) {
        const article = await this.articlesRepository.findOne({ where: { id: articleId }, relations: ['tags', 'comments'] });
        if (!article)
            return null;
        const tag = await this.tagRepository.findOneBy({ id: tagId });
        if (!tag)
            return null;
        article.tags.push(tag);
        await this.articlesRepository.save(article);
        return this.articlesRepository.findOne({
            where: { id: articleId },
            relations: ['tags', 'comments']
        });
    }
};
BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.ArticleEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(comments_entity_1.CommentEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(tag_entity_1.TagEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map
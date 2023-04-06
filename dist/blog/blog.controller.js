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
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const article_dto_1 = require("../dtos/article.dto");
const comment_dto_1 = require("../dtos/comment.dto");
const blog_service_1 = require("./blog.service");
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    getAll(limit = 10, offset = 0) {
        return this.blogService.findAll(limit, offset);
    }
    async getOne(id) {
        const article = await this.blogService.findOne(parseInt(id));
        if (article)
            return article;
        throw new common_1.HttpException("Object not found", common_1.HttpStatus.NOT_FOUND);
    }
    async update(id, atcicleDto) {
        const article = await this.blogService.updateArticle(parseInt(id), atcicleDto);
        if (article)
            return article;
        throw new common_1.HttpException("Not modified", common_1.HttpStatus.NOT_MODIFIED);
    }
    async create(articleDto) {
        const article = await this.blogService.createArticle(articleDto);
        if (article)
            return article;
        throw new common_1.HttpException("Can't create an article", common_1.HttpStatus.NOT_MODIFIED);
    }
    async delete(id) {
        const article = await this.blogService.remove(parseInt(id));
        if (article)
            return article;
        throw new common_1.HttpException("Not Found", common_1.HttpStatus.NOT_FOUND);
    }
    async addComment(articleId, comment) {
        const result = this.blogService.addComment(parseInt(articleId), comment);
        if (result)
            return result;
        throw new common_1.HttpException('Article Not Found', common_1.HttpStatus.NOT_FOUND);
    }
    async addTag(name) {
        const result = this.blogService.addTag(name);
        if (result)
            return result;
        throw new common_1.HttpException('Article Not Found', common_1.HttpStatus.NOT_FOUND);
    }
    async tagArticle(articleId, tagId) {
        const article = await this.blogService.tagArticle(parseInt(articleId), parseInt(tagId));
        if (article)
            return article;
        throw new common_1.HttpException('Not Modified', common_1.HttpStatus.NOT_MODIFIED);
    }
};
__decorate([
    (0, swagger_1.ApiQuery)({ name: 'limit' }),
    (0, swagger_1.ApiQuery)({ name: 'offset' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Afficher un article..." }),
    (0, swagger_1.ApiParam)({ name: "article_id" }),
    (0, common_1.Get)(':article_id'),
    __param(0, (0, common_1.Param)('article_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, article_dto_1.ArticleDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_dto_1.ArticleDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('/comment/:articleId'),
    __param(0, (0, common_1.Param)('articleId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, comment_dto_1.CommentDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "addComment", null);
__decorate([
    (0, common_1.Post)('/tag/:name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "addTag", null);
__decorate([
    (0, common_1.Patch)(':articleId/tag/:tagId'),
    __param(0, (0, common_1.Param)('articleId')),
    __param(1, (0, common_1.Param)('tagId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "tagArticle", null);
BlogController = __decorate([
    (0, common_1.Controller)('blog'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=blog.controller.js.map
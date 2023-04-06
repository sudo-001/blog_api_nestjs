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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleEntity = void 0;
const typeorm_1 = require("typeorm");
const comments_entity_1 = require("./comments.entity");
const tag_entity_1 = require("./tag.entity");
let ArticleEntity = class ArticleEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'article_id' }),
    __metadata("design:type", Number)
], ArticleEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ArticleEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'corps' }),
    __metadata("design:type", String)
], ArticleEntity.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ArticleEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ArticleEntity.prototype, "published", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ArticleEntity.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => comments_entity_1.CommentEntity, comment => comment.article),
    __metadata("design:type", Array)
], ArticleEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => tag_entity_1.TagEntity),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], ArticleEntity.prototype, "tags", void 0);
ArticleEntity = __decorate([
    (0, typeorm_1.Entity)('articles')
], ArticleEntity);
exports.ArticleEntity = ArticleEntity;
//# sourceMappingURL=article.entity.js.map
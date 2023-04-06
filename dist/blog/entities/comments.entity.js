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
exports.CommentEntity = void 0;
const typeorm_1 = require("typeorm");
const article_entity_1 = require("./article.entity");
let CommentEntity = class CommentEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'comments_id' }),
    __metadata("design:type", Number)
], CommentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], CommentEntity.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CommentEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => article_entity_1.ArticleEntity, article => article.comments, { onDelete: 'CASCADE' }),
    __metadata("design:type", article_entity_1.ArticleEntity)
], CommentEntity.prototype, "article", void 0);
CommentEntity = __decorate([
    (0, typeorm_1.Entity)('comments')
], CommentEntity);
exports.CommentEntity = CommentEntity;
//# sourceMappingURL=comments.entity.js.map
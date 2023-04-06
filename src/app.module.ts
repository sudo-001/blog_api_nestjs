import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { ArticleEntity } from './blog/entities/article.entity';
import { CommentEntity } from './blog/entities/comments.entity';
import { TagEntity } from './blog/entities/tag.entity';

@Module({
  imports: [
    BlogModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: null,
      database: 'blog_nest',
      entities: [ArticleEntity, CommentEntity, TagEntity],
      synchronize: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

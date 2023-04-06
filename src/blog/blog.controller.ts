import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ArticleDto } from 'src/dtos/article.dto';
import { CommentDto } from 'src/dtos/comment.dto';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {

  constructor(
    private readonly blogService: BlogService
  ) {}
  
  @ApiQuery({ name: 'limit'})
  @ApiQuery({ name: 'offset'})
  @Get()
  getAll(@Query('limit') limit = 10, @Query('offset') offset = 0) {
    return this.blogService.findAll(limit, offset);
  }
  
  // Lorsqu'une méthode retourne une promesse on utlise une fonction async/await
  @ApiOperation({summary: "Afficher un article..."})
  @ApiParam({name: "article_id"})
  @Get(':article_id')
  async getOne(@Param('article_id') id: string) {
    const article = await this.blogService.findOne(parseInt(id));
    if( article) 
      return article;
    throw new HttpException("Object not found", HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() atcicleDto: ArticleDto) {
    const article = await this.blogService.updateArticle(parseInt(id), atcicleDto);

    if(article) 
      return article;
    throw new HttpException("Not modified", HttpStatus.NOT_MODIFIED
    )
  }

  @Post()
  async create(@Body() articleDto:ArticleDto ) {
    // Logger.log('creation of a blog');
    const article = await this.blogService.createArticle(articleDto);

    if (article)
      return article;
    throw new HttpException("Can't create an article", HttpStatus.NOT_MODIFIED)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
  const article = await this.blogService.remove(parseInt(id));

  if (article)
    return article;
  throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
  }

  @Post('/comment/:articleId')
  async addComment(@Param('articleId') articleId: string, @Body() comment: CommentDto) {
    const result = this.blogService.addComment(parseInt(articleId), comment );

    if(result)
      return result;
    throw new HttpException('Article Not Found', HttpStatus.NOT_FOUND);
      
  }

  @Post('/tag/:name')
  async addTag(@Param('name') name: string) {
    const result = this.blogService.addTag(name);

    if(result)
      return result;
    throw new HttpException('Article Not Found', HttpStatus.NOT_FOUND);
      
  }

  @Patch(':articleId/tag/:tagId')
  async tagArticle(@Param('articleId') articleId: string, @Param('tagId') tagId: string) {
    const article = await this.blogService.tagArticle(parseInt(articleId), parseInt(tagId));

    if(article)
      return article;
    throw new HttpException('Not Modified', HttpStatus.NOT_MODIFIED);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/new')
  async createBook(@Body() bookDto: CreateBookDto) {
    return this.bookService.create(bookDto);
  }

  @Get()
  async getAllBooks() {
    return this.bookService.findAll();
  }

  @Get(':id')
  async getBookById(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }
  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() bookDto: UpdateBookDto) {
    return this.bookService.update(id, bookDto);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}

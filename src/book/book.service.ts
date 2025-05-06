import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(bookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(bookDto);
    return await this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async update(id: string, bookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book not found`);
    }
    Object.assign(book, bookDto);
    return await this.bookRepository.save(book);
  }

  async findOne(id: string): Promise<Book | null> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book not found`);
    }
    return book;
  }

  async remove(id: string): Promise<void> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book not found`);
    }
    await this.bookRepository.delete(id);
  }
}

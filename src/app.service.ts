/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './iris_chat.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Chat)
    private irischatRepository: Repository<Chat>,
  ) {}

  async createMessage(chat: Chat): Promise<Chat> {
    return await this.irischatRepository.save(chat);
  }

  async getMessages(): Promise<Chat[]> {
    return await this.irischatRepository.find();
  }
}

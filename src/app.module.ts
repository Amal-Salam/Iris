/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './iris_chat.entity';

@Module({
  imports: [
     ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres' ,
      host: process.env.PG_HOST,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [Chat],
      synchronize: true,
      ssl: true
    }),
    TypeOrmModule.forFeature([ Chat] ),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}

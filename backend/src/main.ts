import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { join } from 'path';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.use('/uploads', express.static(join(__dirname, 'post', 'creations')));
  app.useWebSocketAdapter(new IoAdapter(app));
  const server = await app.listen(8080);
  const io = new socketio.Server(server, { /* options */ });
  app.useWebSocketAdapter(new IoAdapter(io));
}
bootstrap();

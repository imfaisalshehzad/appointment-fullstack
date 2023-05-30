import {NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from "cookie-parser";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.use(cookieParser());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

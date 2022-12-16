import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

await NestFactory.createApplicationContext(AppModule);

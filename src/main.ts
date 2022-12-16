import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

(async function () {
  global.appBootstrap = NestFactory.createApplicationContext(AppModule);
})();

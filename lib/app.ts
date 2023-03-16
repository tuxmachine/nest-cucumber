import { INestApplicationContext, Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

let appPromise: Promise<INestApplicationContext>;

export function startApp(rootModule: Type) {
  appPromise = NestFactory.createApplicationContext(rootModule).catch(
    (error) => {
      console.error(error);
      process.exit(1);
    },
  );
  return appPromise;
}

export async function getApp() {
  return await appPromise;
}

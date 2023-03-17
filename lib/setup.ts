import * as Cucumber from '@cucumber/cucumber';
import { setWorldConstructor } from '@cucumber/cucumber';
import { Type } from '@nestjs/common';
import 'reflect-metadata';
import { getApp, startApp } from './app';
import { NestWorld } from './world';

export const bootstrap = (rootModule: Type) => {
  startApp(rootModule);
  setWorldConstructor(NestWorld);
  Cucumber.AfterAll(async () => {
    const app = await getApp();
    await app.close();
  });
};

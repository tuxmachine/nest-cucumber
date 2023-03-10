import { setWorldConstructor } from '@cucumber/cucumber';
import { Type } from '@nestjs/common';
import 'reflect-metadata';
import { startApp } from './app';
import { NestWorld } from './world';

export const bootstrap = (rootModule: Type) => {
  startApp(rootModule);
  setWorldConstructor(NestWorld);
};

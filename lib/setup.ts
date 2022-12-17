import { Before, BeforeStep, setWorldConstructor } from '@cucumber/cucumber';
import { Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { NestWorld } from './world';
import { INestApplicationContext } from '@nestjs/common';

declare global {
  /* eslint-disable-next-line no-var */
  var appBootstrap: Promise<INestApplicationContext>;
}

export const bootstrap = (rootModule: Type) => {
  global.appBootstrap = NestFactory.createApplicationContext(rootModule);

  setWorldConstructor(NestWorld);

  Before(async function (this: NestWorld) {
    await this.registerScenario();
  });

  BeforeStep(function (this: NestWorld, { gherkinDocument, pickle }) {
    this.info.feature = gherkinDocument.feature.name;
    this.info.scenario = pickle.name;
  });
};

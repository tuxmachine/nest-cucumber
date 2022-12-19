import { Before, BeforeStep, setWorldConstructor } from '@cucumber/cucumber';
import { INestApplicationContext, Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { NestWorld } from './world';

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
    const feature = gherkinDocument.feature.name;
    const scenario = pickle.name;
    this.setInfo(feature, scenario);
  });
};

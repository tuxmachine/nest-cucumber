import { Before, BeforeStep, setWorldConstructor } from '@cucumber/cucumber';
import { Type } from '@nestjs/common';
import 'reflect-metadata';
import { startApp } from './app';
import { NestWorld } from './world';

export const bootstrap = (rootModule: Type) => {
  startApp(rootModule);

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

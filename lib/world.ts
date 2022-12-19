import { IWorldOptions, World } from '@cucumber/cucumber';
import { ModuleRef } from '@nestjs/core';
import { getApp } from './app';

export class NestWorld extends World {
  public readonly contextId = { id: 1 };

  constructor(params: IWorldOptions) {
    super(params);
    this.registerScenario().catch((error) => {
      console.error('Error registering scenario with NestJS');
      console.error(error);
      process.exit(1);
    });
  }

  private async registerScenario() {
    const appModule = await getApp();
    const moduleRef = appModule.get(ModuleRef);
    moduleRef.registerRequestByContextId(this, this.contextId);
  }
}

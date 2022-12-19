import { World } from '@cucumber/cucumber';
import { ModuleRef } from '@nestjs/core';
import { once } from './utils';

export class NestWorld extends World {
  public readonly contextId = { id: 1 };
  public info = {
    feature: '',
    scenario: '',
  };

  public setInfo = once((feature: string, scenario: string) => {
    Object.assign(this.info, { feature, scenario });
  });

  public async registerScenario() {
    const appModule = await global.appBootstrap;
    const moduleRef = appModule.get(ModuleRef);
    moduleRef.registerRequestByContextId(this, this.contextId);
  }
}

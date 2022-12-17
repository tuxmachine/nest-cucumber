import { World } from '@cucumber/cucumber';
import { Scope, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { once } from './utils';

export class NestWorld extends World {
  private readonly contextId = { id: 1 };
  public info = {
    feature: '',
    scenario: '',
  };

  public setInfo = once((feature: string, scenario: string) => {
    Object.assign(this.info, { feature, scenario });
  });

  public async callHandler<T extends Type>(
    cls: T,
    method: keyof T,
    args: unknown[],
  ) {
    const appModule = await global.appBootstrap;
    const moduleRef = appModule.get(ModuleRef);
    const isStatic = moduleRef.introspect(cls as Type).scope === Scope.DEFAULT;
    if (isStatic) {
      const instance = appModule.get(cls as Type);
      return instance[method](...args);
    } else {
      const instance = await appModule.resolve(cls, this.contextId);
      return instance[method](...args);
    }
  }

  public async registerScenario() {
    const appModule = await global.appBootstrap;
    const moduleRef = appModule.get(ModuleRef);
    moduleRef.registerRequestByContextId(this, this.contextId);
  }
}

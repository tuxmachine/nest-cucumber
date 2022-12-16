import { applyDecorators, Injectable, Type, SetMetadata } from '@nestjs/common';
import 'reflect-metadata';
import { CUCUMBER_SUITE } from './cucumber.constants';
import * as Cucumber from '@cucumber/cucumber';

const genericHandler = <T extends object>(cls: T, method: keyof T) => {
  return async function (...args: unknown[]) {
    const appModule = await global.appBootstrap;
    const instance = appModule.get(cls as Type);
    return instance[method](...args);
  };
};

export const Suite = () =>
  applyDecorators(Injectable(), SetMetadata(CUCUMBER_SUITE, true));
export const Given =
  (pattern: string | RegExp): MethodDecorator =>
  (target: any, method: any) => {
    const ctor = target.constructor;
    const handler = genericHandler(ctor, method);
    Object.defineProperty(handler, 'length', {
      value: (ctor.prototype[method] as any).length,
    });
    Cucumber.Given(pattern, handler);
  };

export const When =
  (pattern: string | RegExp): MethodDecorator =>
  (target: any, method: any) => {
    const ctor = target.constructor;
    const handler = genericHandler(ctor, method);
    Object.defineProperty(handler, 'length', {
      value: (ctor.prototype[method] as any).length,
    });
    Cucumber.When(pattern, handler);
  };
export const Then =
  (pattern: string | RegExp): MethodDecorator =>
  (target: any, method: any) => {
    const ctor = target.constructor;
    const handler = genericHandler(ctor, method);
    Object.defineProperty(handler, 'length', {
      value: (ctor.prototype[method] as any).length,
    });
    Cucumber.Then(pattern, handler);
  };

export const BeforeAll = () => (target: any, method: any) => {
  const ctor = target.constructor;
  const handler = genericHandler(ctor, method);
  Object.defineProperty(handler, 'length', {
    value: (ctor.prototype[method] as any).length,
  });
  Cucumber.BeforeAll(handler);
};

export const Before = (tagExpression: string) => (target: any, method: any) => {
  const ctor = target.constructor;
  const handler = genericHandler(ctor, method);
  Object.defineProperty(handler, 'length', {
    value: (ctor.prototype[method] as any).length,
  });
  Cucumber.Before(tagExpression, handler);
};

export const AfterAll = () => (target: any, method: any) => {
  const ctor = target.constructor;
  const handler = genericHandler(ctor, method);
  Object.defineProperty(handler, 'length', {
    value: (ctor.prototype[method] as any).length,
  });
  Cucumber.AfterAll(handler);
};

export const After = (tagExpression: string) => (target: any, method: any) => {
  const ctor = target.constructor;
  const handler = genericHandler(ctor, method);
  Object.defineProperty(handler, 'length', {
    value: (ctor.prototype[method] as any).length,
  });
  Cucumber.After(tagExpression, handler);
};

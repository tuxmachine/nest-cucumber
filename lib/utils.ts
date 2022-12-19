import { Scope, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { getApp } from './app';
import { NestWorld } from './world';

async function callGlobalHook<T extends Type>(
  cls: T,
  method: keyof T,
  args: unknown[],
) {
  const appModule = await getApp();
  const moduleRef = appModule.get(ModuleRef);
  const isStatic = moduleRef.introspect(cls).scope === Scope.DEFAULT;
  if (isStatic) {
    const instance = appModule.get(cls);
    return instance[method](...args);
  } else {
    throw new Error(
      'The BeforeAll/AfterAll hooks cannot run in a scenario-scoped provider, we do not have access to the World',
    );
  }
}

async function callRegularStep<T extends Type>(
  this: NestWorld,
  cls: T,
  method: keyof T,
  args: unknown[],
) {
  const appModule = await getApp();
  const moduleRef = appModule.get(ModuleRef);
  const isStatic = moduleRef.introspect(cls).scope === Scope.DEFAULT;
  if (isStatic) {
    const instance = appModule.get(cls);
    return instance[method](...args);
  } else {
    const instance = await appModule.resolve(cls, this.contextId);
    return instance[method](...args);
  }
}

export const createStaticNestHandler = <T extends Type>(
  cls: T,
  method: keyof T,
) => {
  const handler = function (...args: unknown[]) {
    return callGlobalHook(cls, method, args);
  };
  Object.defineProperty(handler, 'length', {
    value: (cls.prototype[method] as any).length,
  });
  return handler;
};

export const createNestHandler = <T extends Type>(cls: T, method: keyof T) => {
  const handler = function (this: NestWorld, ...args: unknown[]) {
    return callRegularStep.call(this, cls, method, args);
  };
  Object.defineProperty(handler, 'length', {
    value: (cls.prototype[method] as any).length,
  });
  return handler;
};

export const once = <T extends (...args: unknown[]) => unknown>(fn: T): T => {
  let called = false;
  let result: unknown;
  return ((...args: unknown[]) => {
    if (called) return result;
    result = fn(...args);
    called = true;
    return result;
  }) as T;
};

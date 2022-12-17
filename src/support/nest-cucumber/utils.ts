import { Type } from '@nestjs/common';
import { NestWorld } from './world';

export const createNestHandler = <T extends Type>(cls: T, method: keyof T) => {
  const handler = function (this: NestWorld, ...args: unknown[]) {
    return this.callHandler(cls, method, args);
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

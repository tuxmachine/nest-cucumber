import { Type } from '@nestjs/common';
import { NestWorld } from './world';
export declare const createStaticNestHandler: <T extends Type<any>>(cls: T, method: keyof T) => (...args: unknown[]) => Promise<any>;
export declare const createNestHandler: <T extends Type<any>>(cls: T, method: keyof T) => (this: NestWorld, ...args: unknown[]) => any;
export declare const once: <T extends (...args: unknown[]) => unknown>(fn: T) => T;

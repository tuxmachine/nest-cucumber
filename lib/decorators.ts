import * as Cucumber from '@cucumber/cucumber';
import { IDefineStepOptions } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import {
  applyDecorators,
  Inject,
  Injectable,
  Scope,
  SetMetadata,
} from '@nestjs/common';
import { CUCUMBER_SUITE, WORLD } from './constants';
import { createNestHandler, createStaticNestHandler } from './utils';

const defaultTimeout = process.env.CUCUMBER_TIMEOUT
  ? Number(process.env.CUCUMBER_TIMEOUT)
  : 5_000;

export const Suite = (name?: string) =>
  applyDecorators(
    Injectable({ scope: Scope.REQUEST }),
    SetMetadata(CUCUMBER_SUITE, name ?? 'Suite'),
  );

export const Given =
  (pattern: string | RegExp, opts?: IDefineStepOptions): MethodDecorator =>
  (target: any, method: any) => {
    const handler = createNestHandler(target.constructor, method);
    Cucumber.Given(pattern, opts ?? { timeout: defaultTimeout }, handler);
  };

export const And =
  (pattern: string | RegExp, opts?: IDefineStepOptions): MethodDecorator =>
  (target: any, method: any) => {
    const handler = createNestHandler(target.constructor, method);
    Cucumber.Given(pattern, opts ?? { timeout: defaultTimeout }, handler);
  };

export const When =
  (pattern: string | RegExp, opts?: IDefineStepOptions): MethodDecorator =>
  (target: any, method: any) => {
    const handler = createNestHandler(target.constructor, method);
    Cucumber.When(pattern, opts ?? { timeout: defaultTimeout }, handler);
  };

export const Then =
  (pattern: string | RegExp, opts?: IDefineStepOptions): MethodDecorator =>
  (target: any, method: any) => {
    const handler = createNestHandler(target.constructor, method);
    Cucumber.Then(pattern, opts ?? { timeout: defaultTimeout }, handler);
  };

export const BeforeAll =
  (timeout = defaultTimeout) =>
  (target: any, method: any) => {
    const handler = createStaticNestHandler(target.constructor, method);
    Cucumber.BeforeAll({ timeout }, handler);
  };

export const Before =
  (tagExpression?: string, timeout = defaultTimeout) =>
  (target: any, method: any) => {
    const handler = createNestHandler(target.constructor, method);
    Cucumber.Before({ tags: tagExpression, timeout }, handler);
  };

export const AfterAll =
  (timeout = defaultTimeout) =>
  (target: any, method: any) => {
    const handler = createStaticNestHandler(target.constructor, method);
    Cucumber.AfterAll({ timeout }, handler);
  };

export const After =
  (tagExpression?: string, timeout = defaultTimeout) =>
  (target: any, method: any) => {
    const handler = createNestHandler(target.constructor, method);
    Cucumber.After({ tags: tagExpression, timeout }, handler);
  };

export const BeforeStep =
  (timeout = defaultTimeout) =>
  (target: any, method: any) => {
    const handler = createNestHandler(target.constructor, method);
    Cucumber.BeforeStep({ timeout }, handler);
  };

export const AfterStep =
  (timeout = defaultTimeout) =>
  (target: any, method: any) => {
    const handler = createNestHandler(target.constructor, method);
    Cucumber.AfterStep({ timeout }, handler);
  };

export const InjectWorld = () => Inject(WORLD);

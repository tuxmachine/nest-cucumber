import * as Cucumber from '@cucumber/cucumber';
import {
  applyDecorators,
  Inject,
  Injectable,
  Scope,
  SetMetadata,
} from '@nestjs/common';
import { CUCUMBER_SUITE, WORLD } from './constants';
import { createNestHandler, createStaticNestHandler } from './utils';

export const Suite = (name?: string) =>
  applyDecorators(
    Injectable({ scope: Scope.REQUEST }),
    SetMetadata(CUCUMBER_SUITE, name ?? 'Suite'),
  );

export const Given =
  (pattern: string | RegExp): MethodDecorator =>
  (target: any, method: any) => {
    const handler = createNestHandler(target.constructor, method);
    Cucumber.Given(pattern, handler);
  };

export const And =
  (pattern: string | RegExp): MethodDecorator =>
  (target: any, method: any) => {
    const handler = createNestHandler(target.constructor, method);
    Cucumber.Given(pattern, handler);
  };

export const When =
  (pattern: string | RegExp): MethodDecorator =>
  (target: any, method: any) => {
    const handler = createNestHandler(target.constructor, method);
    Cucumber.When(pattern, handler);
  };

export const Then =
  (pattern: string | RegExp): MethodDecorator =>
  (target: any, method: any) => {
    const handler = createNestHandler(target.constructor, method);
    Cucumber.Then(pattern, handler);
  };

export const BeforeAll = () => (target: any, method: any) => {
  const handler = createStaticNestHandler(target.constructor, method);
  Cucumber.BeforeAll(handler);
};

export const Before =
  (tagExpression?: string) => (target: any, method: any) => {
    const handler = createNestHandler(target.constructor, method);
    Cucumber.Before({ tags: tagExpression }, handler);
  };

export const AfterAll = () => (target: any, method: any) => {
  const handler = createStaticNestHandler(target.constructor, method);
  Cucumber.AfterAll(handler);
};

export const After = (tagExpression?: string) => (target: any, method: any) => {
  const handler = createNestHandler(target.constructor, method);
  Cucumber.After({ tags: tagExpression }, handler);
};

export const BeforeStep = () => (target: any, method: any) => {
  const handler = createNestHandler(target.constructor, method);
  Cucumber.BeforeStep(handler);
};

export const AfterStep = () => (target: any, method: any) => {
  const handler = createNestHandler(target.constructor, method);
  Cucumber.AfterStep(handler);
};

export const InjectWorld = () => Inject(WORLD);

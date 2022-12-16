import { applyDecorators, Injectable, SetMetadata } from '@nestjs/common';
import 'reflect-metadata';
import {
  CUCUMBER_AFTER,
  CUCUMBER_AFTER_ALL,
  CUCUMBER_BEFORE,
  CUCUMBER_BEFORE_ALL,
  CUCUMBER_STEP,
  CUCUMBER_SUITE,
} from './cucumber.constants';

export const Suite = () => applyDecorators(Injectable(), SetMetadata(CUCUMBER_SUITE, true));
export const Given = (regex: string | RegExp) => SetMetadata(CUCUMBER_STEP, regex);
export const When = (regex: string | RegExp) => SetMetadata(CUCUMBER_STEP, regex);
export const Then = (regex: string | RegExp) => SetMetadata(CUCUMBER_STEP, regex);

export const BeforeAll = () => SetMetadata(CUCUMBER_BEFORE_ALL, true);
export const Before = (tagExpression: string) => SetMetadata(CUCUMBER_BEFORE, tagExpression);
export const AfterAll = () => SetMetadata(CUCUMBER_AFTER_ALL, true);
export const After = (tagExpression: string) => SetMetadata(CUCUMBER_AFTER, tagExpression);

import { Injectable, Type } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  CUCUMBER_AFTER,
  CUCUMBER_AFTER_ALL,
  CUCUMBER_BEFORE,
  CUCUMBER_BEFORE_ALL,
  CUCUMBER_STEP,
  CUCUMBER_SUITE,
} from './cucumber.constants';

/**
 * Metadata Accessor meant to be used by the explorer to facilitate
 * the search for queue-related resources.
 */
@Injectable()
export class CucumberMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  isSuite(target: Type<unknown> | CallableFunction): boolean {
    if (!target) return false;

    return Boolean(this.reflector.get(CUCUMBER_SUITE, target));
  }

  isStep(target: Type<unknown> | CallableFunction): boolean {
    if (!target) return false;

    return Boolean(this.reflector.get(CUCUMBER_STEP, target));
  }

  isBeforeAll(target: Type<unknown> | CallableFunction): boolean {
    if (!target) return false;

    return Boolean(this.reflector.get(CUCUMBER_BEFORE_ALL, target));
  }

  isAfterAll(target: Type<unknown> | CallableFunction): boolean {
    if (!target) return false;

    return Boolean(this.reflector.get(CUCUMBER_AFTER_ALL, target));
  }

  isBefore(target: Type<unknown> | CallableFunction): boolean {
    if (!target) return false;

    return Boolean(this.reflector.get(CUCUMBER_BEFORE, target));
  }

  isAfter(target: Type<unknown> | CallableFunction): boolean {
    if (!target) return false;

    return Boolean(this.reflector.get(CUCUMBER_AFTER, target));
  }

  getStepMatcher(target: Type<unknown> | CallableFunction): string | RegExp {
    if (!target) {
      throw new Error('This is not a step');
    }

    return this.reflector.get(CUCUMBER_STEP, target);
  }

  getBeforeTags(target: Type<unknown> | CallableFunction): string {
    if (!target) {
      throw new Error('This is not a hook');
    }

    return this.reflector.get(CUCUMBER_BEFORE, target);
  }

  getAfterTags(target: Type<unknown> | CallableFunction): string {
    if (!target) {
      throw new Error('This is not a hook');
    }

    return this.reflector.get(CUCUMBER_AFTER, target);
  }
}

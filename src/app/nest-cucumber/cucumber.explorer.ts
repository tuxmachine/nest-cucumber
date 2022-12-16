import * as Cucumber from '@cucumber/cucumber';
import { Given } from '@cucumber/cucumber';
import { TestStepFunction } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import { Injectable, Logger, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { CucumberMetadataAccessor } from './cucumber.metadata-accessor';

@Injectable()
export class CucumberExplorer implements OnModuleInit, OnApplicationBootstrap {
  private logger = new Logger(CucumberExplorer.name);

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataAccessor: CucumberMetadataAccessor,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onApplicationBootstrap() {
    this.logger.debug('Initializing all cucumber stuff');
  }

  onModuleInit() {
    try {
      this.logger.debug('Searching for all cucumber stuff...');
      this.explore();
    } catch (e) {
      this.logger.error('Error searching cucumber stuff', e);
      throw e;
    }
  }

  explore() {
    const suites: InstanceWrapper[] = this.discoveryService
      .getProviders()
      .filter(this.isSuite.bind(this));

    suites.forEach(this.registerHooks.bind(this));
  }

  private isSuite(wrapper: InstanceWrapper) {
    // reasoning behind this ternary: [Bull package implementation](https://github.com/nestjs/bull/blob/37a77343efc2153d748ea064724d580d9eef89c3/packages/bull/lib/bull.explorer.ts#L38)
    const cls =
      !wrapper.metatype || wrapper.inject ? wrapper.instance?.constructor : wrapper.metatype;

    return this.metadataAccessor.isSuite(cls);
  }

  private registerHooks(wrapper: InstanceWrapper) {
    const { instance } = wrapper;
    this.logger.debug(`Registering suite ${wrapper.name}`);

    this.metadataScanner.scanFromPrototype(
      instance,
      Object.getPrototypeOf(instance),
      (key: string) => {
        const instanceMethod = instance[key];

        if (this.metadataAccessor.isStep(instanceMethod)) {
          return this.registerStep(wrapper, key);
        }
        if (this.metadataAccessor.isBefore(instanceMethod)) {
          return this.registerBeforeHook(wrapper, key);
        }
        if (this.metadataAccessor.isAfter(instanceMethod)) {
          return this.registerAfterHook(wrapper, key);
        }
        if (this.metadataAccessor.isBeforeAll(instanceMethod)) {
          return this.registerBeforeAllHook(wrapper, key);
        }
        if (this.metadataAccessor.isAfterAll(instanceMethod)) {
          return this.registerAfterAllHook(wrapper, key);
        }
      },
    );
  }

  private registerStep(wrapper: InstanceWrapper, methodKey: string) {
    const { instance } = wrapper;
    const matcher = this.metadataAccessor.getStepMatcher(instance[methodKey]);
    const stepCallback: TestStepFunction<unknown> = instance[methodKey].bind(instance);
    this.logger.debug(`Registering step '${matcher}'`, stepCallback.length);
    Given(matcher, stepCallback);
  }

  private registerBeforeHook(wrapper: InstanceWrapper, methodKey: string) {
    const { instance } = wrapper;
    const tagExpression = this.metadataAccessor.getBeforeTags(instance[methodKey]);
    const beforeHook: (...args: unknown[]) => Promise<void> = instance[methodKey].bind(instance);
    Cucumber.Before(tagExpression, beforeHook);
  }

  private registerAfterHook(wrapper: InstanceWrapper, methodKey: string) {
    const { instance } = wrapper;
    const tagExpression = this.metadataAccessor.getBeforeTags(instance[methodKey]);
    const afterHook: (...args: unknown[]) => Promise<void> = instance[methodKey].bind(instance);
    Cucumber.After(tagExpression, afterHook);
  }

  private registerAfterAllHook(wrapper: InstanceWrapper, methodKey: string) {
    const { instance } = wrapper;
    const afterAllHook: (...args: unknown[]) => Promise<void> = instance[methodKey].bind(instance);
    Cucumber.AfterAll(afterAllHook);
  }

  private registerBeforeAllHook(wrapper: InstanceWrapper, methodKey: string) {
    const { instance } = wrapper;
    const beforeAllHook: (...args: unknown[]) => Promise<void> = instance[methodKey].bind(instance);
    Cucumber.BeforeAll(beforeAllHook);
  }
}

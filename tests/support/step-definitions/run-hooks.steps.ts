import { strict as assert } from 'assert';
import {
  After,
  AfterStep,
  Before,
  BeforeStep,
  Given,
  Suite,
  Then,
} from '../../../lib';
import { GlobalHooks } from './global-hooks';

@Suite()
export class RunHooksSteps {
  private readonly hooks: string[] = [];
  private expected: string[] = [];
  constructor(private readonly globalHooks: GlobalHooks) {}

  @Before()
  beforeHook() {
    this.hooks.push('before');
  }

  @Before('@foo')
  taggedBeforeHook() {
    this.hooks.push('beforeTagged');
  }

  @BeforeStep()
  beforeStepHook(opts: any) {
    assert.notEqual(opts, undefined);
    if (!this.hooks.includes('beforeStep')) {
      this.hooks.push('beforeStep');
    }
  }

  @AfterStep()
  afterStepHook(opts: any) {
    assert.notEqual(opts, undefined);
    if (!this.hooks.includes('afterStep')) {
      this.hooks.push('afterStep');
    }
  }

  @After()
  AfterHook() {
    this.hooks.push('after');
  }

  @After('@foo')
  taggedAfterHook() {
    this.hooks.push('afterTagged');
  }

  @Given('we have a {word} scenario')
  noop(_type: string) {
    // do nothing
  }

  @Then(/regular hooks should run in order/)
  assertHookOrderRegular() {
    // run a little later, so the after hook also runs
    setTimeout(() => {
      assert.deepEqual(this.hooks, [
        'before',
        'beforeStep',
        'afterStep',
        'after',
      ]);
      this.globalHooks.verify();
    });
  }

  @Then(/all hooks should run in order/)
  assertHookOrderAll() {
    // run a little later, so the after hook also runs
    setTimeout(() => {
      assert.deepEqual(this.hooks, [
        'before',
        'beforeTagged',
        'beforeStep',
        'afterStep',
        'afterTagged',
        'after',
      ]);
      this.globalHooks.verify();
    });
  }
}

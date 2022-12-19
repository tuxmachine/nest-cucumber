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
  private readonly hooks = {
    before: false,
    beforeTagged: false,
    beforeStep: false,
    after: false,
    afterTagged: false,
    afterStep: false,
  };

  constructor(private readonly globalHooks: GlobalHooks) {}

  @Before()
  beforeHook() {
    this.hooks.before = true;
  }

  @Before('@foo')
  taggedBeforeHook() {
    this.hooks.beforeTagged = true;
  }

  @BeforeStep()
  beforeStepHook(opts: any) {
    assert.notEqual(opts, undefined);
    this.hooks.beforeStep = true;
  }

  @After()
  AfterHook() {
    this.hooks.after = true;
  }

  @After('@foo')
  taggedAfterHook() {
    this.hooks.afterTagged = true;
  }

  @AfterStep()
  afterStepHook(opts: any) {
    assert.notEqual(opts, undefined);
    this.hooks.afterStep = true;
  }

  @Given(/we have a scenario/)
  noop() {
    // do nothing
  }

  @Then('all hooks should run')
  assertAllHooks() {
    // run a little later, so the after hook also runs
    setTimeout(() => {
      const allHooksRun = Object.values(this.hooks).every((x) => x);
      assert(allHooksRun, JSON.stringify(this.hooks));
      this.globalHooks.verify();
    });
  }
}

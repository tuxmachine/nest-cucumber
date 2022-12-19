import { Injectable } from '@nestjs/common';
import { strict as assert } from 'assert';
import { AfterAll, BeforeAll } from 'lib';

@Injectable()
export class GlobalHooks {
  private readonly hooks = {
    beforeAll: false,
    afterAll: false,
  };

  @BeforeAll()
  beforeAll() {
    this.hooks.beforeAll = true;
  }

  @AfterAll()
  afterAll() {
    this.hooks.afterAll = true;
  }

  public verify() {
    assert(this.hooks.beforeAll);
    assert(this.hooks.afterAll);
  }
}

import { Injectable } from '@nestjs/common';
import { strict as assert } from 'assert';
import { AfterAll, BeforeAll } from 'lib';

@Injectable()
export class GlobalHooks {
  private readonly hooks: string[] = [];

  @BeforeAll()
  beforeAll() {
    this.hooks.push('beforeAll');
  }

  @AfterAll()
  afterAll() {
    this.hooks.push('afterAll');
  }

  public verify() {
    assert.deepEqual(this.hooks, ['beforeAll', 'afterAll']);
  }
}

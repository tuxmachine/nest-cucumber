import { strict as assert } from 'assert';
import { Given, InjectWorld, NestWorld, Suite, Then } from '../../../lib';

@Suite()
export class SumSteps {
  private numbers: number[] = [];

  constructor(@InjectWorld() world: NestWorld) {
    assert.match(world.info.feature, /sums/);
    assert.match(world.info.scenario, /math/);
  }

  @Given('we have a sum of {int} plus {int}')
  givenASum(left: number, right: number) {
    this.numbers.push(left, right);
  }

  @Then('it should return {int}')
  thenReturn(expected: number) {
    assert.equal(
      this.numbers.reduce((sum, x) => sum + x),
      expected,
    );
  }
}

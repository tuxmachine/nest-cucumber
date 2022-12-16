import { strict as assert } from 'assert';
import { Given, Suite, Then } from '../nest-cucumber/nest-cucumber.decorators';

@Suite()
export class SumSteps {
  private result: number;

  @Given('we have a sum of {int} plus {int}')
  givenASum(left: number, right: number) {
    this.result = left + right;
  }

  @Then('it should return {int}')
  thenReturn(expected: number) {
    assert.equal(this.result, expected);
  }
}

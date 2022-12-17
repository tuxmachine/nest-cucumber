import { Logger } from '@nestjs/common';
import { strict as assert } from 'assert';
import { Given, InjectWorld, NestWorld, Suite, Then } from '../nest-cucumber';

@Suite()
export class SumSteps {
  private numbers: number[] = [];
  private readonly logger = new Logger(SumSteps.name);

  constructor(@InjectWorld() world: NestWorld) {
    this.logger.log(world.info);
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

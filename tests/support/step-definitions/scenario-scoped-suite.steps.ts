import { strict as assert } from 'assert';
import { Given, InjectWorld, NestWorld, Suite, Then, When } from '../../../lib';

type Operation = 'addition' | 'subtraction' | 'division' | 'multiplication';

const operations: Record<Operation, (numbers: number[]) => number> = {
  addition: (values) => values.reduce((x, y) => x + y),
  subtraction: (values) => values.reduce((x, y) => x - y),
  division: (values) => values.reduce((x, y) => x / y),
  multiplication: (values) => values.reduce((x, y) => x * y),
};

@Suite()
export class ScenarioScopedSuiteSteps {
  private operation: Operation;
  private result: number;
  private numbers: number[] = [];

  constructor(@InjectWorld() world: NestWorld) {
    assert.match(world.info.feature, /Scenario-scoped/);
    assert.match(world.info.scenario, /fresh Suite/);
  }

  @Given('we are calculating a {word}')
  setOperation(operation: Operation) {
    this.operation = operation;
  }

  @Given('we have an input number {int}')
  addNumber(value: number) {
    this.numbers.push(value);
  }

  @When('we perform the calculation')
  calculate() {
    this.result = operations[this.operation](this.numbers);
  }

  @Then('it should return {int}')
  verify(expected: number) {
    assert.equal(this.result, expected);
  }
}

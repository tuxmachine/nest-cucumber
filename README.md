# Nest-Cucumber

This library is inspired by
[cucumber-tsflow](https://github.com/timjroberts/cucumber-js-tsflow), but
leveraging NestJS as a dependency-injection container instead. This allows for
a very lean implementation and is compatible with a wide array of community
modules.

**NOTE:** This library is experimental and may contain strange bugs. I'll
publish it to NPM when it has some proven stability.

## Usage

1. Install the library with your favourite package manager (e.g.: `npm install --dev tuxmachine/nest-cucumber@master`)
2. Create an entry file to bootstrap your tests:

```ts
import { AppModule } from './support/app.module';
import { bootstrap } from 'nest-cucumber';

bootstrap(AppModule);
```

3. Start writing tests with decorators 🎉 like [this](./tests/support/step-definitions/scenario-scoped-suite.steps.ts)

```ts
@Suite()
export class SumSteps {
  private result: number;
  private numbers: number[] = [];

  @Given('we have an input number {int}')
  addNumber(value: number) {
    this.numbers.push(value);
  }

  @When('we calculate their sum')
  calculate() {
    this.result = this.numbers.reduce((x, y) => x + y);
  }

  @Then('it should return {int}')
  verify(expected: number) {
    assert.equal(this.result, expected);
  }
}
```

## Notes

- Make sure you configure Cucumber to run with ts-node, check this repo's
  [`cucumber.js`](./cucumber.js) for an example
- Suites are scenario-scoped by default, mirroring NestJS request-scoped, and
  fresh instances are created for every scenario.
- BeforeAll and AfterAll steps run outside a scenario and thus cannot run
  inside scenario-scope. Make sure they're defined on a static provider.
- If you want to set a custom world, make sure you extend the NestWorld, the
  scenario-scoping depends on it

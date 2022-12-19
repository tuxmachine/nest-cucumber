import { Module } from '@nestjs/common';
import { GlobalHooks } from './step-definitions/global-hooks';
import { RunHooksSteps } from './step-definitions/run-hooks.steps';
import { ScenarioScopedSuiteSteps } from './step-definitions/scenario-scoped-suite.steps';

@Module({
  providers: [ScenarioScopedSuiteSteps, RunHooksSteps, GlobalHooks],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { NestCucumberModule } from './nest-cucumber/nest-cucumber.module';
import { SumSteps } from './sums/sum.steps';

@Module({
  imports: [NestCucumberModule],
  providers: [SumSteps],
})
export class AppModule {}

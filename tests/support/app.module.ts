import { Module } from '@nestjs/common';
import { SumSteps } from './sums/sum.steps';

@Module({
  providers: [SumSteps],
})
export class AppModule {}

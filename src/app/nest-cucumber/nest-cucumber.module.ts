import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { CucumberExplorer } from './cucumber.explorer';
import { CucumberMetadataAccessor } from './cucumber.metadata-accessor';

@Module({
  imports: [DiscoveryModule],
  providers: [CucumberExplorer, CucumberMetadataAccessor],
})
export class NestCucumberModule {}

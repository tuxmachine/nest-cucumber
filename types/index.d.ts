import { INestApplicationContext } from '@nestjs/common';

/* eslint-disable no-var */

declare global {
  var appBootstrap: Promise<INestApplicationContext>;
}

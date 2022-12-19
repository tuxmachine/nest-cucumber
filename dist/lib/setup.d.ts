import { Type } from '@nestjs/common';
import 'reflect-metadata';
import { INestApplicationContext } from '@nestjs/common';
declare global {
    var appBootstrap: Promise<INestApplicationContext>;
}
export declare const bootstrap: (rootModule: Type) => void;

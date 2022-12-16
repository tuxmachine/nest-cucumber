'use strict';

module.exports = {
  default: {
    publishQuiet: true,
    paths: ['src/features/**/*.feature'],
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: ['src/main.ts'],
  },
};

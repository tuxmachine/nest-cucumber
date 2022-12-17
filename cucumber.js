'use strict';

module.exports = {
  default: {
    publishQuiet: true,
    paths: ['tests/features/**/*.feature'],
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: ['tests/main.ts'],
  },
};

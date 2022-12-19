"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectWorld = exports.AfterStep = exports.BeforeStep = exports.After = exports.AfterAll = exports.Before = exports.BeforeAll = exports.Then = exports.When = exports.And = exports.Given = exports.Suite = void 0;
const Cucumber = require("@cucumber/cucumber");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const Suite = (name) => (0, common_1.applyDecorators)((0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }), (0, common_1.SetMetadata)(constants_1.CUCUMBER_SUITE, name !== null && name !== void 0 ? name : 'Suite'));
exports.Suite = Suite;
const Given = (pattern) => (target, method) => {
    const handler = (0, utils_1.createNestHandler)(target.constructor, method);
    Cucumber.Given(pattern, handler);
};
exports.Given = Given;
const And = (pattern) => (target, method) => {
    const handler = (0, utils_1.createNestHandler)(target.constructor, method);
    Cucumber.Given(pattern, handler);
};
exports.And = And;
const When = (pattern) => (target, method) => {
    const handler = (0, utils_1.createNestHandler)(target.constructor, method);
    Cucumber.When(pattern, handler);
};
exports.When = When;
const Then = (pattern) => (target, method) => {
    const handler = (0, utils_1.createNestHandler)(target.constructor, method);
    Cucumber.Then(pattern, handler);
};
exports.Then = Then;
const BeforeAll = () => (target, method) => {
    const handler = (0, utils_1.createStaticNestHandler)(target.constructor, method);
    Cucumber.BeforeAll(handler);
};
exports.BeforeAll = BeforeAll;
const Before = (tagExpression) => (target, method) => {
    const handler = (0, utils_1.createNestHandler)(target.constructor, method);
    Cucumber.Before({ tags: tagExpression }, handler);
};
exports.Before = Before;
const AfterAll = () => (target, method) => {
    const handler = (0, utils_1.createStaticNestHandler)(target.constructor, method);
    Cucumber.AfterAll(handler);
};
exports.AfterAll = AfterAll;
const After = (tagExpression) => (target, method) => {
    const handler = (0, utils_1.createNestHandler)(target.constructor, method);
    Cucumber.After({ tags: tagExpression }, handler);
};
exports.After = After;
const BeforeStep = () => (target, method) => {
    const handler = (0, utils_1.createNestHandler)(target.constructor, method);
    Cucumber.BeforeStep(handler);
};
exports.BeforeStep = BeforeStep;
const AfterStep = () => (target, method) => {
    const handler = (0, utils_1.createNestHandler)(target.constructor, method);
    Cucumber.AfterStep(handler);
};
exports.AfterStep = AfterStep;
const InjectWorld = () => (0, common_1.Inject)(constants_1.WORLD);
exports.InjectWorld = InjectWorld;
//# sourceMappingURL=decorators.js.map
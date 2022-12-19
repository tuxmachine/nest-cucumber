"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = exports.createNestHandler = exports.createStaticNestHandler = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
async function callStaticScopedHandler(cls, method, args) {
    const appModule = await global.appBootstrap;
    const moduleRef = appModule.get(core_1.ModuleRef);
    const isStatic = moduleRef.introspect(cls).scope === common_1.Scope.DEFAULT;
    if (isStatic) {
        const instance = appModule.get(cls);
        return instance[method](...args);
    }
    else {
        throw new Error('The BeforeAll/AfterAll hooks cannot run in a scenario-scoped provider, we do not have access to the World');
    }
}
async function callScenarioScopedHandler(cls, method, args) {
    const appModule = await global.appBootstrap;
    const moduleRef = appModule.get(core_1.ModuleRef);
    const isStatic = moduleRef.introspect(cls).scope === common_1.Scope.DEFAULT;
    if (isStatic) {
        const instance = appModule.get(cls);
        return instance[method](...args);
    }
    else {
        const instance = await appModule.resolve(cls, this.contextId);
        return instance[method](...args);
    }
}
const createStaticNestHandler = (cls, method) => {
    const handler = function (...args) {
        return callStaticScopedHandler(cls, method, args);
    };
    Object.defineProperty(handler, 'length', {
        value: cls.prototype[method].length,
    });
    return handler;
};
exports.createStaticNestHandler = createStaticNestHandler;
const createNestHandler = (cls, method) => {
    const handler = function (...args) {
        return callScenarioScopedHandler.call(this, cls, method, args);
    };
    Object.defineProperty(handler, 'length', {
        value: cls.prototype[method].length,
    });
    return handler;
};
exports.createNestHandler = createNestHandler;
const once = (fn) => {
    let called = false;
    let result;
    return ((...args) => {
        if (called)
            return result;
        result = fn(...args);
        called = true;
        return result;
    });
};
exports.once = once;
//# sourceMappingURL=utils.js.map
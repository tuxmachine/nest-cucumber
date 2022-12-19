"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const cucumber_1 = require("@cucumber/cucumber");
const core_1 = require("@nestjs/core");
require("reflect-metadata");
const world_1 = require("./world");
const bootstrap = (rootModule) => {
    global.appBootstrap = core_1.NestFactory.createApplicationContext(rootModule);
    (0, cucumber_1.setWorldConstructor)(world_1.NestWorld);
    (0, cucumber_1.Before)(async function () {
        await this.registerScenario();
    });
    (0, cucumber_1.BeforeStep)(function ({ gherkinDocument, pickle }) {
        this.info.feature = gherkinDocument.feature.name;
        this.info.scenario = pickle.name;
    });
};
exports.bootstrap = bootstrap;
//# sourceMappingURL=setup.js.map
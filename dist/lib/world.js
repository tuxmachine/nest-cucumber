"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestWorld = void 0;
const cucumber_1 = require("@cucumber/cucumber");
const core_1 = require("@nestjs/core");
const utils_1 = require("./utils");
class NestWorld extends cucumber_1.World {
    constructor() {
        super(...arguments);
        this.contextId = { id: 1 };
        this.info = {
            feature: '',
            scenario: '',
        };
        this.setInfo = (0, utils_1.once)((feature, scenario) => {
            Object.assign(this.info, { feature, scenario });
        });
    }
    async registerScenario() {
        const appModule = await global.appBootstrap;
        const moduleRef = appModule.get(core_1.ModuleRef);
        moduleRef.registerRequestByContextId(this, this.contextId);
    }
}
exports.NestWorld = NestWorld;
//# sourceMappingURL=world.js.map
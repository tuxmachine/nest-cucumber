"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SumSteps = void 0;
const assert_1 = require("assert");
const lib_1 = require("../../../lib");
let SumSteps = class SumSteps {
    constructor(world) {
        this.numbers = [];
        assert_1.strict.match(world.info.feature, /sums/);
        assert_1.strict.match(world.info.scenario, /math/);
    }
    givenASum(left, right) {
        this.numbers.push(left, right);
    }
    thenReturn(expected) {
        assert_1.strict.equal(this.numbers.reduce((sum, x) => sum + x), expected);
    }
};
__decorate([
    (0, lib_1.Given)('we have a sum of {int} plus {int}'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], SumSteps.prototype, "givenASum", null);
__decorate([
    (0, lib_1.Then)('it should return {int}'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SumSteps.prototype, "thenReturn", null);
SumSteps = __decorate([
    (0, lib_1.Suite)(),
    __param(0, (0, lib_1.InjectWorld)()),
    __metadata("design:paramtypes", [lib_1.NestWorld])
], SumSteps);
exports.SumSteps = SumSteps;
//# sourceMappingURL=sum.steps.js.map
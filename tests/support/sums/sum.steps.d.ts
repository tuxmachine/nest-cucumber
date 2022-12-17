import { NestWorld } from '../../../lib';
export declare class SumSteps {
    private numbers;
    constructor(world: NestWorld);
    givenASum(left: number, right: number): void;
    thenReturn(expected: number): void;
}

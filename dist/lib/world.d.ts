import { World } from '@cucumber/cucumber';
export declare class NestWorld extends World {
    readonly contextId: {
        id: number;
    };
    info: {
        feature: string;
        scenario: string;
    };
    setInfo: (feature: string, scenario: string) => void;
    registerScenario(): Promise<void>;
}

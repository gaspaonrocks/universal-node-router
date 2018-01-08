export default class Config {
    private methodNames;
    constructor(config: any);
    getMethod(key: string): any;
    private setMethods(config);
}

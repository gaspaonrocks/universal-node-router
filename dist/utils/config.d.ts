export default class Config {
    private methodNames;
    constructor(config?: object);
    getMethod: (key: string) => string;
    private setMethods;
}

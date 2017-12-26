export declare class Router {
    private context;
    constructor(context: string);
    mapper(dirPath: string): Function;
    indexer(dirPath: string): Object;
}

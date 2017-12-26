import Mapper from './src/route-mapper/map';
import Indexer from './src/global-modules-indexer';

export class Router {
    private context: string
    constructor(context: string) {
        this.context = context;
    }
    mapper(dirPath: string): Function {
        return Mapper(this.context, dirPath);
    }
    indexer(dirPath: string): Object {
        return Indexer(this.context, dirPath);
    }
};
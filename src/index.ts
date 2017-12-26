import Mapper from './route-mapper/map';
import Indexer from './global-modules-indexer';

module.exports = class Router {
    private context: string;
    constructor(context: string) {
        this.context = context;
    }
    mapper(dirPath: string): Function {
        return Mapper(this.context, dirPath);
    }
    indexer(dirPath: string): object {
        return Indexer(this.context, dirPath);
    }
}
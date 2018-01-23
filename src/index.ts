import Mapper from './route-mapper/map';
import Indexer from './global-modules-indexer';
import Config from './utils/config';

module.exports = class Router {
    private context: string;
    private config: any;
    constructor(context: string, customConfig: any = {}) {
        this.context = context;
        this.config = new Config(customConfig);
    }
    mapper(dirPath: string): Function {
        return Mapper(this.context, this.config, dirPath);
    }
}
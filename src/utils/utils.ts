export default {
    hasReqParams: (path: string): boolean => {
        return path.split('/').filter(e => e.length > 0).length > 1;
    },
    reqParamsOptions: (path: string): any => {
        let config = {
            ctrl: '',
            url: '/'
        };

        let array = path.split('/').filter(e => e.length > 0);
        config.ctrl = array[0];
        config.url += array[0];

        for (let i = 1, len = array.length; i < len; i++) {
            config[`param${i}`] = array[i];
            config.url += `/:param${i}`;
        }

        return config;
    },
    requireMyTsFile: (fileName: string, filePath: string): Function => {
        return fileName.match(/.ts$/) ? require(filePath + '/' + fileName).default : require(filePath + '/' + fileName);
    }
};
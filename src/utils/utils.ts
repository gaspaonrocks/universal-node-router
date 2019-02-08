export default {
    hasReqParams: (path: string): boolean => {
        return path.split('/').filter(e => e.length > 0).length > 1;
    },
    reqParamsOptions: (path: string): any => path
        .split('/')
        .filter(e => e.length > 0)
        .reduce((accumulator, currentValue, i): any =>
            i === 0 ?
                { ...accumulator, ctrl: currentValue, url: accumulator.url + `/${currentValue}` } :
                { ...accumulator, [`param${i}`]: currentValue, url: accumulator.url + `/:param${i}` }, { ctrl: '', url: '' })
    ,
    requireMyTsFile: (fileName: string, filePath: string): Function => {
        return fileName.match(/.ts$/) ? require(filePath + '/' + fileName).default : require(filePath + '/' + fileName);
    }
};
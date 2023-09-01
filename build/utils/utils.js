const path = require('path')
// 路径配置处理
function resolvePath(dirName = '', rootFlag = false, rootName = '') {
    if (typeof dirName !== 'string') return Error('dirName Type Error ,Please enter String Type')
    let rootDirName = __dirname,
        dirNameArr = rootDirName.split('\\'),
        rootNameIndex,
        resRootNameArr = [],
        resRootName = '';
    // 是否启用根目录 默认不启用
    if (rootFlag) {
        rootNameIndex = dirNameArr.indexOf(rootName)
        // 判断传入的根文件名 否是字符
        if (typeof rootName !== 'string') return Error('Type Error ,Please enter String Type')
        // 判断传入的根文件名 是否正确
        else if (rootNameIndex == -1) return Error(`'${rootName}',This file name was not found. Please enter the correct file name`)
        else {
            // 找到位置 重新添加到数组
            for (let i = 0; i < dirNameArr.length; i++) {
                if (i <= rootNameIndex) {
                    resRootNameArr.push(dirNameArr[i])
                }
            }
            // 判断返回的length>0
            if (resRootNameArr.length > 0) {
                // 将返回的数组重新拼接为路径
                resRootName = resRootNameArr.join('\\')
                // 判断dirName文件路径 转义
                dirName = dirName.split('/').join('\\')
                // 判断dirName前是否有/ 没有就加上
                if (dirName.indexOf('\\') !== 0) {
                    dirName = '\\' + dirName
                }

                return resRootName + dirName
            }
        }
    } else {
        let resolvePath = path.resolve(rootDirName, dirName)
        if (dirName === '') return resolvePath
        else return resolvePath
    }

}
// 对sass全局文件 路径处理
function generatorSassPath(arrPath) {
    if (!Array.isArray(arrPath)) return Error('Type Error , Please enter Array Type')
    // 资源路径
    let aseetsPath = resolvePath('src/assets/styles', true, 'TDL'),
        resArrPath = []
    for (let i = 0; i < arrPath.length; i++) {
        arrPath[i] = arrPath[i].split('/').join('\\')
        if (arrPath[i].indexOf('\/') !== 0) {
            arrPath[i] = '/' + arrPath[i]
        }
        resArrPath.push(aseetsPath + arrPath[i])
    }
    return resArrPath
}
module.exports = {
    resolvePath,
    generatorSassPath
}

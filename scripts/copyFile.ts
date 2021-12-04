const { copy } = require('fs-extra')
const glob = require('globby')


function toDest(file) {
    return file.replace(/^plugins\/demoBlock\/component\//, 'dist/')
}
glob.sync('plugins/demoBlock/component/demo/**/!(*.ts|tsconfig.json)').forEach(file=>{
    copy(file,toDest(file));
})


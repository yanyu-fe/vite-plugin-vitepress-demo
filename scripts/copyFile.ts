const { copy } = require('fs-extra')
const glob = require('globby')


function toDest(file) {
    return file.replace(/^plugins\/demoBlock\//, 'dist/')
}
glob.sync('plugins/demoBlock/component/**/!(*.ts|tsconfig.json)').forEach(file=>{
    copy(file,toDest(file));
})


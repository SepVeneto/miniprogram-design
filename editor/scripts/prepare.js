const fse = require('fs-extra')
const path = require('path')

console.log(process.env.INIT_CWD)
const DEST = path.resolve(process.env.INIT_CWD, 'public/editor')

fse.removeSync(DEST)
fse.copySync('editor', DEST)

console.log('copy success')
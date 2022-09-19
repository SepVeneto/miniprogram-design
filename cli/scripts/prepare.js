const fse = require('fs-extra')
const path = require('path')

fse.copySync('miniprogram-design', path.resolve(process.env.INIT_CWD, 'public/miniprogram-design'))

console.log('copy success')
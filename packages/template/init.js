#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const prompts = require('prompts')
const {
  blue, green, yellow , cyan, red
} = require('kolorist')

const cwd = process.cwd()

const EXIST_ACTION = [
  { name: '覆盖', color: blue, value: 'rewrite' },
  { name: '放弃', color: cyan, value: 'cancel' },
]

async function init() {
  let result = {};
  const defaultProjectName = 'rx-project';
  try {
    result = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: '项目名称:',
        initial: defaultProjectName,
      },
    ], {
      onCancel: () => {
        throw new Error(red('X') + ' Cancel')
      }
    })
  } catch(err) {
    console.log(err.message)
    return;
  }

  const { projectName } = result;


  const root = path.join(cwd, projectName);
  try {
    fs.accessSync(root, fs.constants.F_OK)
    const res = await prompts([
      {
        type: 'select',
        name: 'action',
        message: '存在同名项目',
        choices: EXIST_ACTION.map(action => {
          const vColor = action.color
          return {
            title: vColor(action.name),
            value: action
          }
        })
      }
    ], {
      onCancel: () => {
        throw new Error(red('X') + ' Cancel')
      }
    })
    const { action } = res;
    if (action.value === 'rewrite') {
      fs.rmSync(root, { force: true, recursive: true})
    } else {
      throw new Error(red('X') + ' Cancel')
    }
  } catch(e) { }

  try {
    fs.mkdirSync(root);
  } catch(e) {}
  const template = 'raw'

  console.log(`\n脚手架目录: ${root}...`)

  const templateDir = path.join(__dirname, template)

  const write = (file, content) => {
    const targetPath = path.join(root, file);
    const src = path.join(templateDir, file);
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(src, targetPath)
    }
  }
  try {
    const files = fs.readdirSync(templateDir)
    for (const file of files.filter((f) => f !== 'package.json')) {
      write(file)
    }
  } catch(e) {
    throw new Error(red('不支持该类型的模板: ' + templateDir))
  }

  const pkg = require(path.join(templateDir, 'package.json'));

  pkg.name = projectName;

  write('package.json', JSON.stringify(pkg, null, 2));

  function copy(src, dist) {
    const stat = fs.statSync(src)
    if (stat.isDirectory()) {
      copyDir(src, dist);
    } else {
      fs.copyFileSync(src, dist)
    }
  }
  function copyDir(src, dist) {
    fs.mkdirSync(dist, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      const srcFile = path.join(src, file);
      const distFile = path.join(dist, file);
      copy(srcFile, distFile);
    }
  }
}

init().catch(e => {
  console.error(e)
})

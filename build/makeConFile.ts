/// 打包生成配置文件
import fs from 'fs'

const args = process.argv.splice(2)
const [esVersion] = args

console.log('\n', 'cmd args:', args, '\n')

const tsconfig = {
  compilerOptions: {
    target: esVersion || 'ES5',
    module: 'commonjs',
    strict: true,
    jsx: 'react',
    // outDir: `packages/ui/src/${outDir}`,
    // rootDir: ".", // 指定输出文件目录(用于输出)，用于控制输出目录结构
    moduleResolution: 'node',
    skipLibCheck: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    removeComments: true,
    preserveSymlinks: true,
    resolveJsonModule: true,
    experimentalDecorators: true,
    typeRoots: ['./node_modules/@types']
  },
  exclude: ['node_modules', 'lib', 'es']
}

// 写入文件内容（如果文件不存在会创建一个文件）
fs.writeFile('./packages/ui/src/tsconfig.json', JSON.stringify(tsconfig), err => {
  if (err) {
    throw err
  }

  console.log('\n ======= Bingo!!! The file of tsconfig.json has been created!!! ======= \n')

  // 写入成功后读取测试
  fs.readFile('./packages/ui/src/tsconfig.json', 'utf-8', (err, data) => {
    if (err) {
      throw err
    }
    console.log(data)
  })
})

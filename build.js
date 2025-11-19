const esbuild = require('esbuild');
const dotenv = require('dotenv');

// 加载环境变量
const env = dotenv.config().parsed || {};

// 将环境变量转换为 esbuild define 格式
// process.env.VAR 变为 "value"
const define = Object.keys(env).reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(env[key]);
  return acc;
}, {});

const isWatch = process.argv.includes('--watch');

const context = {
  entryPoints: ['src/main.jsx'],
  bundle: true,
  sourcemap: true,
  minify: !isWatch, // 开发模式下不压缩
  loader: { '.jsx': 'jsx' },
  outfile: 'assets/js/app.bundle.js',
  define: define,
};

async function build() {
  if (isWatch) {
    const ctx = await esbuild.context(context);
    await ctx.watch();
    console.log('Watching for changes...');
  } else {
    await esbuild.build(context);
    console.log('Build complete.');
  }
}

build().catch(() => process.exit(1));

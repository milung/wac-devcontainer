import * as esbuild from 'esbuild'


const config = {
  entryPoints: ['src/rename.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  sourcemap: true,
}


if (process.argv.includes('--watch')) {
    console.log('watching')
    const ctx = await esbuild.context(config)
    await ctx.watch()
} else {
    console.log('building')
    await esbuild.build(config)
}
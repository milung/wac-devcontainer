import * as esbuild from 'esbuild'


const config = {
  entryPoints: ['src/rename.mts'],
  bundle: true,
  outfile: 'dist/index.mjs',
  platform: 'node',
  sourcemap: true,
  format: 'esm',
}


if (process.argv.includes('--watch')) {
    console.log('watching')
    const ctx = await esbuild.context(config)
    await ctx.watch()
} else {
    console.log('building')
    await esbuild.build(config)
}
import * as esbuild from 'esbuild'

const ctx = await esbuild.context({
  entryPoints: ['src/rename.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  sourcemap: true,
})

if (process.argv.includes('--watch')) {
    await ctx.watch()
} else {
    await ctx.build()
}
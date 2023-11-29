module.exports = (pathResolve) => ({
  '@/': `${pathResolve('src')}/`,
  Main: pathResolve('output/Main'),
  'Test.Main': pathResolve('output/Test.Main'),
});

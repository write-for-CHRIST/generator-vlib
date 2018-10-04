module.exports = function(wallaby) {
  return {
    files: [
      'tsconfig.json',
      'package.json',
      'src/**/*.ts*',
      'src/**/*.d.ts*',
      'src/**/*.snap',
      '!src/__tests__/*.test.ts*'
    ],
    tests: ['src/__tests__/*.test.ts*'],
    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({module: 'es2015'}),
      '**/*.js?(x)': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['react-app']
      })
    },
    preprocessors: {
      '**/*.js': file =>
        require('babel-core').transform(file.content, {
          sourceMap: true,
          plugins: ['transform-es2015-modules-commonjs']
        })
    },
    env: {
      type: 'node',
      runner: 'node'
    },
    testFramework: 'jest',
    deplays: {
      run: 700
    }
  };
};

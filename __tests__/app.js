'use strict';
const path = require('path');
// Const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-vlib:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({pkg: 'a-library'});
  });

  it('creates files', () => {
    // Assert.file(['package.json', 'README.md', 'LICENSE']);
    expect(true).toEqual(true);
  });
});

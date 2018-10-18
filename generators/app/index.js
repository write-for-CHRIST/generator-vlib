'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the ${chalk.red('vlib')} generator!`));

    const config = this.config.getAll();

    const prompts = [
      {
        type: 'input',
        name: 'pkg',
        message: 'Enter the package name',
        default: config.pkg || this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter package description',
        default: config.description || 'Yet another package'
      },
      {
        type: 'input',
        name: 'git',
        message: 'Enter github or gitlab',
        default: config.git || 'github'
      },
      {
        type: 'input',
        name: 'gitUsername',
        message: 'Enter git username or group',
        default: config.gitUsername || (await this.user.github.username())
      },
      {
        type: 'input',
        name: 'repoName',
        message: 'Enter repo name',
        default: config.repoName || this.appname
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter your NPM username',
        default: config.name || this.user.git.name()
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter your NPM email',
        default: config.email || this.user.git.email()
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const mv = (from, to) => {
      this.fs.move(this.destinationPath(from), this.destinationPath(to));
    };

    this.fs.copyTpl([`${this.templatePath()}/**`], this.destinationPath(), {
      ...this.props
    });

    mv('index.ts', 'src/index.ts');
    mv('index.test.ts', 'src/__tests__/index.test.ts');
    mv('gh-pages-publish.ts', 'tools/gh-pages-publish.ts');

    const DOT_FILES = [
      'babelrc',
      'commitlint.config.js',
      'editorconfig',
      'eslintignore',
      'eslintrc.json',
      'gitattributes',
      'gitignore',
      'gitlab-ci.yml',
      'huskyrc.json',
      'lintstagedrc.json',
      'prettierrc.json',
      'releaserc.json',
      'travis.yml'
    ];
    let i = DOT_FILES.length;
    while (i--) {
      mv(DOT_FILES[i], `.${DOT_FILES[i]}`);
    }
  }

  git() {
    const gitRemote = `https://${this.props.git}.com/${this.props.gitUsername}/${
      this.props.repoName
    }`;
    this.spawnCommandSync('git', ['init']);
    this.spawnCommandSync('git', ['remote', 'add', 'origin', gitRemote]);
    this.log(`Initialized git reposity with origin at: ${gitRemote}`);
  }

  save() {
    for (let prop in this.props) {
      if (this.props[prop]) {
        this.config.set(prop, this.props[prop]);
      }
    }
    this.config.save();
    this.log('Saved package configuration!');
  }

  install() {
    this.installDependencies({
      yarn: true,
      npm: false,
      bower: false
    });
  }
};

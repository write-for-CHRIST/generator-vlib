'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the ${chalk.red('vlib')} generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'pkg',
        message: 'Enter the package name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter package description',
        default: 'Yet another package'
      },
      {
        type: 'input',
        name: 'githubUsername',
        message: 'Enter githubUsername'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {...this.props}
    );
  }

  git() {
    this.spawnCommandSync('git', ['init']);
  }

  install() {
    this.installDependencies({
      yarn: {force: true},
      npm: false
    });
  }
};

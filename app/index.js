var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting () {
    return this.prompt({
      type: 'input',
      name: 'projectName',
      message: 'Your project name'
    }).then(answers => {
      this.projectName = answers.projectName;
    });
  }

  configuring () {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {projectName: this.projectName}
    );
    this.fs.copy(
      this.templatePath('_gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );
    this.fs.copy(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('_.babelrc'),
      this.destinationPath('.babelrc')
    );
    this.fs.copy(
      this.templatePath('_.eslintrc.yml'),
      this.destinationPath('.eslintrc.yml')
    );
    this.fs.copyTpl(
      this.templatePath('src/_index.html'),
      this.destinationPath('src/index.html'),
      {projectName: this.projectName}
    );
    this.fs.copy(
      this.templatePath('src/styles/_main.scss'),
      this.destinationPath('src/styles/main.scss')
    );
    this.fs.copy(
      this.templatePath('src/styles/__base.scss'),
      this.destinationPath('src/styles/_base.scss')
    );
    this.fs.copy(
      this.templatePath('src/scripts/_index.jsx'),
      this.destinationPath('src/scripts/index.jsx')
    );
    this.fs.copyTpl(
      this.templatePath('src/scripts/components/_app.jsx'),
      this.destinationPath('src/scripts/components/app.jsx'),
      {projectName: this.projectName}
    );
    this.fs.copy(
      this.templatePath('src/images/_favicon.ico'),
      this.destinationPath('src/images/favicon.ico')
    );
  }

  install () {
    this.npmInstall();
  }
}

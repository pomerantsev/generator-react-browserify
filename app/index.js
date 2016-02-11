var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  prompting: {
    promptName: function () {
      var done = this.async();
      this.prompt({
        type: 'input',
        name: 'projectName',
        message: 'Your project name'
      }, function (answers) {
        this.projectName = answers.projectName;
        done();
      }.bind(this));
    }
  },
  configuring: {
    copyFiles: function () {
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
    }
  },
  install: function () {
    this.npmInstall();
  }
});

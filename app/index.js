var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
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
      this.template('_package.json', 'package.json', {
        projectName: this.projectName
      });
      this.copy('_gulpfile.js', 'gulpfile.js');
      this.copy('_.gitignore', '.gitignore');
      this.copy('_.jshintrc', '.jshintrc');

      this.mkdir('app');
      this.template('app/_index.html', 'app/index.html');
      this.mkdir('app/styles');
      this.copy('app/styles/_main.scss', 'app/styles/main.scss');
      this.copy('app/styles/__base.scss', 'app/styles/_base.scss');
      this.mkdir('app/scripts');
      this.copy('app/scripts/_app.jsx', 'app/scripts/app.jsx', {
        projectName: this.projectName
      });
    }
  },
  install: function () {
    this.npmInstall();
  }
});

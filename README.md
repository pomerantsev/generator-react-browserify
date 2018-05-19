A basic webapp Yeoman generator.
For development and production use.

Features
--------
* Use react (optional) and browserify
* write stylesheets in Sass;
* forget about vendor prefixes (uses Autoprefixer with the `last 2 versions` option);
* rebuilds scripts and styles when source files change, and automatically reloads the page in the browser (livereload);
* sourcemaps: debug your original JSX and Sass source files in the browser.

How to use
----------
1. Install Yo: `npm install -g yo`
2. Clone the repository to your machine: `git clone https://github.com/pomerantsev/generator-react-browserify`
3. `cd` into the newly created folder.
4. `npm link` - creates a link in the global node modules folder to the current folder (to be able to use the generator globally).
Then, to create a project using the generator:
1. `mkdir my-new-project`
2. `cd my-new-project`
3. `yo react-browserify` - the generator will ask you for the name of the project, create the necessary files and install npm dependencies.

Tasks
-----
`gulp` (default) - builds the project for use in development, starts a server on `http://localhost:9000`, and watches all source files for changes.

`gulp build:prod` - builds the production version of the project (minified, no sourcemaps)

`gulp connect:prod` - starts a server for the production build. Only to check if everything's fine with the production version. Does not watch and rebuild files.

Enjoy!

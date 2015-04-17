require('babel/polyfill');

let React = require('react');

require('react-tap-event-plugin')();

let App = React.createClass({
  render () {
    return (
      <h1>Hello <%= projectName %>!</h1>
    );
  }
});

React.render(<App />, document.body);

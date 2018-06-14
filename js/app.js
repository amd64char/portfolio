import React, { Component } from 'react';
import data from '../package.json';
 
class App extends Component {
  render() {
    return (
        <ul>
        {
          data.map(function(resume){
            return <li>{resume.title} - {movie.about}</li>;
          })
        }
        </ul>
    );
  }
}
 
ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
import React from "react";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1 className="header">Digit Recog</h1>
        <button id="clear-button">Clear</button>

        <ul>
            <li><button className="circle-red"></button></li>
            <li><button className="circle-orange"></button></li>
            <li><span className="circle-yellow"></span></li>
            <li><span className="circle-green"></span></li>
            <li><span className="circle-blue"></span></li>
            <li><span className="circle-indigo"></span></li>
            <li><span className="circle-purple"></span></li>
        </ul>

        <div className="container mt-5"></div>
        <div className="column left">
            <canvas id="canvas"></canvas>
        </div>

        <div className="column right" id="rectangle">
            <p id="num"><span id="pred"></span></p>
            <p id="word"><span id="idk"></span></p>
        </div>

        <h2 className="footer">
          <div className="links">
            Created by: <a href="https://github.com/fofsfofs">Farhan</a>, <a href="https://github.com/sanjeev2001">Sanjeev</a>, <a href="https://github.com/Ashxnth">Ashanth</a>, <a href="https://github.com/Ricky-H142">Ricky</a> 
          </div>
        </h2>
      </div>
    );
  }
}

export default App;
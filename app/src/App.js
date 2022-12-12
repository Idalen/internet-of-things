import React from 'react';
import GraphPlot from './components/plot';

class App extends React.Component {
  state =  {plot1: "temperature", plot2: "humidity"}
  
  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div><GraphPlot measure= {this.state.plot1}/></div>
        <div><GraphPlot measure= {this.state.plot2}/></div>
      </div>
    );
  }
}

export default App;

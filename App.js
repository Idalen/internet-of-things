import React from 'react';
import Plot from 'react-plotly.js';
import axios from "axios";

class App extends React.Component {
 state = {
     dados: []
 }

  componentDidMount() {
      axios.get("http://localhost:6123/")
          .then((response)=> {
              const dados = response.data;
              this.setState({dados});
          })
  }

    render() {
    return (
      <Plot
        data={[
          {
            // x: [1, 2, 3],
            // y: [2, 3, 6],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'blue'},
          },
          {type: 'bar', x: this.state.dados, y: this.state.dados}, //todo: definir o X e o Y
        ]}
        layout={ {width: 800, height: 600, title: 'Planta Data',justifyContent:"center"} }
      />
    );
  }
}

export default App;

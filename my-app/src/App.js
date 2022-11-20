import React from 'react';
import Plot from 'react-plotly.js';
import axios from "axios";

class App extends React.Component {
  async getData() {
    const res = await axios.get({
      method: 'post',
      url: "http://localhost:6123/temperature",
      headers:{crossDomain:true},
      data: {
        "name":"smelling_pepper",
        "window": 7,
        "measurement" : "temperature"
      }
    })
    .catch((e) => {console.log(e.data.message)}); 

    console.log(res.json())
    return await res.json(); 
  }

  constructor(...args) {
    super(...args);
    this.state = {data: null};
  }

  componentDidMount() {
    if (!this.state.data) {
      (async () => {
          try {
              this.setState({data: await this.getData()});
          } catch (e) {
            console.log(e.name)   
          }
      })();
    }
  }

  render() {
    return (
      <Plot
        data={[
          {
            x: this.state.data.timestamp,
            y: this.state.data.measurement,
            //x: 0,
            //y: 0,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'blue'},
          }, //todo: definir o X e o Y
        ]}
        layout={ {width: 800, height: 600, title: 'Planta Data',justifyContent:"center"} }
      />
    );
  }
}

export default App;

import React from 'react';
import Plot from 'react-plotly.js';
import axios from "axios";

class App extends React.Component {
  async getData() {
    const res = await axios.get(
      'http://localhost:6123/temperature/',
      {params: {
        name:'smelling_pepper',
        window: "7",
        measurement : 'temperature'}
      },
      {headers:{crossDomain:true}}
    )
    .catch((e) => {
      console.log(e)
    }); 
    
    return await res.data; 
  }
  
  constructor(...args) {
    super(...args);
    this.state = {data: {"timestamp": [], "measurement":[]}};
  }
  
  componentDidMount() {
    (async () => {
        try {
          this.setState({data: await this.getData()});
        } catch (e) {
          console.log(e)
        }
      })();
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

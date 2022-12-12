import React from 'react';
import Plot from 'react-plotly.js';
import axios from "axios";

class GraphPlot extends React.Component {
  async getData() {
    const res = await axios.get(
      'http://server:3000/measure/',
      {params: {
        name:'smelling_pepper',
        window: "7",
        measurement : this.props.measure}
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
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'blue'},
          }
        ]}
        layout={ {title: this.props.measure ,justifyContent:"center"} }
      />
    );
  }
}

export default GraphPlot;

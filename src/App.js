import { useEffect, useRef } from 'react';
import FootballCharts from './chart';

import './App.css';

const data = [
  {a: 1},
  {b: 2},
  {c: 3}
]


function App() {
  const barChart = useRef()

  useEffect(() => {
    FootballCharts.drawBar(data, barChart, {
      'startDate': '1/1/2021',
      'endDate': '7/31/2021',
      'height': 400,
      'width': 900,
      'margin': {
        left: 0,
        right: 20,
        top: 10,
        bottom: 35
      }
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        College Football Visualizations
      </header>
      <svg ref={barChart}></svg>
    </div>
  );
}

export default App;


import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const Bar = ({data, options}: any) => {
  return (
    <Chart type='bar' data={data} options={options}/>
  )
}

export default Bar
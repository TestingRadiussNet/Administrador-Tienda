
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const Dona = ({data, options}: any) => {
  return (
    <Chart type='doughnut' data={data} options={options}/>
  )
}

export default Dona
import Map from '../components/map';
import Chart from '../components/chart';

const ChartAndMap = () => {


    return (
        <div className='bg-gray-200 w-full h-screen p-2 md:p-4 overflow-scroll hide-scrollbar'>

            <Map />

            <Chart />

        </div>
    );
}

export default ChartAndMap;
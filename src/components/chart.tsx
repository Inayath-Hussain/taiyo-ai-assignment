import axios from 'axios';
import { useState, useRef, useMemo } from 'react';
import { Line } from 'react-chartjs-2'
import { Chart as ChartJs, LineElement, CategoryScale, LinearScale, Tooltip, PointElement } from 'chart.js'
import { useQuery } from '@tanstack/react-query';
import RadioInput from '../components/radioInput';
import { historicalDataURL } from '../utilities/urls';
import { formatNumber } from '../utilities/formatNumber';
import '../App.css';

let data = Array.from({ length: 12 }, () => 0)

ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement
)


const Chart = () => {

    const countryRef = useRef('India');
    const [year, setYear] = useState<'20' | '21' | '22' | '23' | string>('20');

    // X-Axis label
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    // fetch data historical data
    const historicalQuery = useQuery({
        queryKey: [`historical data for ${countryRef.current}`],
        queryFn: async () => {
            const response = await axios.get(historicalDataURL(countryRef.current))
            return response.data
        }
    })

    // doesn't make api call if input is empty
    const handleChange = async () => {
        if (!countryRef.current) return

        await historicalQuery.refetch()
    }


    // reducing data from days format to months format
    const yAxisData = useMemo(() => {
        if (!historicalQuery.data) return null

        // empty array of size containing 0 as elements 
        let dataCopy = [...data]

        // regex pattern to check year
        let regexPattern = new RegExp(`${year}$`)

        const { cases } = historicalQuery.data.timeline

        for (let i in cases) {

            // checks if data is from same year as selected by user
            if (regexPattern.test(i)) {
                let month = Number(i.slice(0, i.indexOf('/')))

                dataCopy[month - 1] = dataCopy[month - 1] + cases[i]
            }
        }
        return dataCopy

    }, [year, historicalQuery.data])

    return (
        <>
            <h1 className="text-xl py-4 mt-2 sm:text-4xl sm:py-8 lg:text-5xlxl text-center">Line Graph</h1>


            <div className='flex flex-col justify-start items-start md:flex-row md:justify-around md:items-center'>
                <div className='flex flex-row justify-start items-center'>
                    <p className='font-semibold text-sm md:text-base'>Year : </p>
                    {['20', '21', '22', '23'].map(y => (
                        <RadioInput label={y} value={year === y} onChange={() => setYear(y)} key={y} />
                    ))}
                </div>

                <div className='flex flex-row justify-start items-center my-4 md:my-0'>
                    <p className='font-semibold text-sm md:text-base'>Country : </p>
                    <input type="text" className='mx-2 outline-0 p-2 rounded-md
                        mobile-end:rounded-lg' defaultValue={countryRef.current} onChange={(e) => { countryRef.current = e.target.value }} />

                    <button onClick={handleChange} className='p-2 bg-accent text-xs hidden md:text-sm md:block'>Change</button>

                </div>

                {/* will be visible only in mobile */}
                <button onClick={handleChange} className='p-2 self-center bg-accent text-xs md:text-sm md:hidden'>Change</button>

            </div>



            {(yAxisData) &&
                <div className='my-2 md:my-4'>
                    <Line
                        data={{ labels, datasets: [{ data: yAxisData, label: `${historicalQuery.data.country}`, backgroundColor: 'blue' }] }}
                        options={{
                            scales: {
                                y: {
                                    ticks: {
                                        callback: (tickValue) => formatNumber(tickValue as number)
                                    }
                                }
                            }
                        }}
                    />
                </div>
            }
        </>
    );
}

export default Chart;
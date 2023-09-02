import axios from 'axios';
import { useState, useRef, useMemo } from 'react';
import { Line } from 'react-chartjs-2'
import { Chart as ChartJs, LineElement, CategoryScale, LinearScale, Tooltip, PointElement } from 'chart.js'
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux'
import { selectCountries } from '../redux/countriesSlice';
import { historicalDataURL } from '../utilities/urls';
import { formatNumber } from '../utilities/formatNumber';
import '../App.css';
import SearchableDropdown from './searchableDropdown';

let data = Array.from({ length: 12 }, () => 0)

ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement
)


const Chart = () => {

    // X-Axis label
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const countries = useSelector(selectCountries)

    // useState causes chart to re-render again, to avoid that I'm using useRef
    const countryRef = useRef('India');

    const [year, setYear] = useState<'20' | '21' | '22' | '23' | string>('20');

    const [errorMsg, setErrorMsg] = useState('');

    // fetch data historical data
    const historicalQuery = useQuery({
        queryKey: [`historical data for ${countryRef.current}`],
        queryFn: async () => {
            try {
                let err = ''
                const response = await axios.get(historicalDataURL(countryRef.current))
                setErrorMsg(err)
                return response.data
            }
            catch (ex) {
                console.log('ex..........', ex)
                setErrorMsg(`No data found for ${countryRef.current}. Please change country`)
                return null
            }
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
            <h1 className="text-xl py-4 mt-16 sm:text-4xl sm:py-8 lg:text-5xlxl text-center">Line Graph</h1>


            <div className='flex flex-col justify-start items-start md:flex-row md:justify-around md:items-center'>
                <div className='flex flex-row justify-start items-center'>

                    <label htmlFor="year" className='text-lg font-medium'>Choose Year : </label>
                    <select className='ml-2 p-1 rounded-md' name="year" id='year' onChange={e => setYear(e.target.value)}>
                        {['20', '21', '22', '23'].map(v => (
                            <option key={v} value={v}>20{v}</option>
                        ))}
                        {/* <option value="20">2020</option>
                        <option value="21">2021</option>
                        <option value="22">2022</option>
                        <option value="23">2023</option> */}
                    </select>
                </div>

                <div className='flex flex-row justify-start items-center my-4 md:my-0'>
                    <label htmlFor='country' className='font-semibold text-sm md:text-base'>Country : </label>

                    <SearchableDropdown countryRef={countryRef} />

                    <button onClick={handleChange} className='p-2 bg-accent text-xs hidden md:text-sm md:block'>Change</button>

                </div>


                {/* will be visible only in mobile */}
                <button onClick={handleChange} className='p-2 self-center bg-accent text-xs md:text-sm md:hidden'>Change</button>

            </div>



            {!errorMsg ?
                (yAxisData && countries.length > 0) ?
                    <div className='h-52 sm:h-72 lg:h-[450px] my-2 md:my-4'>
                        <Line
                            data={{ labels, datasets: [{ data: yAxisData, label: `Cases in ${historicalQuery.data.country}`, backgroundColor: '#93C5FD', pointRadius: 4, borderColor: 'black', borderWidth: 1 }] }}
                            options={{
                                maintainAspectRatio: false,
                                responsive: true,
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
                    :
                    // loader for chart
                    <h1 className='text-center text-2xl md:text-6xl'>Loading Chart...</h1>

                :

                <h1 className='my-12 text-center text-lg md:text-4xl'>{errorMsg}</h1>
            }
        </>
    );
}

export default Chart;
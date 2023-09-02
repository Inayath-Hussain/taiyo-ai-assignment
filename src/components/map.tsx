// @ts-nocheck
// react-leaflet's Map has some missing attributes, were present in previous version and in api docs
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useDispatch } from 'react-redux'
import { updateList } from '../redux/countriesSlice'
import { dataForAllCountriesURL } from '../utilities/urls'
import { IallCountriesQueryData } from '../interface'
import PopupData from './popupData'


const Map = () => {

    const dispatch = useDispatch()

    const allCountriesQuery = useQuery({
        queryKey: ['data for all countries'],
        queryFn: async () => {
            const countries = [] as string[]
            const response = await axios.get<IallCountriesQueryData[]>(dataForAllCountriesURL)

            response.data.forEach(r => {
                countries.push(r.country)
            })

            dispatch(updateList(countries))
            return response.data as IallCountriesQueryData[]
        }
    })


    // data to show in popup of marker
    const getPopupData = (data: IallCountriesQueryData) => {
        return [
            { label: 'Active Cases', data: data.active },
            { label: 'Total Recovered', data: data.recovered },
            { label: 'Total Deaths', data: data.deaths }
        ]
    }

    // loading state
    if (allCountriesQuery.isLoading) {
        return <h1 className='text-center text-2xl md:text-6xl'>Loading Map...</h1>
    }

    return (
        <>
            <h1 className="text-xl py-4 sm:text-4xl sm:py-8 lg:text-5xlxl text-center">Map</h1>


            <MapContainer className='w-full h-80 md:h-96' center={[20, 77]} zoom={5} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* marker on all countries */}
                {allCountriesQuery.data && allCountriesQuery.data.map(d => (
                    <Marker position={[d.countryInfo.lat, d.countryInfo.long]} key={d.country}>
                        <Popup>
                            <p className='text-xs font-semibold text-center md:text-base'>{d.country}</p>
                            <PopupData data={getPopupData(d)} />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </>
    );
}

export default Map;
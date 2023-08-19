// @ts-nocheck
import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { dataForAllCountriesURL } from '../utilities/urls'
import { IallCountriesQueryData } from '../interface'
import PopupData from './popupData'


const Map = () => {

    const ref = useRef();

    const allCountriesQuery = useQuery({
        queryKey: ['data for all countries'],
        queryFn: async () => {
            const response = await axios.get(dataForAllCountriesURL)
            return response.data as IallCountriesQueryData[]
        }
    })

    const getPopupData = (data: IallCountriesQueryData) => {
        return [
            { label: 'Active Cases', data: data.active },
            { label: 'Total Recovered', data: data.recovered },
            { label: 'Total Deaths', data: data.deaths }
        ]
    }

    if (allCountriesQuery.isLoading) {
        return <h1 className='text-center'>Loading...</h1>
    }

    return (
        <>
            <h1 className="text-xl py-4 sm:text-4xl sm:py-8 lg:text-5xlxl text-center">Map</h1>


            <MapContainer ref={ref} className='w-full h-80 md:h-96' center={[20, 77]} zoom={5} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* marker on all countries */}
                {allCountriesQuery.data && allCountriesQuery.data.map(d => (
                    <Marker position={[d.countryInfo.lat, d.countryInfo.long]}>
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
'use client'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import { Country } from '@/utils/countries'
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})
type MapProps = {
  center: Country['latlng']
}
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const Map: React.FC<MapProps> = ({ center }) => {
  return (
    <MapContainer center={center} zoom={center ? 4 : 2} scrollWheelZoom={false} className='z-10 h-[35vh] rounded-lg'>
      <TileLayer url={url} attribution={attribution} />
      <Marker position={center} />
    </MapContainer>
  )
}

export default Map

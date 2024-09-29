'use client'

import {Loader} from '@googlemaps/js-api-loader'
import React from 'react'
import {env} from '~/env'
import {AspectRatio} from '~/shared/ui/components/aspect-ratio'

export default function GoogleMap() {
	const mapRef = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		const initMap = async () => {
			const loader = new Loader({
				apiKey: env.NEXT_PUBLIC_MAPS_API_KEY,
				version: 'weekly',
				language: 'sk',
				region: 'SK',
			})

			// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
			const {Map} = (await loader.importLibrary(
				'maps',
			)) as google.maps.MapsLibrary

			const {Marker} = (await loader.importLibrary(
				'marker',
			)) as google.maps.MarkerLibrary

			const position = {
				lat: 48.86227464198051,
				lng: 21.24744181215851,
			}

			const position1 = {
				lat: 48.989615095300245,
				lng: 21.236480998331814,
			}
			const position2 = {
				lat: 48.99651656370062,
				lng: 21.24075294066011,
			}
			const position3 = {
				lat: 48.72914750265622,
				lng: 21.26133320304195,
			}
			const position4 = {
				lat: 48.726288241037444,
				lng: 21.24940232715913,
			}

			// map options
			const mapOptions: google.maps.MapOptions = {
				center: position,
				zoom: 9,
				mapId: 'MY_KROMKA_MAP',
			}

			// setup the map
			const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

			// add a marker
			const marker1 = new Marker({
				position: position1,
				map,
			})
			const marker2 = new Marker({
				position: position2,
				map,
			})
			const marker3 = new Marker({
				position: position3,
				map,
			})
			const marker4 = new Marker({
				position: position4,
				map,
			})
		}

		initMap()
	}, [])

	return (
		<AspectRatio ratio={16 / 9} className='rounded-md bg-muted' ref={mapRef} />
	)
}

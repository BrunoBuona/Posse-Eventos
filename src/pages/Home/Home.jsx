import React from 'react'
import Carrousel from '../../components/Carrousel/Carrousel'
import TopArtists from '../../components/Home/Module2/TopArtist'
import ComingSoonEvents from '../../components/Home/Module3/ComingSoonEvents'
export default function Home() {
    return (
        <div>
            <Carrousel/>
           <ComingSoonEvents/>
        </div>
    )
    }
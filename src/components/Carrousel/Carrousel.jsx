import React, { useState, useEffect } from 'react'
import './Carrousel.css'

export default function Carrousel() {
    const [position, setPosition] = useState(0)

    let img = ['url(../assets/img/background3.jpg)', 'url(../assets/img/background2.jpg)']

    useEffect(() => {
        let idInterval = setInterval(() => {
            next();
        }, 5000);
        return () => clearInterval(idInterval);
        // eslint-disable-next-line
    }, [position]);

    const next = () => {
        if (position === img.length - 1) {
            setPosition(0)
        } else {
            setPosition(position + 1)
        }
    }

    return (
        <div className='background' style={{ backgroundImage: `${img[position]}` }}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <img style={{maxWidth:'50%',marginTop:'40vh'}} src="https://i.ibb.co/XtxMfth/Slogan-Transp-1.png" alt="" />
                {
                    img.map((item, index) => {
                    })
                }
            </div>
        </div>
    )
}

import React from "react"
import './Footer.css'
import { SocialIcon } from 'react-social-icons';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Footer() {
    const {t,i18n} = useTranslation()
    return (
        <footer className="footer">
                <h2 className="other-titles-footer">{t('¡Nuestras Redes!')}</h2>
                <div className="container-btns-footer">
                    
                    <button className="footer-social-btns">
                        <SocialIcon className="icon-social" network="instagram" bgColor="#9F00FF" fgColor="#ffffff" style={{ height: 40, width: 40 }} />
                        <a target="_blank" style={{textDecoration:'none',color:'#ffffff'}} href="https://www.instagram.com/possestarlets/">
                        <h6 className="footer-social-text">Instagram</h6>
                        </a>
                    </button>
                    <button className="footer-social-btns">
                        <SocialIcon className="icon-social" network="whatsapp" bgColor="#9F00FF" fgColor="#ffffff" style={{ height: 40, width: 40 }} />
                        <a target="_blank" style={{textDecoration:'none',color:'#ffffff'}} href="https://api.whatsapp.com/send?phone=+549%C2%A02254%C2%A053-6867&text=Hola%2C+tengo+una+consulta+¿Podrías+ayudarme%3F+😁">
                        <h6 className="footer-social-text">Whatsapp</h6>
                        </a>
                    </button>
                </div>

                <div>
                    <h4 className="footer-text">© 2023 POSSE. Todos los derechos reservados.</h4>
                </div>
        </footer>
    )
}
export { Footer }

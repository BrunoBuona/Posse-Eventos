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
                        <h6 className="footer-social-text">Instagram</h6>
                    </button>
                    <button className="footer-social-btns">
                        <SocialIcon className="icon-social" network="twitter" bgColor="#9F00FF" fgColor="#ffffff" style={{ height: 40, width: 40 }} />
                        <h6 className="footer-social-text">Twitter</h6>
                    </button>
                </div>

                <div>
                    <h4 className="footer-text">© 2023 POSSE. Todos los derechos reservados.</h4>
                </div>
        </footer>
    )
}
export { Footer }

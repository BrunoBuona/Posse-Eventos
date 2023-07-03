import './WorkWithUs.css'
import { useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import { useTranslation } from 'react-i18next';
export default function ModuleOne() {
  const {t} = useTranslation();
  const [presentation, setPresentation] = useState("Milagros");
  return (
    <>
      <div className='wwu-general-container'>
        <div className="wwu-background-presentation">
          <h2 className='presentation-h2'>{t("about_us")}</h2>
        </div>
        <div className='ww-our-presentation'>
          <h2 className='wwu-our-h2'>{t("Te presentamos nuestro Staff")}</h2>
          <div className='ww-images-state-container'>
            <div className={`image-container-state ${presentation === "Milagros" ? "image-container-state-selected" : ""}`}>
              <img className='staff-images-state' src="https://scontent.feze11-1.fna.fbcdn.net/v/t39.30808-6/297237386_5330922073641785_400566591518246095_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFkIgnfimcNbQNW0Ioaryn_eyJmx8MyiCN7ImbHwzKII2sL3Mnd7p1WTP-BG2_2qZFSTLrwtnymjEWrpeF8Xt8A&_nc_ohc=dXiKIc5dXdwAX-3nQxP&_nc_ht=scontent.feze11-1.fna&oh=00_AfAK8W3KggtvDXJfXpzeYMR4kTMkqi50ewWUfy27V939yQ&oe=649A25A4" alt="Milagros" onMouseEnter={e => setPresentation("Milagros")} />
            </div>
            <div className={`image-container-state ${presentation === "Perro" ? "image-container-state-selected" : ""}`}>
              <img onMouseEnter={e => setPresentation("Perro")} className='staff-images-state' src="https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ" alt="Perro" />
            </div>
            <div className={`image-container-state ${presentation === "Gato" ? "image-container-state-selected" : ""}`}>
              <img onMouseEnter={e => setPresentation("Gato")} className='staff-images-state' src="https://okdiario.com/img/2021/04/20/curiosidades-sobre-los-gatos-domesticos.jpg" alt="Gato" />
            </div>
          </div>
          <div>
            <div className='staff-description'>
              {presentation === "Milagros" &&
                <>
                  <h2>Milagros Mazzina Rous</h2>
                  <p>{t("Bartender Profesional")}</p>
                  <div className='wwu-social-icons'>
                    <a href="https://www.linkedin.com/in/ivan-gutierrez-castro/" target="_blank">
                      <SocialIcon className="icon-social" network="linkedin" bgColor="lightblue" fgColor="black" style={{ height: 40, width: 40 }} />
                    </a>
                  </div>
                </>
              }
              {presentation === "Perro" &&
                <>
                  <h2>Perrito Lindo</h2>
                  <p>{t("Un Golden Copado")}</p>
                  <div className='wwu-social-icons'>
                  <a href="https://www.linkedin.com/in/emilio-daniel-lubo-83a444220/" target="_blank">
                      <SocialIcon className="icon-social" network="linkedin" bgColor="lightblue" fgColor="black" style={{ height: 40, width: 40 }} />
                    </a>
                  </div>
                </>
              }
              {presentation === "Gato" &&
                <>
                  <h2>Gato Tierno</h2>
                  <p>{t("Gato Jugueton")}</p>
                  <div className='wwu-social-icons'>
                  <a href="https://www.linkedin.com/in/emilio-daniel-lubo-83a444220/" target="_blank">
                      <SocialIcon className="icon-social" network="linkedin" bgColor="lightblue" fgColor="black" style={{ height: 40, width: 40 }} />
                    </a>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
import React, { useRef } from "react";
import Swal from 'sweetalert2';
import axios from 'axios'
import { BASE_URL } from '../../../api/url'
import './Form.css'
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Form() {
    const navigate = useNavigate()
    const nameRef = useRef()
    const lastNameRef = useRef()
    const photoRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const formRef = useRef()
    const {t} = useTranslation()

    async function saveData(e) {
        e.preventDefault()
        let userValue = {
            name: nameRef.current.value,
            lastName: lastNameRef.current.value,
            dni: photoRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        try {
            let res = await axios.post(`${BASE_URL}/api/auth/sign-up`, userValue)
            if (res || res.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Genial!',
                    text: "¡Te registraste correctamente!",
                })
                formRef.current.reset()
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.response.data.message,
                })
            }
        } catch (error) {
            if (Array.isArray(error.response.data.message)) {
                Swal.fire({
                    icon: "error",
                    title: "Errors:",
                    html: error.response.data.message.join(' <br> '),
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: error.response ? error.response.data.message : error.message,
                    showConfirmButton: true,
                });
            }
        }
    }

    return (
        <>
            <div className="full-container-fluid d-flex container-login">
                <div className="w-100">
                    <form ref={formRef} className="formSign pb-5" >
                        <div className="form-shadows-content pb-3">
                            <div className="form-title-div pt-5 pb-3 text-center">
                                <h2 className="title2Sign">{t("register_your_account")}</h2>
                            </div>
                        </div>
                        <div className="form-bodySign pt-3 w-50">
                            <div className="inputGroup">
                                <input id="name" type="text" required autoComplete="off" ref={nameRef} />
                                <label htmlFor="name">Nombre</label>
                            </div>
                            <div className="inputGroup">
                                <input id="lastName" type="text" required autoComplete="off" ref={lastNameRef} />
                                <label htmlFor="lastName">Apellido</label>
                            </div>
                            <div className="inputGroup">
                                <input id="photo" type="text" required autoComplete="off" ref={photoRef} />
                                <label htmlFor="photo">DNI</label>
                            </div>
                            <div className="inputGroup">
                                <input id="email" type="email" required autoComplete="off" ref={emailRef} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputGroup">
                                <input id="password" type="password" required autoComplete="off" ref={passwordRef} />
                                <label htmlFor="password">Contraseña</label>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={saveData} className="submit2Sign">{t("sign_up")}</button>
                            </div>
                        </div>
                    </form>              
                </div>
                <div className="right">
                    <div className="right-content-title text-center">
                        <h1 className="title">{t("already_account")}</h1>
                        <h5 className="subTitle">{t("sign_in_get_started")}</h5>
                        <button className="submit2SignUp" onClick={() => navigate('/signin')}>{t("sign_in")}</button>
                    </div>
                </div>
            </div >
        </>
    );
}

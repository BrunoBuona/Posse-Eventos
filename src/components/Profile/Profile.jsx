import axios from "axios";
import { useTranslation } from "react-i18next";
import userActions from "../../redux/actions/userActions";
import { BASE_URL } from "../../api/url";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { SocialIcon } from "react-social-icons";
import { useRef, useState, useEffect } from "react";
import './Profile.css'
import { FaRegUser, FaBirthdayCake} from "react-icons/fa";
import { HiOutlineMail} from "react-icons/hi";

export default function Profile() {

    // Translation
    const { t } = useTranslation()

    // Redux
    let dispatch = useDispatch()
    let { reLogin, updateUser } = userActions
    let { user, token } = useSelector(store => store.user)
    let userId = user.id

    // Orders
    const [orders, setOrders] = useState([])

    async function getOrdersData(id, token) {
        try {
            let data = await axios.get(`${BASE_URL}/api/orders?id=${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
            setOrders(data.data.response)
        }catch {}
    }

    // Refs
    const refName = useRef()
    const refLastName = useRef()
    const refBirthDate = useRef()
    const refEmail = useRef()
    const refPassword = useRef()
    const refPassword2 = useRef()

    // Update User
    const [reload, setReload] = useState(false)

    // Preloader
    useEffect(() => {
        dispatch(reLogin(token))
        getOrdersData(userId, token)
        // eslint-disable-next-line
    }, [reload])

    // View State
    const [state, setState] = useState("details")
    const [photoState, setPhotoState] = useState(undefined)


    // Edit Profile Function
    function handleEditProfile(e) {

        // Prevent Refresh
        e.preventDefault()

        // Data to edit
        let data = {
            name: refName.current.value,
            lastName: refLastName.current.value,
            email: refEmail.current.value,
            birthDate: refBirthDate.current.value,
        }
        let objectEdit = {
            data,
            userId,
        }
        // Dispatch to update user
        dispatch(updateUser(objectEdit))

        // Alert
        Swal.fire({
            title: 'Profile updated',
            icon: 'success',
            confirmButtonText: 'OK'
        })
        setReload(!reload)
        setState("details")
    }

    // Edit Password Function
    function handleEditPassword(e) {

        // Prevent Refresh
        e.preventDefault()

        // Data to edit
        let data = {
            password: refPassword2.current.value,
        }
        let objectEdit = {
            data,
            userId,
        }
        // Dispatch to update user
        dispatch(updateUser(objectEdit))

        // Alert
        Swal.fire({
            title: 'Password Updated',
            icon: 'success',
            confirmButtonText: 'OK'
        })
        setReload(!reload)
        setState("details")
    }


    // Here we render the component

    return (
        <>
            <div className="Profile-Background">
                <div className="Profile-Container">
                    <div className="Profile-ColumnLeft">
                        <div className="Profile-Options">
                            <div className="Profile-Block-Container-1">
                                <div className="Profile-Internal-Block0">
                                    <h3>{user.name}</h3>
                                </div>
                                <div className="Profile-Internal-Block1">
                                    <div className="Profile-Block1-Photo">
                                        <img className="Profile-Photo" src="https://cdn.landesa.org/wp-content/uploads/default-user-image.png" alt={user.name} />
                                    </div>
                                    <div className="Profile-Block1-Script">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Profile-Block-Container-2">
                            <div className="Profile-Internal-Block2">
                                <h6 onClick={e => setState("details")}>{t("profile_details")}</h6>
                            </div>
                            <div className="Profile-Internal-Block2">
                                <h6 onClick={e => setState("changePwd")}>{t("user_pass")}</h6>
                            </div>
                            {/* <div className="Profile-Internal-Block2">
                                <h6 onClick={e => setState("activity")}>{t("user_ac")}</h6>
                            </div> */}
                            <div className="Profile-Internal-Block2">
                                <h6 onClick={e => setState("orders")}>{t("user_or")}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="Profile-ColumnRight">
                        <div className="Container-ColumnRight">
                            {state === "details" &&
                                <>
                                    <div className="title-profile pb-5">
                                        <h2>{t("profile_details")}</h2>
                                    </div>
                                    <div className="personal-data gap-2">
                                        <p className="personal-data-p"> <HiOutlineMail /> {user.email}</p>
                                        <p className="personal-data-p"> <FaRegUser /> {user.name} {user.lastName}</p>
                                        <button className='btn-design-profile' onClick={e => setState("editprofile")}>{t("edit_profile")}</button>
                                    </div>
                                </>
                            }
                            {state === "editprofile" &&
                                <>
                                    <div className="title-profile">
                                        <h2>{t("profile_details")}</h2>
                                    </div>
                                    <div className="personal-data">
                                        <label htmlFor="">
                                            {t("name")}:
                                            <input type="text" ref={refName} defaultValue={user.name} placeholder={user.name} />
                                        </label>
                                        <label htmlFor="">
                                            {t("Lname")}:
                                            <input type="text" ref={refLastName} defaultValue={user.lastName} placeholder={user.lastName} />
                                        </label>
                                        <label htmlFor="">
                                            {t("email")}:
                                            <input type="text" ref={refEmail} defaultValue={user.email} placeholder={user.email} />
                                        </label>
                                        <label htmlFor="">
                                            {t("birth")}:
                                            <input type="date" ref={refBirthDate} defaultValue={user.birthDate} placeholder={user.birthDate} />
                                        </label>
                                        <div>
                                            <button className='btn-design-profile' onClick={e => setState("details")}>{t("cancel")}</button>
                                            <button className='btn-design-profile' onClick={e => handleEditProfile(e)}>{t("confirm_changes")}</button>
                                        </div>
                                    </div>
                                </>
                            }
                            {state === "changePwd" &&
                                <div className="title-profile">
                                    <h2>{t("user_pass")}</h2>
                                    <label htmlFor="">
                                        {t("old_password")}
                                        <input type="password" />
                                    </label>
                                    <label htmlFor="">
                                        {t("new_password")}
                                        <input type="password" ref={refPassword} placeholder="******" />
                                    </label>
                                    <label htmlFor="">
                                        {t("repeat_new_password")}
                                        <input type="password" ref={refPassword2} placeholder="******" />
                                    </label>
                                    <div>
                                        <button className='btn-design-profile' onClick={e => {
                                            {
                                                refPassword.current.value === refPassword2.current.value ? handleEditPassword(e) : Swal.fire({
                                                    title: 'Las contraseñas no coinciden.',
                                                    icon: 'error',
                                                    confirmButtonText: 'Ok'
                                                })
                                            }
                                        }}
                                        >{t("save_new_password")}
                                        </button>
                                    </div>
                                </div>
                            }
                            {state === "activity" &&
                                <>
                                    <div className="title-profile">
                                        <h2>Your activity</h2>
                                    </div>
                                    <div className="title-profile">
                                        <h2>Your Reactions</h2>
                                    </div>
                                    <div className="scroll">
                                        <div className="container-box-profile">
                                            <p>You liked this concert: <span>Iron Maiden</span></p>
                                        </div>
                                        <div className="container-box-profile">
                                            <p>You Hated this concert: <span>Iron Maiden</span></p>
                                        </div>
                                    </div>
                                    <div className="title-profile">
                                        <h2>Your Comments</h2>
                                    </div>
                                    <div className="scroll">
                                        <div className="container-box-profile">
                                            <p>You commented this concert: Iron Maiden</p>
                                        </div>
                                        <div className="container-box-profile">
                                            <p>You commented this concert: Saxo Violento</p>
                                        </div>
                                    </div>
                                </>
                            }
                            {state === "orders" &&
                                <>
                                    <div className="title-profile">
                                        <h2>{t("user_or")}</h2>
                                    </div>
                                    <div className="scroll-orders">
                                        {orders.map((order) => {
                                            console.log(orders)
                                            return (
                                                <div className="container-box-profile">
                                                    <p>{order.items.map(e => e.concertName)} | {new Date(order.date).toLocaleDateString()}</p>
                                                </div>
                                            )
                                        })}

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

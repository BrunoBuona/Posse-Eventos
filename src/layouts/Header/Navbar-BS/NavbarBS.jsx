import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavbarBS.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ButtonNav from "../../../components/ButtonNav/ButtonNav";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import userActions from "../../../redux/actions/userActions";
import { useTranslation } from "react-i18next";

export default function NavbarBS() {
  let { online, name, photo, token, role } = useSelector(state => state.user)
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { logout } = userActions;
  const {t} = useTranslation()
  let togglerRef = useRef(null)
  let collapseRef = useRef(null)
  const [isHome, setIsHome] = useState(true);
  const {cart} = useSelector(store => store.cart)

    useEffect(() => {
        document.addEventListener("mouseup", (e) => {
            e.stopPropagation();
            if (typeof e.target.className === "string") {
                if (!e.target.className.includes("navColapse") && !e.target.className.includes("navDrop") && !e.target.className.includes("navbar-toggler") && !e.target.className.includes("navbar-toggler-icon")) {
                    setOpen(false);
                    if (collapseRef.current.classList.contains("show")) {
                        togglerRef.current.click();
                    }
                }
            }
          })
    setOpen(false)
    if(collapseRef.current.classList.contains('show')){
      togglerRef.current.click()
    }  
    if(location.pathname === "/") {
        setIsHome(true);
    } else {
        setIsHome(false);
    }
  }, [location])

  function signOut() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, log out!'
    })
        .then((result) => {
            if (result.isConfirmed) {
                dispatch(logout(token));
                Swal.fire("Logged out!", "You have been logged out", "success");
            }
        });
    }

  return (
 <Navbar collapseOnSelect className={`navBar ${isHome ? 'Navbar-transparent' : 'Navbar-solid' }`} expand="lg" variant="dark">
            <Container className="nav-flex2" style={{ alignItems: "center", display: "flex" }}>
                <Link to="/" style={{textDecoration: 'none'}}>
                <Navbar.Brand style={{ margin: "0" }}>
                    <img className="navbar-logo pb-2 pe-2" src="../assets/img/logo.png" alt="Logo" />
                    POSSE
                </Navbar.Brand>
                </Link>
                <Navbar.Toggle ref={togglerRef} aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse ref={collapseRef} id="responsive-navbar-nav" className="navColapse">
                    <Nav className="me-auto nav-flex1">
                        <Link className="nav-btn" to="/">
                            {t("home")}
                        </Link>
                        <Link className="nav-btn" to="/concerts">
                            {t("Eventos")}
                        </Link>
                        {!online ? (
                            <div className="navDrop">
                                <ButtonNav ku={(e) => (e.key === "Escape" ? setOpen(false) : "")} fx={() => setOpen(!open)} />
                                {open && (
                                    <div className="menu">
                                        <Link className="nav-btn navDrop" to="signup">
                                            {t("sign_up")}
                                        </Link>
                                        <Link className="nav-btn navDrop" to="signin">
                                            {t("sign_in")}{" "}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link className="nav-btn-cart position-relative" to="cart">
                                    <img src="../assets/img/cart.png" alt="cart" width="40px"  />
                                    {cart?.items?.length && <div className="position-absolute top-0 end-0 Nabvar-number-cart">{cart.items.length}</div>}
                                </Link>
                                <div className="navDrop d-flex flex-column align-items-center justify-content-center gap-1 pt-4">
                                    <img className="navDrop user__img" src="https://cdn.landesa.org/wp-content/uploads/default-user-image.png" width="40" alt="userLoged" onKeyUp={(e) => (e.key === "Escape" ? setOpen(false) : "")} onClick={() => setOpen(!open)} />
                                    <h5 className="text-white fs-6">{name}</h5>
                                    {open && (
                                        <div className="menu-in">
                                            {role === "admin" && (
                                                <Link className="nav-btn navDrop" to={"/admin"}>
                                                    Admin Panel
                                                </Link>
                                            )}
                                            <Link className="nav-btn navDrop" to="profile">
                                                {t("profile")}
                                            </Link>
                                            <Link className="nav-btn navDrop" onClick={signOut}>
                                                {t("log_out")}
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
}

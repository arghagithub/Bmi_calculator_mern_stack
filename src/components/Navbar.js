import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
const Navbar = (props) => {
    const { showalert } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const Logout = () => {
        showalert("logged out successfully", "success");
        localStorage.removeItem('userlogintoken');
        setTimeout(() => {
            navigate('/login');
        }, 1500);
    }
    const handleSearch = () => {
        let searchval = document.getElementById('search').value.toLowerCase();
        let data = Array.from(document.getElementsByClassName('card'));
        data.forEach((element) => {
            let text = element.querySelector('.card-title').innerText.toLowerCase();
            if (text.includes(searchval)) {
                element.style.display = 'block';
            }
            else {
                element.style.display = 'none';
            }
        })
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">BMI Calculator</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`} to="/admin">Admin</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <Link role='button' to='/showuser' style={{ border: '2px solid yellow', borderRadius: '30px' }} className="btn mx-2"><i className="fa-solid fa-user fa-xl" style={{ color: '#fff700' }}></i></Link>
                            <input className="form-control me-2" type="search" placeholder="search user's name" aria-label="Search" id='search' onInput={handleSearch} />
                            <Link className="btn btn-warning" to="/login" role="button" style={{ display: (localStorage.getItem('userlogintoken')) ? 'none' : '' }}>Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup" role="button" style={{ display: (localStorage.getItem('userlogintoken')) ? 'none' : '' }}>Signup</Link>
                            <button className="btn btn-success mr-2" style={{ display: (localStorage.getItem('userlogintoken')) ? '' : 'none' }} type="submit" onClick={Logout}>Logout</button>
                        </form>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar

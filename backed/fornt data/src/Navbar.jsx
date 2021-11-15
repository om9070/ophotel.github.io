import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Service from './Service';


const Navbar = () => {
    const [data, setdata] = useState("");

    const getfun = (e) => {
        setdata(e.target.value);
    }

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light bg-light w-auto">
                <div className="container-fluid">
                    <h5 className="navbar-brand" >HOTEL</h5>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item hover-zoom">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/service">Service</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/order">Your order</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/log">log in</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="logout" >log out</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2 search" type="search" placeholder="Search only for service" aria-label="Search" value={data} onChange={getfun} />

                        </form>
                    </div>
                </div>
            </nav>


            <Switch>
                <Route exact path="/service" component={() => <Service value={data} />} />
                {/* <Route component={Error} /> */}
            </Switch>
        </>
    )
}


export default Navbar;
import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className="header">
                <h1 className="header_frist text-center">WELCOME TO HOTEL MANAGEMENT WEBSITE</h1>
                <Link to="/service"><h3 className="header_second" >Let's Start</h3></Link>
            </div>
        </>
    )
}
export default Home;
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';



const Log = () => {
    let history = useHistory();
    const [email, setemail] = useState("");
    const [password, setpass] = useState("");


    const logindata = async (e) => {
        e.preventDefault();
        const log = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })


        const orgdata = await log.json()
        console.log(orgdata)

        if (log.status === 400 || !orgdata) {
            window.alert("login invaild")
        }
        else {
            window.alert("login succesfully")
            console.log(history);
            history.replace("/service")
        }
    }

    return (
        <>
            <div className="log_in">
                <div className="container-fluid d-flex align-items-center justify-content-center row ">
                    <div className="col-md-4 ">
                        <form method="POST">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                <input type="email" name="email" onChange={(e) => setemail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input type="password" name="password" onChange={(e) => setpass(e.target.value)} class="form-control" id="exampleInputPassword1" />
                            </div>
                            <button type="submit" onClick={logindata} class="btn search">Submit</button>
                        </form>
                    </div>
                    <div className="col-md-4 d-flex justify-content-center align-content-center">
                        <Link to="/register"><h3 className="register">Register Now</h3></Link>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Log;
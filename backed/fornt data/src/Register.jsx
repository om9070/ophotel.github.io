import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const Register = () => {

    const history = useHistory()
    const [res, setres] = useState({
        name: "", number: "", email: "", password: "", cpassword: ""
    })

    const fristfun = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setres({ ...res, [name]: value })
    }





    const finalfun = async (e) => {
        e.preventDefault();
        const { name, number, email, password, cpassword } = res;
        const data = await fetch("/frist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, number, email, password, cpassword
            })
        })
        const orgdata = await data.json()
        if (data.status === 422 || !orgdata) {
            window.alert("invalid register");
        }
        else {
            window.alert("registration success");
            history.push("/log")
        }
    }
    return (
        <>
            <div className="log_in">
                <div className="container-fluid d-flex align-items-center justify-content-center row ">
                    <form method="POST" id="register-form" className=" register-form col-md-4 col-sm-8 order-xxl-1  ">

                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Name</label>
                            <input type="text" name="name" value={res.name} onChange={fristfun} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Number</label>
                            <input type="text" name="number" value={res.number} onChange={fristfun} class="form-control" id="exampleInputPassword1" />
                        </div>

                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Email</label>
                            <input type="email" name="email" value={res.email} onChange={fristfun} class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" name="password" value={res.password} onChange={fristfun} class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                            <input type="password" name="cpassword" value={res.cpassword} onChange={fristfun} class="form-control" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" onClick={finalfun} class="btn search my-2">Submit</button>

                    </form>
                    <div className="col-md-4 col-sm-8 order-xxl-2">
                        <div className="img_photo ">
                            <img className="w-100" src={"../img/room1.jpg"} />
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
export default Register;
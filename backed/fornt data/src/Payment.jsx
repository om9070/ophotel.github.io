import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";


const Payment = (props) => {
    const history = useHistory();

    const [pay, setpay] = useState({ name: "", mobile: "", address: "", email: "", photo: "" })
    const [eff, seteff] = useState({ image: (props.history.location.state[0].image), price: (props.history.location.state[0].price), tittle: (props.history.location.state[0].tittle) })
    console.log(eff.image, eff.price, eff.tittle);

    const papu = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setpay({ ...pay, [name]: value })
        console.log(pay.name, pay.photo, pay.address, pay.mobile, pay.email)
    }

    const upimage = (event) => {
        setpay({ ...pay, photo: event.target.files[0] })
        console.log(event.target.files[0])

    }

    const getorder = async (e) => {
        e.preventDefault();
        // const { name, mobile, address, email, photo } = pay;
        // const { image, price, tittle } = eff;
        // console.log("this is photo", photo)

        try {
            var fd = new FormData();
            fd.append("name", pay.name)
            fd.append("mobile", pay.mobile)
            fd.append("address", pay.address)
            fd.append("email", pay.email)
            fd.append("photo", pay.photo)
            fd.append("image", eff.image)
            fd.append("price", eff.price)
            fd.append("tittle", eff.tittle)

            const data = await fetch("/third", {
                method: "POST",
                // headers: {
                //     "Content-Type": "application/json",
                // },
                body: fd
            })
            const orgdata = await data.json();
            console.log("this is frist")
            console.log(orgdata);



            if (data.status === 201) {
                console.log("this is belong to succes")
                history.push("/order");
            } else if (data.status == 401 || !orgdata) {
                console.log("this is belong to worng")

                history.push("/log");
            }

        } catch (e) {
            console.log(e);
            console.log("ites belong to new data")
            history.push("/log");

        }


    }
    return (
        <>
            <form enctype="multipart/form-data" method="POST">
                <div className="container-fluid col-md-10 text-center my-2 form-group">

                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active ">
                                <img src={props.history.location.state[0].image} className="d-block w-100" alt="image" />
                            </div>
                            <div className="carousel-item ">
                                <img src={props.history.location.state[0].image1} className="d-block w-100" alt="image" />
                            </div>
                            <div className="carousel-item ">
                                <img src={props.history.location.state[0].image2} className="d-block w-100" alt="image" />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <div className="container-fluid col-md-8 text-start mb-4">
                    <div className="mb-0 row">

                        <div className="col-sm-10">
                            <p readonly className="form-control-plaintext card-text" id="staticEmail"  >{props.history.location.state[0].tittle}</p>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-sm-10">
                            <p type="text" readonly className="form-control-plaintext card-text" id="staticEmail" >{props.history.location.state[0].summery}</p>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-sm-10">
                            <p readonly className="form-control-plaintext card-text" id="staticEmail" ><span> price:</span>  {props.history.location.state[0].price}</p>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="inputPassword" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" name="name" value={pay.name} onChange={papu} className="form-control" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="inputPassword" className="col-sm-2 col-form-label">Mobile</label>
                        <div className="col-sm-10">
                            <input type="text" name="mobile" value={pay.mobile} onChange={papu} className="form-control" />
                        </div>
                    </div><div className="mb-3 row">
                        <label for="inputPassword" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" name="email" value={pay.email} onChange={papu} className="form-control" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="inputPassword" className="col-sm-2 col-form-label">Address</label>
                        <div className="col-sm-10">
                            <textarea type="text" name="address" value={pay.address} onChange={papu} className="form-control" />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label for="inputPassword" className="col-sm-2 col-form-label"></label>
                        <p > <i>please upload recipt screenshot of payment</i>  </p>
                        <div className="col-sm-10">
                            <input type="file" name="photo" onChange={upimage} className="form-control" />
                        </div>
                    </div>
                    <button type="submit" className="btn search mb-5" onClick={getorder}>Submit</button>

                </div>
            </form>
        </>
    )
}
export default Payment;
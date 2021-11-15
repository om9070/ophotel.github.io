import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"

const Orderpush = (props) => {
    console.log(props.location.state)
    const [pay, setrom] = useState({});
    const [get, setget] = useState({});
    const [baba, setbaba] = useState("")
    const history = useHistory()
    const remodify = async () => {
        const res = await fetch("/seven", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const rece = await res.json();

        rece.payment.map((val) => {
            if (val._id == props.location.state) {
                setget(val)
                setrom({ ...pay, name: val.name, mobile: val.mobile, address: val.address, email: val.email, photo: val.photo });
            }
        })

    }

    useEffect(() => {
        remodify();

    }, [])


    const papu = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setrom({ ...pay, [name]: value })

    }

    const removeimg = (event) => {
        setbaba(event.target.files[0])
        console.log(event.target.files[0]);
    }
    console.log(pay.photo)
    console.log(get)

    const updatareal = async (e) => {
        e.preventDefault();

        try {
            var formdata = new FormData();
            formdata.append("name", pay.name)
            formdata.append("mobile", pay.mobile)
            formdata.append("address", pay.address)
            formdata.append("email", pay.email)
            formdata.append("photo", baba == null ? pay.photo : baba)
            formdata.append("id", props.location.state)




            const data = await fetch("/eight", {
                method: "PUT",
                body: formdata
            })
            const orgdata = await data.json();
            console.log("this is frist")
            console.log(orgdata);



            if (data.status === 201) {
                console.log("this is belong to succes")
                history.push("/order");
            } else {
                console.log("this is belong to worng")
                window.alert("sorry!data din't changed")

                history.push("/orderpush");
            }

        } catch (e) {
            window.alert("data din't changed")
            console.log("ites belong to new data", e)
            history.push("/orderpush");

        }
    }
    return (
        <>
            <form enctype="multipart/form-data" method="PUT">
                <div className="container-fluid col-md-10 text-center my-2 form-group">
                    <div className=" ">
                        <img src={get.image} className="d-block w-100" alt="image" />
                    </div>
                    <div className="col-sm-10 my-3">
                        <p readonly className=" card-text text-start" id="staticEmail"  >{get.tittle}</p>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-sm-10 ">
                            <p readonly className="form-control-plaintext card-text text-start"  ><span> price:</span>  {get.price}</p>
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
                    </div>
                    <div className="mb-3 row">
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
                    <div className="col-sm-10  d-flex justify-content-between">
                        <div className="mb-3 row ">
                            <label className="col-sm-2 col-form-label"></label>
                            <p > <i>please upload recipt screenshot of payment</i>  </p>
                            <div className="col-sm-10">
                                <input type="file" name="photo" onChange={removeimg} />
                            </div>

                        </div>
                        <div className="col-sm-4">
                            <img src={pay.photo} className="d-block w-100" alt="image" />
                        </div>
                    </div>



                    <button type="submit" className="btn search my-5" onClick={updatareal}>Submit</button>


                </div>
            </form>
        </>
    )
}
export default Orderpush;
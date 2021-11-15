import React, { useEffect, useState } from 'react'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link, useHistory } from 'react-router-dom';





const Order = () => {
    const history = useHistory();
    const [ms, setms] = useState([]);
    const [line, setline] = useState(false)

    const paraitem = async ([email, tittle, id]) => {
        console.log(email, tittle)
        const data = await fetch("/four", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, tittle, id }),
        })
        const orgdata = await data.json()
        console.log(orgdata);
        window.alert("deleted succesfully")
        orderdata();

    }




    const orderdata = async () => {
        try {
            const res = await fetch("/second", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data = await res.json();
            console.log(data);

            setms(data.payment);
            console.log(ms)

            if (!data) {
                history.push("/log")
            }
            console.log(data.payment);
        } catch (e) {
            console.log(e);
            history.push("/log")
        }
    }

    useEffect(() => {
        orderdata();
    }, [])


    return (
        <>
            {
                ms.length === 0 ? <h4 className="text-center my-5 py-5">you haven't book anything yet</h4> : ms.map((val) => {
                    if (val.deleted) {
                        return (
                            <div className="card-body my-3"  >
                                <div className="container-fluid d-flex row mb-4" style={{ textDecoration: true ? "line-through" : "none" }} >
                                    <div className="col-md-4 col-sm-8 order-xxl-1  ">
                                        <img src={val.image} class="card-img-top my-3" alt="image" />
                                    </div>
                                    <div className="col-md-8 col-sm-8 order-xxl-2" style={{ textDecoration: line ? "line-through" : "none" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{val.tittle}</h5>
                                            <p className="card-text">this is belong to new data but it is use to update anything
                                                then you can connect anytime but dont mind you cheack anyhings type of data u will improve
                                                yourself that is dummy data i am writing just not a seriusly  </p>
                                            <h5><span><AttachMoneyIcon /></span>{val.price}</h5>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        )

                    } else {


                        return (
                            <div className="card-body my-3" >
                                <div className="container-fluid d-flex row mb-4" style={{ textDecoration: false ? "line-through" : "none" }} >
                                    <div className="col-md-4 col-sm-8 order-xxl-1  ">
                                        <img src={val.image} class="card-img-top my-3" alt="image" />
                                    </div>
                                    <div className="col-md-8 col-sm-8 order-xxl-2" style={{ textDecoration: line ? "line-through" : "none" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{val.tittle}</h5>
                                            <p className="card-text">this is belong to new data but it is use to update anything
                                                then you can connect anytime but dont mind you cheack anyhings type of data u will improve
                                                yourself that is dummy data i am writing just not a seriusly</p>
                                            <h5><span><AttachMoneyIcon /></span>{val.price}</h5>
                                            <button className="btn btn-primary mx-2 my-2" onClick={() => { paraitem([val.email, val.tittle, val._id]) }} >Cancel</button>
                                            <Link to={{
                                                pathname: '/orderpush',
                                                state: (val._id)
                                            }} className="btn btn-danger">Modifie</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    }
                })
            }


        </>
    )
}
export default Order;
import React, { useState, useEffect } from 'react'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Api from './Api';
import { useHistory } from "react-router-dom";




const Service = (props) => {
    const [gt, setgt] = useState(Api)
    const [tri, settri] = useState([]);
    const history = useHistory();


    const starteddata = async () => {
        try {

            const res = await fetch("/six", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })


            const ttt = await res.json();
            settri(ttt.payment)


        } catch (e) {
            console.log(e);
        }
    }





    useEffect(() => {
        starteddata()
        tri.map((val) => {
            if (val.deleted == undefined) {
                const tryp = (val.tittle);
                setgt((olditem) => {
                    return olditem.filter((errelem) => {
                        return errelem.tittle != tryp;
                    })
                })

            }
        })
    }, [tri])




    const getnext = ([id, tittle]) => {
        let newdata = gt.find((elem) => {
            console.log("this area", tittle)

            return elem.id == id;
        })

        console.log(newdata);

        history.push("/Payment", [newdata])

    }

    console.log(tri);



    return (
        <>

            <div className=" row mb-5 mt-3 container-fluid d-flex justify-content-md-center">
                {
                    gt
                        .filter((curr) => {
                            return curr.tittle.toLowerCase().includes(props.value.toLowerCase())
                        })
                        .map((val) => {
                            return (
                                <div className="card col-4 col-xl-4 col-md-8 mx-2 my-2 mx-auto " key={val.id}>
                                    <img src={val.image} className="card-img-top" alt="photo" />
                                    <div className="card-body">
                                        <h5 className="card-title">{val.tittle}</h5>
                                        <p className="card-text" >{val.para}</p>

                                        <h5><span><AttachMoneyIcon /></span>{val.price}</h5>
                                        <button className="btn search  forword" onClick={() => getnext([val.id, val.tittle])}>{val.btn}</button>
                                    </div>
                                </div>
                            )
                        })
                }

            </div>


        </>
    )
}
export default Service;
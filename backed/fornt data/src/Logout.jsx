import React from 'react'
import { useHistory } from 'react-router';
import { useEffect } from 'react';

const Logout = () => {
    const history = useHistory();
    useEffect(() => {
        fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            history.push("./log");
        }).catch((e) => {
            console.log("somethin", e);
        })
    })
    return (
        <>
            <h2>this is log in</h2>
        </>
    )
}

export default Logout;
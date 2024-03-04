import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const Home = () => {
    return (
        <div>
            <h1>
                Welcom to the Achievement Page
            </h1>
            <h3>
                Where all your dreams come true!
            </h3>
            <Button variant="primary" type="button" onClick={() => submitForm()}>
                    Submit
            </Button>
        </div>
    )
};

const submitForm = () => {
    
    console.log("hello");

    axios.get('http://localhost:8080').then((data) => {
        console.log("respose from serve asd", data);
    })
}

export default Home;

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

interface IForm {
    title: string,
    description: string,
    option: string,
}


export default function CreateAchievement() {
    const [form, setForm] = useState({ option: "0", title: "", description: "" })

    return (
        <div>
            <h1>Create new Achievement</h1>
            <h3>TODOs:</h3>
            <ul>
                <li>Handle inputs from the user</li>
                <li>Create template for the achievement</li>
                <li>Modify template based on the inputs</li>
                <li>Store achievement</li>
            </ul>
            {renderCreateForm({ form, setForm })}
            <div>
                Selected option = {form.option}
            </div>
        </div>
    )
};

const renderCreateForm = (props: { form: IForm; setForm: any; }) => {

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formAchivementTitle">
                    <Form.Label>Achivement Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Achivement Title" value={props.form.title} onChange={(e: { target: { value: string; }; }) => props.setForm({ ...props.form, title: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAchivementDesc">
                    <Form.Label>Achievement Desctiption</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter Achivement Description" value={props.form.description} onChange={(e: { target: { value: any; }; }) => props.setForm({ ...props.form, description: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Select placeholder="Select Placeholder" value={props.form.option} onChange={(e: { target: { value: any; }; }) => props.setForm({ ...props.form, option: e.target.value })}>
                        <option value="0">-- Select field of Achievement --</option>
                        <option value="1">Development</option>
                        <option value="2">Environment</option>
                        <option value="3">Other</option>
                    </ Form.Select>
                </Form.Group>
                <Button variant="primary" type="button" disabled={props.form.option === "0"} onClick={() => submitForm(props)}>
                    Submit
                </Button>
            </Form>
        </div>
    )
};

const submitForm = (props: { form: IForm; setForm: (arg: IForm) => void; }) => {
    console.log("hello", props.form);

    fetch(`${import.meta.env.VITE_APP}achievement`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'title': props.form.title,
            'description': props.form.description,
            'option': props.form.option,
        }),
    });


    props.setForm({ option: "0", title: "", description: "" });
};

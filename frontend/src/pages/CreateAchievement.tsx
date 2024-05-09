import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useSWR from "swr";
import { IAchievementTypeProps } from "../interface/AchievementInterface";
import { IAchievementForm } from "../interface/FormInterface";
import fetcher from "../models/fetcher";

export default function CreateAchievement() {
    const [form, setForm] = useState({ achievementTypeId: "0", title: "", description: "" })
    const { data, error } = useSWR(`${import.meta.env.VITE_APP}achievementType`, fetcher);

    if (error) { return <div>Failed to load...</div> }
    if (!data) return <div>loading...</div>

    return (
        <div>
            <h1>Create new Achievement</h1>
            <h3>TODOs:</h3>
            <ul>
                <li>Modify template based on the inputs</li>
                <li>Make some input limitations e.g. max 500 chars</li>
            </ul>
            {renderCreateForm({ form, setForm, data })}
        </div>
    )
};

const renderCreateForm = (props: { form: IAchievementForm; setForm: (formData: IAchievementForm) => void; data: { _: string, data: IAchievementTypeProps[] } }) => {
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="formAchivementTitle">
                    <Form.Label>Achivement Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Achivement Title" value={props.form.title}
                        onChange={(e) => props.setForm({ ...props.form, title: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAchivementDesc">
                    <Form.Label>Achievement Desctiption</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter Achivement Description" value={props.form.description}
                        onChange={(e) => props.setForm({ ...props.form, description: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Select value={props.form.achievementTypeId}
                        onChange={(e) => props.setForm({ ...props.form, achievementTypeId: e.target.value })}>
                        <option value="0">-- Select field of Achievement --</option>

                        {props.data.data.map((opt: IAchievementTypeProps, index: number) => {
                            return (
                                <option value={opt.id} key={index}>{opt.name}</option>
                            )
                        })}

                    </ Form.Select>
                </Form.Group>

                <Button variant="primary" type="button" onClick={() => submitForm(props)}
                    disabled={props.form.achievementTypeId === "0" || props.form.title === "" || props.form.description === ""}>
                    Submit
                </Button>
            </Form>
        </div>
    )
};

const submitForm = async (props: { form: IAchievementForm; setForm: (arg: IAchievementForm) => void; }) => {
    await fetch(`${import.meta.env.VITE_APP}achievement`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...props.form,
        }),
    });

    props.setForm({ achievementTypeId: "0", title: "", description: "" });
};

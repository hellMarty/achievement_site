import React, { useState } from "react";
import { tryParse } from "../pages/Themes";

export interface IEditCardProp {
    name: string,
    originalStyle: string,
    remove: (_: string) => void,
    submit: (_: string) => void,
    setStyle: (_: string) => void,
    style: string,
}

export default function EditCard(editCardProps: IEditCardProp) {
    const [opened, setOpened] = useState(false)
    const [input, setInput] = useState(editCardProps.originalStyle)

    const [completeStyle, setCompleteStyle] = useState("")

    const [origStyle, setOrigStyle] = useState(editCardProps.originalStyle)

    return (
        <div className={`edit_card ${opened ? "opened" : ""}`} >
            <div>

                {editCardProps.name}
                <button onClick={() => setOpened(!opened)}>open</button>
                <button onClick={() => editCardProps.remove(editCardProps.name)}>close</button>

            </div>
            {opened ?
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>{origStyle}</span>
                    <div>
                        <label>Current CSS: </label>
                        <input autoFocus={true} className={`input_text ${tryParse(input) ? "" : "input_invalid"}`} 
                            type="textbox" value={input} onChange={e => {
                            setInput(e.target.value)
                            if (tryParse(e.target.value)) {
                                const newStyle = JSON.parse(editCardProps.style)
                                newStyle[editCardProps.name] = JSON.parse(e.target.value)
                                setCompleteStyle(JSON.stringify(newStyle))
                                editCardProps.setStyle(JSON.stringify(newStyle))
                            }
                        }} />
                    </div>
                    {!tryParse(input) ? <div>Input is in invalid format</div> : ""}
                    <input type="submit" disabled={!tryParse(input)} onClick={() => {
                        setOrigStyle(input)
                        editCardProps.submit(completeStyle);
                    }}
                    />
                </div>

                : ""}

        </div>
    )
}

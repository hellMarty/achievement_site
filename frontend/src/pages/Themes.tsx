import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { IThemeProps } from "../interface/ThemeInterface";
import fetcher from "../models/fetcher";

export default function Themes() {
    const { data, error, mutate } = useSWR(`${import.meta.env.VITE_APP}theme`, fetcher);

    const [style, setStyle] = useState("");
    const [activeClass, setActiveClass] = useState("");
    const [newThemeName, setNewThemeName] = useState("");
    const [editComponent, setEditComponent] = useState("");
    const [hover, setHover] = useState("");

    useEffect(() => {
        if (data) {
            const activeStyle = data.data.filter((theme: IThemeProps) => theme.active)[0].jsonCSS;
            if (tryParse(activeStyle)) {
                setStyle(activeStyle);
            };
        };
    }, [data])

    if (error) return <div>failed to load </div>
    if (!data) return <div>loading...</div>

    async function changeTheme(themeId: string) {
        await fetch(`${import.meta.env.VITE_APP}theme/${themeId}`, {
            method: 'PUT',
        });

        mutate();
    }

    async function submitChanges() {
        console.log("style", style, editComponent)
        await fetch(`${import.meta.env.VITE_APP}theme/${data.data.filter((theme: IThemeProps) => theme.active)[0].id}/css`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'jsonCSS': style
            })
        });

        mutate();
        setEditComponent("");
    }

    async function deleteTheme(themeId: string) {
        await fetch(`${import.meta.env.VITE_APP}theme/${themeId}`, {
            method: 'DELETE',
        });

        mutate();
        setEditComponent("");
    }

    async function createTheme() {
        await fetch(`${import.meta.env.VITE_APP}theme`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': newThemeName,
                'active': false,
            }),
        });

        mutate();
    };

    function tryParse(cssInput: string) {
        try {
            JSON.parse(cssInput);
        } catch (e) {
            return false;
        }
        return true;
    }

    return (
        <div>
            <div>
                <h1>
                    Pick your theme
                </h1>
                <h3>TODOs:</h3>
                <ul>
                    <li>Set default theme</li>
                    <li>Create alternate theme</li>
                    <li>Create Edit mode for creating new theme</li>
                    <ul>
                        <li>Two options: Blank Theme or Modify Current Theme {"->"} modify current/create new from current</li>
                        <li>In Edit mode for each componenet there will be "help" icon and on clicking/hovering it will show text field</li>
                        <li>User will be able to see currently applied css and will be able to modify it</li>
                    </ul>
                    <li>Create option to change the theme</li>
                    <li>Create backend fetch of the themes</li>
                    <li>Create list with available theme cards with preview image</li>
                </ul>
            </div>
            <div>
                AVAILABLE THEMES:
                <ul>
                    {data.data.map((theme: any) =>
                        <li key={theme.id}>
                            <button onClick={() => deleteTheme(theme.id)}>Delete</button>
                            <a onClick={() => changeTheme(theme.id)}>{theme.name}{theme.active ? " (Active)" : ""}</a>
                        </li>
                    )}
                </ul>
            </div>

            <div style={{ "padding": "1rem", margin: "1rem", border: "1px solid black" }}>
                <div style={style ? (tryParse(data.data.filter((theme: IThemeProps) => theme.active)[0].jsonCSS) ? JSON.parse(data.data.filter((theme: IThemeProps) => theme.active)[0].jsonCSS).testing_div : {}) : {}}>
                    Stored Text Theme: Class testing_div
                </div>
                <div className={`${hover === "testing_div" ? "hover_active" : ""}`} style={style ? (tryParse(style) ? JSON.parse(style).testing_div : {}) : {}}>
                    Live Preview Text theme: Class: testing_div
                </div>
                <button className="edit_mark" onMouseEnter={() => setHover("testing_div")} onMouseLeave={() => setHover("")} 
                    onClick={() => {
                        if (!JSON.stringify(JSON.parse(style).testing_div)) {
                            const parsedStyle = JSON.parse(style);
                            parsedStyle.testing_div = {"":""}
                            setStyle(JSON.stringify(parsedStyle))
                        }
                        setEditComponent("testing_div")
                    }}>
                    <img className="edit_mark-icon" src="/icons/gear.png" />
                </button>
            </div>

            <div style={{ "padding": "1rem", margin: "1rem", border: "1px solid black" }}>
                <div style={style ? (tryParse(data.data.filter((theme: IThemeProps) => theme.active)[0].jsonCSS) ? JSON.parse(data.data.filter((theme: IThemeProps) => theme.active)[0].jsonCSS).testing_div_2 : {}) : {}}>
                    Stored Text Theme: Class testing_div_2
                </div>
                <div className={`${hover === "testing_div_2" ? "hover_active" : ""}`} style={style ? (tryParse(style) ? JSON.parse(style).testing_div_2 : {}) : {}}>
                    Live Preview Text theme: Class: testing_div_2
                </div>
                <button className="edit_mark" onMouseEnter={() => setHover("testing_div_2")} onMouseLeave={() => setHover("")} 
                    onClick={() => {
                        if (!JSON.stringify(JSON.parse(style).testing_div_2)) {
                            const parsedStyle = JSON.parse(style);
                            parsedStyle.testing_div_2 = {"":""}
                            setStyle(JSON.stringify(parsedStyle))
                        }
                        setEditComponent("testing_div_2");
                    }}>
                    <img className="edit_mark-icon" src="/icons/gear.png" />
                </button>
            </div>

            {editComponent ?
                <div>
                    <label>Current CSS: </label>
                    
                    <input className={`input_text ${tryParse(style) ? "" : "input_invalid"}`} type="text" 
                        value={tryParse(style) ? (editComponent === "testing_div" ? JSON.stringify(JSON.parse(style).testing_div) : JSON.stringify(JSON.parse(style).testing_div_2)) : style} 
                        onChange={e => {
                            const parsedStyle = JSON.parse(style);
                            if (editComponent === "testing_div") {
                                parsedStyle.testing_div = JSON.parse(e.target.value);
                            } else {
                                parsedStyle.testing_div_2 = JSON.parse(e.target.value);
                            }
                            console.log(parsedStyle, style, JSON.stringify(parsedStyle));
                            setStyle(JSON.stringify(parsedStyle));
                        }} />
                    
                    <input type="submit" disabled={!tryParse(style)} onClick={() => {
                        console.log(style, editComponent)
                        submitChanges();
                    }} />
                </div>
                : ""}
            {!tryParse(style) ? <div>Input is in invalid format</div> : ""}



            <div>
                <span>New Theme</span>
                <input value={newThemeName} onChange={(e) => setNewThemeName(e.target.value)} type="text" placeholder="New Theme" />
                <button onClick={() => createTheme()}>Create Theme</button>
            </div>
        </div>
    )
};

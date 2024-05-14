import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { IThemeProps } from "../interface/ThemeInterface";
import fetcher from "../models/fetcher";

export default function Themes() {
    const { data, error, mutate } = useSWR(`${import.meta.env.VITE_APP}theme`, fetcher);

    const [style, setStyle] = useState("");
    const [activeClass, setActiveClass] = useState("");
    const [newThemeName, setNewThemeName] = useState("");

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
    }

    async function deleteTheme(themeId: string) {
        await fetch(`${import.meta.env.VITE_APP}theme/${themeId}`, {
            method: 'DELETE',
        });

        mutate();
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

            <div style={{"padding": "1rem", margin: "1rem", border: "1px solid black"}}>
                <div style={style ? (tryParse(data.data.filter((theme: IThemeProps) => theme.active)[0].jsonCSS) ? JSON.parse(data.data.filter((theme: IThemeProps) => theme.active)[0].jsonCSS).testing_div : {}) : {}}>
                    Stored Text Theme: Class testing_div
                </div>
                <div style={style ? (tryParse(style) ? JSON.parse(style).testing_div : {}) : {}}>
                    Live Preview Text theme: Class: testing_div
                </div>
            </div>

            <div style={{"padding": "1rem", margin: "1rem", border: "1px solid black"}}>
                <div style={style ? (tryParse(data.data.filter((theme: IThemeProps) => theme.active)[0].jsonCSS) ? JSON.parse(data.data.filter((theme: IThemeProps) => theme.active)[0].jsonCSS).testing_div_2 : {}) : {}}>
                    Stored Text Theme: Class testing_div_2
                </div>
                <div style={style ? (tryParse(style) ? JSON.parse(style).testing_div_2 : {}) : {}}>
                    Live Preview Text theme: Class: testing_div_2
                </div>
                <button onClick={}>Edit</button>
            </div>


            <div>
                <label>Current CSS: </label>
                <input className={`input_text ${tryParse(style) ? "" : "input_invalid"}`} type="text" value={tryParse(style) ? JSON.stringify(JSON.parse(style).testing_div) : style} onChange={e => setStyle(`{"testing_div": ${e.target.value}}`)} />
                <input type="submit" disabled={!tryParse(style)} onClick={() => submitChanges()} />
            </div>
            {!tryParse(style) ? <div>Input is in invalid format</div> : ""}



            <div>
                <span>New Theme</span>
                <input value={newThemeName} onChange={(e) => setNewThemeName(e.target.value)} type="text" placeholder="New Theme" />
                <button onClick={() => createTheme()}>Create Theme</button>
            </div>
        </div>
    )
};

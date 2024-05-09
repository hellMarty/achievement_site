import React, { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../models/fetcher";

export default function Themes(props: any) {
    const { data, error, mutate } = useSWR(`${import.meta.env.VITE_APP}theme`, fetcher);

    const [style, setStyle] = useState("");

    useEffect(() => {
        if (data) {
            setStyle(data.data.filter((theme: any) => theme.active)[0].cssFile)
        }
    }, [data])

    if (error) return <div>failed to load </div>
    if (!data) return <div>loading...</div>


    async function changeTheme(themeId: string) {
        await fetch(`${import.meta.env.VITE_APP}theme/${themeId}`, {
            method: 'POST',
        });

        mutate();
        props.action();
    }

    async function submitChanges() {
        await fetch(`${import.meta.env.VITE_APP}theme/${data.data.filter(theme => theme.active)[0].id}/css`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'component': style
            })
        });

        props.action();
        mutate();
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
                    {data.data.map((theme: any) => <li key={theme.id}><a onClick={() => changeTheme(theme.id)}>{theme.name}{theme.active ? " (Active)" : ""}</a></li>)}
                </ul>
            </div>
            <div style={JSON.parse(data.data.filter(theme => theme.active)[0].cssFile).testing_div}>
                Stored Text Theme
            </div>
            <div style={style ? JSON.parse(style).testing_div : {}}>
                Live Preview Text theme
            </div>
            <div>
                <label>Current CSS: </label>
                <input className="input_text" type="text" value={style} onChange={e => setStyle(e.target.value)} />
                <input type="submit" onClick={() => submitChanges()}/>
            </div>
        </div>
    )
};
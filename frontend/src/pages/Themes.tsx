import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { IThemeProps } from "../interface/ThemeInterface";
import fetcher from "../models/fetcher";
import EditButton from "../components/EditButton";
import EditBar from "../components/EditBar";
import { IEditCardProp } from "../components/EditCard";

export default function Themes() {
    const { data, error, mutate } = useSWR(`${import.meta.env.VITE_APP}theme`, fetcher);

    const [style, setStyle] = useState("");
    const [activeClass, setActiveClass] = useState("");
    const [newThemeName, setNewThemeName] = useState("");
    const [cssInput, setCssInput] = useState("");

    const [openedCards, setOpenedCards] = useState<IEditCardProp[]>([]);

    useEffect(() => {
        if (data) {
            const activeStyle = data.data.filter((theme: IThemeProps) => theme.active)[0].jsonCSS;
            if (tryParse(activeStyle)) {
                setStyle(activeStyle);
            } else {
                setStyle("");
            }
        };
    }, [data])

    if (error) return <div>failed to load </div>
    if (!data) return <div>loading...</div>

    async function changeTheme(themeId: string) {
        await fetch(`${import.meta.env.VITE_APP}theme/${themeId}`, {
            method: 'PUT',
        });

        setActiveClass("");

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

    async function submitChangesTwo(newStyle: string) {
        await fetch(`${import.meta.env.VITE_APP}theme/${data.data.filter((theme: IThemeProps) => theme.active)[0].id}/css`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'jsonCSS': newStyle
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

    function remove(name: string) {
        const reducedCards = openedCards.filter((card: IEditCardProp) => card.name !== name)
        setOpenedCards(reducedCards)
    }

    function getStyle(className: string) {
        return (style && tryParse(style) && JSON.parse(style)[className]) ? JSON.parse(style)[className] : {}
    }

    return (
        <div className="theme_page">
            <div className="themes">
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
                    <div style={style && tryParse(data.data.filter((theme: IThemeProps) => theme.active)[0].jsonCSS) ? JSON.parse(data.data.filter((theme: IThemeProps) => theme.active)[0].jsonCSS).testing_div : {}}>
                        Stored Text Theme: Class testing_div
                    </div>
                    <div style={getStyle("testing_div")}>
                        Live Preview Text theme: Class: testing_div
                    </div>
                    <EditButton submit={submitChangesTwo} editedComponent="testing_div" setCssInput={setCssInput} style={style} setStyle={setStyle} getStyle={getStyle} setActiveClass={setActiveClass} openEdit={setOpenedCards} cards={openedCards} remove={remove} />
                </div>

                <div style={{ "padding": "1rem", margin: "1rem", border: "1px solid black" }}>
                    <div style={style && tryParse(data.data.filter((theme: IThemeProps) => theme.active)[0].jsonCSS) ? JSON.parse(data.data.filter((theme: IThemeProps) => theme.active)[0].jsonCSS).testing_div_2 : {}}>
                        Stored Text Theme: Class testing_div_2
                    </div>
                    <div style={getStyle("testing_div_2")}>
                        Live Preview Text theme: Class: testing_div_2
                    </div>
                    <EditButton submit={submitChangesTwo} editedComponent="testing_div_2" setCssInput={setCssInput} style={style} setStyle={setStyle} getStyle={getStyle} setActiveClass={setActiveClass} openEdit={setOpenedCards} cards={openedCards} remove={remove} />

                </div>

                <div>
                    <span>New Theme</span>
                    <input value={newThemeName} onChange={(e) => setNewThemeName(e.target.value)} type="text" placeholder="New Theme" />
                    <button onClick={() => createTheme()}>Create Theme</button>
                </div>
            </div>
            <EditBar openedCards={openedCards} setOpenedCards={setOpenedCards} remove={remove} />
        </div>
    )
};


export function tryParse(cssInput: string) {
    try {
        JSON.parse(cssInput);
    } catch (e) {
        return false;
    }
    return true;
}
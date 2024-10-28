import React from "react";
import { IEditCardProp } from "./EditCard";

interface IEditProps {
    editedComponent: string,
    setCssInput: (_: string) => void,
    style: string,
    setStyle: (_: string) => void,
    getStyle: (_: string) => {},
    setActiveClass: (_: string) => void,
    openEdit: ([]:IEditCardProp[]) => void,
    cards: IEditCardProp[],
    remove: (_:string) => void,
    submit: (_: string) => void,
}



export default function EditButton(editProps: IEditProps) {

    function editButtonClicked(className: string) {
        createStyleIfNonexist(className);
        editProps.setActiveClass(className);
        editProps.setCssInput(JSON.stringify(editProps.getStyle(className)));
        
        const editedCard = editProps.cards.find((card: IEditCardProp) => card.name === className)

        if (!editedCard) {
            const newCards = editProps.cards.concat({ name: className, 
                originalStyle: JSON.stringify(editProps.getStyle(className)), 
                remove: editProps.remove, 
                submit: editProps.submit,
                setStyle: editProps.setStyle,
                style: editProps.style,
            })
            editProps.openEdit(newCards)
        }
    }

    function createStyleIfNonexist(className: string) {
        if (!JSON.parse(editProps.style)[className]) {
            let newStyle = JSON.parse(editProps.style)
            newStyle[className] = {}
            editProps.setStyle(JSON.stringify(newStyle))
        }
    }


    return (
        <div>
            <button onClick={() => {
                editButtonClicked(editProps.editedComponent)
            }}>Edit</button>
        </div>
    )
}
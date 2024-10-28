import React from "react"
import EditCard, { IEditCardProp } from "./EditCard"

export interface IEditBarProps {
    openedCards: IEditCardProp[],
    setOpenedCards: ([]:IEditCardProp[]) => void,
    remove: (_: string) => void,
}

export default function EditBar(editBarProps: IEditBarProps) {  
    return (
        <div className="edit_bar">
            {editBarProps.openedCards
                .map((editCard: IEditCardProp, index: number) => <EditCard key={index} {...editCard} remove={editBarProps.remove}/>)}
        </div>
    )
}
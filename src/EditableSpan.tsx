import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";


type PropsType = {
    value: string
    onChangeTitle: (newValue: string) => void
}

export const EditableSpan = React.memo(function(props: PropsType) {
    console.log('Editable span is called')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.value)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChangeTitle(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onChange={changeTitle} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
})

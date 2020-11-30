import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';


type PropsType = {
    value: string
}

function EditableSpan(props: PropsType) {

    return (
        <span>{props.value}</span>
    )
}

export default EditableSpan;

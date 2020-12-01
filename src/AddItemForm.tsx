import Button from '@material-ui/core/Button';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField/TextField';
import {AddBox} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";


type PropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: PropsType) {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('The title is required')
        }
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        let newTitle = e.currentTarget.value
        setTitle(newTitle)
    }

    const onPressKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div className='addItemForm'>
            <TextField
                variant={'outlined'}
                size={'small'}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onPressKeyHandler}
                error={!!error}
                label={'Title'}
                helperText={error}
            />

            {/*<Button variant='contained' color='primary' size='small' onClick={addItem}>+</Button>*/}
            <IconButton color='primary' onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    );
}

export default AddItemForm;

import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import {AddBox} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";


export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm is called")
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
        if (error !== null) {
            setError(null)
        }
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
            <IconButton color='primary' onClick={addItem} disabled={props.disabled}>
                <AddBox/>
            </IconButton>
        </div>
    );
})

import Button from '@material-ui/core/Button';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField/TextField';


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
            />

            <Button variant='contained' color='primary' size='small' onClick={addItem}>+</Button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
}

export default AddItemForm;

import React from 'react';
import './App.css';

type PropsType = {
    title: string
}

function Todolist(props:PropsType) {
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
            </div>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={true}/>HTML</li>
                <li><input type="checkbox" checked={true}/>CSS</li>
                <li><input type="checkbox" checked={true}/>JS</li>
                <li><input type="checkbox" checked={false}/>REACT</li>
                <li><input type="checkbox" checked={false}/>REDUX</li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;

import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <div>
                <h3>What to learn</h3>
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

export default App;

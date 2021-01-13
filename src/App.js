import React, { useEffect, useState } from 'react'

function App() {

    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {

        const URL = `https://jsonplaceholder.typicode.com/todos/${searchTerm}`;

        console.log(URL);
        fetch(URL)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setUsers(data);
        })
        .catch((err) => {
            setUsers([]);
            console.log(err);
        })
        return () => {
            console.log("cleanup");
        }
    }, [searchTerm]);

    const editSearchTerm = (event) => {
        console.log(event.target.value);
        setSearchTerm(event.target.value);
    }

    const removeUser = (users=[], user) => {
        return function(){
            const newUsers = users.filter(u => u.name !== user.name);
            setUsers(newUsers);
        }
        
    }

    
    return (
        <div>
            <input name="search" type="text" value={searchTerm} onChange={editSearchTerm} />
            {users.map((user) => <li onClick={removeUser(users,user)} style={{listStyle:"none"}} key={user.id}>{user.name}</li>)}
        </div>
    )
}

export default App

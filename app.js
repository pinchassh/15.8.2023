const { log } = require('console');
const express = require('express');
const app = express();
const port = 3000;

const users = [
    { id: 1, email: 'avi@example.com', password: 'password123' },
    { id: 2, email: 'dana@example.com', password: 'securepass' },
    { id: 3, email: 'yael@example.com', password: 'mysecretpw' }
];

app.get('/', (req, res) => {
    console.log(req);
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    // console.log(id);
    res.send(users[id - 1])
});

app.post('/newUsers', (req, res) => {
    const ne = req.params.ne
    res.send(users)
});

app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});


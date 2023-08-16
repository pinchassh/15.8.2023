const { log } = require('console');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4()
// console.log(uuid);
const app = express();
const port = 3000;
const jsonParser = express.json();

const users = [
    { id: uuidv4(), email: 'avi@example.com', password: 'password123' },
    { id: uuidv4(), email: 'dana@example.com', password: 'securepass' },
    { id: uuidv4(), email: 'yael@example.com', password: 'mysecretpw' }
];


app.get('/', (req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    for (const user of users) {
        if (user.id === +req.params.id)
    res.send(user);
}});

app.post('/newUsers', jsonParser, (req, res) => {
    const newUser = { id: uuidv4(), email: req.body.email, password: req.body.password };
    users.push(newUser);
    console.log(users);
    res.send("hay");
});

app.put('/putUsers/:id', jsonParser, (req, res) => {
    for (const user of users) {
        if (user.id === +req.params.id) {
            if (req.body.email) user.email = req.body.email;
            if (req.body.password) user.password = req.body.password;
        }
    }
    // console.log(users);
    res.send("change seccess!!");
});


app.delete('/deleteUser/:id', jsonParser, (req, res) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === +req.params.id) {
            users.splice(i, 1);
        }
    }
    // console.log(users);
    res.send("delete seccess!!");
});

app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});


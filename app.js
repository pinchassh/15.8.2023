const { log } = require('console');
const express = require('express');
const app = express();
const port = 3000;
const jsonParser = express.json();

const users = [
    { id: 1, email: 'avi@example.com', password: 'password123' },
    { id: 2, email: 'dana@example.com', password: 'securepass' },
    { id: 3, email: 'yael@example.com', password: 'mysecretpw' }
];

function maxid(users) {
    let maxid = users[0].id;
    for (let i = 1; i < users.length; i++) {
        if (users[i].id > maxid) maxid = users[i].id;
        // console.log(users[i].id);
    }
    return maxid + 1;
}
app.get('/', (req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    for (const user of users) {
        if (user.id === +req.params.id)
    // const id = req.params.id;
    res.send(user);
}});

app.post('/newUsers', jsonParser, (req, res) => {
    const newUser = { id: maxid(users), email: req.body.email, password: req.body.password };
    users.push(newUser);
    // console.log(users);
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


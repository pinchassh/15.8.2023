const { log } = require('console');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;
const jsonParser = express.json();
const bcrypt = require('bcryptjs');


const users = [
    { id: uuidv4(), email: 'avi@example.com', password: '$2a$10$JFTyCRzgXhbnE2PmPpLD8.bJP8HIGFWeGao3qGZD2jyHLWb0gQyc.' },
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
    }
});


app.post('/newUsers', jsonParser, (req, res) => {
    bcrypt.hash(req.body.password, 10).then((pass) => {
        const newUser = { id: uuidv4(), email: req.body.email, password: pass };
        users.push(newUser);
        console.log(users);
        res.send("hay");
    });
})




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


app.post('/checkUser', jsonParser, (req, res) => {
    // let fleg = false;
    for (const user of users) {
        // bcrypt.compare(user.password, req.body.password).then((a)=>console.log(a))
        
        if (user.email === req.body.email) {
             bcrypt.compare(user.password, req.body.password).then((check)=>{
                console.log(check);
                if(check){res.send('User is connected!');
                // fleg = true;
                return}
             })
            
        }
    }
    res.send('wrong credentials!')
});
// bcrypt.hash(users[0].password, 10)
//     .then((v) => {
//         console.log(v);
//         // return bcrypt.compare(v, a)
//     })



app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});


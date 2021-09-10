import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

//configuration
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//connecting to database
mongoose.connect('mongodb://localhost:27017/userloginsignupDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Database is connected');
});

//initialising database
const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true}
});

const userModel = new mongoose.model('user', userSchema);

//Defining Routes
app.post('/login', (req, res) => {

    const { email, password } = req.body;

    userModel.findOne( {email: email}, (err, user) => {
        if(user){
            if(password === user.password){
                res.send({ message: "Login Successfull", user: user});
            } else {
                res.send( {message: "Incorrect Password."});
            }
        } else {
            res.send( { message: "User Not Registered."});
        }
    })
});


app.post('/register', (req, res) => {

    const { name, email, password} = req.body;

    userModel.findOne({email: email}, (err, user) => {
        if(user){
            res.send({ message: "User already registered."});
        } else{
            const newUser = new userModel({
                name,
                email,
                password
            })
        
            newUser.save( (err) => {
                if(err){
                    res.send(err);
                } else {
                    res.send( { message: "Successfully Registered, Please Login Now!" });
                }
            })
        }
    })
});

app.listen(5000, (req, res) => {
    console.log('Server started on PORT 5000');
});

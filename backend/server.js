const express = require('express');
require('./config/connect');
const cors =require('cors');
require('dotenv').config(); 

const app =express();
app.use(express.json());
app.use(cors());


const userRoute = require('./routes/user.route');
const serviceRoute = require('./routes/service.route');
const proposalRoute = require('./routes/proposal.route');
const groqRoute = require('./routes/groq.route');


app.use('/users',userRoute);
app.use('/services',serviceRoute);
app.use('/proposals',proposalRoute);
app.use('/chat', groqRoute);

app.use('/image', express.static('./public'));



app.listen(5000, ()=>{
  console.log('server work');
}) 
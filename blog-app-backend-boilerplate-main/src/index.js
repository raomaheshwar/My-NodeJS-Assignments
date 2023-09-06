const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
//connect to the DB
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
})

//connect to the server
app.listen(3000, () => console.log('Server running......'));


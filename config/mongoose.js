const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ConTactList');
const db = mongoose.connection;
db.on('error',console.error.bind(console,'error conecting to dv'))
db.once('open',function(){
    console.log('Sucessfully connected to database')
})

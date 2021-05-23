const mongoose = require('mongoose');
mongoose.set('useNewUrlParser',true);
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex',true);
mongoose.set('useUnifiedTopology',true);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/Hotel-Demo')
.catch(e=>{console.log(e)})

mongoose.connection.on('Connected',()=>{console.log("Database Connected")})
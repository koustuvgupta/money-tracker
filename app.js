const express =  require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

//routes
const transactionRoutes = require('./routes/transactionRoutes');
app.use(transactionRoutes);

app.listen(3421,()=>{
  console.log('server running on localhost:3421');
});
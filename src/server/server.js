const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors());
app.options('*', cors());

const api = require('./routes/api');
 
app.use('/api', api);

app.get('/', function(req, res){
    res.send('zop');
})
app.listen(PORT, function(){
    console.log();
});
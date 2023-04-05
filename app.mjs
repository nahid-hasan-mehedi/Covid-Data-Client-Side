import express, { json, urlencoded } from 'express';
const app = express();
const port = 3000;

app.use(json());// support json encoded bodies
app.use(urlencoded({extended: true}));//incoming objects are strings or arrays

import { addCovidRecord,getCovidRecord, deleteCovidRecord, updateCovidRecord, getAllCovidRecord, getDatesBetweenCovidRecord} from './controller/covids.mjs';// Here we import our code with the covid operations
import { connectToDB, closeDBConnection } from './utils/db.mjs';

var server;

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname + '/view'));

async function createServer(){
  try {
    // we will only start our server if our database
    // starts correctly. Therefore, let's wait for
    // mongo to connect
    await connectToDB();
    // contacts resource paths
    await connectToDB();
    app.get('/', (req, res) => {
      res.send("working")
    })
    app.post('/covid', addCovidRecord);
    app.get('/covid/:date', getCovidRecord);
    app.get('/covidAll', getAllCovidRecord);
    app.get('/covidDates/:fromAndTo', getDatesBetweenCovidRecord);
    app.put('/covid/:date', updateCovidRecord);
    app.delete('/covid/:date', deleteCovidRecord);
    
    // start the server
    server = app.listen(port, () => {
      console.log('Example app listening at http://localhost:%d', port);
    });
  }catch(err){
    console.error(err)
  }
}
createServer();

// I created this callback function to capture
// when for when we kill the server. 
// This will avoid us to create many mongo connections
// and use all our computer resources
process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  console.log('Closing Mongo Client.');
  server.close(async function(){
    let msg = await closeDBConnection()   ;
    console.log(msg);
  });
});

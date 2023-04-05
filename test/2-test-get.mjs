
import axios from 'axios';
var myurl = 'http://localhost:3000';

// Let's configure the base url
const instance = axios.create({
    baseURL: myurl,
    timeout: 3000,
    headers: {'content-type': 'application/json'}
});

async function getData(){
    try{
        let res2 = await instance.get('/covid/2022-03-10');
        console.log('Listing one contact');
        console.log(res2.data);
    } catch(err) {
        console.log('ERROR: '+err);
    }
}
getData();
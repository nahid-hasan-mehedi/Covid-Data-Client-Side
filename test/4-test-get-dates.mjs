
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
        let res2 = await instance.get('covidDates/2020-12-28_2020-12-29');
        console.log('Listing cases 2020-12-28 2020-12-29');
        console.log(res2.data);
    } catch(err) {
        console.log('ERROR: '+err);
    }
}
getData();
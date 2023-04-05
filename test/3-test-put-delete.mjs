import axios from 'axios';
var myurl = 'http://localhost:3000';

// Let's configure the base url
const instance = axios.create({
    baseURL: myurl,
    timeout: 1000,
    headers: {'content-type': 'application/json'}
});


// Now let's update the contact information for Amilcar Soares
var data1 = {
    iso_code: 'SAM',
    continent: 'South America',
    location: 'Brazil',
    date: '2022-03-10',
    total_cases: 200000,
    new_cases: 5000,
    total_deaths: 1000,
    new_deaths: 55
};

var data2 = {
    iso_code: 'CA',
    continent: 'North America',
    location: 'Canada',
    date: '2022-03-11',
    total_cases: 200000,
    new_cases: 5000,
    total_deaths: 1000,
    new_deaths: 55
};

async function updateDelete(){
    console.log("Before update: ");
    let res1 = await instance.get('/covid/2022-03-10');
    console.log(res1.data);
    console.log("After update: ");
    let res2 = await instance.put('/covidUpdate/2022-03-10', data1);
    res1 = await instance.get('/covid/2022-03-10');
    console.log(res1.data);

    res1 = await instance.get('/covidAll');
    console.log("Before deletion (items): " + res1.data.length);
    let res3 = await instance.delete('/covidDelete/2022-03-11');
    console.log(res3.data);
    res1 = await instance.get('/covidAll');
    console.log("After deletion (items): " + res1.data.length);
}
updateDelete();

import axios from 'axios';

var myurl = 'http://localhost:3000';

// Let's configure the base url
const instance = axios.create({
    baseURL: myurl,
    timeout: 3000,
    headers: {'content-type': 'application/json'}
});
// Adding new covid_data
var data1 = {
  iso_code: 'CA',
  continent: 'North America',
  location: 'Canada',
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
  total_cases: 20000,
  new_cases: 500,
  total_deaths: 1000,
  new_deaths: 55
};

var data3 = {
  iso_code: 'CA',
  continent: 'North America',
  location: 'Canada',
  date: '2022-03-12',
  total_cases: 2000000,
  new_cases: 50000,
  total_deaths: 10000,
  new_deaths: 100
};

// Here we add the three new objects, one after the other
async function post_objects() {
  try {
    let res1 = await instance.post('/covid', data1);
    console.log(res1.data);
    let res2 = await instance.post('/covid', data2);
    console.log(res2.data);
    let res3 = await instance.post('/covid', data3);
    console.log(res3.data);
  } catch (err) {
    console.log(err);
  }
}

post_objects();

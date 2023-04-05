//import fs from 'fs';

import {Covid} from '../model/covid.mjs';




/**
 * A function that adds a contact to the database.
 * @param {Request} req - A request Object
 * @param {Response} res - A response Object
 */

export async function addCovidRecord(req, res) {
    let iso_code  = req.body.iso_code;
    let continent = req.body.continent;
    let location = req.body.location; 
    let date = req.body.date;
    let total_cases = req.body.total_cases;
    let new_cases = req.body.new_cases;
    let total_deaths = req.body.total_deaths;
    let new_deaths = req.body.new_deaths;
    //let isValid = await validate_fields(name, email, tel, address);
    
    let new_covid = new Covid(iso_code,continent,location,date,total_cases,new_cases,total_deaths,new_deaths);
    let msg = await new_covid.save();
    res.send(msg);                
    
    //console.log('The Contact was not inserted in the database since it is not valid.');
    //res.send('Error. User not inserted in the database.');
    
}

export async function getCovidRecord(req, res) {
    let date_to_match = req.params.date;
    console.log('Requested date:', date_to_match); // Debug log
    let obj = await Covid.get(date_to_match);
    console.log('Data received from DB:', obj); // Debug log
    if (obj.length > 0) {
        console.log(obj.length + ' item(s) sent.');
        res.send({ msg: 'Item found', data: obj[0] });
    } else {
        res.send('No item was found');
    }
}


export async function getAllCovidRecord(req, res){
    let obj = await Covid.getAll();
    if (obj.length > 0){
        console.log(obj.length+' item(s) sent.');
        res.send(obj);        
    }else{
        res.send('No item was found');
    }
    
}

export async function deleteCovidRecord(req, res) {
    let date_to_delete = req.params.date;
    let obj= await Covid.delete(date_to_delete);
    if (obj.deletedCount > 0){
        console.log("1 document deleted");
        res.send({msg:"1 covid record was deleted"});
    } else {
        res.send({msg: 'Contact was not found.'});
    }
}

export async function getDatesBetweenCovidRecord(req, res) {
    let all_records = await Covid.getAll();
    let dates_to_delete = req.params.fromAndTo.split('_');
    let start = Date.parse(dates_to_delete[0]);
    let end = Date.parse(dates_to_delete[1]);

    console.log('Start:', start);
    console.log('End:', end);

    let sum = 0;
    let deathRecords = [];
    for (let index = 0; index < all_records.length; index++) {
        const record = all_records[index];
        const current_record_date = Date.parse(record.date);
        if (isNaN(current_record_date)) {
            console.log('Invalid date:', record.date);
            continue;
        }

        console.log('Current record date:', current_record_date);

        if ((current_record_date >= start) && (current_record_date <= end)) {
            let deaths = record.new_deaths;
            deaths = parseInt(deaths);
            if (!isNaN(deaths)) {
                sum += deaths;
                deathRecords.push({ date: record.date, deaths: deaths });
            } else {
                console.log('Invalid deaths:', record.new_deaths);
            }
        }
    }

    res.json({ totalDeaths: sum, records: deathRecords });
}




export async function updateCovidRecord(req, res) {
    let date_to_match = req.params.date;
    let obj = await Covid.update(date_to_match, req.body);
    if (obj.modifiedCount > 0){
        console.log("1 document updated");
        res.send({msg: 'Contact correctly updated.'});
    }else{
        console.log("The document was not updated");
        res.send({msg: 'The new user data is not valid.'});
    } 
}

//export { getCovidRecord };




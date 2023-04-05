import { getDb } from '../utils/db.mjs';

async function _get_covids_collection (){
    let db = await getDb();
    return await db.collection('canada');
};


export class Covid{
    constructor(iso_code, continent, location, date, total_cases, new_cases, total_deaths, new_deaths) {
    
      this.iso_code = iso_code;
      this.continent = continent;
      this.location = location;
      this.date = date;
      this.total_cases = total_cases;
      this.new_cases = new_cases;
      this.total_deaths = total_deaths;
      this.new_deaths = new_deaths;
    }

    async save(){
        try{
            let collection = await _get_covids_collection();
            let mongoObj = await collection.insertOne(this);
            console.log('1 Covid Case was inserted in the database with id -> '+mongoObj.insertedId);
            return 'Covid Case correctly inserted in the Database.';            
        } catch(err){
            throw err
        }        
    }

    static async get(date){
        let collection = await _get_covids_collection();
        // console.log(name)
        let obj = await collection.find({"date": date}).toArray();
        
        return obj;
    }

    static async delete(date_to_delete){
        let collection = await _get_covids_collection();
        let obj = await collection.deleteOne({'date': date_to_delete})
        return obj;
    }

    static async getAll(){
        let collection = await _get_covids_collection();
        let objs = await collection.find({}).toArray();
        return objs;                
    }

    static async update(date, new_covid){
        let collection = await _get_covids_collection();
        let new_vals = {$set: {
            'iso_code': new_covid.iso_code,
            'continent': new_covid.continent,
            'location': new_covid.loation,
            'date': new_covid.date , 
            'total_cases': new_covid.total_cases, 
            'new_cases': new_covid.new_cases, 
            'total_deaths': new_covid.total_deaths,
            'new_deaths': new_covid.new_deaths
        }};
        let obj = await collection.updateOne({'date': date}, new_vals)
        
        return obj;       
    }





}

export default Covid;


  
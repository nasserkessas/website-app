// import * as dotenv from 'dotenv'
// dotenv.config()

import axios from 'axios'

const getData = async () => {
    try {
        const res = await axios.get("http://localhost:3000/"); //(process.env.API_URL || "http://localhost:3000/");
        
        let years_coding = new Date().getFullYear() - 2016;
        document.getElementById("years").innerHTML = years_coding;
        
        document.getElementById("hours").innerHTML = res.data.stats.time.string;
        document.getElementById("repos").innerHTML = res.data.stats.repos.repoCount;
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
        return;
    }
};

getData()

// years coding
let years_coding = new Date().getFullYear() - 2016
console.log(years_coding)
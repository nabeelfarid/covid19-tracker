import axios from 'axios';

const GetCountries = async () => {

    // Implementaion using JS Promises for handling async calls
    // return new Promise((resolve, reject) => {
    //     axios.get('https://disease.sh/v3/covid-19/countries')
    //         .then((res) => {
    //             let countries = res.data.map(obj => obj.country)
    //             console.log("api countries", countries);
    //             resolve(countries);
    //         })
    //         .catch(error=>{
    //             reject(error)
    //         })
    // })

    // Simpler Implementation using async await
    try {
        // original link 'https://disease.sh/v3/covid-19/countries
        // however the above link includes countries that doesn't have historical data available
        // So using the other api link to only get the list of countries that has historical data available
        const res = await axios.get('https://disease.sh/v3/covid-19/historical?lastdays=1')
        let countries = res.data.map(obj => obj.country)
        //remove duplicate country names
        countries = [...new Set(countries)];
        return countries;
    } catch ({ error }) {
        return error
    }
}

const GetStats = async (country) => {

    const url = `https://disease.sh/v3/covid-19/${country? `countries/${country}` :  'all'}`
    console.log('Get Stats url', url);
    
    try {
        let res = await axios.get(url)
        console.log("Stats", res)
        return {
            country: country,
            infected: Number(res.data.cases),
            recovered: Number(res.data.recovered),
            deaths: Number(res.data.deaths),
            lastUpdate: new Date(res.data.updated)
        };

    } catch (error) {
        return error
    }

}

const GetDailyStats = async (country) => {
    
    //calculate the number of days since 1st Jan 2019
    const dateDiffInMiliSec = new Date() - new Date("01/01/2019");   
    const milliSecPerDay = (1000 * 60 * 60 * 24);
    var days = Math.ceil(dateDiffInMiliSec / milliSecPerDay); 

    const url = `https://disease.sh/v3/covid-19/historical/${country ? country : 'all'}?lastdays=${days}`;
    console.log('Get Daily Stats url', url);

    try {
        let res = await axios.get(url)
        const resData = country ? res.data.timeline : res.data;

        //change the scheme such that each day has its corresponding stats
        let data = Object.entries(resData.cases).map(
            ([key, value]) => {
                return {
                    date: new Date(key),
                    infected: Number(value),
                    recovered: Number(resData.recovered[key]),
                    deaths: Number(resData.deaths[key])
                };
            });
        console.log('Daily Stats', data);
        return data;
        
    } catch (error) {
        return error;
    }
}

const CovidApi = {
    GetCountries: GetCountries,
    GetStats: GetStats,
    GetDailyStats: GetDailyStats
};

export default CovidApi;
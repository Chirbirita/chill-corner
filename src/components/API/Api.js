import axios from "axios";


export default {
    getData: () =>
    axios({
        'method':'GET',
        'url':'https://spotify23.p.rapidapi.com/search/',
        'headers': {
            'content-type': 'application/json', //'application/octet-stream',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',        
            'X-RapidAPI-Key': '0d51cb2040msha19136b4ee60310p11b089jsn4913e393b257',
        },
         'params': {
            'search':'parameter',
              'q': '<REQUIRED>',
        },
    })
}
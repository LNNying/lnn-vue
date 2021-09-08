/**

 */

const axios = require('axios');
const https = 'https://www.1905.com/';
const regx = /<script type="text\/javascript" src="(.*?)"><\/script>/g;

axios.get(https).then(response => {
    let html = response.data;
    // console.log(html);
    console.log(regx.exec(html)[1]);
}).catch(err => {
    console.log(err);
});

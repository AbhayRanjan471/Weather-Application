//requiring the 'http' model  to create our won server
const http = require('http');
const fs = require('fs');
const port = 8004;

var requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");

const replaceVal = (tempVal, orgVal) =>{
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    // console.log(temperature+"checkingggg"+ orgVal.main.temp);
     temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    //  console.log(temperature+"checkingggg"+ orgVal.main.temp_min);
     temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
     temperature = temperature.replace("{%location%}", orgVal.name);
     temperature = temperature.replace("{%country%}", orgVal.sys.country);
     temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
     return temperature;
}

const server = http.createServer(function(req, res){
    //if the request is for home page
    if(req.url == "/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=Ranchi&appid=bbc5c4fac47f72a33182cff693e30cef")
        .on("data", (chunk) =>{
            //psrsing the data in JSON 
            const objdata = JSON.parse(chunk);
            const arrData = [objdata] ;//now converted th JSON data to array
            console.log(arrData);
            // console.log('temp:', arrData[0].main.temp);
            const realTimeData = arrData
            .map((val) => replaceVal(homeFile, val))
            .join("");
            
            res.write(realTimeData);
             
            console.log(realTimeData);
        })
        .on("end", (err) =>{
            if(err){
                return console.log("Connection closed due to errors", err);
            }
            res.end();
            // console.log("end");
        });
    }
});

server.listen(port , function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)// using backtik ``
    }
    console.log(`Server is running on port: ${port}`);
})

//npm init

//we are installing the  request  pacckage also
// npm i requests
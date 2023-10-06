const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))


app.get("/", (req,res) => {
    res.sendFile( __dirname + '/index.html')
})
app.post('/', (req,res)=> {
    const cityName = req.body.cityName

    const query = cityName
    const appid = 'acbc63b4915c4fe18cc435fed12ff333'
    const unit = 'metric'
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appid+"&units="+ unit;
    
    https.get(url, (response) => {
        
        response.on('data', (data)=>{
            const weatherData = JSON.parse(data);
            const countryName = weatherData.name
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            res.write("<h1>The weather is currently "+ weatherDescription + "</h1>")
            res.write("<h1>The temperature in "+countryName +" is " + temp + " degree celcius.</h1>")
            res.write(`<img src='https://openweathermap.org/img/wn/${icon}@2x.png' >`)
            res.send()
        })
    })
})



app.listen( process.env.PORT || 3000, ()=>{
    console.log("Server is running on port localhost:3000");
})
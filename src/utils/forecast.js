const request=require('request');

const forecast =(address,callback) =>{
    const url='http://api.weatherstack.com/current?access_key=4d5a4a89e431fd7e9a6324efb46c2364&query='+address+'';

    request({url:url,json:true},(error,response)=>{
        
        if (error){

            callback('Unable to connect to location services',undefined);

        }else if(response.body.success === false){

            callback('Unable to find location ',undefined);
        }

        else{
            
            callback(undefined,{
                forecast:'Today weather is ' + response.body.current.weather_descriptions+ '. It is  currently temperature  '+response.body.current.temperature+' degress out. There is a '+response.body.current.precip+'% chance of rain.',
                location: response.body.location.country + ',  ' + response.body.location.region +',  '+ response.body.location.name,
                address: response.body.location.name

            })
            

        }
        
    })

}


module.exports = forecast


const request=require('request')

const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=72f8b71b8f0ecd9f1b1fd9d69e250489&query='+lat+','+long
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('Can\'t access internet',undefined)
        }
        else if(response.body.error)
        {
            callback('Unable to find the location',undefined)
        }
        else{
             const currtemp=response.body.current.temperature;
            const feel=response.body.current.feelslike;
            const des=response.body.current.weather_descriptions[0]
            const data=des+'. Current temperature is '+currtemp+' and it feels like '+feel+' out'
            callback(undefined,des+'. Current temperature is '+currtemp+' and it feels like '+feel+' out')
        }
    
    })

}
module.exports=forecast
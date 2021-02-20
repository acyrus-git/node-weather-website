const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWR2aXRpeWEtYWRpdHlhIiwiYSI6ImNrZXVkZTVvMjBhd2MyenRqZWM2Y2x5M3AifQ.WQkN5bxcCsOYU5awqQIRtw'

    request({url:url,json:true},(error,response)=>{
            if(error){
               callback('Can\'t access internet',undefined)
            }
            else if(response.body.features.length==0)
            {
              callback('Can\'t find the location.Please try another search.',undefined)
            }
            else if(response.body.features.length)
            {
                const data={
                latitude:response.body.features[0].center[1],
                 longitude:response.body.features[0].center[0],
                place:response.body.features[0].place_name
                }
                callback(undefined,data)
            }

    })
}

module.exports=geocode
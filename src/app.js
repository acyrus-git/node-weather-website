const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//Define path fir express configuration
const hpath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//Set up handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

//Set up static directory to serve
app.use(express.static(hpath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Aditya Chaturvedi'

    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Aditya Chaturvedi'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'this is help page',
        title:'Help',
        name:'Aditya Chaturvedi'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'No address provided'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
        if(error)
        {
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,forecast)=>{
            if(error)
            {
                return res.send({
                    error:error
                })
            }
            res.send({
                address:req.query.address,
                place,
                forecast
            })

        })
    })
   
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Aditya Chaturvedi',
        message:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Aditya Chaturvedi',
        message:'Page not found'
    })
})
app.listen(3000,()=>{
    console.log('server running on port 3000')
})
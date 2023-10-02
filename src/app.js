const path=require('path');
const express =require('express');
const hbs = require('hbs');
const forecast =require('./utils/forecast')

// console.log(__dirname);
// console.log(path.join (__dirname,'../public'));

const app = express();
//Define paths for express config
const publicdirpath=path.join (__dirname,'../public');
const viewdirpath=path.join(__dirname,'../templates/views');
const partialspath=path.join(__dirname,'../templates/partials');


//setup handle bars engine and views location
app.set('view engine','hbs');
app.set('views',viewdirpath);
hbs.registerPartials(partialspath)



//setup static directory
app.use(express.static(publicdirpath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Pankaj Kumar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Pankaj Kumar'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Pankaj Kumar'
    })
})
// app.get('',(req,res)=>{
//     res.send('Hello Express!');
// })


// app.get('/help',(req,res)=>{
//     res.send('<h1>Help Page</h1>');
// })

// app.get('/about',(re,res)=>{
//     res.send('About page')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must Provide an address!'
        })
    }
    else{
        forecast(req.query.address,(error,{forecast,location,address}={})=>{
            if(error){
                return res.send({error});
            }
            // console.log('data',data)
            res.send({
                forecast:forecast,
                location:location,
                address:address
                // address:req.query.address
                // data:data
            })
        })
    }
    // forecast(req.query.address,(error,data)=>{
    //     if(error){
    //         return console.log(error);
    //     }
    //     // console.log('data',data)
    //     res.send({
    //         forecast:'it is snowing',
    //         location:'it bangalore',
    //         // address:req.query.address
    //         data:data
    //     })
    // })
})


//app.com
//app.com/help
//app.com/about
app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404 Help',
        name:'Pankaj Kumar',
        errorMessage:'Help Article Not Found'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Pankaj Kumar',
        errorMessage:'Page Not FOund'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000');
})
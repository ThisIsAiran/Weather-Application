const express = require('express')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
const path = require('path')
const hbs = require('hbs')
const app = express()
const viewpath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public') 
const partialPath = path.join(__dirname, '../templates/partials')
app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialPath)
app.get('', (req, res)=>{	
	res.render('index',{
		title:"MyProject",
		name:"Aman Gupta"
	})
})
app.get('/about', (req, res)=>{
	res.render('about',{
		title:"About Me",
		name:"Yo Yo Honey Singh"
	})
})
app.get('/help', (req,  res)=>{
	res.render('help',{
		title:"!! Help",
		name:"Guru Bhai"
	})
})
app.get('/weather', (req, res)=>{
	const address = req.query.address
		if(!address)
		{
			return res.send({
				Error:"Please provide the address of input location :("
			})
		}
			geocode(address,(error,{latitude, longitude, location} = {})=>{
				if(error)
				{
					return res.send(error)
				}
				forecast(latitude,longitude,(error, forecastdata)=>{
					if(error)
					{
						return res.send(error)
					}
					res.send({
						location,
						forecastdata
					})
				})
			})
})
app.get('/product',(req, res)=>{
	if(!req.query.search)
	{
		return res.send(
				{
					"error":"ohoo sorry"
				}
			)
	}
	console.log(req.query.search)
	res.send({
		product:[]
	})
})
app.get('/help/*', (req, res)=>{
	res.render('404Page',{
		title: "404",
		name: "Page not found",
		errorMessage: "Help is not currently available"
	})
})
app.get('*', (req, res)=>{
	res.render('404Page',{
		title:"404",
		name:"page not found",
		errorMessage: "Page is totally fucked up"
	})
})
app.listen(3000,()=>{
	console.log("server start on port number 3000")
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageSecond = document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e)=>{
	e.preventDefault()
	const url = "/weather?address=" + search.value
	messageOne.textContent="Loading ..."
	messageSecond.textContent = ""
	console.log(url)
	fetch(url).then((response)=>{
	response.json().then((data)=>{
		if(data.Error)
		{
			messageOne.textContent = data.Error
			messageSecond.textContent = ""
		}	
		else
		{
			messageOne.textContent = data.forecastdata
			messageSecond.textContent = data.location
		}
	})
})
})

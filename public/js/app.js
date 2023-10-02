

const weatherform =document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')
const messagethree=document.querySelector('#message-3')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location =search.value
    console.log(location)

    
    messageone.textContent='Loading....',
    messagetwo.textContent=" "

    fetch('http://localhost:3000/weather?address='+location+'').then((response)=>{
    response.json().then((data)=>{
    
            if(data.error){
                    messageone.textContent=data.error
            }else{

                messageone.textContent=data.forecast,
                messagetwo.textContent=data.location,
                messagethree.textContent=data.address
                // console.log(data.forecast),
                // console.log(data.location),
                // console.log(data.address)
            }
    })
})
})


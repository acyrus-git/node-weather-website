// console.log('client side java script is loaded')
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//             console.log(data)
//     })
// })

const weatherform=document.querySelector('form');
const search=document.querySelector('input');
const text1=document.querySelector('#message1')
const text2=document.querySelector('#message2')

weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location=search.value
    text1.textContent='Loading...'
    text2.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
            {
                text1.textContent=data.error
            }
            else{
                text1.textContent=data.place
                text2.textContent=data.forecast
            }

    })
})
})
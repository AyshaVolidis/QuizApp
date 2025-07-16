import { Questions } from "./Questions.js"

let startBtn=document.getElementById('startBtn')
let leaderBoard=[]
startBtn.addEventListener('click',()=>{
    let name=document.querySelector('[name=username]').value
    if(!name){
        alert('Enter your name in input..')
    }
    leaderBoard.push({username:name,score:0})
    console.log(leaderBoard)
    localStorage.setItem('board',JSON.stringify(leaderBoard))
    document.getElementById('interface1').style.display='none'
})

//Questions
console.log(Questions)
let index=1

// first get  question index randomaly
function getRandom(){
    let num=Math.floor(Math.random()*Questions.length)
    return num
}



function renderQuestion(){
    document.getElementById('Next').style.display='none'
    document.getElementById('questionNum').textContent=`Question ${index}/10`
    document.querySelector('.progress-bar').style.width=`${index*10}%`
    let currentQ=Questions[getRandom()]
    let textQ=document.getElementById('questionText')
    textQ.textContent=currentQ.text
    let optionsSection=document.getElementById('sectionOptions')
    optionsSection.innerHTML=''
    currentQ.options.forEach((option)=>{
        let div=document.createElement('div')
        div.className='option-card'
        div.innerHTML=`
            <input type="radio"  name="option"  class="radio-input">
            <label  class="radio-label" >${option}</label>
        `
        optionsSection.appendChild(div)
        
        div.addEventListener('click',()=>{
            Array.from(optionsSection.children).forEach((el)=>{
                el.classList.remove('selected-option')
            })
            div.classList.add('selected-option')
            div.querySelector('input').checked='true'
            if(index==10){
                document.getElementById('Next').style.display='none'
            }
            else{
                document.getElementById('Next').style.display='block'
                document.getElementById('Next').style.marginRight='auto'
            }
        })
    })
}


renderQuestion()

document.getElementById('Next').addEventListener('click',()=>{
    if(index==10){
        document.getElementById('Next').style.display='none'
    }
    index+=1
    renderQuestion()
})


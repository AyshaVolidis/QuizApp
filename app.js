import { Questions } from "./Questions.js"

let startBtn=document.getElementById('startBtn')
let leaderBoard=[]
let name;
let deptQuestion=document.getElementById('interfaceQ')

startBtn.addEventListener('click',()=>{
    name=document.querySelector('[name=username]').value
    if(!name){
        alert('Enter your name in input..')
        return
    }
    document.getElementById('interface1').style.display='none'
    deptQuestion.style.display='block'
})

//Questions
let index=1
let IdsQuestion=[]
let mark=0
let currentQ;

// first get  question index randomaly
function getRandomQuestion(){
    let num=Math.floor(Math.random()*Questions.length)
    if(!IdsQuestion.includes(num)){
        IdsQuestion.push(num)
        currentQ=Questions[num]
        renderQuestion(currentQ)
    }
    else{
        getRandomQuestion()
    }
}



function renderQuestion(question){
    document.getElementById('Next').style.display='none'
    document.getElementById('questionNum').textContent=`Question ${index}/10`
    document.querySelector('.progress-bar').style.width=`${index*10}%`  

    let textQ=document.getElementById('questionText')
    textQ.textContent=question.text
    let optionsSection=document.getElementById('sectionOptions')
    optionsSection.innerHTML=''
    question.options.forEach((option)=>{
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


getRandomQuestion()
document.getElementById('Next').addEventListener('click',()=>{
    checkAnswer()
    if(index==10){
        document.getElementById('Next').style.display='none'
    }
    index+=1
    getRandomQuestion()
})

function checkAnswer(){
    let inputs=document.querySelectorAll('input[type="radio"]')
    let selectedOption;
    Array.from(inputs).forEach((el)=>{
        if(el.checked){
            selectedOption=el
        }
    })
    if(selectedOption.nextElementSibling.textContent==currentQ.rightAnswer){
        mark+=1
    }
}


document.getElementById('Finish').addEventListener('click',()=>{
    checkAnswer()
    leaderBoard=JSON.parse(localStorage.getItem('board')) ||[]
    leaderBoard.push({username:name,score:mark})
    console.log(leaderBoard)
    localStorage.setItem('board',JSON.stringify(leaderBoard))
    renderBoared()
})

function renderBoared(){
    leaderBoard=JSON.parse(localStorage.getItem('board')) 
    deptQuestion.innerHTML=`
        <h2>LeaderBoard 🎉🎉</h2>

    `
    leaderBoard.sort((a,b)=>b.score-a.score)

    leaderBoard.forEach((item)=>{
        let div=document.createElement('div')
        div.classList.add('Leader')
        div.innerHTML=`
            <h3>${item.username}</h3>
            <div style="width:${item.score*10}%;"></div>
            <p>${item.score*10}%</p>

        `
        deptQuestion.appendChild(div)
    })
}
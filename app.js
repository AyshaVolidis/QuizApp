import { Questions } from "./Questions.js"

let startBtn=document.getElementById('startBtn')
let leaderBoard=[]
let name;
let deptQuestion=document.getElementById('bigdiv')
let nextBtn=document.getElementById('Next')
let finishBtn=document.getElementById('Finish')

startBtn.addEventListener('click',()=>{
    name=document.querySelector('[name=username]').value
    if(!name){
        alert('Enter your name in input..')
        return
    }
    hideElement(document.getElementById('interface1'))
    showElement(deptQuestion)
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

const createElement=(tag,classes=[],text='')=>{
    let element=document.createElement(tag)
    classes.forEach((cls)=>{
        element.classList.add(cls)
    })
    element.textContent=text
    return element
}

const appendToParent=(parent,children)=>{
    children.forEach((child)=>{
        parent.appendChild(child)
    })
}

const hideElement=(element)=>{
    element.style.display='none'
}

const showElement=(element)=>{
    element.style.display='block'
}

function renderQuestion(question){
    hideElement(nextBtn)

    let Bigdiv=createElement('div',[])

    let header=createElement('h1',[],`Quiz App`)

    let progresscont=createElement('div',['progress-container'])
    let progress=createElement('div',['progress-bar'])
    progress.style.width=`${index*10}%`  

    appendToParent(progresscont,[progress])

    let numQ=createElement('h3',[],`Question ${index}/10`)

    let textQ=createElement('h3',[],question.text)

    let optionsSection=createElement('div',[])
    question.options.forEach((option)=>{
        let div=createElement('div',['option-card'])
        let input=createElement('input',['radio-input'])
        input.type='radio'
        input.name = 'option' 
        let label=createElement('label',['radio-label'],option)

        appendToParent(div,[input,label])

        appendToParent(optionsSection,[div])
        
        div.addEventListener('click',()=>{
            Array.from(optionsSection.children).forEach((el)=>{
                el.classList.remove('selected-option')
            })
            div.classList.add('selected-option')
            div.querySelector('input').checked='true'    
            console.log(div.querySelector('input'))  
            if(index==10){
                hideElement(nextBtn)
            }
            else{
                showElement(nextBtn)
                nextBtn.style.marginRight='auto'
            }
        })
    })

        
    appendToParent(Bigdiv,[header,progresscont,numQ,textQ,optionsSection])
    deptQuestion.querySelector('div').innerHTML = ''
    appendToParent(deptQuestion.querySelector('div'),[Bigdiv])
}

getRandomQuestion()
nextBtn.addEventListener('click',()=>{
    checkAnswer()
    index+=1
    getRandomQuestion()
})

function checkAnswer(){
    let inputs=document.querySelectorAll('input[class="radio-input"]')
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


finishBtn.addEventListener('click',()=>{
    checkAnswer()
    leaderBoard=JSON.parse(localStorage.getItem('board')) ||[]
    leaderBoard.push({username:name,score:mark})
    console.log(leaderBoard)
    localStorage.setItem('board',JSON.stringify(leaderBoard))
    renderBoared()
})

function renderBoared(){
    hideElement(nextBtn)
    hideElement(finishBtn)
    leaderBoard=JSON.parse(localStorage.getItem('board')) ||[]
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
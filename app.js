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
})
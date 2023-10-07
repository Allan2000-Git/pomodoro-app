const time = document.querySelector('.time');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');
const buttons = document.querySelectorAll('.type');
const pomodoro = document.querySelector(".pomodoro");
const short = document.querySelector(".short");
const long = document.querySelector(".long");
const currentBtn = document.querySelector(".current");

// console.log(buttons);

let minTime=25;
let secs=59;
let cycle=0;
let paused=true;

let timerId;
let currentTab="current";

time.textContent=`${minTime}:00`;

function formatTime(time){
    time=time<10?`0${time}`:time;
    return time;
}

function removeCurrentTab(){
    buttons.forEach((btn)=>{
        btn.classList.remove('current');
    })
}

currentBtn.addEventListener("click",()=>{
    removeCurrentTab();
    currentBtn.classList.add("current");
    pauseTime();
    minTime=25;
    secs=59;
    time.textContent=`${formatTime(minTime)}:00`;
})

startBtn.addEventListener("click",()=>{
    if(paused){
        paused=false;
        time.textContent=`${formatTime(minTime)}:${formatTime(secs)}`;
        timerId = setInterval(() => {
            secs-=1;
            time.textContent=`${formatTime(minTime)}:${formatTime(secs)}`;
            if(secs===0){
                if(minTime!=0){
                    minTime-=1;
                    secs=60;
                } else{
                    clearInterval(timerId);
                }
            }
        }, 1000);
    }
});

pauseBtn.addEventListener("click",pauseTime=()=>{
    paused = true;
    clearInterval(timerId);
})

resetBtn.addEventListener("click",resetTime=()=>{
    pauseTime();
    if(currentTab ==="short"){
        minTime=5;
    } else if(currentTab ==="long"){
        minTime=15;
    } else{
        minTime=25;
    }
    secs=59;
    time.textContent=`${formatTime(minTime)}:00`;
})

short.addEventListener("click",()=>{
    currentTab="short";
    removeCurrentTab();
    short.classList.add("current");
    pauseTime();
    minTime=5;
    secs=59;
    time.textContent=`${formatTime(minTime)}:00`;
})

long.addEventListener("click",()=>{
    currentTab="long";
    removeCurrentTab();
    long.classList.add("current");
    pauseTime();
    minTime=15;
    secs=59;
    time.textContent=`${formatTime(minTime)}:00`;
})
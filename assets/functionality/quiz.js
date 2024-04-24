"use strict";

// //control buttons
// const btnStart = document.getElementById('btn-start');
// const showItemBtn = document.getElementById('next-item__btn');
// const finalBtn = document.getElementById('final-page__btn');
// const restartBtn = document.getElementById('restart-page__btn');
// const btnDiv = document.querySelector('.btn-div');
// //

// //selectors
// const topicSelector = document.querySelector('select[name="topic"]');
// const difficultySelector = document.querySelector('select[name="difficulty"]');
// const itemSelector = document.querySelector('input[name="item"]');
// const timerSelector = document.querySelector('input[name="timer"]');
// //

// const mainDiv = document.getElementById('main');
//
let quizInfo = [], i=1,answer ='',
answerItems,timeResultVal,resultItemArray =[],resultItem,quizItemDivs


let modificationObject = {
    topic: "",
    difficulty: "",
    item: 0,
    timer: 0
}

//
// //default
// const conditionForAnswerItem = new Array(4).fill('quiz-item__answer')
// itemSelector.value = item;
// timerSelector.value = timer;
// document.querySelector('.item-value').textContent = item;
// document.querySelector('.timer-value').textContent = timer;

//window DOMcontent loader

window.addEventListener("DOMContentLoaded",createWelcomePage);

function createWelcomePage(){
    //main body
    const mainBodyEl = document.createElement("main");
    //create the header
    const headerEl = document.createElement("div"); 
    headerEl.textContent = "Welcome to Trivia Game";
    headerEl.className = "quiz-title";
    //array of category choices
    const categoriesArr = [
    {
        value: "",
        textValue: "",   
        }
    ,{
     value: "geography",
     textValue: "Geography",   
    },
    {
    value: "history",
    textValue: "History",   
    },
    {
    value: "science",
    textValue: "Science",   
    },
    {
    value: "music",
    textValue: "Music",   
    },
    {
    value: "sport_and_leisure",
    textValue: "Sport and Leisure",   
    },
    {
    value: "film_and_tv",
    textValue: "Film and TV",   
    },
    {
    value: "arts_and_literature",
    textValue: "Arts and Literature",   
    },
    {
    value: "society_and_culture",
    textValue: "Society and Culture",   
    },
    {
    value: "food_and_drink",
    textValue: "Food and Drink",   
    },
    {
    value: "general_knowledge",
    textValue: "General Knowledge"
    }
    ]

    //arr for difficulty options
    const difficultyArr = [
        {value: "",
    textValue: ""},
    {value: "easy",
    textValue: "Easy"},
    {value: "medium",
    textValue: "Medium"},
    {value: "hard",
    textValue: "Hard"}
    ]

    //container element for the modifications
    const quizModificationEl = document.createElement("div");
    quizModificationEl.className = "quiz-modification";

    //container for topic selection part
    const quizModificationTopicEl = document.createElement("div");
    quizModificationTopicEl.className = "quiz-modification__container";

    
    //label for topic
    const topicLabelEl = document.createElement("label");
    topicLabelEl.setAttribute("for", "topic");
    topicLabelEl.textContent = "Topic"

    //select el for topic selections
    const topicSelectEl = document.createElement("select");
    topicSelectEl.setAttribute("name", "topic");


    quizModificationTopicEl.appendChild(topicLabelEl);

    categoriesArr.forEach(val=>{
        const optionEl = document.createElement("option");
    
        optionEl.value = val.value;
        optionEl.textContent = val.textValue;

        topicSelectEl.appendChild(optionEl);
    })
    quizModificationTopicEl.appendChild(topicSelectEl);

    // This section is to generate difficulty option

    const quizModificationDifficultyEl =document.createElement("div");
    quizModificationDifficultyEl.className = "quiz-modification__container";
    const difficultyLabelEl = document.createElement("label");
    difficultyLabelEl.setAttribute("for", "difficulty");
    difficultyLabelEl.textContent = "Difficulty";

    quizModificationDifficultyEl.appendChild(difficultyLabelEl);

    const difficultySelectEl = document.createElement("select");
    difficultySelectEl.setAttribute("name","difficulty");

    difficultyArr.forEach(val=>{
        const optionEl = document.createElement("option");
    
        optionEl.value = val.value;
        optionEl.textContent = val.textValue;

        difficultySelectEl.appendChild(optionEl);
    })

    quizModificationDifficultyEl.appendChild(difficultySelectEl);

    // This is for inserting item length

    const quizModificationItemEl = document.createElement("div");
    quizModificationItemEl.className = "quiz-modification__container";

    const itemLabelEl = document.createElement("label");
    itemLabelEl.setAttribute("for","item");
    itemLabelEl.textContent = "Number of Items";

    const itemRangeEl = document.createElement("input");
    itemRangeEl.setAttribute("name", "item");
    itemRangeEl.setAttribute("type","range");
    itemRangeEl.setAttribute("min", "0");
    itemRangeEl.setAttribute("max", "20");
    itemRangeEl.setAttribute("step", "5");
   itemRangeEl.value = 0;
    quizModificationItemEl.appendChild(itemLabelEl);
    quizModificationItemEl.appendChild(itemRangeEl);

    //this is for inserting timer 

    const quizModificationTimerEl = document.createElement("div");
    quizModificationTimerEl.className = "quiz-modification__container";
    const timerLabelEl = document.createElement("label");
    timerLabelEl.setAttribute("for","timer");
    timerLabelEl.textContent = "Timer";

    const timerRangeEl = document.createElement("input");

    timerRangeEl.setAttribute("name", "timer");
    timerRangeEl.setAttribute("type","range");
    timerRangeEl.setAttribute("min", "0");
    timerRangeEl.setAttribute("max", "20");
    timerRangeEl.setAttribute("step", "5");
  
    timerRangeEl.value = 0;
    quizModificationTimerEl.appendChild(timerLabelEl);
    quizModificationTimerEl.appendChild(timerRangeEl);

    //this is inserting button

    const quizModificationButtonEl = document.createElement("div");
    quizModificationButtonEl.className = "quiz-modification__container";

    const btnStart = document.createElement("button");
    btnStart.setAttribute("id","btn-start");
    btnStart.textContent = "Start Quiz";
    btnStart.disabled = true;

    quizModificationButtonEl.appendChild(btnStart);


    quizModificationEl.appendChild(headerEl);

    quizModificationEl.appendChild(quizModificationTopicEl);

    quizModificationEl.appendChild(quizModificationDifficultyEl);

    quizModificationEl.appendChild(quizModificationItemEl);

    quizModificationEl.appendChild(quizModificationTimerEl);

    quizModificationEl.appendChild(quizModificationButtonEl);
    //append the mainbodyel
    mainBodyEl.appendChild(quizModificationEl);

    ////listen to modification change
    topicSelectEl.addEventListener("change",modificationFuncHandler);
    difficultySelectEl.addEventListener("change",modificationFuncHandler);
    itemRangeEl.addEventListener("input",modificationFuncHandler);
    timerRangeEl.addEventListener("input",modificationFuncHandler);
    document.querySelector("body").append(mainBodyEl);

    btnStart.addEventListener("click",()=>{
        quizData(modificationObject);
    });
}



function modificationFuncHandler(e) {
    
    if(e.target.name === 'topic') {
        modificationObject.topic = e.target.value
    }else if(e.target.name === 'difficulty') {
        modificationObject.difficulty = e.target.value
    }else if (e.target.name === 'item'){
        modificationObject.item = e.target.value;
    }else if(e.target.name === 'timer') {

        modificationObject.timer = e.target.value
    }
    //    confirmingToStart(e.target.value);
    configRequest(modificationObject);
}


function configRequest(objMod){
    const {topic:a,difficulty:b,item:c,timer:d} = objMod;

    const btnStart = document.querySelector("#btn-start");

    if(a === '' || b === '' || c==='' || Number(c) < 5 ||
     Number(d) ===0 || a === undefined || b === undefined) {

       btnStart.disabled = true;
        return;
    }

    else if(a && b && Number(c) > 0 && Number(d) > 0){
        btnStart.disabled = false;
    }else {
        btnStart.disabled = true;
    }
}
async function quizData(objSetup) {

    const {topic:topicVal,difficulty:difficultyVal,item:itemVal} = objSetup;

    try{
      let result=  await fetch(`https://the-trivia-api.com/api/questions?categories=${topicVal}&limit=${itemVal}&region=PH&difficulty=${difficultyVal}`);

      if(!result.ok){
        return;
      }

      quizInfo = await result.json();

      //createQuizPage(quizInfo);
      startGameFuncHandler(quizInfo);
    }
    catch(error) {

    }
  
}

function startGameFuncHandler(arr){
   if(arr.length === 0) return;
   const mainEl = document.querySelector("main");
   mainEl.innerHTML = "";

   const quizWrapperHeader = document.createElement("div");
   const totalItems = document.createElement("div");
   totalItems.textContent = arr.length;

   const answeredItems = document.createElement("div");
    answeredItems.textContent = 0;

   const chosenTimer = document.createElement("div");
   chosenTimer.textContent = modificationObject.timer;

   quizWrapperHeader.appendChild(totalItems);
   quizWrapperHeader.appendChild(answeredItems);
   quizWrapperHeader.appendChild(chosenTimer);

   mainEl.appendChild(quizWrapperHeader);
   const quizItemsWrapper = document.createElement("div");
    quizItemsWrapper.className = "quiz-items__wrapper";

    mainEl.appendChild(quizItemsWrapper);
    
   arr.forEach((val,i)=>createQuizItem(val,i));
   changeQuizItem(i);
}

function createQuizItem(arrItem,i) {

    const quizItemsWrapper = document.querySelector(".quiz-items__wrapper");
    const quizItemEl = document.createElement("div");
    quizItemEl.dataset.id =i + 1; 
    quizItemEl.className="quiz-item__el";
    const quizMainHeader = document.createElement("div");

    const questionEl = document.createElement("div");
    questionEl.textContent = arrItem.question;
    const timerEl = document.createElement("div");
    timerEl.textContent = modificationObject.timer;

    quizMainHeader.appendChild(questionEl);
    quizMainHeader.appendChild(timerEl);
    quizItemEl.appendChild(quizMainHeader);
    const answerSet = arrItem.incorrectAnswers.concat([arrItem.correctAnswer]).sort();

    answerSet.forEach(val=>{
        const quizAnswerItem = document.createElement("div");
       
        quizAnswerItem.textContent = val;
        
        quizItemEl.appendChild(quizAnswerItem);
   

    })
    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("type","button");
    submitBtn.textContent = "Next";
   
    quizItemEl.appendChild(submitBtn);
    submitBtn.addEventListener("click",(e)=>{
        console.log(e)
        i++;
        changeQuizItem(i);
    })
    quizItemsWrapper.appendChild(quizItemEl);
    
}


function changeQuizItem(index){
    if(index === 5 ) return;
    document.querySelectorAll(".quiz-item__el").forEach(val=>{
        if(index !== 1) {
            val.classList.remove("covered-item");
            const multipliedRem =index === 1 ? ((index -1) + 1.25) * -7.5  :
            ((index -1) + 1.25) * -7.5 - (index * 1.5);
    
            val.style.transform = `translateY(${multipliedRem}rem)`;
            val.style.transition = "transform 2s ease-in";
        }
    
        // if(Number(val.dataset.id) !== index) {
        //     val.classList.add("covered-item");
        // }
    })
}

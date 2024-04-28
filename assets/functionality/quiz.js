"use strict";

let quizInfo = [], i=0,answer ='',
answeredItems = 0,timeResultVal,resultItemArray =[],
resultItem,quizItemDivs,timerCount = 0;


let modificationObject = {
    topic: "",
    difficulty: "",
    item: 0,
    timer: 0
}



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
    answeredItems.textContent = i + 1;

   const chosenTimer = document.createElement("div");
   chosenTimer.textContent = modificationObject.timer;

   quizWrapperHeader.appendChild(totalItems);
   quizWrapperHeader.appendChild(answeredItems);
   quizWrapperHeader.appendChild(chosenTimer);

   mainEl.appendChild(quizWrapperHeader);
   const quizItemsWrapper = document.createElement("div");
    quizItemsWrapper.className = "quiz-items__wrapper";

    mainEl.appendChild(quizItemsWrapper);
    
  createQuizItem(arr[i],i);
}

function createQuizItem(arrItem,i) {
    doSomething(Number(modificationObject.timer));
    let clickCount = 0;
    const quizItemsWrapper = document.querySelector(".quiz-items__wrapper");
    const quizItemEl = document.createElement("div");
    quizItemEl.dataset.id =i + 1; 
    quizItemEl.className="quiz-item__el";
    const quizMainHeader = document.createElement("div");

    const questionEl = document.createElement("div");
    questionEl.textContent = arrItem.question;
    const timerEl = document.createElement("div");
    timerTexContent(timerEl, Number(modificationObject.timer))


    quizMainHeader.appendChild(questionEl);
    quizMainHeader.appendChild(timerEl);
    quizItemEl.appendChild(quizMainHeader);
    const answerSet = arrItem.incorrectAnswers.concat([arrItem.correctAnswer]).sort();

    let answeredItemObj= new Object();
    
    answeredItemObj.id = i + 1;
    answeredItemObj.question = arrItem.question
    answeredItemObj.isCorrect = false;
    answeredItemObj.myAnswer = "";
    answeredItemObj.correctAnswer = arrItem.correctAnswer;
    
    answerSet.forEach(val=>{
        const quizAnswerItem = document.createElement("div");
    
        quizAnswerItem.textContent = val;

        quizAnswerItem.addEventListener("click",(e)=>{

            if(timerCount <= 0) return;
            selectAnswerFunc(answeredItemObj,arrItem,resultItemArray,e.target.textContent)
        })
        
        quizItemEl.appendChild(quizAnswerItem);

       
    })

    quizTimer(answeredItemObj,resultItemArray,Number(modificationObject.timer));
    const submitBtn = document.createElement("button");
    nextBtnActivation(submitBtn,Number(modificationObject.timer),clickCount);
    submitBtn.setAttribute("type","button");
    submitBtn.textContent = i === quizInfo.length -1 ? "Check Quiz": "Next";
   
    quizItemEl.appendChild(submitBtn);

    submitBtn.addEventListener("click",changeItems)
    quizItemsWrapper.appendChild(quizItemEl);
    
}

function changeItems(){
    if(i !== 4) {
        i++;
  
        return startGameFuncHandler(quizInfo);
    }else {
        console.log(resultItemArray.filter(val => val));
    }
    
}

let count = 0;

function doSomething(n) {
    if(n === 0) {

      return;
    }
    
   setTimeout(() => {
    doSomething(n - 1)
   
   }, 1000);

   timerCount = n;
}

function timerTexContent(targetEl,timeCount){
    targetEl.textContent = timeCount;
    var timer = setInterval(function(){
        targetEl.textContent = timeCount;
        timeCount--;
        if (timeCount < 0) {
            clearInterval(timer);
        }
    }, 1000);   
}

function quizTimer(obj,arr,timeCount){
   
    var timer = setInterval(function(){
        timeCount--;
        if (timeCount < 0) {
            arr.push(obj);
            clearInterval(timer);
        }
    }, 1000);
}

function nextBtnActivation(nextBtn,timeCount,clickCount){
  
    nextBtn.disabled = clickCount ===0;
    var timer = setInterval(function(){
        timeCount--;
        if (timeCount < 0) {
            nextBtn.disabled = false
            clearInterval(timer);
        }
    }, 1000);

    
}


function selectAnswerFunc(obj,arr,resultArr,playerAnswer){
    let answeredItem = resultArr.filter(val=>val?.id === i+1);
    obj.id = i + 1;
    obj.question = arr.question
    obj.isCorrect = playerAnswer === arr.correctAnswer;

    obj.myAnswer = playerAnswer;

    obj.correctAnswer =  arr.correctAnswer;

   
    if(!answeredItem){
        
        resultArr.push(obj)
        
    }else {
        answeredItem.isCorrect = playerAnswer === arr.correctAnswer;
        answeredItem.myAnswer = playerAnswer;
        answeredItem.correctAnswer = arr.correctAnswer;

        arr[answeredItem?.id] = answeredItem;

    }

   
}





 

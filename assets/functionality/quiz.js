"use strict";

let quizInfo = [],i=0,
answeredItems = 0,resultItemArray =[],
timerCount = 0;

let modificationObject = {
    topic: "",
    difficulty: "",
    item: 0,
    timer: 0
}

window.addEventListener("DOMContentLoaded",createWelcomePage);

function createWelcomePage(){
    document.querySelector("body").innerHTML = "";
    quizInfo = [];
    resultItemArray = [];
    i=0;
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
        timerCount = Number(e.target.value)
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
    let cloneTimerValue = Number(modificationObject.timer);
    timerCount = Number(modificationObject.timer);
    doSomething(cloneTimerValue);
  
    const quizItemsWrapper = document.querySelector(".quiz-items__wrapper");
    const quizItemEl = document.createElement("div");
    quizItemEl.dataset.id =i + 1; 
    quizItemEl.className="quiz-item__el";
    const quizMainHeader = document.createElement("div");

    const questionEl = document.createElement("div");
    questionEl.textContent = arrItem.question;
    const timerEl = document.createElement("div");
    timerTexContent(timerEl, cloneTimerValue)


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
    answeredItemObj.loggedTime = 0;

    answerSet.forEach(val=>{
        const quizAnswerItem = document.createElement("div");
    
            quizAnswerItem.textContent = val;

        quizAnswerItem.addEventListener("click",(e)=>{
          
            if(timerCount <= 0) return;
        
            answeredItemObj.loggedTime = timerCount;
            selectAnswerFunc(answeredItemObj,arrItem,resultItemArray,e.target.textContent);
        
        })
        
        quizItemEl.appendChild(quizAnswerItem);

       
    })

    quizTimer(answeredItemObj,resultItemArray,cloneTimerValue);
    
    quizItemsWrapper.appendChild(quizItemEl);
    
}


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
        if (timeCount < 0 || quizInfo.length === i) {
            clearInterval(timer);
        }
    }, 1000);   
}

function quizTimer(obj,arr,timeCount){

    if(quizInfo.length=== i) return;
   
    var timer = setInterval(function(){
        timeCount--;
        if (timeCount < 0) {
            arr.push(obj);
            changeItems();
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

function changeItems(){
    i++;
    if(i <= quizInfo.length - 1) {
    
        return startGameFuncHandler(quizInfo);
    }else {
     
        const mainEl = document.querySelector("main");
        mainEl.innerHTML = "";

        const resultHeader = document.createElement("div");

        const resultTitle = document.createElement("div");

        resultTitle.textContent = "Results";

        const restartGameBtn = document.createElement("button");
        const restartGameBtnIcon = document.createElement("span");
        const restartGameBtnSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
      </svg>`;
      restartGameBtnIcon.innerHTML = restartGameBtnSVG;

        restartGameBtn.textContent = "Restart Game";
        restartGameBtn.append(restartGameBtnIcon);
        restartGameBtn.addEventListener("click",createWelcomePage);

        
        const score = document.createElement("div");
        const totalCorrectItems = resultItemArray.filter(val=>val.isCorrect);
        score.textContent = `${totalCorrectItems.length}/ ${resultItemArray.length}`
        resultHeader.append(resultTitle);
        resultHeader.append(restartGameBtn);
        resultHeader.append(score);
        mainEl.append(resultHeader);

        const resultBody = document.createElement("div");


        for(const item of resultItemArray) {
            const resultItem = document.createElement("div");

            const questionItem = document.createElement("div");

            questionItem.textContent = "Question: "+ item.question;

            const myAnswer = document.createElement("div");

            myAnswer.textContent= "Your Answer: " + item.myAnswer;

            const correctAnswer = document.createElement("div");

            correctAnswer.textContent = "Correct Answer: " + item.correctAnswer;

            resultItem.appendChild(questionItem);

            resultItem.appendChild(myAnswer);

            resultItem.appendChild(correctAnswer);

            resultBody.appendChild(resultItem);
        }

        mainEl.append(resultBody);  
    }
    
}





 

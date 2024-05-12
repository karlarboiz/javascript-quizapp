"use strict";

let quizInfo = [],i=0,
answeredItems = 0,resultItemArray =[],
timerCount = 0,topicArr = [];

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
    headerEl.textContent = "Trivia Game";
    headerEl.className = "quiz-title";
    //array of category choices
    const categoriesArr = [{
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
    topicLabelEl.className = "main-label";
    topicLabelEl.textContent = "Topic"

    //select el for topic selections
  
    const topicCheckBoxes = document.createElement("div");
    topicCheckBoxes.className = "topic-choices__container-default snaps-inline topic-choices__group"
    quizModificationTopicEl.appendChild(topicLabelEl);

    categoriesArr.forEach((val,i)=>{
        const topicCheckBoxContainer =document.createElement("div");
        topicCheckBoxContainer.className = `topic-checkbox__container-${i} topic-choices__container-default-sub`;

        const topicCheckBox = document.createElement("input");
        topicCheckBox.setAttribute("type","checkbox");
        topicCheckBox.setAttribute("id",val.value);
        topicCheckBox.setAttribute("name","topic");
        topicCheckBox.value= val.value;
       
        topicCheckBox.addEventListener("change",modificationFuncHandler);

        const topicCheckBoxLabel = document.createElement("label");
        topicCheckBoxLabel.setAttribute("for",val.value);
        topicCheckBoxLabel.textContent = val.textValue;


        const topicCheckBoxImg = document.createElement("img");

        topicCheckBoxImg.src = `assets/pictures/${val.value}.jpg`
        topicCheckBoxContainer.appendChild(topicCheckBox);
        topicCheckBoxContainer.appendChild(topicCheckBoxLabel);
        topicCheckBoxContainer.appendChild(topicCheckBoxImg);
        topicCheckBoxes.appendChild(topicCheckBoxContainer);


    })
  
    quizModificationTopicEl.appendChild(topicCheckBoxes);

   
    // This section is to generate difficulty option

    const quizModificationDifficultyEl =document.createElement("div");
    quizModificationDifficultyEl.className = "quiz-modification__container";
    const difficultyLabelEl = document.createElement("label");
    difficultyLabelEl.setAttribute("for", "difficulty");
    difficultyLabelEl.className = "main-label";
    difficultyLabelEl.textContent = "Difficulty";

    quizModificationDifficultyEl.appendChild(difficultyLabelEl);

    const difficultySelectEl = document.createElement("select");
    difficultySelectEl.setAttribute("name","difficulty");
    const difficultyRadios = document.createElement("div");
    difficultyRadios.className = "difficulty-radios__container";
    difficultyArr.forEach((val,i)=>{

        const difficultyRadioContainer= document.createElement("div");
        difficultyRadioContainer.className = `difficulty-radios__container-${i} difficulty-radios__container-sub`;
        const difficultyRadio = document.createElement("input");
        difficultyRadio.setAttribute("type","radio");
        difficultyRadio.setAttribute("id",val.value);
        difficultyRadio.setAttribute("name","difficulty");
        difficultyRadio.value = val.value;
        difficultyRadio.checked = val.value === modificationObject.difficulty;
        difficultyRadio.addEventListener("change",modificationFuncHandler);

        const difficultyRadioLabel = document.createElement("label");
        difficultyRadioLabel.setAttribute("for",val.value);
        difficultyRadioLabel.textContent = val.textValue;
        
        difficultyRadioContainer.appendChild(difficultyRadio);
        difficultyRadioContainer.appendChild(difficultyRadioLabel)
        

        difficultyRadios.appendChild(difficultyRadioContainer);
    })
    quizModificationDifficultyEl.appendChild(difficultyRadios);
    
     //this is general modification container for both item and timer modifications

     const generalItemAndTimerContainer = document.createElement("div");
     generalItemAndTimerContainer.className ="quiz-modification__container "; 
 

    // This is for inserting item length

    const quizModificationItemEl = document.createElement("div");
    quizModificationItemEl.className = "quiz-modification__container";

    const itemLabelEl = document.createElement("label");
    itemLabelEl.setAttribute("for","item");
    itemLabelEl.className = "main-label";
    itemLabelEl.textContent = "Number of Items";

    const itemRangeEl = document.createElement("input");
    itemRangeEl.setAttribute("name", "item");
    itemRangeEl.setAttribute("type","range");
    itemRangeEl.setAttribute("min", "0");
    itemRangeEl.setAttribute("max", "20");
    itemRangeEl.setAttribute("step", "5");
    itemRangeEl.value = modificationObject.item;
    quizModificationItemEl.appendChild(itemLabelEl);
    quizModificationItemEl.appendChild(itemRangeEl);
    generalItemAndTimerContainer.appendChild(quizModificationItemEl);

    //this is for inserting timer 

    const quizModificationTimerEl = document.createElement("div");
    quizModificationTimerEl.className = "quiz-modification__container";
    const timerLabelEl = document.createElement("label");
    timerLabelEl.setAttribute("for","timer");
    timerLabelEl.className = "main-label";
    timerLabelEl.textContent = "Timer";

    const timerRangeEl = document.createElement("input");

    timerRangeEl.setAttribute("name", "timer");
    timerRangeEl.setAttribute("type","range");
    timerRangeEl.setAttribute("min", "0");
    timerRangeEl.setAttribute("max", "15");
    timerRangeEl.setAttribute("step", "5");
  
    timerRangeEl.value = modificationObject.timer;
    quizModificationTimerEl.appendChild(timerLabelEl);
    quizModificationTimerEl.appendChild(timerRangeEl);

    generalItemAndTimerContainer.appendChild(quizModificationTimerEl);

    document.querySelector("body").append(headerEl);

    quizModificationEl.appendChild(quizModificationTopicEl);

    quizModificationEl.appendChild(quizModificationDifficultyEl);

    quizModificationEl.appendChild(generalItemAndTimerContainer);
    // quizModificationEl.appendChild(quizModificationButtonEl);
    //append the mainbodyel
    mainBodyEl.appendChild(quizModificationEl);

    ////listen to modification change
    itemRangeEl.addEventListener("input",modificationFuncHandler);
    timerRangeEl.addEventListener("input",modificationFuncHandler);
    document.querySelector("body").append(mainBodyEl);

   
    configRequest(modificationObject);
}

function modificationFuncHandler(e) {
    
    if(e.target.name === 'topic') {
        let topicsSummed = "";

        
        if(e.target.checked) {
            topicArr.push(e.target.value);
            e.target.parentElement.className = "topic-choices__container-default-active";

           
        }else {
            let filteredTopicArr = topicArr.filter(val=>val!==e.target.value)
            topicArr = filteredTopicArr;

            e.target.parentElement.className = "topic-choices__container-default-sub"
        }

        topicsSummed+= topicArr.join(",");
        
        showErrorExceedingTopicsRequired(topicArr);
        modificationObject.topic = (topicArr.length <= 5)? topicsSummed: "";
    }else if(e.target.name === 'difficulty') {
        modificationObject.difficulty = e.target.value
    }else if (e.target.name === 'item'){
        modificationObject.item = e.target.value;
    }else {

        modificationObject.timer = e.target.value
        timerCount = Number(e.target.value)
    }
    configRequest(modificationObject);
}

function showErrorExceedingTopicsRequired(arr){
    const errorMsg = document.createElement("div");

    errorMsg.className = "error-message";
    
    errorMsg.textContent = "Choose up to 5 topics only!";

    if(arr.length > 5) {
        document.querySelector("body").append(errorMsg);
    }else {
      if(document.querySelector(".error-message")){
        document.querySelector(".error-message").remove();
      }  
    }
}

function showErrorDuringFailedFetch(){
    const errorMsg = document.createElement("div");

    errorMsg.className = "error-message";
    
    errorMsg.textContent = "Something went wrong! Please try again.";

    document.querySelector("body").append(errorMsg);

}

function configRequest(objMod){
    const {topic:a,difficulty:b,item:c,timer:d} = objMod;

    const quizModificationButtonEl = document.createElement("div");
    quizModificationButtonEl.className = "quiz-modification__container quiz-modification__container-button";

    const btnStart = document.createElement("button");
    btnStart.setAttribute("id","btn-start");
    btnStart.textContent = "Start Quiz";

    quizModificationButtonEl.appendChild(btnStart);

    const quizModificationButtonElTarget = document.querySelector(".quiz-modification__container-button");
    const btnStartTarget = document.querySelector("#btn-start");
    if(a === '' || b === '' || c==='' || Number(c) < 5 ||
     Number(d) ===0 || a === undefined || b === undefined) {
        if(quizModificationButtonElTarget) {
            quizModificationButtonElTarget.remove();
        }
        return;
    }

    else if(a && b && Number(c) > 0 && Number(d) > 0){
         
        if(!btnStartTarget) {
            document.querySelector("main").appendChild(quizModificationButtonEl);
            btnStart.addEventListener("click",()=>{
                quizData(objMod);
            });
        }else {
            return;
        }
      
    
    }else {
        if(quizModificationButtonElTarget) {
            quizModificationButtonElTarget.remove();
        }
        return ;
    }
}


async function quizData(objSetup) {
    let isLoaded = false
    const {topic:topicVal,difficulty:difficultyVal,item:itemVal} = objSetup;
    loadingFunctionality(isLoaded);
    try{
      let result=  await fetch(`https://the-trivia-api.com/api/questions?categories=${topicVal}&limit=${itemVal}&region=PH&difficulty=${difficultyVal}`);

      if(!result.ok){
        return;
      }

      quizInfo = await result.json();

      if(quizInfo.length > 0){
        isLoaded = true;

        loadingFunctionality(isLoaded);
      }
      startGameFuncHandler(quizInfo);
    }
    catch(error) {
        showErrorDuringFailedFetch();
    }
  
}

function startGameFuncHandler(arr){
   if(arr.length === 0) return;
   const mainEl = document.querySelector("main");
   mainEl.innerHTML = "";

   const quizWrapperHeader = document.createElement("div");
    quizWrapperHeader.className = "quiz-main__header";
   const totalItems = document.createElement("div");
   const totalItemsSpanIcon = document.createElement("span");
    totalItemsSpanIcon.className = "quiz-indicator__svg";
   const totalItemsSpanText = document.createElement("span");
   totalItemsSpanText.className = "quiz-indicator__content";
   totalItemsSpanIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  class="bi bi-list-ol" viewBox="0 0 16 16">
   <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
   <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635z"/>
 </svg>`
   
    totalItemsSpanText.textContent = arr.length;
    totalItems.append(totalItemsSpanIcon);
    totalItems.append(totalItemsSpanText);
    totalItems.className = "quiz-main__header-sub";


   const answeredItems = document.createElement("div");
   const answeredItemsSpanIcon = document.createElement("span");
   answeredItemsSpanIcon.className = "quiz-indicator__svg";
   const answeredItemsSpanText = document.createElement("span");
   answeredItemsSpanText.className = "quiz-indicator__content";
   answeredItemsSpanIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-card-checklist" viewBox="0 0 16 16">
   <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
   <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
 </svg>`
   answeredItemsSpanText.textContent = i + 1;
   answeredItems.append(answeredItemsSpanIcon);
   answeredItems.append(answeredItemsSpanText);
   answeredItems.className = "quiz-main__header-sub";

   const chosenTimer = document.createElement("div");
   const chosenTimerSpanIcon = document.createElement("span");
   chosenTimerSpanIcon.className = "quiz-indicator__svg";
   const chosenTimerSpanText = document.createElement("span");
   chosenTimerSpanText.className = "quiz-indicator__content";
   chosenTimerSpanIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-clock" viewBox="0 0 16 16">
   <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
   <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
 </svg>`;
 chosenTimerSpanText.textContent = modificationObject.timer;
   chosenTimer.append(chosenTimerSpanIcon);
   chosenTimer.append(chosenTimerSpanText);
   chosenTimer.className = "quiz-main__header-sub";

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
  
    const quizItemsWrapper = document.querySelector(".quiz-items__wrapper");
    const quizItemEl = document.createElement("div");
    quizItemEl.dataset.id =i + 1; 
    quizItemEl.className="quiz-answers";
    const quizMainHeader = document.createElement("div");
    quizMainHeader.className = "quiz-item__header";
    const questionEl = document.createElement("div");
    questionEl.className = "question";
    questionEl.textContent = arrItem.question;
    const categoryEl = document.createElement("span");
    categoryEl.textContent = arrItem.category;
    const timerEl = document.createElement("div");
    timerTexContent(timerEl, cloneTimerValue)

    quizMainHeader.appendChild(categoryEl);
    quizMainHeader.appendChild(timerEl);
    quizItemsWrapper.appendChild(quizMainHeader);
    quizItemsWrapper.appendChild(questionEl);
    const answerSet = arrItem.incorrectAnswers.concat([arrItem.correctAnswer]).sort();

    let answeredItemObj= new Object();
    
    answeredItemObj.id = i + 1;
    answeredItemObj.question = arrItem.question
    answeredItemObj.isCorrect = false;
    answeredItemObj.myAnswer = "";
    answeredItemObj.correctAnswer = arrItem.correctAnswer;
    answeredItemObj.loggedTime = 0;
    answeredItemObj.category = arrItem.category;
    answerSet.forEach((val,index,orgArr)=>{
        const quizAnswerItem = document.createElement("div");
        
        quizAnswerItem.className = "quiz-answers__item";
        quizAnswerItem.textContent = val;   

        const quizAnswerItemIconSpan = document.createElement("span");

        const quizAnswerItemIconText = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-record-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
        </svg>
        `

        quizAnswerItemIconSpan.innerHTML = quizAnswerItemIconText;

        quizAnswerItem.appendChild(quizAnswerItemIconSpan);
        quizAnswerItem.addEventListener("click",(e)=>{
            document.querySelectorAll(".quiz-answers__item").forEach(quizVal=>{
                quizVal.classList.remove("quiz-answers__item-active");
            })
            e.target.classList.add("quiz-answers__item-active");
          
            answeredItemObj.loggedTime = Math.floor(new Date().getTime());
            console.log(e.target.textContent)
            selectAnswerFunc(answeredItemObj,arrItem,resultItemArray,e.target.textContent);
        
        })
        
        quizItemEl.appendChild(quizAnswerItem);

       
    })

    quizTimer(answeredItemObj,resultItemArray,cloneTimerValue);
    
    quizItemsWrapper.appendChild(quizItemEl);
    
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
        resultHeader.className = "result-header";      
        const resultTitle = document.createElement("div");
        resultTitle.className = "result-header__item";
        resultTitle.textContent = "Results";

        const restartGameBtnContainer = document.createElement("div");
        restartGameBtnContainer.className = "result-header__item";
        const restartGameBtn = document.createElement("button");
        const restartGameBtnIcon = document.createElement("span");
        const restartGameBtnSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
      </svg>`;
        restartGameBtnIcon.innerHTML = restartGameBtnSVG;

        restartGameBtn.textContent = "Restart Game";
        restartGameBtn.append(restartGameBtnIcon);
        restartGameBtnContainer.appendChild(restartGameBtn);
        restartGameBtn.addEventListener("click",createWelcomePage);

        
        const score = document.createElement("div");
        score.className = "result-header__item";
        const totalCorrectItems = resultItemArray.filter(val=>val.isCorrect);
        score.textContent = `${totalCorrectItems.length}/ ${resultItemArray.length}`
        resultHeader.append(resultTitle);
        resultHeader.append(restartGameBtnContainer);
        resultHeader.append(score);
        mainEl.append(resultHeader);

        const resultBody = document.createElement("div");

        resultBody.className = "result-body";

        for(const item of resultItemArray) {
            const resultItem = document.createElement("div");
            resultItem.className = "result-body__item";

            const questionItem = document.createElement("div");
            questionItem.className = "quiz-question";
            questionItem.textContent = "Question: "+ item.question;

            const myAnswer = document.createElement("div");
            myAnswer.className = "quiz-myanswer";
            myAnswer.textContent= "Your Answer: " + item.myAnswer;

            const correctAnswer = document.createElement("div");
            correctAnswer.className = "quiz-correct__answer";
            correctAnswer.textContent = "Correct Answer: " + item.correctAnswer;

            resultItem.appendChild(questionItem);

            resultItem.appendChild(myAnswer);

            resultItem.appendChild(correctAnswer);

            resultBody.appendChild(resultItem);
        }

        mainEl.append(resultBody);  
    }
    
}

function loadingFunctionality(isLoaded){
    
    if(!isLoaded) {
        document.querySelector("body").innerHTML = "";

        const loader = document.createElement("div");
        loader.className = "loader";
        document.querySelector("body").append(loader);
    }else {
        let loaderCreated = document.querySelector(".loader");

        if(loaderCreated) {
            loaderCreated.remove();

            let main = document.createElement("main");

            document.querySelector("body").append(main);
        }
    }
    
}





 

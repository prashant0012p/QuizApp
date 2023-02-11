

let RulesPage = document.getElementById("rulecontainer");
let categoryBox = document.getElementById("CategoryButtons");
let categoryText = document.getElementById("CategoryTitle");
let questionBox = document.getElementById("Qcontainer");
let answerBox = document.getElementById("Acontainer");
let goodluck = document.getElementById("wishes");
let nextQuestionBtn = document.getElementById("nextbtn");
let SubmitButton = document.getElementById("submitbtn");
let QuizHomePage = document.getElementById("QHP");
let QuizPage = document.getElementById("QP");
let ResultPage = document.getElementById("Rpage");
let questionIndex = [];
let displayedQuestion = [];
let myArray = [];


let quiznumCount = document.getElementById("quiznumcount");

let Timerelement = document.getElementById("timer");
let ScoreCount = document.getElementById("scorecount");

let username = "";        // user name
let questionCounter = 0;  // how many quiz
let correctAnswers = 0;   // how many correct
let timer = 300;          // time
let myattempt = 0;         // how many attempt


let ResultName = document.getElementById("myname");

let ResulttotalQuestion = document.getElementById("totalQuestion");
let ResulttotalAttempt = document.getElementById("totalAttempt");
let ResulttotalCorrect = document.getElementById("totalCorrect");
let ResulttotalWrong = document.getElementById("totalWrong");
let ResultPercentage = document.getElementById("Percentage");








document.getElementById('enter').onclick = function validname() {

    username = document.getElementById('yname').value

    if (username === "" || username === null) {
        alert(" please enter you name ");

    }
    else if (username > 0 || username < 0) {

        alert(" please do not enter any number ");

    }
    else if (username.length === 1) {
        alert(" name must be two words ")

    }
    else {
        document.getElementById('welcome').innerHTML = " hello " + " &#128400;   " + username;

    }

}



window.onload = function createCategory() {

    for (i = 0; i < quizData.length; i++) {

        const categoryList = document.createElement("div");
        categoryList.innerHTML = quizData[i].category;
        categoryList.setAttribute("data-id", i);  // first div data-id =0 , 2nd data-id =1 , 3rd data-id =2 , 4th data-id = 3
        categoryList.setAttribute("class", "categoryData");
        categoryList.setAttribute("onclick", "selectedCategory(this)");   // this means perticuler (Each)
        categoryBox.appendChild(categoryList);



    }

}
var Index;
function selectedCategory(ele) {

    if (username === "" || username === null) {
        alert("please enter your name")
    }
    else {


       
        QuizHomePage.classList.add("hide");
        RulesPage.style.display = "block"




        setTimeout(() => {

            Index = ele.getAttribute("data-id");
            categoryText.innerHTML = quizData[Index].category;
            RulesPage.style.display = "none"
            QuizPage.classList.add("show");
            goodluck.innerHTML = username;
            startEveryQuestionTimer();
            nextQuestion();


        }, 10000);



    }
}

function startEveryQuestionTimer() {

    var timerF = setInterval(timerFunction, 1000);

    function timerFunction() {

        if (timer == 0) {

            showResult();
            clearInterval(timerF);



        }
        else if (timer <= 100) {

            timerborder = document.querySelector(".timer")
            timerborder.style.borderColor = "red";
            Timerelement.style.color = "red";
            timer--
            Timerelement.innerHTML = timer;

        }
        else {

            timer--
            Timerelement.innerHTML = timer;



        }
    }

}






nextQuestionBtn.addEventListener("click", nextQuestion);
function nextQuestion() {

    if (quizData[Index].quizWrap.length === questionCounter) {


        SubmitButton.style.display = "inline"
        nextQuestionBtn.style.display = "none";




    }

    else {

        generateRandomQuestion();

    }









    // nextButton will be hidden by nextQuestionBtn.addEventListener("click", nextQuestion);
    nextQuestionBtn.style.display = "none";
    if (correctAnswers < 4) {
        ScoreCount.style.color = "red"

    }
    else {

        ScoreCount.style.color = "green"

    }

    myattempt++


}

function generateRandomQuestion() {


    const randomNumber = Math.floor(Math.random() * quizData[Index].quizWrap.length);
    quiznumCount.innerHTML = (questionCounter + 1) + " / " + quizData[Index].quizWrap.length;


    let hitDuplicate = 0;

    if (myArray.length == 0) {
        questionIndex = randomNumber;

    }

    else {

        for (let i = 0; i < myArray.length; i++) {
            if (randomNumber == myArray[i]) {
                hitDuplicate = 1;
            }
        }

        if (hitDuplicate == 1) {
            generateRandomQuestion();
            return;
        }
        else {
            questionIndex = randomNumber;
        }
    }
    myArray.push(randomNumber);
    console.log(myArray);



    // QUESTION
    myArrayquestion = quizData[Index].quizWrap[randomNumber].QUESTION;
    questionBox.innerHTML = myArrayquestion;

    // OPTION

    //// option[i] remove in answerbox
    var optionele = document.getElementById("0");

    if (optionele) {

        for (i = 0; i < quizData[Index].quizWrap[randomNumber].OPTIONS.length; i++) {

            optioneleele = document.getElementById(i);
            optioneleele.remove();

        }


    }

    // option[i] print in answerbox
    for (i = 0; i < quizData[Index].quizWrap[randomNumber].OPTIONS.length; i++) {

        var ans = document.createElement("div");
        ans.innerHTML = quizData[Index].quizWrap[randomNumber].OPTIONS[i];
        answerBox.appendChild(ans);
        ans.setAttribute("onclick", "option(this)")
        ans.setAttribute("class", "optionI")
        ans.setAttribute("id", i);
        ans.setAttribute("data-id", i)
    }
    myOPTION = quizData[Index].quizWrap[randomNumber].OPTIONS[i];
    // ANSWER
    myANSWER = quizData[Index].quizWrap[randomNumber].ANSWER;
    questionCounter++

} // end of function generateRandomQuestion()



function option(option) {


    optionIndex = option.getAttribute("data-id");
    optionIndexPARSEINT = parseInt(optionIndex);

    //   console.log(optionIndex);
    console.log(optionIndexPARSEINT);

    console.log(myANSWER);



    // console.log(optionLen)

    // myANSWER is in 176 line.


    if (optionIndexPARSEINT === myANSWER) {

        console.log("nice this is rigth ans");
        option.classList.add("rightANS");
        option.classList.remove("optionI");
        correctAnswers++
        ScoreCount.innerHTML = " : " + correctAnswers;
        // nextButton show only when we click any option (1,2,3,4) by  ans.setAttribute("onclick", "option(this)")
        nextQuestionBtn.style.display = "inline";







    }

    else {

        console.log("this is a wrong ans");
        option.classList.add("wrongANS");
        option.classList.remove("optionI");
        // nextButton show only when we click any option (1,2,3,4) by  ans.setAttribute("onclick", "option(this)")
        nextQuestionBtn.style.display = "inline";




        // if we select wrong ans. then this help to show which one is right ans.
        OptionLen = answerBox.children.length;

        for (i = 0; i < OptionLen; i++) {

            if (parseInt(answerBox.children[i].id) == myANSWER) {

                answerBox.children[i].classList.add("rightANS");
                answerBox.children[i].classList.remove("optionI");


            }

        }



    }

    unclickableOption();

} // end of function option(option)


// remove pointer event of option when we click either right ans or wrong ans 
function unclickableOption() {
    OptionLen = answerBox.children.length;
    for (i = 0; i < OptionLen; i++) {

        // answerBox.children[i].classList.remove("optionI");      
        answerBox.children[i].classList.add("already-answerd");


    }


} // end of function unclickableOption()


function showResult() {
    let ResulttotalTime = document.getElementById("totalTime");
    console.log("over");
    QuizPage.style.display = "none"


    ResultPage.style.display = "block";


    ResultName.innerHTML = username + " your result is : ";
    ResultName.style.color = "blue";

    let mytotaltime = Math.abs(300 - timer);



    ResulttotalTime.innerHTML = " Total Time Taken : " + mytotaltime + " seconds ";
    ResulttotalQuestion.innerHTML = " Total Question : " + quizData[Index].quizWrap.length;

    ResulttotalCorrect.innerHTML = " Correct : " + correctAnswers;

    let mywrong = (myattempt - 1) - correctAnswers;
    ResulttotalWrong.innerHTML = " Wrong : " + mywrong;


    if ((myattempt - 1) === 9) {

        myattempt = 10;
        ResulttotalAttempt.innerHTML = " Attempt : " + myattempt;

    }
    else {
        ResulttotalAttempt.innerHTML = " Attempt : " + (myattempt - 1);

    }





    let Percentage = (correctAnswers * 100) / quizData[Index].quizWrap.length;
    ResultPercentage.innerHTML = " Percentage : " + Percentage + " % ";

    if (ResultPercentage < 50) {

        ResultPercentage.style.color = "red"

    }
    else if (ResultPercentage > 50) {

        ResultPercentage.style.color = "green"

    }






}







function GoToHome() {

    setTimeout(() => {

        window.location.reload(true);

    }, 1000);



}


function Restart(ele) {





ResultPage.style.display = "none";
QuizPage.style.display = "block";
timer = 300;    
questionCounter = 0;
correctAnswers = 0;
startEveryQuestionTimer();
nextQuestion();
generateRandomQuestion();
showResult();








}




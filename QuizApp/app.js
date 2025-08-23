let btn = document.querySelector("#playbtn");
btn.addEventListener("click",function(){
    console.log("hello");
    let start = document.querySelector(".play");
    let quizpage = document.querySelector("#quiz");
    start.style.display="none";
    quizpage.style.display="block";
    Questions();
});
////////////////////////////////////////////////////////////////
let url = "https://opentdb.com/api.php?amount=10&type=multiple";
let ques = [];
let curr_ques = 0;
let score = 0;
const nextBtn = document.querySelector("#next");
async function Questions()
{
    try{
        const res = await axios.get(url);
        ques = res.data.results;
        showQuestion(curr_ques);
    }
    catch(err){
        console.log("error"+err);
    }
}
function showQuestion(curr_ques){
    let thisques = ques[curr_ques];
    let str =decodeHTML(thisques.question);
    console.log(str);
    let h2 = document.querySelector("#question");
    h2.textContent = str;
    // ques[curr_ques]=str;
    getOptions(curr_ques,thisques);
}

async function getOptions(curr_ques,thisques)
{
    let result = thisques;
    let question = result.question;
    let correct = result.correct_answer;
    let incorrect = result.incorrect_answers;

    let options = [...incorrect,correct]; //shuffle remaining
    options = shuffle(options);

    let optiondiv = document.querySelector("#answers"); 
    optiondiv.innerHTML="";
    for(let op of options){
        let optbtn = document.createElement("button");
        let x = optiondiv.appendChild(optbtn);
        x.textContent = decodeHTML(op);
        x.classList.add("option-btn");
        // console.log(x);

        x.addEventListener("click",function(){
            if(op==correct)
            {
                correctans();
                score++;
            }
            else{
                wrongans();
            }
            document.querySelectorAll(".option-btn").forEach(b => b.disabled = true);
            
        })
    }

    

    // show the next button
    nextBtn.classList.remove("hidden");
    
        
    // nextBtn.addEventListener("click",function(){
    //     nextBtn.classList.add("hidden");
    //     curr_ques++;
    //     showQuestion(curr_ques);
    // })
}

nextBtn.addEventListener("click", function () {
    nextBtn.classList.add("hidden");
    curr_ques++;
    if (curr_ques < ques.length) {
        showQuestion(curr_ques);
    } else {
        alert("Quiz finished! Score: " + score);
    }
});

function shuffle(arr){
    for(let i = arr.length-1;i>0;i--)
    {
        let j = Math.floor(Math.random()*(i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


function correctans(){
    console.log("correct");
    //button green and next question  score ++
    nextBtn.classList.remove("hidden");

}

function wrongans()
{
    console.log("wrong");
    //home and try again 
    nextBtn.classList.remove("hidden");

}

function decodeHTML(str) {
  let txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

let btn = document.querySelector("#playbtn");
btn.addEventListener("click",function(){
    console.log("hello");
    let start = document.querySelector(".play");
    let quizpage = document.querySelector("#quiz");
    start.style.display="none";
    quizpage.style.display="block";

    Questions();
});

let url = "https://opentdb.com/api.php?amount=10&type=multiple";

let ques = [];
let curr_ques = 0;
let score = 0;

async function Questions()
{
    try{
        const res = await axios.get(url);
        let thisques = res.data.results[curr_ques];

        showQuestion(curr_ques,thisques);

        // let str = decodeHTML(q[curr_ques].question);
        // console.log(str);
        // let h2 = document.querySelector("#question");
        // h2.textContent = str;
        // ques[curr_ques]=str;

        // await getOptions();
    }
    catch(err){
        console.log("error"+err);
    }
}
function showQuestion(curr_ques,thisques){
    
    let str =decodeHTML(thisques.question);
    console.log(str);
    let h2 = document.querySelector("#question");
    h2.textContent = str;
    ques[curr_ques]=str;
    getOptions(curr_ques,thisques);
}

async function getOptions(curr_ques,thisques)
{
    let result = thisques;
    let question = result.question;
    let correct = result.correct_answer;
    let incorrect = result.incorrect_answers;

    let options = [...incorrect,correct];
    for(op of options){
        let optbtn = document.createElement("button");
        optbtn.textContent = op;
    }
}

function decodeHTML(str) {
  let txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

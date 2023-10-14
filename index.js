let string = "";
let btnValue = {
    "+/-":"mulNeg" , "/":"divide" , "7":"seven" , "8":"eight" ,
    "9":"nine"     , "4":"four"   , "5":"five"  , "6":"six"   , 
    "3":"three"    , "2":"two"    , "1":"one"   , "--":"minus",
    "+":"plus"     , ".":"dot"    , "%":"rem"   , "0":"zero"  ,
    "=":"equal"    , "AC":"AC"    , "x":"x"     , "X":"X"
};

let buttons = document.querySelectorAll('.button');

Array.from(buttons).forEach((button)=>{
    let press = button.textContent;
    let key = btnValue["" + press];
    button.addEventListener('click',(e)=>{

        // button animation function
        buttonAnimation(key);

        let inputField = document.querySelector('input');
        let txt = press;

        if(txt == 'AC') string = "";  // clears everything
        else if(txt == '='){ // evaluate expression
            let newS = "" , n = string.length;
            if(string != ""){
                for(let i=0;i<n;i++){
                    let ch = string.charAt(i);
                    if((ch >= '0' && ch <= '9') && string.charAt(i-1) == ')') newS = newS + '*' + ch;
                    else newS = newS + ch;
                }
            }
            string = eval(newS); 
        }
        else if(txt == 'x') string = string.slice(0,-1); // remove a input from last
        else if(txt == '+/-'){
            // construct number from end of string
            string = inputField.value;
            let ch = ""
            for(let i=string.length-1;i>=0;i--){
                let d = string.charAt(i);
                if(d >= '0' && d <= '9') ch = d + ch;
                else break;
            }
            // multiply with -1 
            if(string != "" && !(isNaN(ch)) && ch != ""){
                string = string.slice(0,string.length-ch.length);
                string = string + '(-' + ch + ')';
            }
        }

        // adding arithmatic operators 
        else if((txt == 'X') || (txt == "/") || (txt == '--') || (txt == '+') || (txt == '.') || (txt == '%')){
            let ch = string.charAt(string.length-1);
            if((string != "") && (txt == 'X') && (!isNaN(ch) || ch == ')')) string = string + "*";
            else if((string != "") && (txt == '/') && (!isNaN(ch) || ch == ')')) string = string + "/";
            else if((txt == '--') && (!isNaN(ch) || ch == ')')) string = string + "-";
            else if((txt == '+') && (!isNaN(ch) || ch == ')')) string = string + '+';
            else if((string != "") && (txt == '%') && (!isNaN(ch))) string = string + "%";
            else if((string != "") && (!isNaN(ch))) string = string + ".";
        }
        // adding numbers
        else string = string + txt; 

        // set result in input field
        inputField.value = string;
    })
}) 

// function for implementing button animations
function buttonAnimation(key) {

    var activeButton = document.querySelector("." + key);
  
    activeButton.classList.add("pressed");
  
    setTimeout(function() {
      activeButton.classList.remove("pressed");
    }, 150);
  
  }
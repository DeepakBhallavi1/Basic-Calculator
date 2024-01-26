
const btnValue = { // we will acces class using below value and apply animation
    "+/-": "mulNeg", "/": "divide", "7": "seven", "8": "eight" ,
    "9": "nine"    , "4": "four"  , "5": "five" , "6": "six"   , 
    "3": "three"   , "2": "two"   , "1": "one"  , "--": "minus",
    "+": "plus"    , ".": "dot"   , "%": "rem"  , "0": "zero"  ,
    "=": "equal"   , "AC": "AC"   , "DEL": "DEL"    , "X": "X"
};

let output = "";                                    // store input & output
let inputField = document.querySelector('input');   // shows input and out
let buttons = document.querySelectorAll('.button'); // all buttons of calculator

// traverse all clicked buttons
Array.from(buttons).forEach((button) => {
    let val = button.textContent; // get the text content of button
    let key = btnValue["" + val]; // create key using text content

    // performs events on button click
    button.addEventListener('click', () => {
        buttonAnimation(key);   // apply animation
        calculate(val); // calculate result
    })
}) 

function calculate(val){

    output = inputField.value;
    if(val == '='){           // evaluate expression
        if(output != ""){
            output = eval(output);     
        }
    } 
    else if(val == 'AC'){     // clears everything
        output = "";      
    } 
    else if(val == 'DEL'){      // remove a input from last
        output = output.slice(0, -1);
    }  
    else if(val == '+/-'){    // construct number from end of string till any operator
        
        let lastNumber = "";
        output = inputField.value;

        let n = output.length;
        for(let i=n-1; i>=0; i--){
            let char = output.charAt(i);
            if(char >= '0' && char <= '9') lastNumber = char + lastNumber;
            else break;
        }
        // add (-number)
        if((output != "") && lastNumber != ""){
            output = output.slice(0, n-lastNumber.length);
            output = output + '(-' + lastNumber + ')';
        }
    }

    // adding arithmatic operators with proper checks
    else if((val == 'X') || (val == "/") || (val == '--') || (val == '+') || (val == '.') || (val == '%')){

        let last = output.charAt(output.length - 1); // access last character of input
        if(output == "" || (isNaN(last) && last != ')')){ 
            // do nothing
        }
        else if(val == 'X'){
            output += "*"; // add multplication operator
        }
        else if(val == '--'){
            output += "-"; // add substraction operator
        } 
        else{
            output += val; // adding other operators (/, %, +, .)
        }

    }
    // adding numbers
    else{
        output += val; 
    }

    // set result in input field
    inputField.value = output;
}

// function for implementing button animations
function buttonAnimation(key) {

    var activeButton = document.querySelector("." + key);
    activeButton.classList.add("pressed");
  
    setTimeout(function() {
      activeButton.classList.remove("pressed");
    }, 150);
  
  }

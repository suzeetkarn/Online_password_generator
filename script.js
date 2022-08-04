const characterAmountRange = document.getElementById('charAmntRange');
const characterAmountNumber = document.getElementById('charAmntNum');
const includeUppercaseElement = document.getElementById('includeUppercase');
const includeLowercaseElement = document.getElementById('includeLowercase');
const includeSymbolsElement = document.getElementById('includeSymbols');
const includeNumbersElement = document.getElementById('includeNums');
const passwordDisplay = document.getElementById('passwordDisplay');
const selectMsg = document.getElementById('selectMsg');
const clipboard = document.getElementById("clipboard");
const copyMsg = document.getElementById('copyMsg');
const generateButton = document.getElementById(' generateButton');
const passwordStrengthMsg = document.getElementById('pswrdStrngMsg');
const form = document.getElementById('passwordGeneratorForm');

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65,90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97,122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48,57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33,47).concat(
    arrayFromLowToHigh(58,64)
    ).concat(arrayFromLowToHigh(91,96)
    ).concat(arrayFromLowToHigh(123,126)
    );

characterAmountNumber.addEventListener('input',syncCharacterAmount);
characterAmountRange.addEventListener('input',syncCharacterAmount);


form.addEventListener('submit',ev => {
    ev.preventDefault();
    const characterAmount = characterAmountNumber.value;
    const includeUppercase = includeUppercaseElement.checked;
    const includeLowecase = includeLowercaseElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const password = generatePassword(characterAmount,includeUppercase,includeLowecase,includeNumbers,includeSymbols)
    if(includeUppercase || includeLowecase || includeSymbols || includeNumbers ){
        passwordDisplay.innerText = password;
    }

});

clipboard.addEventListener('click', () => {
   const message =  navigator.clipboard.writeText(passwordDisplay.innerText);
   copyMsg.innerText = "Password copied to clipboard";
   setTimeout(()=>{
       copyMsg.innerText = "";
   },2000);
});


generateButton.addEventListener('click',()=>{
    const characterAmount = characterAmountNumber.value;
    const includeUppercase = includeUppercaseElement.checked;
    const includeLowecase = includeLowercaseElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    if( !includeUppercase && !includeLowecase && !includeSymbols && !includeNumbers )
        selectMsg.innerText = "Please select one of the settings to proceed futher ";
    setTimeout(()=>{
        selectMsg.innerText = "";
    },2000);

    if(includeUppercase || includeLowecase || includeSymbols || includeNumbers ) {
            if (includeUppercase && includeLowecase && includeSymbols && includeNumbers && (characterAmount >= 8))
                passwordStrengthMsg.innerText = "Strong password !";
            else if ((includeUppercase || includeLowecase) && includeSymbols && (characterAmount >= 6))
                passwordStrengthMsg.innerText = "Moderate password !";
            else if ((includeUppercase || includeLowecase) && includeNumbers && (characterAmount >= 6))
                passwordStrengthMsg.innerText = "Moderate password !";
            else
                passwordStrengthMsg.innerText = "Weak password !";

            setTimeout(() => {
                passwordStrengthMsg.innerText = "";
            },2000);

    }
});

function generatePassword(characterAmount,includeUppercase,includeLowecase,includeNumbers,includeSymbols){
    let charCodes = []; // setting by default
    if(includeUppercase){
        charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    }
    if(includeLowecase){
        charCodes = charCodes.concat(LOWERCASE_CHAR_CODES);
    }
    if(includeNumbers){
        charCodes = charCodes.concat(NUMBER_CHAR_CODES);
    }

    if(includeSymbols){
        charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
    }

    const passwordCharacters =[];
    for(let i=0;i<characterAmount;i++){
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join('');
}

function arrayFromLowToHigh(low,high){
    const array = [];
    for(let i=low;i<=high;i++){
        array.push(i);
    }
    return array;
}

function syncCharacterAmount(e){
    const value = e.target.value;
    characterAmountRange.value = value;
    characterAmountNumber.value = value;
}

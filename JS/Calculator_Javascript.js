const Calculator = {
    Display_value: '0',
    First_Operand: null,
    Wait_Second_Operand: false,
    operator: null,
};

function Input_Digit(digit) {
    const {Display_value,Wait_Second_Operand} = Calculator;
    if (Wait_Second_Operand === true) {
        Calculator.Display_value= digit;
        Calculator.Wait_Second_Operand= false;
    } else {
        Calculator.Display_value = Display_value==='0' ? digit : Display_value + digit;
    }
}

function Input_Decimal(dot) {
    if (Calculator.Wait_Second_Operand==='true') return;
    if(!Calculator.Display_value.includes(dot)) {
        Calculator.Display_value += dot;
    }
}
function Handle_Operator(Next_Operator) {
    const {First_Operand,Display_value,operator} = Calculator;
    const Value_of_Input = parseFloat(Display_value);
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator= Next_Operator;
        return;
    }
    if (First_Operand==null) {
       Calculator.First_Operand= Value_of_Input; 
    }else if (operator) {
        const Value_Now = First_Operand || 0;
        let result = Perform_Calculation[operator] (Value_Now, Value_of_Input);
        result = Number(result).toFixed(9);
        result=(result*1).toString();
        Calculator.Display_value = parseFloat(result);
        Calculator.First_Operand = parseFloat(result);
    }
    Calculator.Wait_Second_Operand = true;
    Calculator.operator = Next_Operator;
}

const Perform_Calculation= {
    '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,
    '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,
    '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,
    '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,
    '=': (First_Operand, Second_Operand) => Second_Operand
};

function Calculator_Reset() {
    Calculator.Display_value= '0';
    Calculator.First_Operand= null;
    Calculator.Wait_Second_Operand= false;
    Calculator.operator =null;
}

function Update_Display() {
    const Display = document.querySelector('.calculator-screen');
    Display.value = Calculator.Display_value;
}

Update_Display();
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const {target} = event;
    if (!target.matches('button')) {
        return;
    }
    if (target.classList.contains('operator')) {
        Handle_Operator(target.value);
        Update_Display();
        return
    }

    if (target.classList.contains('decimal')) {
        Input_Decimal(target.value);
        Update_Display();
        return;
    }

    if (target.classList.contains('all-clear')) {
        Calculator_Reset();
        Update_Display();
        return;
    }

    Input_Digit(target.value);
    Update_Display();
} )
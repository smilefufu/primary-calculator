let firstNumber = '';
let operator = '';
let secondNumber = '';
let isNewCalculation = true;

document.addEventListener('DOMContentLoaded', () => {
    // 数字按钮事件监听
    document.querySelectorAll('.num-btn').forEach(button => {
        button.addEventListener('click', () => {
            const number = button.textContent;
            if (operator === '') {
                if (isNewCalculation) {
                    firstNumber = number;
                    isNewCalculation = false;
                } else {
                    firstNumber += number;
                }
            } else {
                secondNumber += number;
            }
            updateDisplay();
        });
    });

    // 运算符按钮事件监听
    document.querySelectorAll('.op-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (firstNumber !== '') {
                operator = button.getAttribute('data-op');
                updateDisplay();
            }
        });
    });

    // 等号按钮事件监听
    document.querySelector('.equal-btn').addEventListener('click', calculate);

    // 清除按钮事件监听
    document.querySelector('.clear-btn').addEventListener('click', clearAll);
});

function updateDisplay() {
    const expressionDiv = document.getElementById('expression');
    let expression = firstNumber;
    if (operator) {
        expression += ' ' + operator;
        if (secondNumber) {
            expression += ' ' + secondNumber;
        }
    }
    expressionDiv.textContent = expression;
}

function calculate() {
    if (firstNumber === '' || operator === '' || secondNumber === '') {
        return;
    }

    const num1 = parseInt(firstNumber);
    const num2 = parseInt(secondNumber);
    const resultDiv = document.getElementById('result');
    let result = '';

    switch (operator) {
        case '+':
            result = `${num1 + num2}`;
            break;
        case '-':
            result = `${num1 - num2}`;
            break;
        case '×':
            result = `${num1 * num2}`;
            break;
        case '÷':
            if (num2 === 0) {
                result = '除数不能为0！';
                resultDiv.innerHTML = result;
                return;
            }
            const quotient = Math.floor(num1 / num2);
            const remainder = num1 % num2;
            result = `${quotient}`;
            if (remainder > 0) {
                result += ` (余${remainder})`;
            }
            break;
    }

    resultDiv.textContent = '= ' + result;
    
    // 准备下一次计算
    firstNumber = '';
    operator = '';
    secondNumber = '';
    isNewCalculation = true;
}

function clearAll() {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    isNewCalculation = true;
    document.getElementById('expression').textContent = '请输入算式';
    document.getElementById('result').textContent = '';
}

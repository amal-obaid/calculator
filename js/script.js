class Calculater {
    constructor(previousOperandTextButtons , currentOperandTextButtons){
        this.previousOperandTextButtons = previousOperandTextButtons
        this.currentOperandTextButtons = currentOperandTextButtons
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return 
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '-' :
                computation = prev + current
                break
            case '*' :
                computation = prev * current
                break
            case '/' :
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN (integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en' , {
                maximumFractionDigits:0
            })}
            if(decimalDigits!= null){
                return `${integerDisplay}.${decimalDigits}`
            } else {
                return integerDisplay
            }
        }
        
    updateDisplay(){
        this.currentOperandTextButtons.innerHTML = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){
        this.previousOperandTextButtons.innerHTML = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
        this.previousOperandTextButtons.innerHTML = ''
         }
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButtons = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-all-clear]')
const previousOperandTextButtons = document.querySelector('[data-previous-operand]')
const currentOperandTextButtons = document.querySelector('[data-current-operand]')

const calculater = new Calculater(previousOperandTextButtons, currentOperandTextButtons)

numberButtons.forEach(button => {
    button.addEventListener('click' , ()=> {
        calculater.appendNumber(button.innerHTML)
        calculater.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click' , ()=> {
        calculater.chooseOperation(button.innerHTML)
        calculater.updateDisplay()
    })
})

equalsButtons.addEventListener('click' , button => {
    calculater.compute()
    calculater.updateDisplay()
})

allClearButtons.addEventListener('click' , button => {
    calculater.clear()
    calculater.updateDisplay()
})

deleteButtons.addEventListener('click' , button => {
    calculater.delete()
    calculater.updateDisplay()
})
 


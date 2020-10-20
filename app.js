const dataPrevious = document.querySelector(".previous");
const dataCurrent = document.querySelector(".current");
const deleteButton = document.querySelector(".data-delete");
const allClearButton = document.querySelector(".data-all-clear");
const equalButton = document.querySelector(".data-equal");
const numberButtons = document.querySelectorAll(".data-number");
const actionButtons = document.querySelectorAll(".data-action");

class myCalculator {
  constructor() {
    this.dataCurrent = dataCurrent;
    this.dataPrevious = dataPrevious;
    this.clear();
  }

  getOutputValue(value) {
    if (value === "." && this.currentValue.includes(".")) return;
    this.currentValue = this.currentValue.toString() + value.toString();
  }

  getAction(value) {
    if (this.currentValue === "") return;
    if (this.previousValue != "") {
      this.getActionCalculation();
    }
    this.action = value;
    this.previousValue = this.currentValue; 
    this.currentValue = '';
  }
  getActionCalculation() {
    let result = 0;
    const current = parseFloat(this.currentValue);
    const previous = parseFloat(this.previousValue);
    if (isNaN(current) || isNaN(previous)) return;
    switch (this.action) {
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      case "/":
        result = previous / current;
        break;
      case "*":
        result = previous * current;
        break;
      case "%":
        result = previous % current;
        break; 
      default:
        return;
    }
    this.currentValue = result;
    this.previousValue = "";
  }

  updateOutput(value) {
    const getNumber = parseFloat(value.toString());
    if (isNaN(getNumber)) {
      return "";
    } else {
      return getNumber.toLocaleString();
    }
  }
  getOutput() {
    this.dataCurrent.innerHTML = this.updateOutput(this.currentValue);
    this.dataPrevious.innerHTML = this.updateOutput(this.previousValue);
  }

  clear() {
    this.currentValue = "";
    this.previousValue = "";
    this.action = undefined;
  }

  delete() {
    this.currentValue = this.currentValue.slice(0, -1);
  }
} // class function end

const calculator = new myCalculator();
function declare() {
  calculator.getOutput();
}

numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.getOutputValue(this.innerText);
    declare();
  });
});

actionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.getAction(this.innerText);
    declare();
  });
});
equalButton.addEventListener("click", () => {
  calculator.getActionCalculation();
  declare();
});
allClearButton.addEventListener("click", () => {
  calculator.clear();
  declare();
});
deleteButton.addEventListener("click", () => {
  calculator.delete();
  declare();
});

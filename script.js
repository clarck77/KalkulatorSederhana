let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");

let expression = "";

// Fungsi untuk mengevaluasi operator matematika
function safeEvaluate(expr) {
  try {
    expr = expr.replace(/÷/g, "/").replace(/x/g, "*");

    // Validasi agar hanya karakter yang diizinkan yang diproses
    if (/^[0-9+\-*/().\s]+$/.test(expr)) {
      return Function(`"use strict"; return (${expr})`)();
    } else {
      return "Error";
    }
  } catch {
    return "Error";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.innerHTML;

    if (value === "=") {
      const result = safeEvaluate(expression);
      input.value = result;
      expression = result.toString();
    } else if (value === "AC") {
      expression = "";
      input.value = expression;
    } else if (value === "DEL") {
      expression = expression.slice(0, -1);
      input.value = expression;
    } else if (["+", "-", "x", "÷", "."].includes(value) || !isNaN(value)) {
      expression += value;
      input.value = expression;
    }
  });
});

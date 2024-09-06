document.addEventListener("DOMContentLoaded", function () {
  let minInput = document.querySelector(".min-input");
  let secInput = document.querySelector(".sec-input");
  let startStopButton = document.getElementById("start-stop");
  let resetButton = document.getElementById("reset");
  let bar = document.querySelector(".bar");

  let minValue;
  let secValue;
  let intervalId;
  let isRunning = false;
  let initialTime;
  let step; 
  let initialBarWidth = 250; 

  function formatNumber(number) {
    return number < 10 ? "0" + number : number;
  }

  function toggleTimer() {
    if (isRunning) {
      clearInterval(intervalId);
      startStopButton.textContent = "Start";
    } else {
      // Встановлюємо значення на 0, якщо поля порожні
      minValue = minInput.value === "" ? 0 : parseInt(minInput.value), minInput.value = "00";;
      secValue = secInput.value === "" ? 0 : parseInt(secInput.value);
      

      // Перевіряємо коректність введених даних
      if (isNaN(minValue) || isNaN(secValue) || minValue < 0 || secValue < 0 || secValue >= 60) {
        alert("Please enter valid time values.");
        return;
      }

      initialTime = minValue * 60 + secValue;
      step = initialBarWidth / initialTime;

      intervalId = setInterval(updateTimer, 1000);
      startStopButton.textContent = "Stop";
    }
    isRunning = !isRunning;
  }

  function updateTimer() {
    if (secValue === 0 && minValue === 0) {
      clearInterval(intervalId);
      isRunning = false;
      startStopButton.textContent = "Finished";
      startStopButton.style.backgroundColor = "#575757";
      startStopButton.disabled = true;
      return;
    }

    if (secValue === 0) {
      minValue -= 1;
      minInput.value = formatNumber(minValue);
      secValue = 59;
    } else {
      secValue -= 1;
    }

    secInput.value = formatNumber(secValue);
    updateBar();
  }

  function resetTimer() {
    clearInterval(intervalId);
    minInput.value = "";
    secInput.value = "";
    minInput.placeholder = "00";
    secInput.placeholder = "00";
    bar.style.width = initialBarWidth + "px"; 
    isRunning = false;
    startStopButton.textContent = "Start";
    startStopButton.style.backgroundColor = "#df8703";
    startStopButton.disabled = false;
  }

  function updateBar() {
    let currentWidth = parseFloat(bar.style.width) || initialBarWidth;
    currentWidth -= step;
    bar.style.width = currentWidth + "px";
  }

  startStopButton.addEventListener("click", toggleTimer);
  resetButton.addEventListener("click", resetTimer);
});

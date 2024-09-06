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

  // Обмеження введення тільки цифр і не більше 2
  minInput.addEventListener("input", function () {
    // Обрізаємо значення до 2 цифр, якщо введено більше
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 2);
  });

  secInput.addEventListener("input", function () {
    // Обрізаємо значення до 2 цифр, якщо введено більше
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 2);
    // Якщо хвилини не введені, автоматично оновлюємо їх до 00
    if (minInput.value === "" || minInput.value.length === 1) {
      minInput.value = formatNumber(parseInt(minInput.value) || 0);
    }
  });

  // Форматування хвилин на "00" при втраті фокусу, якщо нічого не введено
  minInput.addEventListener("blur", function () {
    if (this.value === "" || this.value.length === 1) {
      this.value = formatNumber(parseInt(this.value) || 0);
    }
  });

  // Форматування секунд на "00" при втраті фокусу, якщо нічого не введено
  secInput.addEventListener("blur", function () {
    if (this.value === "" || this.value.length === 1) {
      this.value = formatNumber(parseInt(this.value) || 0);
    }
  });

  function toggleTimer() {
    if (isRunning) {
      clearInterval(intervalId);
      startStopButton.textContent = "Start";
    } else {
      // Встановлюємо значення на 0, якщо поля порожні
      minValue = minInput.value === "" ? 0 : parseInt(minInput.value);
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
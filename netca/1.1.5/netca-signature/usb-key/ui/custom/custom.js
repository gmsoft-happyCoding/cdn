function removeLoading() {
  var loading = document.getElementById("loading-ball");
  if (loading) {
    document.body.removeChild(loading);
  }
}

function showLoading(text) {
  removeLoading();
  var loading = document.createElement("div");
  loading.id = "loading-ball";
  loading.innerHTML = `
    <div class="overlay">
      <div class="bar">
      <div class="ball"></div>
      <div class="text">${text}</div>
    </div>
    </div>
  `;

  document.body.appendChild(loading);
}

function removeError() {
  var error = document.getElementById("error-message");
  if (error) {
    document.body.removeChild(error);
  }
}

function showError(text, duration, callback) {
  removeLoading();
  removeError();
  var error = document.createElement("div");
  error.id = "error-message";
  error.innerHTML = `
    <div class="container noselect">
      <div class="canvas">
        <div class="tracker tr-1"></div>
        <div class="tracker tr-2"></div>
        <div class="tracker tr-3"></div>
        <div class="tracker tr-4"></div>
        <div class="tracker tr-5"></div>
        <div class="tracker tr-6"></div>
        <div class="tracker tr-7"></div>
        <div class="tracker tr-8"></div>
        <div class="tracker tr-9"></div>
        <div class="tracker tr-10"></div>
        <div class="tracker tr-11"></div>
        <div class="tracker tr-12"></div>
        <div class="tracker tr-13"></div>
        <div class="tracker tr-14"></div>
        <div class="tracker tr-15"></div>
        <div class="tracker tr-16"></div>
        <div class="tracker tr-17"></div>
        <div class="tracker tr-18"></div>
        <div class="tracker tr-19"></div>
        <div class="tracker tr-20"></div>
        <div class="tracker tr-21"></div>
        <div class="tracker tr-22"></div>
        <div class="tracker tr-23"></div>
        <div class="tracker tr-24"></div>
        <div class="tracker tr-25"></div>
        <div id="card">
          <div class="title">${text}</div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(error);

  if (duration) {
    setTimeout(() => {
      removeError();
      if (callback) callback();
    }, duration);
  }
}

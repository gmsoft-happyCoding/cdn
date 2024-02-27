(function (document) {
  function Wind() {
    this.oDiv = null;
    this.setting = {
      //默认参数
      w: 300,
      h: 300,
      dir: "center",
      title: "",
      mark: false,
    };
  }
  Wind.prototype.json = {};
  Wind.prototype.init = function (opt) {
    extend(this.setting, opt);
    if (this.json[opt.iNow] == undefined) {
      this.json[opt.iNow] = true;
    }
    if (this.json[opt.iNow]) {
      this.fnCreate();
      this.fnClose();
      if (this.setting.mark) {
        this.fnMark();
      }
    }
    this.json[opt.iNow] = false;
  };
  Wind.prototype.fnCreate = function () {
    var that = this;

    this.oDiv = document.createElement("div");
    this.oDiv.className = "selfDialog";
    var html =
      '<div class="title"><span>' +
      this.setting.title +
      '</span><a class="close">X</a></div><div class="content" id="selfDialogContent"></div><div class="footer" id="selfDialogFooter">';
    var _buttons = this.setting.buttons;
    if (_buttons) {
      for (var i = 0; i < _buttons.length; i++) {
        html +=
          '<div class="btnWrapper"><input id="dialogBtn' +
          i +
          '" class="btn" type="button" value="' +
          _buttons[i].text +
          '"/></div>';
      }
    }

    html += "</div>";
    this.oDiv.innerHTML = html;
    document.body.appendChild(this.oDiv);
    if (_buttons) {
      // 给按钮绑定事件(按钮的id是dialogBtn+索引)
      for (var j = 0; j < _buttons.length; j++) {
        (function (_j) {
          var buttonDom = document.getElementById("dialogBtn" + _j);
          buttonDom.style.cursor = "pointer";
          buttonDom.onclick = function () {
            _buttons[_j].clickFn(buttonDom, that);
          };
        })(j);
      }
    }

    this.setStyle();
  };
  Wind.prototype.fnMark = function () {
    var oMark = document.createElement("div");
    oMark.id = "mark";
    document.body.appendChild(oMark);
    this.oMark = oMark;
    oMark.style.width = veiwWidth() + "px";
    oMark.style.height = veiwHeight() + "px";
  };
  Wind.prototype.setStyle = function () {
    this.oDiv.style.width = this.setting.w + "px";
    this.oDiv.style.height = this.setting.h + "px";
    if (this.setting.dir == "center") {
      this.oDiv.style.left = (veiwWidth() - this.oDiv.offsetWidth) / 2 + "px";
      this.oDiv.style.top = (veiwHeight() - this.oDiv.offsetHeight) / 2 + "px";
    }
    if (this.setting.dir == "right") {
      this.oDiv.style.left = veiwWidth() - this.oDiv.offsetWidth + "px";
      this.oDiv.style.top = veiwHeight() - this.oDiv.offsetHeight + "px";
    }
  };
  Wind.prototype.fnClose = function () {
    var oClose = this.oDiv.getElementsByClassName("close")[0];
    var This = this;
    oClose.onclick = function () {
      document.body.removeChild(This.oDiv);
      if (This.setting.mark) {
        document.body.removeChild(This.oMark);
      }
      This.json[This.setting.iNow] = true;
    };
  };

  Wind.prototype.setBtnDisabled = function (index, isDisabled) {
    var buttonDom = document.getElementById("dialogBtn" + index);
    if (isDisabled) {
      buttonDom.setAttribute("disabled", isDisabled);
      buttonDom.style.cursor = "not-allowed";
    } else {
      buttonDom.removeAttribute("disabled");
      buttonDom.style.cursor = "pointer";
    }
  };
  Wind.prototype.close = function () {
    document.body.removeChild(this.oDiv);
    if (this.setting.mark) {
      document.body.removeChild(this.oMark);
    }
    this.json[this.setting.iNow] = true;
  };

  Wind.prototype.html = function (htmlStr) {
    var oContent = this.oDiv.getElementsByClassName("content")[0];
    oContent.innerHTML = htmlStr;
  };

  function extend(obj1, obj2) {
    for (var attr in obj2) {
      obj1[attr] = obj2[attr];
    }
  }
  function veiwWidth() {
    return document.documentElement.clientWidth;
  }
  function veiwHeight() {
    return document.documentElement.clientHeight;
  }
  window.Wind = Wind; //创建一个pop全局变量，并将obj的值赋给pop,这样使用pop的函数就需要pop.function(),避免了变量的重复。
})(document);

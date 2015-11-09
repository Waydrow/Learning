function initCalculator(containId) {
  var containDiv = document.getElementById(containId);

  containDiv.appendChild(createInput());
  containDiv.appendChild(createTable());

  // ***************************************
  // 结果
  var result = document.getElementById("result");
  //是否可以计算,为1时可计算
  var flag = 0;
  //第一个操作数
  var firstNum = '';
  var beforeNum = 0;
  // 连续计算 自动补充操作 连等
  var afterNum = 0;
  //自动补充操作,存储第二个操作数 2+3=3= 结果应为6, 
  var secondNum = 0;
  //自动补充操作 2+3=3= 结果应为6
  var otherEqual = false;
  //自动补充操作 连等 如1+2===
  var doubleEqual = false;
  //开始输入0判断,firtNum＝''时为false
  var enterFlag = false;
  //只有一个小数点,无小数点时为true
  var onlyPoint = true;
  //操作符
  var operatorOption = null;
  //某次计算结束后为true
  var finFlag = false;
  //输入运算符后为true
  var opeartorFlag = false;

  //初始化
  result.value = 0;

  var numObj = document.getElementsByName("number");
  for (var i = numObj.length - 1; i >= 0; i--) {
    numObj[i].onclick = function() {
      numClick(this.value);
    }
  };
  document.getElementsByName("clear")[0].onclick = function() {
    clearAll();
  };
  document.getElementsByName("clearOne")[0].onclick = function() {
    clearCurrent();
  };
  document.getElementById("backOne").onclick = function() {
    backOneStep();
  };
  document.getElementsByName("square")[0].onclick = function() {
    square();
  };
  document.getElementsByName("sqrt")[0].onclick = function() {
    sqrt();
  };
  document.getElementById("equal").onclick = function() {
    calculator();
  };
  document.getElementsByName("plusMinus")[0].onclick = function() {
    addPlusMinus();
  }
  document.getElementsByName("percent")[0].onclick = function() {
    operator(this);
  };
  document.getElementsByName("division")[0].onclick = function() {
    operator(this);
  };
  document.getElementsByName("multi")[0].onclick = function() {
    operator(this);
  };
  document.getElementsByName("sub")[0].onclick = function() {
    operator(this);
  };
  document.getElementsByName("add")[0].onclick = function() {
    operator(this);
  };



  function numClick(numTemp) {
    if (finFlag == true) {
      firstNum = '';
      finFlag = false;
    }
    if (numTemp == '.' && onlyPoint == false)
      return;
    if (numTemp == '.' && onlyPoint == true) {
      if (enterFlag == false) firstNum = '0';
      onlyPoint = false;
    }
    if (numTemp == 0 && enterFlag == false) {
      firstNum = 0;
      if (operatorOption)
        result.value = 0;
      return;
    }
    doubleEqual = false;
    enterFlag = true;
    if (firstNum === 0)
      firstNum = '';
    firstNum += numTemp;
    result.value = firstNum;
    afterNum = firstNum;
  }

  function operator(operatorTemp) {
    doubleEqual = false;
    if (flag == 1) {
      opeartorFlag = false;
      calculator();
    }
    operatorOption = operatorTemp.name;
    flag++;
    beforeNum = firstNum - 0;
    firstNum = '';
    enterFlag = false;
    onlyPoint = true;
    otherEqual = false;
    opeartorFlag = true;
  }

  function calculator() {
    if (firstNum === '' && opeartorFlag == true) firstNum = beforeNum;
    switch (operatorOption) {
      case 'add':
        if (flag == 0 && otherEqual) result.value = (firstNum - 0).add(secondNum - 0);
        else result.value = (beforeNum - 0).add(doubleEqual ? (afterNum - 0) : (firstNum - 0));
        break;
      case 'sub':
        if (flag == 0 && otherEqual) result.value = (firstNum - 0).sub(secondNum - 0);
        else result.value = (beforeNum - 0).sub(doubleEqual ? (afterNum - 0) : (firstNum - 0));
        break;
      case 'multi':
        if (firstNum === '') break;
        if (flag == 0 && otherEqual) result.value = (firstNum - 0).mul(secondNum - 0);
        else result.value = (beforeNum - 0).mul(doubleEqual ? (afterNum - 0) : (firstNum - 0));
        break;
      case 'division':
        if (flag == 0 && otherEqual) {
          if (result.value == "Error") break;
          result.value = (firstNum - 0).div(secondNum - 0);
          break;
        }
        if (firstNum === '') break;
        if (firstNum - 0 === 0) {
          result.value = "Error";
          break;
        }
        result.value = (beforeNum - 0).div(doubleEqual ? (afterNum - 0) : (firstNum - 0));
        break;
      case 'percent':
        if (firstNum === '') break;
        if (flag == 0 && otherEqual) result.value = (firstNum - 0) % (secondNum - 0);
        else result.value = (beforeNum - 0) % (doubleEqual ? (afterNum - 0) : (firstNum - 0));
        break;
      default:
        result.value = firstNum - 0;
    }
    if (!doubleEqual && !otherEqual) flag--;
    if (!otherEqual) secondNum = firstNum;
    beforeNum = result.value;
    firstNum = result.value;
    enterFlag = false;
    onlyPoint = true;
    finFlag = true;
    doubleEqual = true;
    otherEqual = true;
    opeartorFlag = false;
  }

  function addPlusMinus() {
    firstNum += '';
    if (firstNum.length <= 1 && firstNum == 0) {
      firstNum -= 0;
      return;
    }
    if (firstNum[0] == '-') firstNum = firstNum.slice(1);
    else firstNum = '-' + firstNum;
    result.value = firstNum;
  }

  function clearAll() {
    flag = 0;
    result.value = 0;
    firstNum = '';
    beforeNum = 0;
    enterFlag = false;
    onlyPoint = true;
    operatorOption = null;
    finFlag = false;
    doubleEqual = false;
    otherEqual = false;
    opeartorFlag = false;
  }

  function clearCurrent() {
    result.value = 0;
    firstNum = '';
  }

  function backOneStep() {
    // 如果刚计算结束，结果无法退格
    if (finFlag == true) return;
    firstNum += '';
    if (firstNum[firstNum.length - 1] == ".") {
      onlyPoint = true;
      //负号处理 0 . ± ←  
      if (firstNum[0] == '-') {
        firstNum = '';
        result.value = 0;
        enterFlag = false;
        return;
      }
    };
    if ((firstNum.length <= 1) || (firstNum[0] == '-' && firstNum.length == 2)) {
      enterFlag = false;
      onlyPoint = true;
      if (firstNum === '') return;
      firstNum = '';
      result.value = 0;
      return;
    } else firstNum = firstNum.slice(0, firstNum.length - 1);
    if (firstNum == 0) enterFlag = false;
    result.value = firstNum;
  }
  // 1/x
  function square() {
    var x = 1 - 0;
    firstNum -= 0;
    firstNum = x.div(firstNum);
    firstNum += '';
    result.value = firstNum;
    finFlag = true;
  }
  //平方根
  function sqrt() {
    firstNum -= 0;
    firstNum = Math.sqrt(firstNum);
    firstNum -= '';
    result.value = firstNum;
    finFlag = true;
  }
  // ***************************************

}

function createInput() {
  var inputResult = document.createElement("input");
  inputResult.type = "text";
  inputResult.id = "result";
  inputResult.name = "result";
  inputResult.disabled = "true";
  inputResult.style.width = "238px";
  inputResult.style.height = "50px";
  inputResult.style.backgroundColor = "#FDFDFD";
  inputResult.style.border = "1px solid #bbb";
  inputResult.style.textAlign = "right";
  inputResult.style.font = "14px 'Microsoft YaHei',sans-serif";
  return inputResult;
}

function createTable() {
  var table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.borderSpacing = "1px";

  var tr = []; //行
  var th = []; //第一行中的th
  var td = [];

  //创建第一行
  ! function() {
    for (var i = 0; i < 6; i++) {
      tr[i] = document.createElement("tr");
    }

    var button = [];
    for (var i = 0; i < 3; i++) {
      th[i] = document.createElement("th");
      button[i] = document.createElement("button");

      th[i].style.margin = "0";
      th[i].style.padding = "0";
      button[i].style.width = "60px";
      button[i].style.height = "60px";
      button[i].style.backgroundColor = "#F1F1F1";
      button[i].style.border = "1px solid #E0E0E0";
      button[i].style.outline = "none";
      button[i].style.font = "14px Verdana,Helvetica, Arial, sans-serif";
      button[i].style.margin = "0";
      button[i].style.padding = "0";
      button[i].onmouseover = function() {
        this.style.backgroundColor = "#CECECE";
      }
      button[i].onmouseout = function() {
        this.style.backgroundColor = "#F1F1F1";
      }
      button[i].onmousedown = function() {
        this.style.backgroundColor = "#BFBFBF";
      };
      button[i].onmouseup = function() {
        this.style.backgroundColor = "#CECECE";
      };
    }

    th[2].setAttribute("colspan", "2")
    button[0].name = "clear";
    button[0].innerHTML = "C";
    button[1].name = "clearOne";
    button[1].innerHTML = "CE";
    button[2].name = "backOne";
    button[2].id = "backOne";
    button[2].style.width = "120px";
    button[2].innerHTML = "&lt;---";
    for (i = 0; i < 3; i++) {
      th[i].appendChild(button[i]);
    }
  }()
  //将th插入第一行中
  for (var i = 0; i < 3; i++) {
    tr[0].appendChild(th[i]);
  }

  // 创建余下几行
  button = [];
  for (var i = 0; i < 5; i++) {
    td[i] = [];
    button[i] = [];
    for (var j = 0; j < 4; j++) {
      td[i][j] = document.createElement("td");
      button[i][j] = document.createElement("button");

      td[i][j].style.margin = '0';
      td[i][j].style.padding = "0";
      button[i][j].style.width = "60px";
      button[i][j].style.height = "60px";
      button[i][j].style.backgroundColor = "#F1F1F1";
      button[i][j].style.border = "1px solid #E0E0E0";
      button[i][j].style.outline = "none";
      button[i][j].style.font = "14px Verdana,Helvetica, Arial, sans-serif";
      button[i][j].style.margin = "0";
      button[i][j].style.padding = "0";
      button[i][j].onmouseover = function() {
        this.style.backgroundColor = "#CECECE";
      };
      button[i][j].onmouseout = function() {
        this.style.backgroundColor = "#F1F1F1";
      };
      button[i][j].onmousedown = function() {
        this.style.backgroundColor = "#BFBFBF";
      };
      button[i][j].onmouseup = function() {
        this.style.backgroundColor = "#CECECE";
      };
    }
  }! function() {
    button[0][0].name = "square";
    button[0][0].innerHTML = "1/x";
    button[0][1].name = "sqrt";
    button[0][1].innerHTML = "√x";
    button[0][2].name = "percent";
    button[0][2].innerHTML = "%";
    button[0][3].name = "division";
    button[0][3].innerHTML = "&divide;";

    for (var i = 0; i < 3; i++) {
      button[1][i].value = button[1][i].innerHTML = i + 7;
      button[1][i].name = "number";
    }
    button[1][3].name = "multi";
    button[1][3].innerHTML = "*";

    for (var i = 0; i < 3; i++) {
      button[2][i].value = button[2][i].innerHTML = i + 4;
      button[2][i].name = "number";
    }
    button[2][3].name = "sub";
    button[2][3].innerHTML = "-";

    for (var i = 0; i < 3; i++) {
      button[3][i].value = button[3][i].innerHTML = i + 1;
      button[3][i].name = "number";
    }
    button[3][3].name = "add";
    button[3][3].innerHTML = "+";

    button[4][0].value = button[4][0].innerHTML = "0";
    button[4][0].name = "number";
    button[4][1].value = button[4][1].innerHTML = ".";
    button[4][1].name = "number";
    button[4][2].name = "plusMinus";
    button[4][2].innerHTML = "+/-";
    button[4][3].name = button[4][3].id = "equal";
    button[4][3].innerHTML = "=";

    button[4][3].onmouseover = function() {
      this.style.color = "#fff";
      this.style.backgroundColor = "#0078D7";
    }
    button[4][3].onmouseout = function() {
      this.style.color = "#000";
      this.style.backgroundColor = "#F1F1F1";
    }
    button[4][3].onmousedown = function() {
      this.style.backgroundColor = "#4599DC";
    }
    button[4][3].onmouseup = function() {
      this.style.backgroundColor = "#0078D7";
    }

    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 4; j++) {
        td[i][j].appendChild(button[i][j]);
      }
    }
  }();

  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 4; j++) {
      tr[i + 1].appendChild(td[i][j])
    }
  }
  // 最终插入到table中
  for (var i = 0; i < 6; i++) {
    table.appendChild(tr[i]);
  }
  return table;
}



// ********************************************************
// 重写计算函数，解决js浮点数计算不精确问题
// ********************************************************

Math.add = function(v1, v2) {
  ///<summary>精确计算加法。语法：Math.add(v1, v2)</summary>
  ///<param name="v1" type="number">操作数。</param>
  ///<param name="v2" type="number">操作数。</param>
  ///<returns type="number">计算结果。</returns>
  var r1, r2, m;
  try {
    r1 = v1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = v2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));

  return (v1 * m + v2 * m) / m;
}


Number.prototype.add = function(v) {
  ///<summary>精确计算加法。语法：number1.add(v)</summary>
  ///<param name="v" type="number">操作数。</param>
  ///<returns type="number">计算结果。</returns>
  return Math.add(v, this);
}


Math.sub = function(v1, v2) {
  ///<summary>精确计算减法。语法：Math.sub(v1, v2)</summary>
  ///<param name="v1" type="number">操作数。</param>
  ///<param name="v2" type="number">操作数。</param>
  ///<returns type="number">计算结果。</returns>
  return Math.add(v1, -v2);
}


Number.prototype.sub = function(v) {
  ///<summary>精确计算减法。语法：number1.sub(v)</summary>
  ///<param name="v" type="number">操作数。</param>
  ///<returns type="number">计算结果。</returns>
  return Math.sub(this, v);
}


Math.mul = function(v1, v2) {
  ///<summary>精确计算乘法。语法：Math.mul(v1, v2)</summary>
  ///<param name="v1" type="number">操作数。</param>
  ///<param name="v2" type="number">操作数。</param>
  ///<returns type="number">计算结果。</returns>
  var m = 0;
  var s1 = v1.toString();
  var s2 = v2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}

  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}


Number.prototype.mul = function(v) {
  ///<summary>精确计算乘法。语法：number1.mul(v)</summary>
  ///<param name="v" type="number">操作数。</param>
  ///<returns type="number">计算结果。</returns>
  return Math.mul(v, this);
}


Math.div = function(v1, v2) {
  ///<summary>精确计算除法。语法：Math.div(v1, v2)</summary>
  ///<param name="v1" type="number">操作数。</param>
  ///<param name="v2" type="number">操作数。</param>
  ///<returns type="number">计算结果。</returns>
  var t1 = 0;
  var t2 = 0;
  var r1, r2;
  try {
    t1 = v1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = v2.toString().split(".")[1].length;
  } catch (e) {}

  with(Math) {
    r1 = Number(v1.toString().replace(".", ""));
    r2 = Number(v2.toString().replace(".", ""));
    return (r1 / r2) * pow(10, t2 - t1);
  }
}


Number.prototype.div = function(v) {
  ///<summary>精确计算除法。语法：number1.div(v)</summary>
  ///<param name="v" type="number">操作数。</param>
  ///<returns type="number">计算结果。</returns>
  return Math.div(this, v);
}
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
    opeartorFlag=false;
    calculator();
  }
  operatorOption = operatorTemp.name;
  flag++;
  beforeNum = firstNum - 0;
  firstNum = '';
  enterFlag = false;
  onlyPoint = true;
  otherEqual = false;
  opeartorFlag=true;
}

function calculator() {
  if(firstNum===''&&opeartorFlag==true)firstNum=beforeNum;
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
        if(result.value=="Error")break;
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
  opeartorFlag=false;
}

function addPlusMinus() {
  firstNum+='';
  if(firstNum.length<=1&&firstNum==0){firstNum-=0; return;}
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
  opeartorFlag=false;
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
    if(firstNum[0]=='-'){
      firstNum='';
      result.value=0;
      enterFlag=false;
      return;
    }
  };
  if ((firstNum.length <= 1)||(firstNum[0]=='-'&&firstNum.length==2)) {
    enterFlag = false;
    onlyPoint = true;
    if(firstNum==='')return;
    firstNum = '';
    result.value = 0;
    return;
  } else firstNum = firstNum.slice(0, firstNum.length - 1);
  if (firstNum == 0) enterFlag = false;
  result.value = firstNum;
}
// 1/x
function square() {
  var x = 1-0;
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
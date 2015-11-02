// 结果
var result = document.getElementById("result");
//是否可以计算,为1时可计算
var flag = 0;
//第一个操作数
var firstNum = '';
var beforeNum = 0;
// 连续计算
var doubleEqual = false;
//开始输入0判断,firtNum＝''时为false
var enterFlag = false;
//只有一个小数点,无小数点时为true
var onlyPoint = true;
//操作符
var operatorOption = null;
//某次计算结束后为true
var finFlag = false;

//初始化
result.value = 0;

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
    console.log(firstNum)
    return;
  }
  doubleEqual = false;
  enterFlag = true;
  if (firstNum === 0)
    firstNum = '';
  firstNum += numTemp;
  result.value = firstNum;
  afterNum = firstNum;
  console.log(firstNum)
}

function operator(operatorTemp) {
  doubleEqual = false;
  if (flag == 1) {
    calculator();
  }
  operatorOption = operatorTemp.name;
  flag++;
  beforeNum = firstNum - 0;
  firstNum = '';
  enterFlag = false;
  onlyPoint = true;
}

function calculator() {
  // if(flag==0)return;
  switch (operatorOption) {
    case 'add':
      result.value = (beforeNum - 0).add(doubleEqual ? (afterNum - 0) : (firstNum - 0));
      break;
    case 'sub':
      result.value = (beforeNum - 0).sub(doubleEqual ? (afterNum - 0) : (firstNum - 0));
      break;
    case 'multi':
      result.value = (beforeNum - 0).mul(doubleEqual ? (afterNum - 0) : (firstNum - 0));
      break;
    case 'division':
      if (firstNum - 0 == 0) {
        result.value = "Error";
        break;
      }
      result.value = (beforeNum - 0).div(doubleEqual ? (afterNum - 0) : (firstNum - 0));
      break;
    case 'percent':
      result.value = (beforeNum - 0) % (doubleEqual ? (afterNum - 0) : (firstNum - 0));
      break;
    default:
      result.value = firstNum - 0;
  }
  if (!doubleEqual) flag--;
  beforeNum = result.value;
  firstNum = result.value;
  console.log(firstNum)
  enterFlag = false;
  onlyPoint = true;
  finFlag = true;
  doubleEqual = true;
}

function addPlusMinus() {
  if (firstNum[0] == '-') firstNum = firstNum.slice(1);
  else firstNum = '-' + firstNum;
  console.log(firstNum)
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
}

function clearCurrent() {
  result.value = 0;
  firstNum = '';
}

function backOneStep() {
  // 如果刚计算结束，结果无法退格
  if(finFlag==true)return;
  firstNum += '';
  if (firstNum[firstNum.length - 1] == ".") onlyPoint = true;
  if (firstNum.length <= 1) {
    firstNum = '';
    result.value = 0;
    enterFlag=false;
    onlyPoint=true;
    return;
  } else firstNum = firstNum.slice(0, firstNum.length - 1);
  if(firstNum==0)enterFlag=false;
  result.value = firstNum;
  console.log(firstNum)
}
// 平方
function square(){
  firstNum-=0;
  firstNum=firstNum.mul(firstNum);
  firstNum-='';
  result.value=firstNum;
}
//平方根
function sqrt(){
  firstNum-=0;
  firstNum=Math.sqrt(firstNum);
  firstNum-='';
  result.value=firstNum;
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
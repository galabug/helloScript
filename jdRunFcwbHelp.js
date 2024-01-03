const exec = require("child_process").exec;

let fileName = process.argv[2]; //要执行的文件
// let fixedCookies = process.argv[3] || []//每次跑的cookie数量
// let sleepTime = process.argv[4]//每段cookie跑的时间间隔

let CookieJDs = [];
if (process.env.JD_COOKIE) {
  if (process.env.JD_COOKIE.indexOf("&") > -1) {
    CookieJDs = process.env.JD_COOKIE.split("&");
  } else if (process.env.JD_COOKIE.indexOf("\n") > -1) {
    CookieJDs = process.env.JD_COOKIE.split("\n");
  } else {
    CookieJDs = [process.env.JD_COOKIE];
  }
} else {
  try {
    myCookies = require("./0config/myCookies.js").myCookies;
  } catch (error) {
    console.log(error);
  }
  if (myCookies) {
    // 0config/myCookies.js文件里的配置优先,不想用配置文件UNUSE_CONFIG配置true
    // console.log(`====================从${dirName}/0config/myCookies.js文件里获取${myCookies.length}个cookie====================`)
    CookieJDs = myCookies;
  }
}

let ckAllLength = CookieJDs.length;
console.log("cklength = ", ckAllLength);
let firstIndex = 0;
let cursorIndex = 0;

(async () => {
  // process.env.COOKE_INDEX = fixedCookies;
  let codeScript = "node  " + fileName;
  await runScript(codeScript, 0);
})();

async function runScript(codeScript, startIndex) {
  if (ckAllLength === 0) {
    console.log("ckAllLength === 0");
    return;
  }
  if (startIndex === "") {
    console.log("startIndex === ''");
    return;
  }
  if (startIndex >= ckAllLength) {
    console.log("startIndex >= ckAllLength");
    return;
  }
  let indexArr = getRunArr(startIndex, ckAllLength);
  if (indexArr.length <= 1) {
    console.log("jindexArr.length <= 1)");
    return;
  }
  process.env.RUN_COOKIE_ARR = JSON.stringify(indexArr);

  console.log("jdRunFcwbHelp.js::", codeScript, process.env.RUN_COOKIE_ARR);
  return new Promise((resolve) => {
    exec(codeScript, async function (error, stdout, stderr) {
      stdout && console.log(`stdout: ${stdout}`);
      error && console.log(`error: ${error}`);
      stderr && console.log(`stderr: ${stderr}`);
      let lastIndex = getRunIndex(stdout);
      cursorIndex += lastIndex;
      await runScript(codeScript, cursorIndex);
      resolve();
    });
  });
}

function getRunArr(startIndex, endIndex) {
  let arr = [];
  for (let i = startIndex; i < endIndex; i++) {
    arr.push(i);
  }
  if (firstIndex == 1) {
    arr.unshift(0);
  }
  if (firstIndex != 0) {
    arr.unshift(firstIndex);
  }
  firstIndex++;
  return arr;
}

function getRunIndex(stdout) {
  const regex = /京东账号(\d+)/g;
  let matches;
  let lastIndex = "";
  // 使用正则表达式的全局搜索和lastIndex属性来找到最后一个匹配项
  while ((matches = regex.exec(stdout)) !== null) {
    console.log(matches[0], matches[1]);
    lastIndex = matches[1];
    // 由于我们使用了全局搜索(g标志)，每次调用exec()都会从lastIndex位置开始搜索
    // 当循环结束时，matches将包含最后一个匹配项的信息
  }
  console.log("没有找到匹配项");

  return lastIndex;
}

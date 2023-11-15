const exec = require("child_process").exec;

let fileName = process.argv[2]; //要执行的文件
let onceRunNum = process.argv[3] * 1; //每次跑的cookie数量
let thisTime = process.argv[4] * 1; //每段cookie跑的时间间隔
let runType = process.argv[5]; // RUN_COOKIE_ARR 默认 COOKE_INDEX
console.log(
  `fileName=${fileName}, onceRunNum=${onceRunNum}, thisTime=${thisTime}, type=${runType}`
);

(async () => {
  if (!fileName) {
    console.log("第1个参数未传入要执行的文件");
    return;
  }
  if (!onceRunNum) {
    onceRunNum = 5;
    console.log("第2个参数未传入每次跑的cookie数，默认取" + onceRunNum + "个");
  }

  let CookieJDs = [
    "", //账号一ck,例:pt_key=XXX;pt_pin=XXX;
  ];
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
  console.log("CookieJDs.length", CookieJDs.length);
  let count1 = 0;
  for (let index = 0; index < CookieJDs.length; index = index + onceRunNum) {
    count1++;
    if (runType == "RUN_COOKIE_ARR") {
      let indexArr = [];
      index = index === 0 ? 1 : index;
      for (let i = index; i < index + onceRunNum; i++) {
        indexArr.push(i);
      }
      let firstIndex = count1 % 2 == 1 ? 0 : 1;
      indexArr.unshift(firstIndex);
      process.env.RUN_COOKIE_ARR = JSON.stringify(indexArr);
      console.log("process.env.RUN_COOKIE_ARR", process.env.RUN_COOKIE_ARR);
    } else {
      process.env.COOKE_INDEX = index + "-" + (index + onceRunNum - 1);
      console.log("process.env.COOKE_INDEX", process.env.COOKE_INDEX);
    }
    let codeScript = "node  " + fileName;
    await runScript(codeScript);
    if (index < CookieJDs.length - 1) {
      await sleep(thisTime);
    }
  }
  // let codeScript = 'node  ' + __dirname + '\\' + fileName
})();

async function sleep(timeout) {
  // showTimeCount(timeout / 1000, timeout / 1000);
  console.log("睡眠" + timeout + "分钟");
  return new Promise((resolve) => setTimeout(resolve, timeout * 60 * 1000));
}

async function showTimeCount(count, total) {
  if (count > 0) {
    process.stdout.write(`sleep ${count}/${total} 秒\r`);
    setTimeout(() => {
      count = count - 1;
      showTimeCount(count, total);
    }, 1000);
  }
}

async function runScript(code) {
  console.log(code);
  return new Promise((resolve) => {
    exec(code, async function (error, stdout, stderr) {
      stdout && console.log("\x1B[37m%s\x1B[0m", `stdout: ${stdout}`);
      error && console.log("\x1B[31m%s\x1B[0m", `error: ${error}`);
      stderr && console.log("\x1B[31m%s\x1B[0m", `stderr: ${stderr}`);
      resolve();
    });
  });
}

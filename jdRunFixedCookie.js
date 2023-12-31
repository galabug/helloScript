const exec = require('child_process').exec;

let fileName = process.argv[2]//要执行的文件
let fixedCookies = process.argv[3] || []//每次跑的cookie数量 
// let sleepTime = process.argv[4]//每段cookie跑的时间间隔
console.log('jd_runFixedCookie.js::', `fileName=${fileName}, fixedCookies=${fixedCookies}`);

(async () => {
  if (!fileName) {
    console.log('第1个参数未传入要执行的文件')
    return
  }
  if (!fixedCookies) {
    console.log('第2个参数未传入fixedCookies')
  }
  try {
    // process.env.RUN_COOKIE_ARR = JSON.parse('"'+fixedCookies+'"')
    const numTONumPattern = /^\d+-\d+$/;
    if (numTONumPattern.test(fixedCookies)) {
      process.env.COOKE_INDEX = fixedCookies
    } else if (fixedCookies && Array.isArray(JSON.parse(fixedCookies))) {
      process.env.RUN_COOKIE_ARR = fixedCookies
    } else {
      console.log('第2个参数fixedCookies 格式有误 = ' + fixedCookies)
      return
    }

  } catch (error) {
    console.error(error)
  }

  let codeScript = 'node  ' + fileName
  await runScript(codeScript)
})();


async function runScript(code) {
  console.log('jd_runFixedCookie.js::', code, process.env.COOKE_INDEX, process.env.RUN_COOKIE_ARR)
  return new Promise((resolve) => {
    exec(code, async function (error, stdout, stderr) {
      stdout && console.log(`stdout: ${stdout}`);
      error && console.log(`error: ${error}`);
      stderr && console.log(`stderr: ${stderr}`);
      resolve()
    });
  });

}
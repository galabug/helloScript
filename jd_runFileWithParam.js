const exec = require('child_process').exec;

let fileName = process.argv[2]//要执行的文件
let p_key = process.argv[3] || ''// 
let p_value = process.argv[4] || ''//
let fixedCookies = process.argv[5] || []//每次跑的cookie数量 
console.log('jd_runFileWithParam.js::', `fileName=${fileName}, p_key=${p_key}, p_value=${p_value}, fixedCookies=${fixedCookies}`);

(async () => {
  if (!fileName) {
    console.log('第1个参数未传入要执行的文件')
    return
  }
  if (!p_key) {
    console.log('第2个参数未传入 p_key')
  }
  if (!p_value) {
    console.log('第2个参数未传入 p_value')
  }

  try {
    // process.env.RUN_COOKIE_ARR = JSON.parse('"'+fixedCookies+'"')
    const numTONumPattern = /^\d+-\d+$/;
    if (numTONumPattern.test(fixedCookies)) {
      process.env.COOKE_INDEX = fixedCookies
    } else if (fixedCookies && Array.isArray(JSON.parse(fixedCookies))) {
      process.env.RUN_COOKIE_ARR = fixedCookies
    } else {
      console.log('参数fixedCookies 格式有误 = ' + fixedCookies)
      return
    }
  } catch (error) {
    console.error(error)
  }

  process.env[p_key] = p_value
  let codeScript = 'node  ' + __dirname + '\\' + fileName
  await runScript(codeScript)
})();


async function runScript(code) {
  console.log('0runFileFixedCookie.js::', code, p_key, process.env[p_key], process.env.COOKE_INDEX, process.env.RUN_COOKIE_ARR)
  return new Promise((resolve) => {

    exec(code, async function (error, stdout, stderr) {
      stdout && console.log('\x1B[37m%s\x1B[0m', `stdout: ${stdout}`);
      error && console.log('\x1B[31m%s\x1B[0m', `error: ${error}`);
      stderr && console.log('\x1B[31m%s\x1B[0m', `stderr: ${stderr}`);
      resolve()
    });
  });
}
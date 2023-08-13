const exec = require('child_process').exec;

let fileName = process.argv[2]//要执行的文件
let fixedCookies = process.argv[3] || []//每次跑的cookie数量 
// let sleepTime = process.argv[4]//每段cookie跑的时间间隔
console.log('\x1B[36m', '0runFileFixedCookie.js::', `fileName=${fileName}, fixedCookies=${fixedCookies}`, '\x1B[0m');

(async () => {
  if (!fileName) {
    console.log('\x1B[44m%s\x1B[0m', '第1个参数未传入要执行的文件')
    return
  }
  if (!fixedCookies) {
    console.log('\x1B[44m%s\x1B[0m', '第2个参数未传入fixedCookies')
  }
  try {
    // process.env.RUN_COOKIE_ARR = JSON.parse('"'+fixedCookies+'"')
    process.env.RUN_COOKIE_ARR = fixedCookies
    if (!fixedCookies || !Array.isArray(JSON.parse(fixedCookies))) {
      console.log('\x1B[44m%s\x1B[0m', '第2个参数fixedCookies不是数组= ' + fixedCookies)
      return
    }
  } catch (error) {
    console.error(error)
  }

  let codeScript = 'node  ' + __dirname + '\\' + fileName
  await runScript(codeScript)
})();


async function runScript(code) {
  console.log('0runFileFixedCookie.js::', code, process.env.RUN_COOKIE_ARR)
  exec(code, async function (error, stdout, stderr) {
    stdout && console.log('\x1B[37m%s\x1B[0m', `stdout: ${stdout}`);
    error && console.log('\x1B[31m%s\x1B[0m', `error: ${error}`);
    stderr && console.log('\x1B[31m%s\x1B[0m', `stderr: ${stderr}`);
  });
}
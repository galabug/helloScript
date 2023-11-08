# helloScript

format on save


ql repo https://github.com/galabug/helloScript.git "^jd_|^jx_|^gua_|^wskey" "activity|backUp" "^jd|^USER|^TS|sendNotify|h5st|js|py|ts|function|utils" "main"

### jd_runFileWithParam
task galabug_helloScript_main/jd_runFileWithParam.js

jd_runFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4707
jd_runFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4706
jd_runFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4705
jd_runFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4704
jd_runFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4703

### jd_runCookiesInterval
task galabug_helloScript_main/jd_runCookiesInterval.js

node jd_runCookiesInterval jd_jrsign 10 20
node jd_runCookiesInterval jd_mpdz_car 4 0.2 RUN_COOKIE_ARR

### jd_runFixedCookie
task galabug_helloScript_main/jd_runFixedCookie.js


## 具体任务
#### jd_mpdz_car 头文字J任务

task galabug_helloScript_main/jd_runCookiesInterval.js jd_mpdz_car 4 60 RUN_COOKIE_ARR


#### jd_jrsign 金融签到2
1 10 * * *
1 13 * * *
1 16 * * *
task galabug_helloScript_main/jd_runFixedCookie.js jd_jrsign 0-9
task galabug_helloScript_main/jd_runFixedCookie.js jd_jrsign 10-19
task galabug_helloScript_main/jd_runFixedCookie.js jd_jrsign 20-29

#### jd_car_exc  头文字J兑换 
0 10 * * *
头文字J兑换1000京豆
头文字J兑换500京豆
头文字J兑换50京豆
头文字J兑换20京豆
头文字J兑换5京豆

task galabug_helloScript_main/jd_runFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4707 0-4
task galabug_helloScript_main/jd_runFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4706 1-4
task galabug_helloScript_main/jd_runFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4705 0-4
task galabug_helloScript_main/jd_runFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4704 1-10
task galabug_helloScript_main/jd_runFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4703 


#### jd_joypark_task 废弃
node jd_runFixedCookie jd_joypark_task0
task galabug_helloScript_main/jd_runFixedCookie.js jd_joypark_task.js [0,3,1,2,4,5,6,7,8,9,10]

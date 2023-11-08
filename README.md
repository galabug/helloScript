# helloScript

format on save


ql repo https://github.com/galabug/helloScript.git "^jd_|^jx_|^gua_|^wskey" "activity|backUp" "^jd|^USER|^TS|sendNotify|h5st|js|py|ts|function|utils" "main"

ql repo https://github.com/miantj/jd_Scripts.git "jd_|jx_|jddj_|ql|gua_|getJDCookie|wskey" "activity|backUp" "^jd[^_]|USER|utils|function|sign|sendNotify|ql|JDJR" "main"


ql repo https://git.metauniverse-cn.com/https://github.com/shufflewzc/faker3.git "jd_|jx_|gua_|jddj_|jdCookie" "activity|backUp" "^jd[^_]|USER|function|utils|sendNotify|ZooFaker_Necklace.js|JDJRValidator_|sign_graphics_validate|ql|JDSignValidator|magic|depend|h5sts" "main"




# 1 jdRunFixedCookie
task galabug_helloScript_main/jdRunFixedCookie.js
### 1.1 jd_jrsign 金融签到2
1 10 * * *
1 13 * * *
1 16 * * *
<!-- task galabug_helloScript_main/jdRunFixedCookie.js jd_jrsign 0-9 -->
<!-- task galabug_helloScript_main/jdRunFixedCookie.js jd_jrsign 10-19 -->
<!-- task galabug_helloScript_main/jdRunFixedCookie.js jd_jrsign 20-29 -->


# 2 jdRunCookiesInterval
task galabug_helloScript_main/jdRunCookiesInterval.js
node jdRunCookiesInterval jd_jrsign 10 20
node jdRunCookiesInterval jd_mpdz_car 4 0.2 RUN_COOKIE_ARR

### 2.1 jd_mpdz_car 头文字J任务
1 10 * * *

task galabug_helloScript_main/jdRunCookiesInterval.js jd_mpdz_car 4 60 RUN_COOKIE_ARR

### 2.2 jd_jrsign  金融签到
1 16 * * *
task galabug_helloScript_main/jdRunCookiesInterval.js jd_jrsign 8 60 

### 2.3 jd_dwapp  积分换话费
1 13 * * *
task galabug_helloScript_main/jdRunCookiesInterval.js jd_dwapp 8 60 



# 3 jdRunFileWithParam
task galabug_helloScript_main/jdRunFileWithParam.js
jdRunFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4707
#### 3.1 jd_car_exc  头文字J兑换 
0 10 * * *
头文字J兑换1000京豆
头文字J兑换500京豆
头文字J兑换50京豆
头文字J兑换20京豆
头文字J兑换5京豆

task galabug_helloScript_main/jdRunFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4707 0-4
task galabug_helloScript_main/jdRunFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4706 1-4
task galabug_helloScript_main/jdRunFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4705 0-4
task galabug_helloScript_main/jdRunFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4704 1-10
task galabug_helloScript_main/jdRunFileWithParam.js jd_car_exc.js jd_car_play_exchangeid 10082bd15b4703 






#### jd_joypark_task 废弃
node jdRunFixedCookie jd_joypark_task0
task galabug_helloScript_main/jdRunFixedCookie.js jd_joypark_task.js [0,3,1,2,4,5,6,7,8,9,10]

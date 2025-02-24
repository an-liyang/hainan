/*
 * Copyright 2014-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let changeDate = function (date) {
    let newData = new Date(date)
    let Y = newData.getFullYear()
    let M = newData.getMonth() + 1 > 9 ? newData.getMonth() + 1 : '0' + (newData.getMonth() + 1)
    let D = newData.getDate() > 9 ? newData.getDate() : '0' + newData.getDate()
    return Y + '-' + M + '-' + D
}
// 数字检验
export function intValidator(rule, value, callback){
    var reg = new RegExp('^[0-9]*$')
    if (!reg.test(value)) {
        callback(new Error('请输入数字'))
    }else{
        callback()
    }
}
// 邮箱检验
export function emailValidator(rule, value, callback){
    if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
        callback(new Error('请输入正确邮箱'))
    }else{
        callback()
    }
}
// 手机检验
export function phoneValidator(rule, value, callback){
    if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))){
        callback(new Error('请输入正确手机号码'))
    }else{
        callback()
    }
}       
export function formatData() {
    let newData = new Date()
    let Y = newData.getFullYear()
    let M = newData.getMonth() + 1 > 9 ? newData.getMonth() + 1 : '0' + (newData.getMonth() + 1)
    let D = newData.getDate() > 9 ? newData.getDate() : '0' + newData.getDate()
    let newdata = Y + '/' + M + '/' + D
    return newdata
};

export function date(date) {
    let newData = new Date(date.getTime())
    let Y = newData.getFullYear()
    let M = newData.getMonth() + 1 > 9 ? newData.getMonth() + 1 : '0' + (newData.getMonth() + 1)
    let D = newData.getDate() > 9 ? newData.getDate() : '0' + newData.getDate()
    let h = newData.getHours()
    let m = newData.getMinutes()
    let s = newData.getSeconds()
    return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}
export function getDate(val) {
    val = Number(val)
    let date = new Date(val)
    let Y = date.getFullYear()
    let M = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    let D = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}

export function changWeek(data) {

    let lastDate = (new Date()).getTime()
    let firstDate = lastDate - 6 * 24 * 3600 * 1000
    let dateList = []
    dateList[0] = {}
    dateList[0].transCount = 0
    dateList[0].day = firstDate
    for (let i = 1; i < 7; i++) {
        dateList[i] = {}
        dateList[i].day = dateList[i - 1].day + 24 * 3600 * 1000
        dateList[i].transCount = 0
    };
    for (let i = 0; i < 7; i++) {
        dateList[i].day = changeDate(dateList[i].day)
    }
    dateList.forEach(function (value) {
        if (data && data.length) {
            for (let j = 0; j < data.length; j++) {
                if (value.day === data[j].day) {
                    value.transCount = data[j].transCount
                }
            }
        }
    })
    return dateList
}
/**Get request parameter processing
 * @param necessary Required
 * @param query Optional
 * @return {Object}
 */
export function reviseParam(necessary, query) {
    let params = arguments[0],
        querys = arguments[1],
        arr = [],
        str = ''
    for (var i in params) {
        arr.push(params[i])
    }
    str = arr.join('/')
    return {str, querys}
}


/** get cookie*/
export function getCookie(name) {
    var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (arr = document.cookie.match(reg))
        return (arr[2])
    else
        return null
}

/**set cookie*/
export function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
};

/**delete cookie*/
export function delCookie(name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = getCookie(name)
    if (cval != null)
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
};

/**
 * format Timestamp example："2018-01-17 15:39:34"
 * @param d Timestamp
 * @param fmt "yyyy-MM-dd" || "yyyy-MM-dd HH:mm:ss"
 * @returns {string}
 */
export function format(d, fmt) {
    var fmt=fmt||'yyyy-MM-dd'
    let date = {}
    if (!(d instanceof Date)) {
        date = new Date(parseInt(d))
    }
    let o = {
        'M+': date.getMonth() + 1, //month
        'd+': date.getDate(), //day 
        'H+': date.getHours(), //hour
        'm+': date.getMinutes(), //minute 
        's+': date.getSeconds(), //second 
        'q+': Math.floor((date.getMonth() + 3) / 3), //quarter 
        'S': date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    return fmt
}
/**
 * format Timestamp example："2017-03-31T08:02:06Z"
 * @utc_datetime d Timestamp
 * @returns {string}
 */
export function utc2beijing(utc_datetime) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = utc_datetime.indexOf('T')
    // var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0,T_pos)
    var hour_minute_second = utc_datetime.substr(T_pos+1,-1)
    var new_datetime = year_month_day+' '+hour_minute_second // 2017-03-31 08:02:06

    // 处理成为时间戳
    timestamp = new Date(Date.parse(new_datetime))
    timestamp = timestamp.getTime()
    timestamp = timestamp/1000

    // 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp+8*60*60

    // 时间戳转为时间
    var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ')
    return beijing_datetime // 2017-03-31 16:02:06
} 

/**
* number：formatted number
* decimals：Keep a few decimals
* dec_point：decimal point symbol
* thousands_sep：thousands of symbols
* */
export function numberFormat(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec)
            return '' + Math.ceil(n * k) / k
        }

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    var re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + sep + '$2')
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
}

export function isNumber(obj) {

    return typeof obj === 'number' && !isNaN(obj)

}

/** 
* startTime
* endTime
* data
* */
export function completionDateData(startTime, endTime, data) {
    var lastDate = new Date(endTime).getTime()
    var firstDate = new Date(startTime).getTime()
    var len = (lastDate - firstDate) / 86400000
    var dateList = []
    dateList[0] = {}
    dateList[0].time = firstDate
    dateList[0].transCount = 0
    for (let i = 1; i < len + 1; i++) {
        dateList[i] = {}
        dateList[i].time = dateList[i - 1].time + 24 * 3600 * 1000
        dateList[i].transCount = 0
    };
    for (let i = 0; i < len + 1; i++) {
        dateList[i].time = format(dateList[i].time, 'MM-dd')
    }
    for (let i = 0; i < dateList.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (dateList[i]['time'] === data[j]['time']) {
                dateList[i]['transCount'] = data[j]['transCount']
            }
        }
    }
    return dateList
}

export function unique(array, onlyKey) {
    let result = {}, finalResult = [], oneKey = onlyKey
    for (let i = 0; i < array.length; i++) {
        result[array[i][oneKey]] = array[i]

    }
    for (let key in result) {
        finalResult.push(result[key])
    }
    return finalResult
}
export {
    timeChina,
    getDateStr,
    timestampToTime,
    getDateDiff,
    dateAddTime,
    changeToUnderline,
    getDateDiff_2,
    formatDateToYMD
}

function timeChina(timestamp) {
    var dd = new Date();
    dd.setTime(timestamp.getTime());
    var y = dd.getFullYear();
    var M = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
    var H = dd.getHours() < 10 ? "0" + dd.getHours() : dd.getHours();
    var m = dd.getMinutes() < 10 ? "0" + dd.getMinutes() : dd.getMinutes();
    var s = dd.getSeconds() < 10 ? "0" + dd.getSeconds() : dd.getSeconds();
    return y + "-" + M + "-" + d + " " + H + ":" + m + ":" + s;

}

//获取当前时间
function getDateStr(AddDayCount, hms) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var M = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
    var H = dd.getHours() < 10 ? "0" + dd.getHours() : dd.getHours();
    var m = dd.getMinutes() < 10 ? "0" + dd.getMinutes() : dd.getMinutes();
    var s = dd.getSeconds() < 10 ? "0" + dd.getSeconds() : dd.getSeconds();
    if (hms) {
        return y + "-" + M + "-" + d + " " + H + ":" + m + ":" + s;
    } else {
        return y + "-" + M + "-" + d;
    }
}

//时间戳转换成时间格式
function timestampToTime(timestamp) {
    var dd = new Date();
    dd.setTime(timestamp);
    var y = dd.getFullYear();
    var M = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
    var H = dd.getHours() < 10 ? "0" + dd.getHours() : dd.getHours();
    var m = dd.getMinutes() < 10 ? "0" + dd.getMinutes() : dd.getMinutes();
    var s = dd.getSeconds() < 10 ? "0" + dd.getSeconds() : dd.getSeconds();
    return y + "-" + M + "-" + d + " " + H + ":" + m + ":" + s;

}

//获取两个时间的时间差
function getDateDiff(startDate, endDate) {
    var s1 = new Date(startDate);
    var s2 = endDate ? new Date(endDate) : new Date();
    var time = s2.getTime() - s1.getTime();
    var days = parseInt(time / (1000 * 60 * 60 * 24));
    return days;
}

// 日期加上调整量(单位秒)的结果
function dateAddTime(date, adjustment) {
    var year = date.getFullYear(); //获取当前年份
    var mon = date.getMonth(); //获取当前月份
    var da = date.getDate(); //获取当前日
    var h = date.getHours(); //获取小时
    var m = date.getMinutes(); //获取分钟
    var s = date.getSeconds(); //获取秒
    var ts = s + adjustment;
    var oDate = new Date(year, mon, da, h, m, ts);
    var result = timestampToTime(oDate.getTime())
    return result
}

// 文件导出文件名中存在冒号会报错替换成下划线
function changeToUnderline(str) {
    if (str && typeof str == "string") {
        return str.replace(/:/g, "_")
    }
}

//获取两个时间的时间差,结果保存为 xx时xx分
function getDateDiff_2(startDate, endDate) {
    const s1 = new Date(startDate);
    const s2 = endDate ? new Date(endDate) : new Date();
    const timeDiff = s2.getTime() - s1.getTime();
    const h = parseInt(timeDiff / (1000 * 60 * 60));
    const m = parseInt((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return `${h}小时${m}分`
}

// 只保留年月日
function formatDateToYMD(dateStamp, useDot) {
    const dd = new Date(dateStamp);
    const y = dd.getFullYear();
    //获取当前月份的日期，不足10补0
    const M = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);
    //获取当前几号，不足10补0
    const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
    // 分隔符 : useDot :  true --> . ; false --> -
    const res = useDot ? (y + '.' + M + '.' + d) : (y + '-' + M + '-' + d);
    return res
}
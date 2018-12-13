export default {
  /*
  时间格式化工具
  把Long类型的yyyy-MM-dd日期还原yyyy.MM.dd格式日期
*/
  dateFormatUtil(longTypeDate) {
    let dateTypeDate = "";
    let date = new Date();
    date.setTime(longTypeDate);
    dateTypeDate += date.getFullYear();   //年
    dateTypeDate += "." + this.getMonth(date); //月
    dateTypeDate += "." + this.getDay(date);   //日
    return dateTypeDate;
  },
//返回 01-12 的月份值
  getMonth(date) {
    let month = "";
    month = date.getMonth() + 1; //getMonth()得到的月份是0-11
    if (month < 10) {
      month = "0" + month;
    }
    return month;
  },
//返回01-30的日期
  getDay(date) {
    var day = "";
    day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return day;
  }
}



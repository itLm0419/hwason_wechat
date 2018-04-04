/**
 * Created by Bright xia on 2017/5/10.
 */
export default {
 /* dateObj: function (){
    var _date = new Date();    // 默认为当前系统时间
    return {
      getDate: function () {
        return _date;
      },
      setDate: function (date) {
        _date = date;
      }
    };
  }, */

    /**
        * 表格中显示数据，并设置类名
        */
    showCalendarData: function(_year,_month){

      var DayofDate = new Array();
      var DaysofMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 31, 30];

      var _firstDay = new Date(_year, _month - 1, 1);  // 当前月第一天
      console.log(_firstDay);
      var _WeekofDay = _firstDay.getDay();
      var Nextmonthday=_WeekofDay-1+DaysofMonth[_month-1]; //这个结果比世纪少一天
       if(_month==2 && _year%4==0) {
           Nextmonthday=Nextmonthday+1;
           DaysofMonth[_month-1]=29;
       }
      console.log(_WeekofDay);
      var TotalDays = Math.ceil((_WeekofDay + DaysofMonth[_month-1]) / 7) * 7
      for (var i = 0; i < TotalDays; i++) {
        var _thisDay = new Date(_year, _month - 1, i+1  - _WeekofDay);
        //var _thisDayStr = getDateStr(_thisDay);
        DayofDate[i] = _thisDay.getDate();

        //  _tds[i].innerText = _thisDay.getDate();
        //_tds[i].data = _thisDayStr;
        //   _tds[i].setAttribute('data', _thisDayStr);
        /*   if(_thisDayStr == getDateStr(new Date())) {    // 当前天
         _tds[i].className = 'currentDay';
         }else if(_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) {
         _tds[i].className = 'currentMonth';  // 当前月
         }else {    // 其他月
         _tds[i].className = 'otherMonth';
         } */
      }
      return {DayofDate,_WeekofDay,Nextmonthday};
    }
}

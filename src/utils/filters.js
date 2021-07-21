/**
 * 全局过滤器
 */
import { parseTime } from "@/utils/index";

import moment from "moment";
import 'moment/locale/zh-cn'

const filters = {
  // 时间戳转换为 yyyy-MM-dd mm:hh:ss
  DateTime: function(time) {
    time = (time < 10000000 && time>=0) ? time*1000 : time;
    return time ? moment(time * 1000).format("YYYY年MM月DD日") : "";
  },
  DateTimeEn: function(time) {
    time = (time < 10000000 && time>=0) ? time*1000 : time;
    return time ? moment(time * 1000).format("YYYY-MM-DD") : "";
  },
  TimeSecond: function(time) {
    time = (time < 10000000 && time>=0) ? time*1000 : time;
    return time ? moment(time * 1000).format("MM月DD日 HH:mm:ss") : "";
  },
  DateTimeSecond: function(time) {
    time = (time < 10000000 && time>=0) ? time*1000 : time;
    return time ? moment(time * 1000).format("YYYY年MM月DD日 HH:mm:ss") : "";
  },
  DateTimeSecondEn: function(time) {
    time = (time < 10000000 && time>=0) ? time*1000 : time;
    return time ? moment(time * 1000).format("YYYY-MM-DD HH:mm:ss") : "";
  },
  DateTimeMinEn: function(time) {
    time = (time < 10000000 && time>=0) ? time*1000 : time;
    return time ? moment(time * 1000).format("YYYY-MM-DD HH:mm") : "";
  },
  HourMinSecond: function(time) {
    time = (time < 10000000 && time>=0) ? time*1000 : time;
    return time ? moment(time * 1000).format("HH:mm:ss") : "";
  },
  moment(time, format) {
    time = (time < 10000000 && time>=0) ? time*1000 : time;
    return time ? moment(time * 1000).format(format) : "";
  },
  Num2ChineseStr(money){
    var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
    var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
    var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
    var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
    var cnInteger = "整"; //整数金额时后面跟的字符
    var cnIntLast = "元"; //整型完以后的单位
    var maxNum = 999999999999999.9999; //最大处理的数字
    var IntegerNum; //金额整数部分
    var DecimalNum; //金额小数部分
    var ChineseStr = ""; //输出的中文金额字符串
    var parts; //分离金额后用的数组，预定义
    var Symbol="";//正负值标记
    if (money == "") {
      return "";
    }

    money = parseFloat(money);
    if (money >= maxNum) {
      alert('超出最大处理数字');
      return "";
    }
    if (money == 0) {
      ChineseStr = cnNums[0] + cnIntLast + cnInteger;
      return ChineseStr;
    }
    if(money<0)
    {
      money=-money;
      Symbol="负 ";
    }
    money = money.toString(); //转换为字符串
    if (money.indexOf(".") == -1) {
      IntegerNum = money;
      DecimalNum = '';
    } else {
      parts = money.split(".");
      IntegerNum = parts[0];
      DecimalNum = parts[1].substr(0, 4);
    }
    if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
      var zeroCount = 0;
      var IntLen = IntegerNum.length;
      for (var i = 0; i < IntLen; i++) {
        var n = IntegerNum.substr(i, 1);
        var p = IntLen - i - 1;
        var q = p / 4;
        var m = p % 4;
        if (n == "0") {
          zeroCount++;
        }
        else {
          if (zeroCount > 0) {
            ChineseStr += cnNums[0];
          }
          zeroCount = 0; //归零
          ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
        }
        if (m == 0 && zeroCount < 4) {
          ChineseStr += cnIntUnits[q];
        }
      }
      ChineseStr += cnIntLast;
      //整型部分处理完毕
    }
    if (DecimalNum != '') { //小数部分
      var decLen = DecimalNum.length;
      for (var i = 0; i < decLen; i++) {
        var n = DecimalNum.substr(i, 1);
        if (n != '0') {
          ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
    }
    if (ChineseStr == '') {
      ChineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (DecimalNum == '') {
      ChineseStr += cnInteger;
    }
    ChineseStr = Symbol +ChineseStr;

    return ChineseStr;
  },
  // 状态
  styleStatus: function(status) {
    let res = "";
    switch (status) {
      case 0:
        res = "停用";
        break;
      case 1:
        res = "启用";
        break;
    }
    return res;
  },
  styleTypeStatus: function(status) {
    let res = "";
    switch (status) {
      case 0:
        res = "停用";
        break;
      case 1:
        res = "启用";
        break;
    }
    return res;
  },
  formatMoney: function(number, places, symbol, thousand, decimal) {
    number = number || 0;
    places = !isNaN((places = Math.abs(places))) ? places : 2;
    // symbol = symbol !== undefined ? symbol : "$";
    symbol = "";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var negative = number < 0 ? "-" : "",
      i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + "",
      j = (j = i.length) > 3 ? j % 3 : 0;
    return (
      symbol +
      negative +
      (j ? i.substr(0, j) + thousand : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
      (places
        ? decimal +
          Math.abs(number - i)
            .toFixed(places)
            .slice(2)
        : "")
    );
  },
  formatSize(n, size) {
    function simplifyNum(obj){
      if(obj.num>=1024){
        obj.num = obj.num/1024,
          obj.level ++;
        obj = simplifyNum(obj);
        return obj
      }else{
        return obj
      }
    }
    if (n) {
      let minus = false;
      let unitArr = ['B','KB','MB','GB'];
      let unit = '';
      if (n < 0) {
        minus = true;
        n = Math.abs(n);
      }
      let obj = simplifyNum({num:n,level:0});
      n = obj.num;
      unit = unitArr[obj.level];

      if (size > 0) {
        n = n.toFixed(size)
      }
      n = n.toString().split(".");  // 分隔小数点
      let arr = n[0].split("").reverse();  // 转换成字符数组并且倒序排列
      let res = [];
      for (let i = 0, len = arr.length; i < len; i++) {
        if (i % 3 === 0 && i !== 0) {
          res.push(",");   // 添加分隔符
        }
        res.push(arr[i]);
      }
      res.reverse(); // 再次倒序成为正确的顺序
      if (n[1]) {  // 如果有小数的话添加小数部分
        res = res.join("").concat("." + n[1]);
      } else {
        res = res.join("");
      }
      res = minus ? ('-' + res) : res
      res = res+unit;
      return res;
    }else {
      return ''
    }

  },
  formatDiskTime(time){
    // time = (time < 10000000 && time>=0) ? time*1000 : time;
    if(moment(time*1000).isBefore(moment().subtract(1,'months'))){ // 一个月之前
      return time ? moment(time*1000).format("MM-DD") : "";
    }else {
      return time ? moment(time*1000).fromNow():'';
    }
  },
  formatMoneyNo: function(number, places, symbol, thousand, decimal) {
    number = number || 0;
    places = !isNaN((places = Math.abs(places))) ? places : 0;
    // symbol = symbol !== undefined ? symbol : "$";
    symbol = "";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var negative = number < 0 ? "-" : "",
      i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + "",
      j = (j = i.length) > 3 ? j % 3 : 0;
    return (
      symbol +
      negative +
      (j ? i.substr(0, j) + thousand : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
      (places
        ? decimal +
        Math.abs(number - i)
          .toFixed(places)
          .slice(2)
        : "")
    );
  },
  formatMoneyUnit: function(status) {
    let res = "";
    let money = ''
    if (status && status.value){
      money = status.value
    } else {
      money = status;
    }
    switch (money) {
      case "CNY":
        res = "元";
        break;
      case "USD":
        res = "美元";
        break;
      case "HKD":
        res = "港元";
        break;
      default:
        res = "元";
        break;
    }
    return res;
  },
  arr2Str(val, tag) {
    let str = "";
    for (let i in val) {
      str += val[i][tag] + "、";
    }
    str = str.substring(0, str.length - 1);
    return str;
  },
  trim(str) {
    return str.replace(/^\s*|\s*$/g, "");
  },
  getFileType(fileName) {
    let suffix = "";
    // 获取类型结果
    let result = "";
    try {
      let flieArr = fileName.split(".");
      suffix = flieArr[flieArr.length - 1];
    } catch (err) {
      suffix = "";
    }
    // fileName无后缀返回 false
    if (!suffix) {
      result = false;
      return result;
    }
    // 图片格式
    let imglist = ["png", "jpg", "jpeg", "bmp", "gif"];
    // 进行图片匹配
    result = imglist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = "image";
      return result;
    }
    // 匹配txt
    let txtlist = ["txt"];
    result = txtlist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = "txt";
      return result;
    }
    // 匹配 excel
    let excelist = ["xls", "xlsx"];
    result = excelist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = "excel";
      return result;
    }
    // 匹配 word
    let wordlist = ["doc", "docx"];
    result = wordlist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = "word";
      return result;
    }
    // 匹配 pdf
    let pdflist = ["pdf"];
    result = pdflist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = "pdf";
      return result;
    }
    // 匹配 ppt
    let pptlist = ["ppt","pptx"];
    result = pptlist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = "ppt";
      return result;
    }
    // 匹配 视频
    let videolist = ["mp4", "m2v", "mkv"];
    result = videolist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = "video";
      return result;
    }
    // 匹配 视频
    let ziplist = ["zip", "rar"];
    result = ziplist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = "zip";
      return result;
    }
    // 匹配 音频
    let radiolist = ["mp3", "wav", "wmv"];
    result = radiolist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = "radio";
      return result;
    }
    // 其他 文件类型
    result = "other";
    return result;
  },
  moneyUnit(val, tag) {
    let str = "";
    for (let i in val) {
      str += val[i][tag] + "、";
    }
    str = str.substring(0, str.length - 1);
    return str;
  }
};

export default filters;

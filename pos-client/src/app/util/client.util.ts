import {Injectable} from '@angular/core'
declare var Aes: any;
declare var CryptoJS: any;
declare var AesUtil: any;
@Injectable()
export class ClientUtil {

  _datepickerOpts = {
    autoclose: true,
    todayBtn: false,
    todayHighlight: true,
    placeholder: 'dd/mm/yyyy',
    format: 'dd/mm/yyyy',
    icon: 'glyphicon glyphicon-calendar'
  }

  MSG_TYPE = { INFO: { type: "Information" }, WARN: { type: "Warning" } }

  //20160526 2:09pm YMK...
  changeDatetoString(dt) {
    if (dt != null) {
      var datepattern = /(\d{4})?[- ]?(\d{2})?[- ]?(\d{2})/;
      return dt.replace(datepattern, '$1$2$3');
    } else {
      return "";
    }
  }

  //for YYYY-MM-DD fomat
  changeDatetoStringYMD(dt) {
    if (dt != null) {
      dt = dt.substring(0, 10);
      var datepattern = /(\d{4})?[- ]?(\d{2})?[- ]?(\d{2})/;
      return dt.replace(datepattern, '$3/$2/$1');
    } else {
      return "";
    }
  }

  changeStringtoDate(dt) {
    if (dt != null) {
      var pattern = /(\d{4})(\d{2})(\d{2})/;
      return dt.replace(pattern, '$1-$2-$3');
    } else {
      return "";
    }
  }

  changeStringtoDateTime(dt) {
    if (dt != null) {
      var pattern = /(\d{4})(\d{2})(\d{2})/;
      dt = dt.substring(0, 10);
      return dt.replace(pattern, '$1-$2-$3');
    } else {
      return "";
    }
  }

  changeStringTimetoDate(dt) {
    if (dt != null) {
      var pattern = /(\d{4})(\d{2})(\d{2})/;
      return dt.replace(pattern, '$1/$2/$3');
    } else {
      return "";
    }
  }

  changeStringTodateNEWDDMMYYYY(_date, _format, _delimiter) {
    if (_date != null) {
      var pattern = /(\d{4})(\d{2})(\d{2})/;
      var Patterndate = _date.replace(pattern, '$3/$2/$1');
      var formatLower = _format.toLowerCase();
      var formatItems = formatLower.split(_delimiter);
      var dateItems = Patterndate.split(_delimiter);
      var monthIndex = formatItems.indexOf("mm");
      var dayIndex = formatItems.indexOf("dd");
      var yearIndex = formatItems.indexOf("yyyy");
      var month = parseInt(dateItems[monthIndex]);
      month = -1;
      var formatedDate = new Date(dateItems[dayIndex], month, dateItems[yearIndex]);
      return formatedDate;
    } else {
      return null;
    }
  }


  changeStringtoDateDDMMYYYY(dt) {
    if (dt != null) {
      var pattern = /(\d{4})(\d{2})(\d{2})/;
      return dt.replace(pattern, '$3/$2/$1');
    } else {
      return "";
    }
  }

  changeStringtoDateDDMMYYYYHHmmss(dt) {
    if (dt) {
      var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
      return dt.replace(pattern, '$3/$2/$1 $4:$5:$6');
    } else {
      return "";
    }
  }

  getTodayDate() {
    var d = new Date();
    var datestring = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    return datestring;
  }

  getTodayStringDate() {
    var d = new Date();
    var datestring = ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
    return datestring;
  }

  getCurrentYear() {
    var d = new Date();
    var datestring = d.getFullYear();
    return datestring;
  }

  validateEmail(d) {
    var pattern = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
    return pattern.test(d);
  };

  validateIR(d) {
    var pattern = /IR(\d{2})(\d{2})/;
    return pattern.test(d);
  };

  compareStringLength(str, strln) {
    if (str.length <= strln) {
      return true;
    } else {
      return false;
    }
  }

  checkNumber(num) {
    return isNaN(num);
  }

  changeArray(data, obj, num) {
    let arr = [];
    if (data instanceof Array) {
      arr = data;
      return arr;
    } else {
      if (num == 0) {
        arr[0] = obj;
        arr[1] = data;
        return arr;
      }
      if (num == 1) {
        arr[0] = data;
        arr[1] = obj;
        return arr;
      }
    }
  }

  currencyFormat(p) {
    if( p != '' && p!='-' && !isNaN(p)){
     return (+p).toFixed(2);
    }else{
      return "-";
    }
  }

  changeDatefromat(dt) {
    if (dt != undefined) { return this.changeStringtoDate(this.changeDatetoString(dt)).substring(0, 10); }
  }

  //money format #,###.## - ymk 20160908
  formatMoney(n) {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
  }

  validateUrl(d) {
    var pattern = /(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-z]+)?$/;
    return pattern.test(d);
  };

  //methods for datepicker...
  //get DatePicker Date...
  getDatePickerDate(dt) {
    if (dt != null) {
      var datestring = dt.getFullYear() + ("0" + (dt.getMonth() + 1)).slice(-2) + ("0" + dt.getDate()).slice(-2);
      return datestring;
    } else {
      return "";
    }
  }
  //set DatePicker Date...
  setDatePickerDate(str) {
    if (str != "" && str != null) {
      let date = new Date(this.changeStringtoDateTime(str));
      return date;
    } else {
      return null;
    }
  }

  getDatePicker() {
    return this._datepickerOpts;
  }

  changeStringtoTime(dt) {
    if (dt != null) {
      let hour = dt.substring(0, 2);
      let minute = dt.substring(2, 4);
      let dn = "AM";
      if (hour >= 12) {
        hour = hour - 12;
        dn = "PM";
      }
      if (hour == 0) {
        hour = 1;
      }
      let time = hour + ":" + minute + "  " + dn;
      return time;
    } else {
      return "";
    }
  }

  readCookie(name) {
    var re = new RegExp(name + "=([^;]+)").exec(document.cookie);
    return (re != null) ? re[1] : "";
  }

  setCookie(name, data) { document.cookie = name + "=" + data + ";max-age=" + (365 * 24 * 60 * 60 * 1000)+"; path=/"; }

  getUserId() { return this.readCookie('l_e'); }

  getPassword() { return this.readCookie('l_d'); }

  getDomain(){ return this.readCookie('w_dm'); }

  getLocation(){ return this.readCookie("w_lclo"); }

  getLocationDescription() { return this.readCookie("w_lclo_code"); }

  getCounter() { return this.readCookie("w_lcco"); }

  getCounterDescription() { return this.readCookie("w_lcco_code"); }

  getBinCode() { return this.readCookie("w_lcbi_code"); }

  getBinSK() { return this.readCookie("w_lcbi"); }

  setUserId(data) { this.setCookie("l_e", data == "" ? "" : Aes.Ctr.encrypt(data, 'password', 128)) };

  setPassword(data) { this.setCookie("l_d", data == "" ? "" : Aes.Ctr.encrypt(data, 'password', 128)) };

  setDomain(data){ this.setCookie("w_dm", data == ""? "": Aes.Ctr.encrypt(data, 'password', 128)) };

  setLocation(data){ this.setCookie("w_lclo",data) };

  setLocationDescription(data, ref) { this.setCookie("w_lclo_code", this.getLocationCode(ref._lov3.locdatas, data)) };

  setCounter(data) { this.setCookie("w_lcco", data) }

  setCounterDescription(data, ref) { this.setCookie("w_lcco_code", this.getCounterCode(ref._lov3.counterdatas, data)) };

  setBinCode(data, ref) { this.setCookie("w_lcbi_code", this.getCounterCode(ref._lov3.bin_datas, data)) };

  setBinSK(data) { this.setCookie("w_lcbi", data) };

  getCurrentDate() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  getCurrencySyskey(data, curcode) {
    var cursyskey = data.filter(function (d) { return d.t1 === curcode; })[0].syskey;
    return cursyskey;
  }

  getBaseCurr(data) {
    var basecur = data.filter(function (d) { return d.t3 === "/"; })[0].syskey;
    return basecur;
  }
  getBaseCurrData(data) {
    var basecurdata = data.filter(function (d) { return d.t3 === "/" && parseInt(d.n2) === 1; });
    return basecurdata;
  }

  getCurrencyCode(dataList, sk) {
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].syskey === sk) {
        return dataList[i].t1;
      }
    }
  }

  getCurrSyskey(data, curcode) {
    var cursyskey = data.filter(function (d) { return d.t1 === curcode; })[0].syskey;
    return cursyskey;
  }

  getUOMCode(dataList, sk) {
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].syskey === sk) {
        return dataList[i].t1;
      }
    }
  }

  getStockCurrencyCode(dataList, sk) {
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].CurrencySysKey === sk) {
        return dataList[i].CurrencyCurCode;
      }
    }
  }

  getCounterCode(dataList, sk) {
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].code === sk) {
        return dataList[i].t1;
      }
    }
  }

  getLocationCode(dataList, sk) {
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].code === sk) {
        return dataList[i].t1;
      }

    }
  }

  getPaymentType(dataList, sk) {
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].syskey === sk) {
        return dataList[i].n9;
      }
    }
  }

  deepCloneArray(oldArray: Object[]) {             //For Clone Array
    let renewArray: any = [];
    oldArray.forEach((item) => {
      renewArray.push(Object.assign({}, item));
    });
    return renewArray;
  }

  getIvs() {
    return CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
  }

  getUser(iv, salt, dm, user) {
    var plaintext = user.password;
    var aesUtil = new AesUtil(128, 1000);
    var _user = { "syskey": 0, "userId": "", "userName": "", "password": "", "orgId": "" };
    _user.userId = user.userId;
    _user.userName = user.userName;
    _user.password = aesUtil.encrypt(salt, iv, '!@#$29!@#$Gk**&*', plaintext);
    return _user;
  }

  pairKeyValue(data:any){
    let datas = [];
    for (let key in data) {
      datas.push({ key: key, value: data[key] });
    }
    return datas;
  }

  passwordChanged(password) {
    let obj = {"flag":false,"ret":""};
    var strongRegex = new RegExp("^(?=.{6,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    var mediumRegex = new RegExp("^(?=.{5,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    var enoughRegex = new RegExp("(?=.{4,}).*", "g");
    
    if (false == enoughRegex.test(password)) {
      obj.ret = '<span style="font-weight:bold">More Characters</span>';
      obj.flag = true;
    } else if (strongRegex.test(password)) {
      obj.ret = '<span style="font-weight:bold;color:green">Strong!</span>';      
    } else if (mediumRegex.test(password)) {
      obj.ret = '<span style="font-weight:bold;color:orange">Medium!</span>';
    } else {
      obj.ret = '<span style="font-weight:bold;color:red">Weak!</span>';
      obj.flag = true;
    } 
    return obj;
  } 
}
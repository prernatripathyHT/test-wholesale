var formCalender = {
  userPattern: 'YYYY-MM-DD',
  currDateObj: void 0,
  currMonth: void 0,
  currYear: void 0,
  currDate: void 0,
  currMonthEnd: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  monthName: void 0,
  days: void 0,
  displayPanel: void 0,
  isHideToday: void 0,
  calDefColor: '#515CCB',
  weekdays: {
       1: 'Sunday',
       2: 'Monday',
       3: 'Tuesday',
       4: 'Wednesday',
       5: 'Thursday',
       6: 'Friday',
       7: 'Saturday'
  },
  months: {
       1: 'January',
       2: 'February',
       3: 'March',
       4: 'April',
       5: 'May',
       6: 'June',
       7: 'July',
       8: 'August',
       9: 'September',
       10: 'October',
       11: 'November',
       12: 'December'
  },
  init: function () {
       this.monthName = [{
            html: 'January',
            value: 0
       },
       {
            html: 'February',
            value: 1
       },
       {
            html: 'March',
            value: 2
       },
       {
            html: 'April',
            value: 3
       },
       {
            html: 'May',
            value: 4
       },
       {
            html: 'June',
            value: 5
       },
       {
            html: 'July',
            value: 6
       },
       {
            html: 'August',
            value: 7
       },
       {
            html: 'September',
            value: 8
       },
       {
            html: 'October',
            value: 9
       },
       {
            html: 'November',
            value: 10
       },
       {
            html: 'December',
            value: 11
       }],
            this.days = ['ssunday',
                 'smonday',
                 'stuesday',
                 'swednesday',
                 'sthursday',
                 'sfriday',
                 'ssaturday'],
            this.dayNamesShort = ['Sun',
                 'Mon',
                 'Tue',
                 'Wed',
                 'Thu',
                 'Fri',
                 'Sat'],
            this.daysBasedOnPrefernce = ['ssunday',
                 'smonday',
                 'stuesday',
                 'swednesday',
                 'sthursday',
                 'sfriday',
                 'ssaturday'];
       var e = this.daysBasedOnPrefernce[0]; this.daysBasedOnPrefernce.shift(1),
            this.daysBasedOnPrefernce.push(e); var t = this.dayNamesShort[0]; this.dayNamesShort.shift(1),
                 this.dayNamesShort.push(t),
                 this.currDateObj = new Date,
                 this.currMonth = this.currDateObj.getMonth(),
                 this.currYear = this.currDateObj.getFullYear(),
                 this.currYear < 1e3 && (this.currYear += 1900),
                 this.currDate = this.currDateObj.getDate()
  },
  getTitle: function () { return this.monthName[this.currMonth].html + ' ' + this.currYear },
  createCalendar: function (e) {
       for (var t = document.getElementsByClassName('tempCalDiv'),
            a = t.length,
            r = 0; r < a; r++) { var n = t[r].style; 'block' === n.display && (n.display = 'none') } this.calendarNode = e,
                 this.userPattern = this.calendarNode.placeholder; var s = this.calendarNode.value,
                      i = !1; if (s) {
                           var l = dateFormatConvert.validate(s,
                                this.userPattern); l && (this.currDate = l.getDate(),
                                     this.currMonth = l.getMonth(),
                                     this.currYear = l.getFullYear(),
                                     this.currYear < 1e3 && (this.currYear = Number(this.currYear) + 1900))
                      } else i = !0,
                           formCalender.init(); this.monthName || formCalender.init(),
                                this.createDatePicker(this.currDate,
                                     this.currMonth,
                                     this.currYear,
                                     i,
                                     !1)
  },
  createDatePicker: function (e,
       t,
       a,
       r,
       n) {
       1 === this.currMonth && (this.currMonthEnd[1] = this.currYear % 400 == 0 || this.currYear % 4 == 0 && this.currYear % 100 != 0 ? 29 : 28); var s = new Date(a,
            t,
            1),
            i = 6,
            l = this.daysBasedOnPrefernce.indexOf(this.days[s.getDay()]) + 1; i = 31 === this.currMonthEnd[t] && l >= 6 || 30 === this.currMonthEnd[t] && 7 === l ? 7 : 28 === this.currMonthEnd[t] && 1 === l ? 5 : 6; var d = this.getTitle(e,
                 a,
                 t),
                 o = this.dayNamesShort,
                 h = '<div id=\'calenDiv\'><i id=\'calArrow\' style=\'display:none;\' class=\'dIB SocialArrow\'></i><div><div>'; h += '<div class=\'txt-ctr\'><span class=\'calNav dIB vam yearNavLft\' onclick=\'formCalender.updateDatePicker(event,
       undefined,
            -1) \'><i class=\'arrow left mRMinus2\'></i><i class=\'arrow left\'></i></span><span class=\'calNav dLft dIB vam\' onClick=\'formCalender.updateDatePicker(event,
                 - 1) \' id=\'pm\'><i class=\'arrow left\'></i></span><span class=\'sCalMon\'>' + d + '</span><span class=\'calNav dRgt vam\' onClick =\'formCalender.updateDatePicker(event,
       1) \' id=\'nm\'><i class=\'arrow right\'></i></span><span class=\'calNav dIB vam yearNavRgt\' onclick=\'formCalender.updateDatePicker(event,
       undefined,
            1) \'><i class=\'arrow right\'></i><i class=\'arrow right mLMinus2\'></i></span></div>',
                 h += '<table  class=\'calDay\'  id =\'weekDays\' style=\'color:#868686; font-size:8px; margin-left:0\'><tr> <th>' + o[0] + '</th> <th>' + o[1] + '</th><th>' + o[2] + '</th><th>' + o[3] + '</th> <th>' + o[4] + '</th> <th>' + o[5] + '</th> <th>' + o[6] + '</th></tr></table>',
                 h += '</div>',
                 h += '<table id=\'calHeader\' class=\'calDay\' style=\'margin-left:0; margin-top:-5px;\' width=\'100%\' cellspacing=\'0\' cellpadding=\'0\' border=\'0\' >'; var c = '',
                      u = new Date,
                      y = a || u.getFullYear(),
                      v = e || u.getDate(),
                      g = void 0 === t ? u.getMonth() : t,
                      m = u.getMonth(),
                      p = u.getFullYear(); u.getDate(); m === t && a === p && (c = ' style=\'display:none\''); for (var f,
                           D,
                           M,
                           b = s.getDay(); 1 !== b;)s.setDate(s.getDate() - 1),
                                b = s.getDay(); for (var x = 1; x <= i; x++) {
                                     h += '<tr>'; for (var Y = 1; Y < 8; Y++) {
                                          f = s.getMonth(),
                                               D = s.getFullYear(),
                                               M = s.getDate(),
                                               D + '-' + (parseInt(f) + 1) + '-' + M; var F = 'cdate lt-gray'; if (M === v && D === y && f === g && (F = 'cdate lt-gray'),
                                                    f === g && (F = 'cdate'),
                                                    (r && M === v && m === g && p === y || !n && M === v && f === g && D === y) && (F = 'sel'),
                                                    n) {
                                               var k = dateFormatConvert.validate(this.calendarNode.value,
                                                    formCalender.userPattern); k && M === k.getDate() && f === k.getMonth() && D === k.getFullYear() && (F = 'sel')
                                          } h += '<td class=\'' + F + '\' onClick=\'formCalender.displaySelectedDate(\"' + M + ' ' + f + ' ' + D + '\")\'>' + M + '</td>',
                                               s.setDate(s.getDate() + 1)
                                     } h += '</tr>'
                                } h += '</table>',
                                     h += '<div>',
                                     this.isHideToday || (h += '<div id=\'calBtns\' class=\'pT15 pB15 fL\'><a' + c + ' class=\'cP fL\' href=\'javascript:;\' id=\'todayBtn\' onclick=\'formCalender.displaySelectedDate(\"today\")\'>Today</a>'),
                                     h += '</div>',
                                     h += '</div>',
                                     h += '</div></div>'; var C = document.getElementById('template' + this.calendarNode.getAttribute('tplid')); C.innerHTML = h,
                                          C.style.display = 'block'
  },
  displaySelectedDate: function (e,
       t) {
       if (!t) t = this.calendarNode; if ('today' === e) { var a = new Date; e = a.getDate() + ' ' + a.getMonth() + ' ' + a.getFullYear() } e = e.split(' '); var r = dateFormatConvert.convertFormat(new Date(e[2],
            e[1],
            e[0]),
            this.userPattern); t.value = r,
                 t.focus(),
                 t.placeholder = this.userPattern,
                 formCalender.closeDatePicker(),
                 t.addEventListener('keyup',
                      function (e) {
                           formCalender.calendarNode = this; var t = this.value,
                                a = dateFormatConvert.validate(t,
                                     formCalender.userPattern); if (a) {
                                          var r = {}; r.date = a.getDate(),
                                               r.month = a.getMonth(),
                                               r.year = a.getFullYear(),
                                               formCalender.updateDatePicker(e,
                                                    void 0,
                                                    void 0,
                                                    r)
                                     }
                      }),
                 t.blur()
  },
  closeDatePicker: function () { document.getElementById('template' + this.calendarNode.getAttribute('tplid')).style.display = 'none' },
  updateDatePicker: function (e,
       t,
       a,
       r) {
       var n = document.getElementById('template' + this.calendarNode.getAttribute('tplid')); r && (this.currDate = r.date,
            this.currMonth = r.month,
            this.currYear = r.year),
            void 0 !== t ? 1 === t ? 11 === this.currMonth ? (this.currMonth = 0,
                 this.currYear++) : this.currMonth++ : 0 === this.currMonth ? (this.currMonth = 11,
                      this.currYear--) : this.currMonth-- : void 0 !== a && (this.currYear = parseInt(this.currYear) + a),
            this.createDatePicker(this.currDate,
                 this.currMonth,
                 this.currYear,
                 !1,
                 !0),
            n.style.display = 'block'
  },
  stEv: function (e) {
       e || (e = window.event),
            e && (e.cancelBubble = !0,
                 e.stopPropagation && e.stopPropagation())
  }
}; window.onclick = function () {
  for (var e = document.getElementsByClassName('tempCalDiv'),
       t = e.length,
       a = 0; a < t; a++) {
       var r = e[a]; if (document.activeElement === document.querySelector('input[tplid=\'' + r.id.replace('template',
            '') + '\']')) return; var n = e[a].style; 'block' === n.display && (n.display = 'none')
  }
}; var dateFormatConvert = {
  shortMon: ['Jan',
       'Feb',
       'Mar',
       'Apr',
       'May',
       'Jun',
       'Jul',
       'Aug',
       'Sep',
       'Oct',
       'Nov',
       'Dec'],
  longMon: ['January',
       'February',
       'March',
       'April',
       'May',
       'June',
       'July',
       'August',
       'September',
       'October',
       'November',
       'December'],
  dayArr: [31,
       28,
       31,
       30,
       31,
       30,
       31,
       31,
       30,
       31,
       30,
       31],
  wod: 1,
  lm: 'userdate',
  _dateObj: void 0,
  lLimit: 80,
  formats: [
       {
            val: 'YYYY',
            type: 'year',
            regex: /\d{4}/,
            len: 4
       },
       {
            val: 'GGGG',
            type: 'year',
            regex: /\d{4}/,
            len: 4,
            isWEG: !0
       },
       {
            val: 'gggg',
            type: 'year',
            regex: /\d{4}/,
            len: 4,
            isWEG: !0
       },
       {
            val: 'YY',
            type: 'year',
            regex: /\d{2}/,
            len: 2
       },
       {
            val: 'GG',
            type: 'year',
            regex: /\d{2}/,
            len: 2,
            isWEG: !0
       },
       {
            val: 'gg',
            type: 'year',
            regex: /\d{2}/,
            len: 2,
            isWEG: !0
       },
       {
            val: 'MMMM',
            type: 'month',
            regex: /[A-z]{3,} /,
            long: !0,
            str: !0,
            array: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
       },
       { val: 'MMM', str: !0, type: 'month', regex: /[A-z]{3,}/, array: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
       { val: 'Mo', suff: !0, type: 'month', regex: /\d{1,2}(?=st|nd|rd|th)/, max: 12 },
       { val: 'MM', type: 'month', regex: /\d{2}/, len: 2, max: 12, alt: !0 }, { val: 'M', type: 'month', regex: /\d{1,2}/, max: 12 }, { val: 'DDDD', type: 'date', regex: /\d{3}/, len: 3, year: !0 },
       { val: 'DDDo', type: 'date', suff: !0, regex: /\d{1,3}(?=st|nd|rd|th)/, len: 3, year: !0, ignore: /\d{3}(?=st|nd|rd|th)/ },
       { val: 'DDD', type: 'date', regex: /\d{1,3}/, year: !0, ignore: /\d{3}/ },
       { val: 'Do', type: 'date', suff: !0, regex: /\d{1,2}(?=st|nd|rd|th)/ },
       { val: 'DD', type: 'date', regex: /\d{2}/, len: 2, alt: !0 }, { val: 'D', type: 'date', regex: /\d{1,2}/ },
       { val: 'dddd', type: 'longdate', regex: /[A-z]{3,}/, long: !0, str: !0, array: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
       { val: 'ddd', type: 'longdate', regex: /[A-z]{3}/, str: !0, array: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
       { val: 'dd', type: 'longdate', regex: /[A-z]{2}/, str: !0, array: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] },
       { val: 'do', type: 'longdate', regex: /\d{1}(?=st|nd|rd|th)/, suff: !0 },
       { val: 'd', type: 'longdate', regex: /\d{1}/ }
  ],
  parseFormat: function (e, t) { for (var a, r = this.formats, n = [], s = r.length, i = 0; i < s; i++) { var l = r[i]; if (!e.length) break; if (e.indexOf(l.val) > -1) { if (t && l.alt) { a = !0; continue } a && (l.val = r[i - 1].val, l = r[i - 1]), a = !1, n.push({ format: l, index: e.indexOf(l.val) }), e = e.replace(l.val, Math.pow(10, l.val.length - 1)), i-- } else; } return n.sort(function (e, t) { return e.index - t.index }) },
  convertFormat: function (e, t) { this._dateObj = e; var a = this._dateObj, r = this.parseFormat(t, !0), n = {}, s = { date: a.getDate(), month: a.getMonth(), year: a.getFullYear(), day: a.getDay() }; t = this.fmReplace(t.replace(/{{|}}/g, ''), r); for (var i = r.length, l = 0; l < i; l++) { var d = r[l].format; switch (d.type) { case 'date': t = t.replace(d.val + this.lm, this.crctLength(d.year ? this.totdate(s.month, this.isLeap(s.year), s.date) : s.date, d.len, d.suff)); break; case 'month': t = d.str ? t.replace(d.val + this.lm, d.array[s.month]) : t.replace(d.val + this.lm, this.crctLength(s.month + 1, d.len, d.suff)); break; case 'year': t = t.replace(d.val + this.lm, 2 === d.len ? this.crctLength(s.year % 100, 2) : 4 === (s.year + '').length ? s.year : this.crctLength(s.year, 4)), n.year = n.year || [], n.year.push(d); break; case 'day': case 'week': n.flag = !0, n[d.type] = n[d.type] || [], n[d.type].push(d); break; case 'longdate': t = d.str ? t.replace(d.val + this.lm, d.array[s.day]) : t.replace(d.val + this.lm, this.crctLength(s.day, null, d.suff)) } } return t.replace(/{{|}}/g, '') },
  fmReplace: function (e, t) { for (var a = 0, r = t.length, n = 0; n < r; n++)e = e.slice(0, t[n].index + a) + t[n].format.val + this.lm + e.slice(t[n].index + a + t[n].format.val.length), a += 8; return e },
  totdate: function (e, t, a) { for (var r = 0, n = 0; n < e; n++)r += this.dayArr[n], t && 1 === n && (r += 1); return r + (a || 0) },
  crctLength: function (e, t, a) { var r = ''; if (a && (r = this.nthconv(e)), t) { e = e.toString(); for (var n = 1; n < t; n++)e.length <= n && (e = '0' + e) } return e + r },
  nthconv: function (e) { if (e > 3 && e < 21) return 'th'; switch (e % 10) { case 1: return 'st'; case 2: return 'nd'; case 3: return 'rd'; default: return 'th' } },
  isLeap: function (e) { return 2 === (e += '').length && (e = this.getCorrectYear(parseInt(e))), (e = parseInt(e)) % 4 == 0 && e % 100 != 0 || e % 400 == 0 },
  getCorrectYear: function (e) { var t = e + ''; if (e = parseInt(e), 2 === t.length) { var a = (new Date).getFullYear(), r = parseInt(a / 100), n = a % 100, s = (n - this.lLimit + 100) % 100; e = n > s ? e < s ? r + 1 + '' + this.crctLength(e, 2) : r + '' + this.crctLength(e, 2) : e < s ? r + '' + this.crctLength(e, 2) : r - 1 + '' + this.crctLength(e, 2) } return e },
  valFormat: function (e, t) { for (var a = {}, r = new Date((new Date).getFullYear(), 0), n = this.parseFormat(t, !0), s = e, i = t = t.replace(/{{|}}/g, ''), l = n.length, d = 0; d < l; d++) { var o, h = n[d].format; switch (h.type) { case 'date': case 'year': case 'week': case 'day': h.regex.test(e) ? (o = 'year' === h.type ? e.match(h.regex)[h.match || 0] : parseInt(e.match(h.regex)[h.match || 0]), a[h.type] = o, e = this.replaceVal(e, h.regex, h.suff), s = this.replaceVal(s, h.regex, h.suff, h.val), h.year && (a.date = getDay(a.date).day)) : a.year && a.week ? (a[h.type] = this.wod, t = t.replace(h.val, ''), i = i.replace(h.val, '')) : a[h.type] = 'Invalid', /date/i.test(h.type) && 0 === a[h.type] && (a[h.type] = 'Invalid'); break; case 'month': h.regex.test(e) ? (o = this.getMonth(e.match(h.regex)[0], h.suff, h.str, h.long), a.month = o.val, e = this.replaceVal(e, o.mon || h.regex, h.suff), s = this.replaceVal(s, o.mon || h.regex, h.suff, h.val)) : a.month = 'Invalid', a.month < 0 && (a.month = 'Invalid'); break; case 'longdate': h.regex.test(e) && (o = h.str ? this.findVal(h.array, e.match(h.regex)[0]) : parseInt(e.match(h.regex)[0]), a.longdate = this.isDef(o.index) ? o.index : o, e = this.replaceVal(e, o.mon || o, h.suff), s = this.replaceVal(s, o.mon || o, h.suff, h.val)) }t = t.replace(h.valForm || h.val, '') } if (this.isDef(a.longdate) && a.day && a.day !== a.longdate ? r.setFullYear('Invalid') : this.isDef(a.year) && r.setFullYear(this.getCorrectYear(a.year)), this.isDef(a.month) && r.setMonth(a.month), this.isDef(a.date) && r.setDate(a.date <= this.dayArr[r.getMonth()] + (1 === r.getMonth() && this.isLeap(r.getFullYear()) ? 1 : 0) ? a.date : 'Invalid'), this._isCorrectFormat = e.length === t.length && i === s && this.validate(r)) return r },
  validate: function (e, t) { var a = e.constructor; if (a === Date) return this._dateObj = e, 'Invalid Date' !== e.toString(); if (a === String && t) { var r = this.valFormat(e, t); return r && this._isCorrectFormat && (this._format = t), r } }, replaceVal: function (e, t, a, r) { return e = e.replace(t, r || ''), a && (e = e.replace(/st|nd|rd|th/, '')), e },
  getMonth: function (e, t, a, r) { var n; if (a) { var s = this.findVal(r ? this.longMon : this.shortMon, e); n = s.mon, e = s.index, (!n || e > 11) && (e = 'Invalid') } else (e = parseInt(e) - 1) > 11 && (e = 'Invalid'); return { val: e, mon: n } }, findVal: function (e, t) { var a, r, n = e.length; for (r = 0; r < n; r++)if (new RegExp(e[r]).test(t)) { a = e[r]; break } return { mon: a, index: r } },
  isDef: function (e) { return void 0 !== e }
};
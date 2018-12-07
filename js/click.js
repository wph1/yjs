//当前日期及前推7天
function getBeforeDate(n) {
    var n =n;
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth();
    var day = d.getDate();
    if(day <= n){
        if (mon > 1){
            mon = mon - 1;
        }else{
            year = year - 1;
            mon = 12;
        }
    }
    d.setDate(d.getDate() - n + 1);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    s = year + "/" +(mon < 10 ? ('0' + mon) : mon) + "/" +(day < 10 ? ('0' + day) : day);
    return s;
}
var arrDate = [];
for (var i = 7; i > 0; i--){
    arrDate.push(getBeforeDate(i));
}

//当前周及前推3周
function getBeforeWeek(n) {
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var date = d.getDate();
    var day = d.getDay();

    if (day != 0){
        n = n + (day - 1);
    }else {
        n = n + day;
    }
    if (day){
        if (mon > 1){
            mon = mon;
        }else {
            year = year - 1;
            month =12;
        }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    s = year + "/" +(mon < 10 ? ('0' + mon) : mon) + "/" +(day < 10 ? ('0' + day) : day);
    return s;
}
var nowWeek = getBeforeWeek(0) + '-' + getBeforeDate(1);
var firstWeek = getBeforeWeek(7) + '-' + getBeforeWeek(1);
var secondWeek = getBeforeWeek(14) + '-' + getBeforeWeek(8);
var thirdWeek = getBeforeWeek(21) + '-' + getBeforeWeek(15);
var arrWeek = [thirdWeek, secondWeek, firstWeek, nowWeek];
//当前月及前推3个月
function getBeforeMon(n) {
    var n =n;
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth();
    var day = d.getDate();
    d.setDate(d.getDate());
    year = d.getFullYear();
    mon = d.getMonth() + 2 - n;
    day = d.getDate();
    s = year + "/" +(mon < 10 ? ('0' + mon) : mon);
    return s;
}
var arrMon = [];
for (var i = 4; i > 0; i--){
    arrMon.push(getBeforeMon(i));
}

$(function () {
    $('.time>ul>li').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        var time = $(this).text();
        if(time == '日'){
            $('#time-line1').show();
            $('#time-line2').hide().find('ul li').remove();
            $('#time-line3').hide().find('ul li').remove();
            $('#time-line4').hide();
            dataLine(arrDate);
        }else if(time == '周'){
            $('#time-line1').hide().find('ul li').remove();
            $('#time-line2').show();
            $('#time-line3').hide().find('ul li').remove();
            $('#time-line4').hide();
            dataLine(arrWeek);
        }else if(time == '月'){
            $('#time-line1').hide().find('ul li').remove();
            $('#time-line2').hide().find('ul li').remove();
            $('#time-line3').show();
            $('#time-line4').hide();
            dataLine(arrMon);
        }else{
        	 $('#time-line1').hide().find('ul li').remove();
             $('#time-line2').hide().find('ul li').remove();
             $('#time-line3').hide().find('ul li').remove();
             $('#time-line4').show();
        }
    });

    //时间轴
    function dataLine(Date) {
        var arr = Date;
        var html ='';
        var w = (100 / arr.length) + '%';
        if ($('.time>ul>li.on').text() == '日'){
            fun('#ystep-container-steps');
        }else if($('.time>ul>li.on').text() == '周'){
            fun('#ystep-container-steps1');
        }else{
            fun('#ystep-container-steps2');
        }
        function fun(cls) {
            var cls = cls;
            $.each(arr, function (i, item) {
                html = '<li class="ystep-step-undone">' + item + '</li>';
                $(cls).append(html);
            });
        }

        $('.ystep-step-undone').css('width', w);
        $('.ystep-step-undone:last-child').click();
    }
    dataLine(arrDate);
    
//  top10隐藏
    $('.top-hide img').click(function () {
        var $has = $('.top-hide>div').hasClass('top-10');
        if($has){
            $('.top-10').addClass('top-101').removeClass('top-10');
            $('.top-hide img').attr('style','transform:rotate(180deg)');
        }else{
            $('.top-101').addClass('top-10').removeClass('top-101');
            $('.top-hide img').attr('style','transform:rotate(0deg)');
        }

    });
    if($('.wrapper').hasClass('pos')){
    	var $pos = 'top-right';
    }else{
    	var $pos = 'bottom-right';
    }
//    nav隐藏
    $('.icon-7').click(function () {
        var $has1 = $('.nav-icon').hasClass('icon-hide');
        if($has1){
            $('.nav').addClass('nav-hide');
            $('.nav-icon').removeClass('icon-hide');
        }else{
        	$('.nav').removeClass('nav-hide');
            $('.nav-icon').addClass('icon-hide');
        }
    });
    if($('.wrapper').hasClass('pos')){
    	var $pos = 'top-right';
    }else{
    	var $pos = 'bottom-right';
    }
// 	表单提交
    var obj =[] ;
	var sdate = '1980-07-04';
	//  obj = [];//禁用日期可以从数据库查
    // 	自定义格式
	$.fn.datetimepicker.dates['zdy'] = {
		days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
		daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
		daysMin:  ["日", "一", "二", "三", "四", "五", "六"],
		months: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
		monthsShort: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
		today: "今天",
		format:"yyyy-mm-dd",
		titleFormat:"yyyy-mm-",
		weekStart:1,
		suffix: [],
		meridiem: ["上午", "下午"]
	};
	$('#startTime').datetimepicker({
  		language:  'zdy',
  		weekStart: 1,
	 	todayBtn:  1,
	  	autoclose: 1,
	  	startDate:sdate,
	  	minView:2,
	  	maxView:3,
	  	pickerPosition: $pos,
  		onRenderDay: function(date) {
    		var date1 = date.getFullYear()+'-'
      			+(date.getMonth()<9?'0'+(date.getMonth()+1):date.getMonth()+1)
      			+'-'
      			+(date.getDate()<10?'0'+(date.getDate()-1):date.getDate()-1);
		}
	}).on('changeDate', function(ev){
		$('#endTime').datetimepicker('remove');
        $('#endTime').val('');
        var sdate=$("#startTime").val();
        var edate;
        for(var o in obj){
			if(new Date(sdate)<=new Date(obj[o])){
	            var date = new Date(obj[o])
	            var ndate = +date+24*60*60*1000;
	            var leaveTime = new Date(ndate);
	            edate = leaveTime.getFullYear()+'-'+(leaveTime.getMonth()+1)+'-'+leaveTime.getDate();
	            break;
			}
		}
        $('#endTime').datetimepicker({
            language:  'zdy',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            startDate:sdate,
            endDate:edate,
            pickerPosition: $pos,
            minView:2,
            maxView:3
		}).on('changeDate', function(ev){
        });
	});
})




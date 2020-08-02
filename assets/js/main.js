$(document).ready(function () {
    /**
	 * 获取Bing壁纸
	 * 原先 YQL 已经无法提供服务了
	 * 改用 JsonBird：https://bird.ioliu.cn/
	 * 
	 */
	var url = 'https://bird.ioliu.cn/v1/?url=https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8';
	var imgUrls = JSON.parse(sessionStorage.getItem("imgUrls"));
	var index = sessionStorage.getItem("index");
	var $panel = $('#panel');
	if(imgUrls == null){
		imgUrls = new Array();
		index = 0;		
		$.get(url,function (result) {
			images = result.images;
			for (let i = 0; i < images.length; i++) {
				const item = images[i];
				imgUrls.push(item.url);
			}
			var imgUrl = imgUrls[index];
			var url = "https://www.bing.com"+imgUrl;
			$panel.css("background", "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('"+url+"') center center no-repeat #666");
			$panel.css("background-size", "cover");
			sessionStorage.setItem("imgUrls",JSON.stringify(imgUrls));
			sessionStorage.setItem("index",index);
			});
	}else{
		if(index == 7)
			index = 0;
		else
			index++;
		var imgUrl = imgUrls[index];
		var url = "https://www.bing.com"+imgUrl;
		$panel.css("background", "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url('"+url+"') center center no-repeat #666");
		$panel.css("background-size", "cover");
		sessionStorage.setItem("index",index);
	}
});

function tick() {
    var years,months,days,hours, minutes, seconds;
    var intYears,intMonths,intDays,intHours, intMinutes, intSeconds;
    var today;
    today = new Date(); //系统当前时间
    intYears = today.getFullYear(); //得到年份,getFullYear()比getYear()更普适
    intMonths = today.getMonth() + 1; //得到月份，要加1
    intDays = today.getDate(); //得到日期
    intHours = today.getHours(); //得到小时
    intMinutes = today.getMinutes(); //得到分钟
    intSeconds = today.getSeconds(); //得到秒钟
    years = intYears + "年";
    if(intMonths < 10 ){
    months = "0" + intMonths +"月";
    } else {
    months = intMonths +"月";
    }
    if(intDays < 10 ){
    days = "0" + intDays +"日";
    } else {
    days = intDays + "日";
    }
    if (intHours == 0) {
    hours = "00:";
    } else if (intHours < 10) {
    hours = "0" + intHours+"时";
    } else {
    hours = intHours + "时";
    }
    if (intMinutes < 10) {
    minutes = "0"+intMinutes+"分";
    } else {
    minutes = intMinutes+"分";
    }
    if (intSeconds < 10) {
    seconds = "0"+intSeconds+"秒";
    } else {
    seconds = intSeconds+"秒";
    }
    timeString = "今天是： "+years+months+days+"<br/>现在是： "+hours+minutes+seconds;
    Clock.innerHTML = timeString;
    window.setTimeout("tick();", 1000);
    }
    window.onload = tick;
jQuery(window).on('load', function() {
	"use strict";
    
    
    // HIDE PRELOADER
    $(".preloader").addClass("hide-preloader");   
    
    // SHOW/ANIMATE ANIMATION CONTAINER
    setTimeout(function(){

        $("#intro .animation-container").each(function() {

            var e = $(this);

            setTimeout(function(){

                e.addClass("run-animation");

            }, e.data("animation-delay") );

        });

    }, 700 );

    
});

window.onscroll = function(){
    
    let scrollNow = window.pageYOffset;
    let pageClientHeight = document.documentElement.clientHeight;

    
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    ) - pageClientHeight; // Full Window Height minus the viewport height
    
    let fullWindowHeightInPercentage = Math.round(
        (scrollNow / scrollHeight) * 100 
    );
    
    let percentage = document.getElementById('percentage');
    percentage.innerHTML = fullWindowHeightInPercentage + '%';
    percentage.style.width = fullWindowHeightInPercentage + '%';
    
    if (fullWindowHeightInPercentage == 0)  percentage.innerHTML = '⇊';
}
jQuery(document).ready(function($) {
	"use strict";
    
    
    // SMOOTH SCROLL FOR SAME PAGE LINKS
    $(document).on('click', 'a.smooth-scroll', function(event) {
        
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 80
        }, 500);
        
    });
    
    
    // SCROLL REVEAL SETUP
    window.sr = ScrollReveal();
    sr.reveal(".scroll-animated", { 
        duration: 600,
        delay: 0,
        origin: "left",
        rotate: { x: 0, y: 0, z: 0 },
        opacity: 0,
        distance: "20vh",
        viewFactor: 0.4,
        scale: 1,
    });
    
    
    // AJAX CONTACT FORM SUBMIT
    $("#contact-form").submit(function(e) {

        e.preventDefault();
        var postdata = $(this).serialize();

        $.ajax({

            type: "POST",
            url: "assets/php/contact.php",
            data: postdata,
            dataType: "json",
            success: function(json) {

                $("#contact-form input, #contact-form textarea").removeClass("error");

                setTimeout(function(){

                    if (json.nameMessage !== "") {

                        $("#contact-form-name").addClass("error");

                    }

                    if (json.emailMessage !== "") {

                        $("#contact-form-email").addClass("error");

                    }

                    if (json.messageMessage !== "") {

                        $("#contact-form-message").addClass("error");

                    }

                }, 10);

                if (json.nameMessage === "" && json.emailMessage === "" && json.messageMessage === "") {

                    $("#contact-form.error input, #contact-form.error textarea").removeClass("error");
                    $('#contact-form').addClass("success");
                    $('#contact-form textarea, #contact-form input').val("");
                    
                    setTimeout(function(){
                        
                        $('#contact-form').removeClass("success");
                        
                    },4000);

                }

            }

        });

    });

    
});
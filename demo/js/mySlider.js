/**
 * Created by zxf on 2017/3/7/0007-14:09.
 * update:2017/2/20-对mouseleave事件增加了清除计时器的代码，
 * 否则当页面首次加载时鼠标在轮播区域时，移出区域后会加速轮播
 * update:2017/5/26-修改了切换原点时的内部逻辑，增加了需要全屏滚动时的参数
 * 全屏滚动需要修改content的宽度
 */
/*
* @param {number} width 单个移动单元的宽度
* @param {number} numbers 单个移动单元的个数
* @param {number} minScreenWidth 屏幕需要的最小宽度如1000px,全屏滚动时需要设置，默认1000px
* */
/*
 * html
 * <div class="slider-wrap">
 *      <div class="slider-contain">
 *           <ul class="slider-content">
 *                   <li>内容</li>
 *               </ul>
 *          </div>
 *             <i class="prev"></i>
 <i class="next"></i>
 *     </div>*/
(function($) {
	$.fn.slider = function(options) {
		var contain = this;
		var content = contain.children("ul.slider-content");
		var points = contain.children("ul.slider-point").children("li");
		var timer = null;
		var num = 1;
		var curLeft;
		var settings = $.extend(true, {
			speed: 500,
			interTime: 3000,
			numbers: null,
			width:null,
			autoPlay: true,
			point: true,
			prev: false,
			next: false,
			fullScreen:false,
			minScreenWidth:1000
		}, options);
		if (!settings.numbers || !settings.width) {
			alert("请填写宽度和个数");
			return false;
		}
		content.css({
			"width":settings.width*(settings.numbers+2)+'px'
		})

		//设置全屏滚动时的配置
		//设置外层总宽度
		if(settings.fullScreen){
			$(window).resize(function(){
				settings.width=window.innerWidth<=settings.minScreenWidth?settings.minScreenWidth:window.innerWidth;
				content.css({//改变屏幕尺寸时需要调整总的slider宽度，和默认的偏移的left值
					"width":settings.width*(settings.numbers+2)+'px',
					"left":-settings.width*num+"px"
				})
				content.children('li').css("width",settings.width);
			})
		}
		function cloneNode() {
			var firstChild = content.children("li:first-child").clone();
			var lastChild = content.children("li:last-child").clone();
			lastChild.insertBefore(content.children("li:first-child"));
			content.append(firstChild)
		}
		cloneNode();
		function animate(dir) {
			content.stop(true, true).animate({
				"left": -(num - dir) * settings.width
			}, settings.speed, "swing", function() {
				dir > 0 ? num-- : num++;
				curLeft = parseFloat(content.css("left"));
				if (curLeft <= -settings.width * (settings.numbers + 1)) {
					content.css({
						"left": -settings.width
					});
					num = 1
				} else {
					if (curLeft >= 0) {
						content.css({
							"left": -settings.width * settings.numbers
						});
						num = settings.numbers
					}
				}
				if (settings.point) {
					points.eq(num - 1).addClass("point-hover").siblings("li").removeClass("point-hover")
				}
			})
		}
		function moveR() {
			animate(1)
		}
		function autoPlay() {
			timer = setInterval(moveL, 3000)
		}

		function changePoint() {
			points.eq(num - 1).addClass("point-hover").siblings("li").removeClass("point-hover")
		}
		function pointAction() {
			points.mouseenter(function() {
				var curIndex = $(this).index() + 1;
				if (curIndex > num) {
					content.stop(true, true).animate({
						"left": -(curIndex) * settings.width
					}, settings.speed, "swing", function() {
						console.log(num);
						num=curIndex;
						changePoint()
					})
				} else {
					if (curIndex < num) {
						content.stop(!0, !0).animate({
							"left": -(curIndex) * settings.width
						}, settings.speed, "swing", function() {
							num=curIndex;
							changePoint()
						})
					}
				}
			})
		}
		function moveL() {
			animate(-1)
		}
		contain.parent(".slider-wrap").on({
			"mouseenter": function() {
				clearInterval(timer)
			},
			"mouseleave": function() {
				clearInterval(timer);
				settings.autoPlay ? autoPlay() : null
			}
		});
		if (settings.prev && settings.next) {
			settings.next.on("click", function() {
				clearInterval(timer);
				moveL()
			});
			settings.prev.on("click", function() {
				clearInterval(timer);
				moveR()
			})
		}
		if (settings.point) {
			pointAction()
		}
		settings.autoPlay ? autoPlay() : null
	}
})(jQuery);
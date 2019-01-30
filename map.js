jQuery(function ($) {
	$('.city__goto').click(function (e) { // ловим клик по ссылке с классом go_to
		// очистка свойств, дабы при повторном клике мы получали тот же эффект анимации
		$(".city__location").css({
				"-webkit-animation": "",
				"animation": "",
				"animation-fill-mode": ""
		});
		
		var element = $(this).attr('href'); 
		var destination = $(element).position();
		if ($(destination).length != 0) {// если такая локация существует
			// переносимся к элементу, ставя его в центр экрана
			$("html,body").animate({ 
				scrollTop: destination.top - ($(window).height() / 2), 
				scrollLeft: destination.left - ($(window).width() / 2) 
			}, 300);

			// анимация подсвечивания
			$(element).css({
				"-webkit-animation": "flashing 4s ease-in-out 0.3s",
				"animation": "flashing 4s ease-in-out 0.3s",
				"animation-fill-mode": "both"
			});
			
		}
		return false; // выключаем стандартное действие
	});

	// СКРИПТ ДЛЯ ПЕРЕМЕЩЕНИЯ МЫШКОЙ
	var doc = $(document),
		ratioX = doc.width() / $(window).width(), //отношение окна к общей ширене блока, чтобы тянуть весь блок.
		ratioY = doc.height() / $(window).height(), //отношение окна к общей ширене блока, чтобы тянуть весь блок.
		mouseposX, mouseposY, to;
	doc.on('mousedown', 'body', dragstart);

	function dragstart(e) {
		e.preventDefault();
		mouseposX = e.screenX;
		mouseposY = e.screenY;
		doc.on('mousemove.drag', drag); //в неймспейсе drag, чтобы потом отключить безболезненно для остальных листенеров
		doc.one('mouseup', dragstop);
	}

	function drag(e) {
		clearTimeout(to);
		var delta = (e.screenX - mouseposX) * ratioX;
		var gamma = (e.screenY - mouseposY) * ratioY;
		to = setTimeout(function () { // таймаут чтобы события от мыши не перекрывали друг друга, 
			doc.scrollLeft(doc.scrollLeft() - delta);
			doc.scrollTop(doc.scrollTop() - gamma);
			mouseposX = e.screenX;
			mouseposY = e.screenY;
		}, 1);
	}

	function dragstop() {
		doc.off('mousemove.drag'); //отключаем свой mousemove.
	}

});
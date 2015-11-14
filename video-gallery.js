
(function(){
	"use strict";

	var clicked = {};

	function showModal() {
			var src = $(this).attr('src');
			
			var index = $(this).parent('li').attr('data-index');
			var description = $('li[data-index="'+index+'"] div[class="text"]').html();
			var videoUrl = $('li[data-index="'+index+'"] div[class="video"]').html();
			var video = '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="' + (videoUrl) + '"></iframe></div>';

			clicked.prevImg = parseInt(index) - parseInt(1);
			clicked.nextImg = parseInt(index) + parseInt(1);

			var html = '';
			html += video;
			html += '<div style="margin-top:8px;height:37px;clear:both;display:block;">';			
			html += '<button type="button" class="controls next btn btn-primary" href="' + (clicked.nextImg) + '">Next &raquo;</button>';
			html += '<button type="button" class="controls previous btn btn-primary" href="' + (clicked.nextImg) + '">&laquo; Previous</button>';
			html += '<div id="description" class="center">' + (description) + '</div>';
			html += '</div>';

			$('#videoModal').modal();
			$('#videoModal').on('shown.bs.modal', function(){
					$('#videoModal .modal-body').html(html);
					showHideControls();
			})
			$('#videoModal').on('hidden.bs.modal', function(){
					$('#videoModal .modal-body').html('');
			});
	}

	function nextPrevHandler() {
			var index = $(this).attr('href');
			var videoUrl = $('li[data-index="'+index+'"] div[class="video"]').html();
			$('#description').html($('li[data-index="'+index+'"] div').html());

			$('.modal-body iframe').attr('src', videoUrl);

			clicked.prevImg = parseInt(index) - 1;
			clicked.nextImg = parseInt(clicked.prevImg) + 2;

			if($(this).hasClass('previous')){
				$(this).attr('href', clicked.prevImg);
				$('button.next').attr('href', clicked.nextImg);
			}else{
				$(this).attr('href', clicked.nextImg);
				$('button.previous').attr('href', clicked.prevImg);
			}

		showHideControls();

		return false;
	}

	function showHideControls() {
		var total = ($('li').not('.clearfix').length);

		if(total === clicked.nextImg){
			$('button.next').hide();
		} else {
			$('button.next').show();
		}

		if(clicked.prevImg === -1) {
			$('button.previous').hide();
		} else {
			$('button.previous').show();
		}
	}

	$(document).ready(function() {
		$(this).on('click', 'button.controls', nextPrevHandler);
		$('li').not('.clearfix').each(function(i){
					$(this).attr('data-index',i);
					var img = $(this).find('img');
					img.on('click',showModal);
		});
	}) //end doc ready

})();

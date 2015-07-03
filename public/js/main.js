$( document ).ready(function(){
	$(".dropdown-button").dropdown();
	smoothScroll.init();
	$('.modal-trigger').leanModal();

	$(".border-b:last").css("border-bottom", "none");
});
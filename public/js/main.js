$( document ).ready(function(){

	$(".dropdown-button").dropdown();
	smoothScroll.init();
	$('.modal-trigger').leanModal();

	$(".border-b:last").css("border-bottom", "none");
	$('.tooltipped').tooltip({delay: 50});
	$('#redactor').redactor();

$(".text").each(function(i){
    var len = $(this).text().length;
    if(len>130)
    {
      $(this).text($(this).text().substr(0,125)+'...');
    }
  }); 
});
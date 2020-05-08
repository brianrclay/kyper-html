$(document).ready(function(){
  var instances = tippy(document.querySelectorAll('.action.run'), {
    content: 'Sign in to run this example with your development API key',
    allowHTML: true,
    animation: 'shift-away',
  });

  $('.login-submit').click(function () {
  $("#login").remove();
  $('.action.run').each(function () {
    $(this).addClass('logged-in');
  });

  for(var i = 0; i < instances.length; i++){
    instances[i].setProps({
      content: 'Run using your development API key'
    })
  }
});
})



// Run Code 

$('body').on('click', '.action.run.logged-in', function () {
  var trigger = $(this);
  var triggerIcon = $(this).find('svg');
  var triggerText = $(this).find('span');
  var request = $(this).parents('.code-editor').find('.request');
  var response = $(this).parents('.code-editor').find('.response');
  var overlay = $(this).parents('.code-editor').find('.running-overlay');
  var fileTitle = $(this).parents('.code-editor').find('.file-name').children('span');
  $(trigger).addClass('disabled');
  $(triggerText).text('Running');
  
  overlay.addClass('show');
  setTimeout(function(){
    $(trigger).removeClass('disabled');
    $(triggerText).text('Re-run');
    fileTitle.text('Response');
    overlay.removeClass('show');
    response.addClass('show');
    request.addClass('hide');
  },2000)
})


$('.with-children').click(function(){
  $(this).toggleClass('open');
})
$(function() {
  if ($('#loggedin').text() == 'false') {
    console.log($('#loggedin').text());
    $('#login').css('display', 'none');
    $('#compose').css('display', 'block');
  } else {
    console.log($('#loggedin').text());
    $('#login').css('display', 'block');
    $('#compose').css('display', 'none');
  }
});
var main = function() {
    $('#send_btn').click(function() {
        var name = $('#name_field').val();
        var message = $('#message_field').val();
        var data = {};
        data.name = name;
        data.message = message;

        $.ajax({
            url: "/board/add",
            method: "POST",
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: loadPosts
        }).done(clearForm)
    });
  
  $('#message_field').keyup(function() {
    var postLength = $(this).val().length;
    var charactersLeft = 140 - postLength;
    $('.counter').text(charactersLeft);
  
    if(charactersLeft < 0) {
      $('.btn').addClass('disabled'); 
    }
    else if(charactersLeft == 140) {
      $('.btn').addClass('disabled');
    }
    else {
      $('.btn').removeClass('disabled');
    }
  });
  
  $('.btn').addClass('disabled');
  loadPosts();
}

var clearForm = function() {
    $('#name_field').val('');
    $('#message_field').val('');
    $('.counter').text('140');
    $('.btn').addClass('disabled');
}

var loadPosts = function() {
    $.ajax({
        method: "GET",
        url: "/board",
        success: function(data){
            $("#posts").empty();
            $.each(data, function(index, item) {
                var listElement = $('<li>').text(item.name + ": " + item.message);
                $('<hr>').appendTo(listElement);
                $('<span class="badge">').text(item.likes).appendTo(listElement);
                listElement.prependTo($('#posts'));        
            });
        }
    });
}

$(document).ready(main);

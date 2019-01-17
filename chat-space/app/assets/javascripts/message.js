$(document).on('turbolinks:load', function(){
   function buildHTML(message){
    var image = message.image ? `<img src= "${message.image}" >` : ""
    var html = `<div class = "maincard">
                  <div class = "main__body--username">
                    ${message.user_name}
                  </div>
                  <div class = "main__body--commenttime">
                    ${message.time}
                  </div>
                  <div class = "main__body--comment">
                    <p class = "lower-message__content">
                     ${message.body}
                     ${image}
                    </p>
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData:false,
      contentType:false
    })
     .done(function(data){
      var html = buildHTML(data);
      $('#new_message')[0].reset();
      $('.main__body').append(html);
      $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight}, 'fast');
      $('.main__form--icon').prop('disabled' , false);
    })
     .fail(function(){
      alert('error!');
     })
  });
});

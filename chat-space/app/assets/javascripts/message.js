$(document).on('turbolinks:load', function(){
    function buildHTML(message){
        var image = message.image ? `<img src= "${message.image}" >` : ""
        var html = `<div class = "maincard" data-message-id="${message.id}">
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

    var interval = setInterval(function(){
        if(window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_id = $('.maincard:last').data('message-id') || 0;
            $.ajax({
                url: location.href,
                type: 'GET',
                data: {id: last_id},
                dataType: 'json'
            })
                .done(function(data){
                    data.forEach(function(message){
                    $('.main__body').append(buildHTML(message));
                    })
                    $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight}, 'fast');
                    })
                .fail(function(data){
                    console.log("検索失敗です");
                })
        } else {
          clearInterval(interval);
        }
    },5000);
});

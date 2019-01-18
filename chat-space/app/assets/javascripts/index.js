$(document).on('turbolinks:load' , function(){

  var search_list = $("#user-search-result");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(user){
    var html = `<div class='chat-group-user clearfix'>
                  <p class='chat-group-user__name'>${user}</p>
                </div>`
    search_list.append(html);
  }
  var member_list = $("#chat-group-users")

   function addUser(id,name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value= ${ id }>
                  <p class='chat-group-user__name'>${ name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    member_list.append(html);

  }
  $("#user-search-field").on("keyup",function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else{
        appendNoUser("一致するユーザーはいない");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗');
    })
  });

  $(document).on('click',".user-search-add",function(){
    var id = $(this).data("user-id");
    var name = $(this).data("user-name");
    addUser(id,name)
    });
  $(document).on('click',".user-search-remove",function(){
      $(this).parent().remove();
    });
    });





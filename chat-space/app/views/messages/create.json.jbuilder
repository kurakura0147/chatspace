json.user_name @message.user.name
json.time @message.created_at.strftime("%Y/%m/%d %H:%M")
json.body @message.body
json.image @message.image.url

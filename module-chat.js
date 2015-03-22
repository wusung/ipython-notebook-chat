
define(function (require) {
  require([
    '/nbextensions/module-chat/jquery.ui.chatbox.js',
  	'/nbextensions/module-chat/socket.io-1.2.0.js'
    ], function (
      chatbox, 
      io) {

    $("head").append($("<link rel='stylesheet' href='/nbextensions/module-chat/jquery.ui.chatbox.css' type='text/css' />"));	
    $('body').append($('<div id="chat_div"></div>'));

    var box = null;
    if(box) {
      box.chatbox("option", "boxManager").toggleBox();
    }
    else {
      box = $("#chat_div").chatbox({id:"chat_div", 
                                      user:{key : "value"},
                                      title : "Chat Room",
                                      messageSent : function(id, user, msg) {
                                        var socket = io.connect('//192.168.64.128:3000');
                                        socket.emit('chat message', msg);
                                      }});
    }
    
    var socket = io.connect('//192.168.64.128:3000');
    socket.on('chat message', function(msg){
      $("#chat_div").chatbox("option", "boxManager").addMsg('#Demo', msg);
    });

    $('.ui-chatbox-input-box').focus(function () {
      IPython.keyboard_manager.disable();
    }).blur(function () {
      IPython.keyboard_manager.enable();
    })
  })
});

define(function (require) {
  require([//'base/js/namespace',
    '/nbextensions/module-chat/jquery.ui.chatbox.js',
  	'/nbextensions/module-chat/socket.io-1.2.0.js'
    ], function (
      //IPython,
      chatbox, 
      io) {
    // "use strict";
    // var IPython = require('base/js/namespace');
    // var io = require('/nbextensions/module-chat/socket.io-1.2.0.js');
    // var chatbox = require('/nbextensions/module-chat/jquery.ui.chatbox.js');

    $("head").append($("<link rel='stylesheet' href='/nbextensions/module-chat/jquery.ui.chatbox.css' type='text/css' />"));	
    $('body').append($('<div id="chat_div"></div>'));

    //$(function () {
      var box = null;
      if(box) {
        box.chatbox("option", "boxManager").toggleBox();
      }
      else {
        box = $("#chat_div").chatbox({id:"chat_div", 
                                        user:{key : "value"},
                                        title : "Chat Room",
                                        messageSent : function(id, user, msg) {
                                          var socket = io();
                                          socket.emit('chat message', msg);
                                        }});
      }
      
      //var socket = io();
      var socket = io.connect('//192.168.64.128:3000');
      socket.on('chat message', function(msg){
        $("#chat_div").chatbox("option", "boxManager").addMsg('#Demo', msg);
      });

      $('.ui-chatbox-input-box').focus(function () {
        IPython.keyboard_manager.disable();
      }).blur(function () {
        IPython.keyboard_manager.enable();
      })
    //})
  })
});
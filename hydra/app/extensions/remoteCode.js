// set of functions for receiving code from remote app via node-ipc and executing locally


var ipc = require('node-ipc');

ipc.config.id = 'hydra-renderer';
ipc.config.retry= 1500;

ipc.connectToNet(
 'hydra',
 function(){
     ipc.of.hydra.on(
         'connect',
         function () {
           ipc.log('## connected to hydra ##'.rainbow, ipc.config.delay)
           ipc.of.hydra.emit(
                       'message',  //any event or message type your server listens for
                       'hello'
                   )

         }
       )

       ipc.of.hydra.on(
           'code',
           function(data){

             // setTimeout(() => {
             console.log("EVALING", data)
               editor.cm.setValue(data)
               editor.evalAll()
               ipc.log('got a message from world : '.debug, data);
           }
         )


     ipc.of.hydra.on(
         'disconnect',
         function(){
             ipc.log('disconnected from hydra'.notice);
         }
     );
     ipc.of.hydra.on(
         'message',  //any event or message type your server listens for
         function(data){
             ipc.log('got a message from world : '.debug, data);
         }
     );
 }
);

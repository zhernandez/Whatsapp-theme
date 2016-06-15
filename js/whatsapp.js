function addRow() {
    var div = document.createElement('div');
    div.className = 'mensaje-e';
    var nombre = document.getElementById('intro');
    div.innerHTML = nombre.value;
    nombre.innerHTML = "";
    document.getElementById('content').appendChild(div);
}

$(document).ready(function(){
    $(".amigo").click(function(){
      console.log("holi");
      $(".op-j").empty();
    });

    $("#sendButton").click(function(){
       var msg = $("#intro").val();
       console.log(msg);
       var divHead = '';
       var divTail = '<span class="hora">11:14</span></h6></div>';
       $('<div class="mensaje-e"><h6>'+msg+'<span class="hora">11:14</span></h6></div>').appendTo(".op-j");
       $("#intro").val('');
    });
});

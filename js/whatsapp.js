function Contact(name, image, id) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.log = [];
    this.last;
}

function bootstrap(callback) {
    $.ajax({
        url: 'https://randomuser.me/api/?results=10',
        dataType: 'json',
        success: function(data) {
            var contacts = [];
            for (var i = 0; i < data.results.length; i++) {
                var person = data.results[i];
                var name = person.name.first + " " + person.name.last;
                var url = person.picture.thumbnail;
                var id = i;
                var con = new Contact(name, url, id);
                contacts.push(con);
            }
            callback(contacts);
        }
    });
}

function reloadMsg(result) {

    $(".amigo").click(function() {
        var $input = $(this).get(0).id;
        var contact = result[$input];
        $(".op-j").empty().attr('id', contact.id);
        $("#conversacion-cabeza").empty();
        $('<img src="' + contact.image + '" class="mini">' +
                '<div class="name lineal">' +
                '<h5 class="">' + contact.name + '</h5>' +
                '<div class="lineal iconos">' +
                '<p class="icon-attachment lineal"></p>' +
                '<p class="lineal icon-dots-three-vertical"></p></div>')
            .appendTo("#conversacion-cabeza");

        for (var i = 0; i < contact.log.length; i++) {
            var mess = contact.log[i];
            $('<div class="mensaje-e"><h6>' + mess.message + '<span class="hora">' + formatDate(mess.time) + '</span></h6></div>').appendTo(".op-j");
        }
    });

    $("#sendButton").click(function() {
        var msg = $("#intro").val();
        if (msg === "") {} else {
            var $contactId = $(".op-j").get(0).id;
            var contact = result[$contactId];
            contact.log.push({
                sender: "me",
                message: msg,
                time: $.now()
            });
            contact.last = {
                sender: "me",
                message: msg,
                time: $.now()
            };
            $("#intro").val('');
            $('<div class="mensaje-e"><h6>' + msg + '<span class="hora">' + formatDate($.now()) + '</span></h6></div>').appendTo(".op-j");
            loadContacts(result);
        }
    });
}

function formatDate(millisSinceEpoch) {
    var secondsSinceEpoch = (millisSinceEpoch / 1000) | 0;
    var secondsInDay = ((secondsSinceEpoch % 86400) + 86400) % 86400;
    var seconds = secondsInDay % 60;
    var minutes = ((secondsInDay / 60) | 0) % 60;
    var hours = (secondsInDay / 3600) | 0;
    return hours + (minutes < 10 ? ":0" : ":") +
        minutes + (seconds < 10 ? ":0" : ":") +
        seconds;
}

function loadContacts(contacts) {
    $(".contactos").empty();
    for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        if (contact.last === undefined) {
            $('<div class="amigo" id ="' + contact.id + '">' +
                '<img src="' + contact.image + '" class="burbuja">' +
                '<div class="lineal name">' +
                '<h5>' + contact.name + '</h5>' +
                //  '<h6>' + contact.last.msg + '<span class="hora">' + contact.last.time + '</span></h6>' +
                '</div></div>').appendTo(".contactos");
        } else {
            $('<div class="amigo" id ="' + contact.id + '">' +
                '<img src="' + contact.image + '" class="burbuja">' +
                '<div class="lineal name">' +
                '<h5>' + contact.name + '</h5>' +
                '<h6>' + contact.last.message + '<span class="hora">' + formatDate(contact.last.time) + '</span></h6>' +
                '</div></div>').appendTo(".contactos");
        }
    }
}

$(document).ready(function() {

    bootstrap(function appendContacts(result) {
        loadContacts(result);
        reloadMsg(result);
    });
});

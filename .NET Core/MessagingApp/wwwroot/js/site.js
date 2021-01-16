// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Pravljenje objekta konekcije za slanje poruka serveru i za primanje notifikacija
var connection = new signalR.HubConnectionBuilder ( ).withUrl ( "/update" ).build ( );

function handleError ( error ) {
    alert ( error );
}

connection.start ( ).then (
    function ( ) {
        var conversationId = $("#conversationId").val ( );
        connection.invoke ( "AddToGroup", "" + conversationId )
            .catch ( handleError )
    }
).catch ( handleError );

function updateTimer ( ){
    var string = $("#timer").text ( );

    var array = string.split (":");

    var hours = parseInt(array[0]);
    var minutes = parseInt(array[1]);
    var seconds = parseInt(array[2]);

    var timeInSeconds = hours * 3600 + minutes * 60 + seconds + 1;

    seconds = timeInSeconds % 60 ;
    minutes = Math.floor ( timeInSeconds / 60 ) % 60; 
    hours = Math.floor ( timeInSeconds / 3600 );
    
    if( seconds < 10){
        seconds = "0" + seconds;
    }

    if( minutes < 10){
        minutes = "0" + minutes;
    }

    if( hours < 10){
        hours = "0" + hours;
    }

    $("#timer").text ( hours + ":" + minutes + ":" + seconds);
}

// JS funkcija koja zove update timer svakih 1000ms
setInterval ( updateTimer, 1000 );

function sendMessage ( ) {
    var conversationId = $("#conversationId").val ( );
    var content = $("#content").val ( );
    var verificationToken = $("input[name='__RequestVerificationToken']").val ( );

    $.ajax ( {
        type: "POST",
        url: "/Chat/SendMessage",
        data: {
            "conversationId" : conversationId,
            "content" : content,
            "__RequestVerificationToken" : verificationToken
        },
        success: function ( response ){
            connection.invoke ( "MessageSent", conversationId ).catch ( handleError ) 
        },
        error: function ( response ){
            alert ( response );
        }
    })
}

function changeActiveConversation ( newConversationId ){

    var oldConversationId = $("#conversationId").val ();

    $.ajax ({
        type: "GET",
        url: "Chat/ChangeActiveConversation?conversationId=" + newConversationId,
        dataType: "text",
        success: function ( response ){
            connection.invoke ("ChangeGroup", "" + oldConversationId, "" + newConversationId).then (
                function ( ){
                    $("#index").html (response)
                }
            ).catch ( handleError )
        },
        error: function ( response ) {
            alert ( response );
        }
    })
}

connection.on (
    "UpdateMessages",
    function ( ) {

        var conversationId = $("#conversationId").val ( );

        $.ajax ( {
            type: "GET",
            url: "/Chat/GetMessages?conversationId=" + conversationId,
            dataType: "text",
            success: function ( response ){
                $("#content").val ( "" );
                $("#messages").html (response) 
            },
            error: function ( response ){
                alert ( response );
            }
        })

    }
)

connection.on (
    "UpdatePosts",
    function ( ) {

        $.ajax ( {
            type: "GET",
            url: "/Comments/GetComments",
            dataType: "text",
            success: function ( response ){
                $("#content").val ( "" );
                $("#komentari").html (response) 
            },
            error: function ( response ){
                alert ( response );
            }
        })

    }
)




function postComment ( ) {
    var content = $("#content").val ( );
    var verificationToken = $("input[name='__RequestVerificationToken']").val ( );

    $.ajax ( {
        type: "POST",
        url: "/Comments/PostComment",
        data: {
            "content" : content,
            "__RequestVerificationToken" : verificationToken
        },
        success: function ( response ){
            connection.invoke ( "CommentPosted" ).catch ( handleError ) 
        },
        error: function ( response ){
            alert ( response );
        }
    })
}


function getComments( ) {

    $.ajax ( {
        type: "GET",
        url: "/Comments/GetComments",
        dataType: "text",
        success: function ( response ){
            $("#content").val ( "" );
            $("#komentari").html (response) 
        },
        error: function ( response ){
            alert ( response );
        }
    })

}
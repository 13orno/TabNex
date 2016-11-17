
$(document).ready(function () {


     

    $( "#btnSaveJob" ).click(function() {
       
            var newiframe = document.createElement('iframe');
    newiframe.src=chrome.extension.getURL('note.html');
    newiframe.setAttribute('frameborder','0');
    newiframe.id = 'note_wrap_diigo';
    var newdiv = document.createElement('div');
    newdiv.id="note_diigo";
    newdiv.className="diigo_note_app_maximize";
    newdiv.appendChild(newiframe);
    document.body.appendChild(newdiv);
    });

    
    // set up an event listener that triggers when chrome.extension.sendRequest is fired.
    chrome.extension.onRequest.addListener(
        function(request, sender, sendResponse) {
            // text selection is stored in request.selection
           //$("#textarea1").val(request.selection );
           //console.log($(document.activeElement).id);
           //$(document.activeElement).val(request.selection);

    });

    // inject javascript into DOM of selected window and tab.
    // injected code send a message (with selected text) back to the plugin using chrome.extension.sendRequest
    chrome.tabs.executeScript(null, {code: "chrome.extension.sendRequest({selection: window.getSelection().toString() });"});

    //$(document).ajaxStart(function () {
    //    $("#wait").css("display", "block");
    //});
    //$(document).ajaxComplete(function () {
    //    $("#wait").css("display", "none");
    //});
    var storage = chrome.storage.sync;
    var usertoken = 'token';

    loadData(usertoken);


    function loadData(usertoken) {
        
        storage.get(usertoken, function (test) {
            //console.log(test[usertoken] + ' get Value from store');
            if (test[usertoken] != null) {
                var user = test[usertoken];
                
                $("#loggedinUser").html(user.firstName);
                $("#divContent1").hide();
                $("#divContent2").show();
            }

        });

    }

    $("#signout").click(function () {
        
        storage.remove(usertoken, function () {
            $("#divContent1").show();
            $("#divContent2").hide();
            $("#messageBox").hide();
            
        });

    });

    $("#signIn").click(function () {

        username = $("#form-username").val();
        password = $("#form-password").val();

        if (username.length > 0 && password.length > 0) {
            //ajax call for user verification
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/login", 
                data: { username: username, password: password },
                success: function (data) {
                    if (data.status == 'ok') {
                        var user = {
                            userName: username,
                            firstName: data.userExtra.f_name,
                            token: data.message
                        }
                        saveUser(user);
                        loadData(usertoken);
                        
                        //$("#add_err").html("right username or password"); //"http://192.168.1.113:3000/login",
                        //window.location = "dashboard.php";
                    }
                    else {
                        $("#messageBox").show();
                        $('#messageBox').find('strong').text(data.message);
                        //$("#add_err").css('display', 'inline', 'important');
                        //$("#add_err").html("<img src='images/alert.png' />Wrong username or password");
                    }
                },
                beforeSend: function () {
                    //$("#add_err").css('display', 'inline', 'important');
                    //$("#add_err").html("<img src='images/ajax-loader.gif' /> Loading...")
                    console.log('authenticating...');
                }
            });
        } else {
            $("#messageBox").show();
            return false;

        }
       //after success save user to local storage
        
        function saveUser(user) {
            var items = {};
            items[usertoken] = user; // this should be user object
            items["token"] = user;
            storage.set(items, function () {
                //console.log("saved");
                $("#divContent1").hide();
                $("#divContent2").show();
            });
        }

        
        


        
        //return false;
        //$.ajax({
        //    dataType: 'json',
        //    url: "http://192.168.1.113:3000/api/users",
        //    data: "",
        //    dataType: "json",
        //    contentType: "application/json; charset=utf-8",
        //    async: true,
        //    success: OnSuccess,
        //    error: OnError

        //});

        //function OnSuccess(data) {
            
        //    $.each(data, function (i, obj) {
        //        //use obj.id and obj.name here, for example:
        //        $("#menu-content").append("<li><a href='#'><i class='fa fa-pencil-square-o fa-lg'></i>" + obj.FirstName + "</a></li>");
        //    });
                
            
        //    console.log(data)
        //}
        //function OnError(data) {

        //}

    });

});
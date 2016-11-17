/*function getword(e) {
      //console.log("Word " + info.selectionText + " was clicked.");
       console.log(e.selectionText + 'borno' );
      //chrome.tabs.create({  
      //  url: "http://www.google.com/search?q=" + info.selectionText,
      //});           
    }

    chrome.contextMenus.create({
      title: "Test", 
      contexts:["selection"], 
      onclick: getword,
    });
 
*/
chrome.contextMenus.removeAll();
chrome.contextMenus.create({
      title: "first",
      contexts: ["selection"],
      onclick: function(e) {
        var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
if (!location.ancestorOrigins.contains(extensionOrigin)) {
    var iframe = document.createElement('iframe');
    // Must be declared at web_accessible_resources in manifest.json
    iframe.src = chrome.runtime.getURL('normal_popup.html');

    // Some styles for a fancy sidebar
    iframe.style.cssText = 'position:fixed;top:0;left:0;display:block;' +
                           'width:300px;height:100%;z-index:1000;';
    document.body.appendChild(iframe);
}
        

      //alert(e.selectionText);
      }
});




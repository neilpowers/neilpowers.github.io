var webchatpluginurl = "https://protect-eu.mimecast.com/s/9OWYBsQz6qCV?domain=ice1.intelenetglobal.com";
var webchathuburl = "https://protect-eu.mimecast.com/s/lqwrBU9ANLco?domain=ice1.intelenetglobal.com";


window.onload = onPageLoad();

function onPageLoad() {

    loadCSS(webchatpluginurl + "/Scripts/jquery-ui.min.css", Message1);

    loadCSS(webchatpluginurl + "/font/css/font-awesome.min.css", Message2);

    loadCSS(webchatpluginurl + "/Scripts/outerclass.css", Message3);



    loadScript(webchatpluginurl + "/Scripts/jquery-1.8.2.min.js", jquery182min, Message);





};



function Message1(url) {

    loadCSS(url, Message1)

}

function Message2(url) {

    loadCSS(url, Message2)

}

function Message3(url) {
// debugger;
    loadCSS(url, Message3)

}

function Message(url,a,b) {

    loadScript(url, a,b)

}

function jquery182min() {

    loadScript(webchatpluginurl + "/Scripts/jquery-ui-1.8.24.min.js", json2min, Message);

}

function json2min() {

    loadScript(webchathuburl+"/scripts/json2.min.js", jquerysignalR220min, Message);
}

function jquerysignalR220min() {

    loadScript(webchathuburl + "/scripts/jquery.signalR-2.2.0.min.js", ChatConfig, Message);
}



function ChatConfig() {

    loadScript(webchatpluginurl+"/ChatConfig.js", hubs, Message);
}



function hubs() {

    loadScript(webchathuburl + "/signalr/hubs", ChatPlugin1, Message);

}

function ChatPlugin1() {

    loadScript(webchatpluginurl + "/Plugin/ChatPlugin.js", WebCrawlerJS, Message);
}

function WebCrawlerJS() {

    loadScript(webchatpluginurl + "/WebCrawlerJS.js", PluginCss, Message);
}
function PluginCss()
{
    loadCSS(webchatpluginurl + "/Plugin/plugin.css", Final);
}

function Final() {
    console.log('finished');
}

function loadScript(url, callback, erarer) {


    var script = document.createElement("script")
    script.type = "text/javascript";


    if (!script.addEventListener) {
//Old IE
        script.attachEvent("onload", function () {
// script has loaded in IE 7 and 8 as well.s
            callback();
        });
    }
    else {
        script.addEventListener("load", function () {
// Script has loaded.
            callback();
        });
    }

    script.src = url;
    document.getElementsByTagName("body")[0].appendChild(script);

}


function loadCSS(url, callback) {
//  <link href="PluginChart/Red/jquery-ui.min.css" rel="stylesheet" />


    var CSS = document.createElement("link")
    CSS.rel = "stylesheet";

    if (CSS.readyState) {  //IE
        CSS.onreadystatechange = function () {
            if (CSS.readyState == "loaded" ||
                CSS.readyState == "complete") {
                CSS.onreadystatechange = null;

            }
            else {
                callback(url);
            }
        };
    } else {  //Others
        CSS.onload = function () {

            CSS.onload = function () {

            };


        };

        CSS.onerror = function () {
            callback(url);
        }
    }

    CSS.href = url;
    document.getElementsByTagName("head")[0].appendChild(CSS);

}
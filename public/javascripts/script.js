"use strict";
$(document).ready(function() {
    var mq = window.matchMedia("(max-width: 1024px)");
    var dialog = document.querySelector('dialog');
    var dialogContent = document.getElementById('dialog-content');
    if(!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }

    $('.refnum').click(function(event) {
        event.stopPropagation();
        var $refbody = $(this.nextSibling);
        if(mq.matches) {
            dialogContent.innerHTML = $refbody.text();
            dialog.showModal();
        }
        else {
            $refbody.toggle();
        }
    });

    $('body').click(function(event) {
        if(mq.matches) {
            dialog.close();
            dialogContent.innerHTML = '';
        }
        else {
            $('.refbody').hide();
        }
    });
});

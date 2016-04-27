"use strict";
$(document).ready(function() {
    var feedPath = 'feed';
    var mq = window.matchMedia("(max-width: 1024px)");
    var dialog = document.querySelector('dialog');
    var dialogContent = document.getElementById('dialog-content');
    if(!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }

    $.get(feedPath).done(function(items) {
        var cardTemplate = Handlebars.templates['card.hbs'];
        items.forEach(function(item) {
            // let handlebars insert item into .section-main
            console.log('Adding feed item:', item);
            $('.section--main').append(cardTemplate(item));
        })
    })

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

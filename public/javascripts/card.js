!function(){var l=Handlebars.template,n=Handlebars.templates=Handlebars.templates||{};n["card.hbs"]=l({1:function(l,n,a,t,e){var s;return'        <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">\n            <i class="material-icons">more_vert</i>\n        </button>\n        <ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right">\n'+(null!=(s=a.each.call(null!=n?n:{},null!=n?n.items:n,{name:"each",hash:{},fn:l.program(2,e,0),inverse:l.noop,data:e}))?s:"")+"        </ul>\n"},2:function(l,n,a,t,e){return'                <li class="mdl-menu__item">'+l.escapeExpression(l.lambda(n,n))+"</li>\n"},compiler:[7,">= 4.0.0"],main:function(l,n,a,t,e){var s,i,u=null!=n?n:{},c=a.helperMissing,m="function",o=l.escapeExpression;return'<section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">\n    <div class="mdl-card mdl-cell mdl-cell--12-col">\n        <div class="mdl-card__supporting-text">\n            <h4>'+o((i=null!=(i=a.title||(null!=n?n.title:n))?i:c,typeof i===m?i.call(u,{name:"title",hash:{},data:e}):i))+'</h4>\n            <p class="question">'+(null!=(i=null!=(i=a.question||(null!=n?n.question:n))?i:c,s=typeof i===m?i.call(u,{name:"question",hash:{},data:e}):i)?s:"")+'</p>\n            <p class="attribute">'+o((i=null!=(i=a.attribute||(null!=n?n.attribute:n))?i:c,typeof i===m?i.call(u,{name:"attribute",hash:{},data:e}):i))+'</p>\n        </div>\n        <div class="mdl-card__actions">\n            <a href="'+o((i=null!=(i=a.link||(null!=n?n.link:n))?i:c,typeof i===m?i.call(u,{name:"link",hash:{},data:e}):i))+'" class="mdl-button mdl-color-text--primary">Read more</a>\n        </div>\n    </div>\n'+(null!=(s=a["if"].call(u,null!=n?n.menu:n,{name:"if",hash:{},fn:l.program(1,e,0),inverse:l.noop,data:e}))?s:"")+"</section>\n"},useData:!0})}();
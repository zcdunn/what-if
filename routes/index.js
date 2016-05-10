var express = require('express');
var readFeed = require('feed-read');
var cheerio = require('cheerio');
var router = express.Router();

var entries = [];
function modifyEntry(entry) {
    var $ = cheerio.load(entry.content);
    $('img').each(function() {
        var src = 'https://what-if.xkcd.com' + $(this).attr('src');
        $(this).attr('src', src);
    });
    $('.refnum').addClass('mdl-color-text--accent');
    var question = $('p#question').clone();
    question.find('.ref').remove();
    entry.content = $.html();
    entry.question = question.html();
    entry.attribute = $('p#attribute').text();
    entry.originalLink = entry.link;
    entry.link = entry.link.replace('http://what-if.xkcd.com', 'entry');
    entry.id = parseInt(entry.link.match(/\/(\d+)\//)[1]);
    return entry;
}

readFeed('http://what-if.xkcd.com/feed.atom', function(err, articles) {
    if(err) throw err;
    entries = articles.map(modifyEntry); // .reduce(indexById, {});
});

router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/feed', function(req, res, next) {
    // console.log("Returning " + Object.keys(entries).length + " entries");
    console.log("Returning " + entries.length + " entries");
    res.json(entries);
});

router.get('*', function(req, res, next) {
    console.log("Falling back to index");
    res.render('index.html');
})

module.exports = router;
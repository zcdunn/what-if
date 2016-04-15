var express = require('express');
var readFeed = require('feed-read');
var cheerio = require('cheerio');
var router = express.Router();

var entries = [];

/* GET home page. */
router.get('/', function(req, res, next) {
    readFeed('http://what-if.xkcd.com/feed.atom', function(err, articles) {
        if(err) throw err;
        entries = articles.map(function(curr) {
            var $ = cheerio.load(curr.content);
            $('img').each(function() {
                var src = 'https://what-if.xkcd.com' + $(this).attr('src');
                $(this).attr('src', src);
            });
            $('.refnum').addClass('mdl-color-text--accent');
            curr.content = $.html();
            curr.question = $('p#question').html();
            curr.attribute = $('p#attribute').text();
            curr.originalLink = curr.link;
            curr.link = curr.link.replace('http://what-if.xkcd.com', 'entry');
            curr.id = parseInt(curr.link.match(/\/(\d+)\//)[1]);
            return curr;
        });
        res.render('index', {
            title: 'What If?',
            entries: entries.map(function(curr) {
                // strip out content for index
                return {
                    title: curr.title,
                    published: curr.published,
                    link: curr.link,
                    originalLink: curr.originalLink,
                    snippet: curr.snippet,
                    question: curr.question,
                    attribute: curr.attribute,
                    id: curr.id
                };
            })
        });
    });
});

router.get('/entry/:id', function(req, res, next) {
    var id = parseInt(req.params.id);
    var entry;
    for(var i = 0, len = entries.length; i < len; i++) {
        var e = entries[i];
        if(e.id === id) {
            entry = e;
            break;
        }
    };
    if(entry) {
        res.render('partials/entry', {
            title: entry.title,
            entry: entry,
            backButton: true
        });
    }
    else {
        var err = new Error();
        err.status = 404;
        err.message = 'No article found for requested id';
        next(err);
    }
});

module.exports = router;

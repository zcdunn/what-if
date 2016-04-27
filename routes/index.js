var express = require('express');
var readFeed = require('feed-read');
var cheerio = require('cheerio');
var router = express.Router();

var entries = [];
function parseFeed(feedUrl) {
    readFeed(feedUrl, function(err, articles) {
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
    });
}

/* GET home page. */
router.get('/', function(req, res, next) {
    parseFeed('http://what-if.xkcd.com/feed.atom')
    res.render('index', { title: 'What If?' });
});

router.get('/feed', function(req, res, next) {
    res.json(entries);
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

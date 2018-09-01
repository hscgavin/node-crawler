const superagent = require('superagent');
const charset = require('superagent-charset')

charset(superagent);

const cheerio = require('cheerio');

const express = require('express');

const baseUrl = 'https://seek.com.au';

const app = express();
app.get('/index', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  const page = req.query.page || '1';

  superagent.get(`${baseUrl}/jobs?page=${page}`)
    .charset('utf-8')
    .end(function(err, sres) {
      const jobs = [];
      if (err) {
        console.log(`Error: ${err}`);
        res.json({ code: 400, msg: err, jobs: jobs})
      }
      const $ = cheerio.load(sres.text);
      $('[data-automation="searchResults"] article').each(function(idx, element){
        const el = $(element);
        const a = el.find('h1 a');
        jobs.push({
          title: a.text(),
          href: `${baseUrl}${a.attr('href')}`
        });
      });
      res.json({ code: 200, data: jobs });
    });
});

const server = app.listen(8081, function(){
  const host = server.address().address;
  const port = server.address().port;
  console.log(`visit http://${host}:${port}`);
});
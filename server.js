const es = require('@elastic/elasticsearch');
const nobelPrizeWinners = require('./data/nobelprize.json');
const client = new es.Client({
    node: 'http://localhost:9200'
})

const dataArray = [
    { "name": "sushant", "address": "12 J.L. Nehru road" },
    { "name": "prashant", "address": "P/161 VIP road, Sch VII M, Kol 700054" },
    { "name": "sanjeev", "address": "2D burdwan Road" },
    { "name": "Niraj", "address": "USA" }
]

const dataArray1 = nobelPrizeWinners.prizes;

const getIndexTemplate = (i) => `{"index":{"_id":${i + 1}}}`

function doIndex(arr, template) {
    const bulk = []
    arr.forEach((x, i) => {
        const j = JSON.parse(template(i));
        bulk.push(j);
        bulk.push(x);
    })
    return bulk;
}

// const bulk = doIndex(dataArray, getIndexTemplate);
const bulk = doIndex(dataArray1, getIndexTemplate);
client.bulk(
    {
        index: 'nobel',
        body: bulk
    }, function (err, resp) {
        if (err) {
            console.log(err);
        } else {
            console.log('success:', resp);
        }
    });


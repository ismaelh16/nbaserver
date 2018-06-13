var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var NBA = require("nba")

var server = express()

server.use(logger('dev'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

server.set('view engine', 'ejs')
server.set(express.static('views'))
server.set('views', __dirname+'/views')





server.get('/', function(request, response){
    // var curry = NBA.findPlayer('Stephen Curry')
    NBA.stats.leagueLeaders({})
    .then(res => {
        // console.log(res)
        var d = res.resultSet.rowSet
        var wantedData = []
        
        d.forEach(function(player){
            var info = {
                name: player[2],
                rebounds: player[17],
                assists: player[18],
                points: player[22]
            }
            wantedData.push(info)
        })
        function sort(arr) {
          return arr.concat().sort();
        }        
        var rebounds = wantedData.concat().sort( function(p1, p2){
            return Number(p2.rebounds) - Number(p1.rebounds)
        })
        
        var assists = wantedData.concat().sort( function(p1, p2){
            return Number(p2.assists) - Number(p1.assists)
        })
        
        response.render('home.ejs', {data:wantedData, rebounds: rebounds, assists: assists})
    })
    .catch(err => console.log(err))
    // console.log(curry)
    // response.render('home.ejs')
})

server.get('/about', function(request, response){
    response.render('about.ejs')
})


var port = 8080

server.listen(port, () => {
    console.log('Server running on port: '+port)
})
var request = require('request');
var d3 = require('d3');
var http = require('http');

var _ = require('underscore');
var fs= require('fs');
var qs = require('querystring');
;

var players = JSON.parse(fs.readFileSync('./nba/data/players.json', 'utf8'));
var body=[];
var url = 'http://stats.nba.com/stats/shotchartdetail?'

    var params={
      PlayerID:201939,
      PlayerPosition : "",
      Season : "2016-17",
      ContextMeasure : "FGA",
      DateFrom : "",
      DateTo : "",
      GameID : "",
      GameSegment : "",
      LastNGames : 0,
      LeagueID :"00",
      Location : "",
      Month : 0,
      OpponentTeamID : 0,
      Outcome : "",
      Period :0,
      Position : "",
      RookieYear : "",
      SeasonSegment : "",
      SeasonType : "Regular Season",
      TeamID : 0,
      VsConference : ""}
      
      
 Object.keys(params).forEach((keys)=>{
 	 
 	 var word= keys+'='+params[keys]+'&'
 	 
    url= url.concat(word);
 	
 
 
 });
 
 url=url.concat('VsDivision=')
 var data;
request(url,function(error,response,body){
  if(!error && response.statusCode==200){
  	data=JSON.parse(body);
  
  }
 
 })

//getting player json data fucntion
//
//
//
//
//
//
//
//
//
//
//
//


var playerStatsData=function(player,seas,resO){


var body=[];
var url = 'http://stats.nba.com/stats/shotchartdetail?'

    var params={
      PlayerID:201939,
      PlayerPosition : "",
      Season : "2016-17",
      ContextMeasure : "FGA",
      DateFrom : "",
      DateTo : "",
      GameID : "",
      GameSegment : "",
      LastNGames : 0,
      LeagueID :"00",
      Location : "",
      Month : 0,
      OpponentTeamID : 0,
      Outcome : "",
      Period :0,
      Position : "",
      RookieYear : "",
      SeasonSegment : "",
      SeasonType : "Regular Season",
      TeamID : 0,
      VsConference : ""}
      
      
 Object.keys(params).forEach((keys)=>{
 	 if(keys=='PlayerID'){
 	 var word= keys+'='+player+'&'
 	 url= url.concat(word);
 	 }else if(keys=='Season'){
 	 var word= keys+'='+seas+'&'
 	 
 	 url= url.concat(word);
 	 
 	 }else{
 	 
 	 
 	 
 	 var word= keys+'='+params[keys]+'&'
 	 
    url= url.concat(word);
 	
 	}
 
 });
 
 url=url.concat('VsDivision=')
 console.log(url)
 var data;
request({
		headers: {
'host': 'stats.nba.com',
"cache-control":"max-age=0",
'connection': 'keep-alive',
"accept-encoding" : "Accepflate, sdch",
'accept-language':'he-IL,he;q=0.8,en-US;q=0.6,en;q=0.4',
'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
},url:url},function(error,response,body){
  if(!error && response.statusCode==200){
  	data=JSON.parse(body);
  	
  	
  	resO.writeHeader(200,{'Content-Type': 'text'});
 			resO.write(JSON.stringify(data));
 			resO.end()
  
  }
 return data;
 })
















}













//servers


var server = http.createServer(function (req, res) {
	if(req.method=="GET" && req.url=='/data'){
	 res.writeHead(200,{'Content-Type': 'application/json'	})
	 res.write(JSON.stringify(data));
	 res.end();
	
	
	}else if(req.url=='/nba/data/players.json'){
	   res.writeHead(200,{'Content-Type': 'application/json'	})
	 res.write(JSON.stringify(players));
	 res.end();
	
	
	
	}else if(req.method=='POST' && req.url=='/shotChartData'){
	var body=[];
	var post='';
	req.on('data', function(data){
	
	body.push(data);
	
	
	}).on('end', function () {
	         body = Buffer.concat(body).toString();
	         
            // use post['blah'], etc.
            
            
            var playerData=JSON.parse(body);
                         
            
            playerStatsData(playerData.playerId.toString(),playerData.seasonId.toString(),res)
            
            
            
 //            resO.writeHeader(200,{'Content-Type': 'text'});
// 			resO.write(JSON.stringify(body));
// 			resO.end()
	
        });
    // BEGINNING OF NEW STUFF

    res.on('error', function(err) {
      console.error(err);
    })  
	
	
	
	
	
	
	}else if(req.url=='/curry'){
	
	playerStatsData('201939','2016-17',res)
	

	
	}else if(req.url=='/google1bb33fb6285d86ed.html'){
			fs.readFile('./google1bb33fb6285d86ed.html',function(err,html){
    	res.writeHead(200, {"Content-Type": "text/html"});
    	res.write(html);
     
    	res.end();
	
	})}else{
		
  
        fs.readFile('./App.html',function(err,html){
    	res.writeHead(200, {"Content-Type": "text/html"});
    	res.write(html);
     
    	res.end();

		})}	


}).listen(process.env.PORT || 8125,'0.0.0.0');





 

 
var url= new URL('http://stats.nba.com/stats/shotchartdetail')
   
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
      VsConference : "",
      VsDivision : ""};
      


Object.keys(params).forEach(key=> {url.searchParams.append(key,params[key])


});

d3.request(url.href).get(function(error,data){

       if(error){console.log("ERROR YOu idiot!!")
       }else{
       console.log('everything is fine');
       
       }


});
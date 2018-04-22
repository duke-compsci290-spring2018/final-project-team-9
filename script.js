/*//firebase stuff 
var config = {
    apiKey: "AIzaSyBdLoyJdNa1hug8fmJVq08YQjfOjdsoyC0",
    authDomain: "cs290-trello-f0978.firebaseapp.com",
    databaseURL: "https://cs290-trello-f0978.firebaseio.com",
    projectId: "cs290-trello-f0978",
    storageBucket: "cs290-trello-f0978.appspot.com",
    messagingSenderId: "759829722794"
  };
  firebase.initializeApp(config);

d3.select('input').firebase(
    'https://cs290-trello-f0978.firebaseio.com', 
    {
        createFunc : function(newData) {
           
            return this.append('text').text(newData.val());
        },
        updateFunc : function(changedData) {
            // data was changed, let's change the text
            this.text(changedData.val());
        }
    }
);*/
var data = [
        {
            "artist": "Lupe Fiasco",
            "likes": 3
        },
        {
            "artist": "Brittany Spears",
            "likes": 1
        },
        {
            "artist": "Louis the Child",
            "likes": 7
        }
    ];

/*  d3.json("data.json", function(error, data) {
        console.log("hello")
        if (error) {
            console.error('Error getting or parsing the data.');
            throw error;
        }*/
         // this is your data
createChart();
function createChart(){
        console.log(data);
        var chart = bubbleChart();
        //calling function chart on selection chart, which is bound to data 
        d3.select('#chart').datum(data).call(chart);
}


function addData(){
    var artist = d3.select("#artist").property("value");
    var likes = d3.select("#likes").property("value");
    var tempobj = new Object();
        tempobj["artist"] = artist;
        tempobj["likes"] = likes;
    console.log(tempobj);
    data.push(tempobj);
    createChart();
}

  function bubbleChart() {
    function chart(selection){
        var data = selection.datum();
        var div = selection,
            svg = div.selectAll('svg');

        var tooltip = selection
         .append("div")
         .style("position", "absolute")
         .style("visibility", "hidden")
         .style("color", "navy")
         .style("padding", "8px")
         .style("background-color", "peachpuff")
         .style("border-radius", "6px")
         .style("text-align", "center")
         .style("font-family", "sans-serif")
         .style("width", "400px")
         .text("");

        //gives each circle an x and y position
        //forcesim passes in an array of nodes, automatically assigned x/y
        var simulation = d3.forceSimulation(data)
          .velocityDecay(0.2)
        //-strength = repel 
         .force("charge", d3.forceManyBody().strength([-5]))
         //default is 0.001, i want alpha to stop sooner. sim stops when alpha<alphaMin
         .alphaMin(0.2)
         //300 and 200 are wiwdth/2 height/2
         //creates new force along x=0 and y=0
         //strength defaults to 0.1, which i found to be too strong: 0 minimizes how much it moves
         .force("x", d3.forceX().strength(0))
         .force("y", d3.forceY().strength(0))
         .on("tick", ticked);
        

        //var colorCircles = d3.scaleOrdinal(d3.schemeCategory10);

         var node = svg.selectAll("circle") //everything after will be bound to circle
         .data(data)
         .enter()
         .append("circle")
         //sets radius to likes*5
         .attr('r', function(d) { return (d.likes*5)})
         //fills with color 
         .style("fill", function() {
            var tempcolor = 240 + 120 * Math.random();
            console.log(tempcolor);
            return "hsl(" + tempcolor + ",100%,50%)";
            })
            //function(d) {return colorCircles(d.likes)})
         //centers at width = 600 height = 400 
         .attr('transform', 'translate(' + [600 / 2, 400 / 2] + ')')
         .on("mouseover", function(d){
             tooltip.html(d.artist +"<br>"+d.likes); 
             return tooltip.style("visibility", "visible");})
         .on("mousemove", function(){
           return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
         .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    

         function ticked(e) {
            node.attr("cx", function(d) { 
                console.log(d);
                return d.x*2; })
                .attr("cy", function(d) { return d.y*2; });
            // 'node' is each circle of the bubble chart
         }
         
         //TODO: replace with onlick
         //.on("mousemove", function(){
           //return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
         //.on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    //scales map integers to

    }

    return chart;
}
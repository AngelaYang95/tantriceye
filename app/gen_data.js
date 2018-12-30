const fs = require('fs')
const path = require('path')
const Papa = require('papaparse')

const config = 
{
  delimiter: ",",
  header: true,
  complete: function() {
    console.log("Parsing COMPLETE");
  },
}

let csv = fs.readFileSync(path.join(__dirname,'models/tracks.csv'), 'utf8')
let res = Papa.parse(csv, config)

var data = {
  categories: {},
  tracks: [],
}

res.data.forEach((track)=> {
  
  if(!track.title) return

  if(track.category) {
    track.category = track.category.toLowerCase()
    if(data.categories[track.category]) {
      data.categories[track.category].push(track.id)
    } else {
      data.categories[track.category] = []
    }
  }
  
  if(track.length) track.length = parseInt(track.length)
    
  if(track.url != "") {
    if(track.type == '0') {
      track.url = `../audio/solo/${track.url}.mp3`
    } else if (track.type == '1'){
      track.url = `../audio/duo/${track.url}.mp3`
    } else {
      track.url = `../audio/${track.url}.mp3`
    }
  }
  data.tracks.push(track)
})

fs.writeFileSync(path.join(__dirname,'js/data.js'), `var data = ${JSON.stringify(data)}`) 

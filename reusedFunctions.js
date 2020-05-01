const electron = require('electron')

// generate random keys from an array
// next step is to build a list of values from the key randomly

randomKeys = (array) => {
    keysArray = Object.keys(array)
    let x = keysArray.length
    let i = randomInt(0, x- 1)
    return keysArray[i]
  }

randomInt = (min,max) => Math.floor(Math.random()*(max-min)+min)

enemyRoll = () => randomInt(1,20)


parseTextFiles = (filename) => {
    let regexBuild = /\n/
    fs = require("fs")
    let readValue = fs.readFileSync(filename,'utf-8')
    return readValue.split(regexBuild)
  }
  
 genRandListVal = (input) => {
    var length = input.length;
    output =  randomInt(0,length-1);
    return input[output]
  }
  
subObjCount = (input) => {
    var i =0;
    for (var key in input) {
      if (input.hasOwnProperty(key)) ++i;
    }
    return i;
  }
    
  genRanSubObj = (input) => {
    var length = subObjCount(input);
    output =  randomInt(0,length-1);
    return input[output]
  }
  
criticalRoll = () =>randomInt(1,20)



module.exports = {randomKeys,randomInt, enemyRoll,parseTextFiles,genRandListVal,subObjCount,genRanSubObj,criticalRoll}

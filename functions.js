const electron = require('electron')
const path = require('path')



//var testText = document.getElementById('testthis')

let i = 0
let xp = 0


setInterval(baseTimer, 1000);

function statGen(){
  return  Math.floor((Math.random() * 18) + 3);
}

/*
 function buildObject(){
    function statGen(){
      return  Math.floor((Math.random() * 18) + 3);  
    }
    return {
    strength: statGen(),
    dexterity: statGen(),
    constitution: statGen(),
    intelligence: statGen(),
    wisdom: statGen(),
    charisma: statGen(),

  }
 }
*/




// starter variables for stats
strength = statGen()
dexterity = statGen()
constitution = statGen()
intelligence = statGen()
wisdom = statGen()
charisma = statGen()


document.getElementById('strRandom').innerHTML = strength
document.getElementById('dexRandom').innerHTML = dexterity
document.getElementById('conRandom').innerHTML = constitution
document.getElementById('intRandom').innerHTML = intelligence
document.getElementById('wisRandom').innerHTML = wisdom
document.getElementById('chrRandom').innerHTML = charisma


randomInt = (min,max) => Math.floor(Math.random()*(max-min+1)+min)


function baseTimer(){
  i += 1
  timePassed.innerHTML = 'Time Played:' + i
  

  const executeAction = function (value,m){
    return value % m == 0;
  }


  xp = executeAction(i,23) ? xp + 5 : xp = xp;
  xpValue.innerHTML = xp


  
    

  var battleLength =  randomInt(30,55);
  battleLengthId.innerHTML = battleLength



if (i % battleLength == 1){
  
  function generateEncounter (input){
    var length = input.length;
    output =  randomInt(0,length-1);
    return input[output]
  }

  enemy = generateEncounter(enemies)
  weapon = generateEncounter(weapons)

}


  if (i % 3 == 1){


    function enemyAttack(enemy,weapon){
      attack = enemy + " attacks you with it's " + weapon + "<hr>";
      return attack
    }

    actionModule.innerHTML += enemyAttack(enemy,weapon)
    
    scrollDown(actionModule)
  }


}

function parseTextFiles (filename){
  let regexBuild = /\n/
  fs = require("fs")
  let readValue = fs.readFileSync(filename,'utf-8')
  return readValue.split(regexBuild)
}

let enemies = parseTextFiles('./enemyNames')
let weapons = parseTextFiles('./weaponNames')

function change_image(form) {

  var img = form.options[form.selectedIndex].value;  
  document.getElementById("image1").src = img;
}



// only needed to make a new window for the button code
const BrowserWindow = electron.remote.BrowserWindow

//how you'd do a button that pops up a window:

/*
const button1 = document.getElementById('button1')
button1.addEventListener('click', function(event){
  const modalPath = path.join('file://',__dirname, 'somefile.html')
  let win = new BrowserWindow({ width: 400, height: 200})
  win.on('close', function() {win = null})
  win.loadURL(modalPath)
  win.show()
})

would add button into html this way: 

<button id="button1">test button1</button>

*/

//scroll

function scrollDown(elementID){
  
  
  elementID.parentElement.scrollTop = elementID.clientHeight
}


const electron = require('electron')
const path = require('path')

randomInt = (min,max) => Math.floor(Math.random()*(max-min)+min)

function generateChar(){

    let strVar = randomInt(3,18);
    let dexVar = randomInt(3,18);
    let conVar = randomInt(3,18);
    let intVar = randomInt(3,18);
    let wisVar = randomInt(3,18);
    let chrVar = randomInt(3,18);
    let armorVar = randomInt(10,15);
    let hpVar = (conVar / 2 - 5 > 0) ? Math.floor(8 + conVar / 2 - 5) : 8;

  return{

  strength : strVar,
  dexterity : dexVar,
  constitution : conVar,
  intelligence : intVar,
  wisdom : wisVar,
  charisma : chrVar,
  hp : hpVar,
  armor : armorVar,
  xp : 0,
  gold : 0

 }

}

document.getElementById('generateChar').onclick = genChar;


//use event arg to tell preventDefault not to refresh browser after innerHTML push
var character = {}

function genChar(event) {
  character = generateChar()
  document.getElementById('strValue').innerHTML = character.strength
  document.getElementById('dexValue').innerHTML = character.dexterity
  document.getElementById('conValue').innerHTML = character.constitution
  document.getElementById('intValue').innerHTML = character.intelligence
  document.getElementById('wisValue').innerHTML = character.wisdom
  document.getElementById('chrValue').innerHTML = character.charisma
  document.getElementById('hitPointsValue').innerHTML = character.hp
  document.getElementById('armorPointsValue').innerHTML = character.armor
  document.getElementById('xpValue').innerHTML = character.xp
  document.getElementById('playerGold').innerHTML = "Gold: " + character.gold
  event.preventDefault();
  setInterval(baseTimer, 1000);
  
 }

let questPause = false;

let globalTime = 0
let globalEnemyName = 'Fred'
let time = "00:00:00"

function baseTimer(){
  globalTime += 1
  time = new Date(globalTime * 1000).toISOString().substr(11, 8);
  document.getElementById('timePassed').innerHTML = "seconds passed: " + globalTime
  document.getElementById('timePlayed').innerHTML = "time played: " + time
  questGenerator()
  battleTimer()
}





function parseTextFiles (filename){
  let regexBuild = /\n/
  fs = require("fs")
  let readValue = fs.readFileSync(filename,'utf-8')
  return readValue.split(regexBuild)
}

let enemies = parseTextFiles('./enemyNames')
let weapons = parseTextFiles('./weaponNames')

function genRandListVal (input){
  var length = input.length;
  output =  randomInt(0,length-1);
  return input[output]
}

function generateEnemy(){
  globalEnemyName = genRandListVal(enemies)
  weapon = genRandListVal(weapons)
  enemyDmg = 1
  enemyHealth = 2
  charDamage = 1
  enemyXpVal = 4
  enemyGold = 3
}


function battleTimer(){
  if (globalEnemyName == 'Fred'){
    generateEnemy()
  }
  else{
    if (globalTime % 3 == 1 && enemyHealth > 0){
      questPause = true;
      enemyName = globalEnemyName
      function enemyAttack(enemyName,weapon){
        fightText = enemyName + " attacks you with it's " + weapon + " for " + enemyDmg + "<hr> You hit the " + enemyName + " with your weapon for " + charDamage + "<hr>";
        enemyHealth -= charDamage
        return fightText
      }
      actionModule.innerHTML += enemyAttack(enemyName,weapon)
      scrollDown(actionModule)
      

    }
    else if(globalTime % 3 == 0 && enemyHealth == 0){
      function enemyDeath(enemyName){
        fightText = "You killed the " + enemyName +"!!<br>You gained " + enemyXpVal + " xp and " + enemyGold + " gold<hr>";
        character.xp += enemyXpVal
        character.gold += enemyGold
        document.getElementById('xpValue').innerHTML = character.xp
        document.getElementById('playerGold').innerHTML = "Gold: " + character.gold
        return fightText
      }
      actionModule.innerHTML += enemyDeath(enemyName,weapon)
      scrollDown(actionModule)
      questPause = false;
      generateEnemy()
    }
  }
}

//change image

function change_image(form) {

  var img = form.options[form.selectedIndex].value;  
  document.getElementById("image1").src = img;
}

//scroll

  function scrollDown(elementID){
     elementID.parentElement.scrollTop = elementID.clientHeight
  }

//quest data

var questInfo = parseTextFiles('./basicQuest')

function questGenerator(){
  if (questPause == false){
    questPause = true;
    questText = genRandListVal(questInfo)
    document.getElementById('quest').innerHTML += questText + "<hr>"
    scrollDown(quest)
    }
  else{
      if (globalEnemyName == 'Fred'){
        document.getElementById('quest').innerHTML += "You are looking for the enemy <hr>"
        scrollDown(quest)
      }
      else{
      document.getElementById('quest').innerHTML += "You are fighting the " + globalEnemyName + "<hr>"
      scrollDown(quest)
      return
    }
  }
}



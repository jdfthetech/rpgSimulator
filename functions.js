const electron = require('electron')
const path = require('path')

//race	hp	armor	speed	xp
const enemyFile1Json = require('./level1Enemies.json')
Object.create(enemyFile1Json)

//name1	name2
const namesJson = require('./names.json')
Object.create(namesJson)

const weaponAdverbs = require('./weaponAdverbs')
Object.create(weaponAdverbs)

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
    let levelVar = 1

  return{

  strength : strVar,
  dexterity : dexVar,
  constitution : conVar,
  intelligence : intVar,
  wisdom : wisVar,
  charisma : chrVar,
  hp : hpVar,
  armor : armorVar,
  level : levelVar,
  xp : 0,
  gold : 0,
  damage: Math.ceil((levelVar **2) / 8)
  

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
  document.getElementById('charLevel').innerHTML = "Level: " + character.level
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

function genRandListVal (input){
  var length = input.length;
  output =  randomInt(0,length-1);
  return input[output]
}

function subObjCount(input){
  var i =0;
  for (var key in input) {
    if (input.hasOwnProperty(key)) ++i;
  }
  return i;
}


function genRanSubObj (input){
  var length = subObjCount(input);
  output =  randomInt(0,length-1);
  return input[output]
}


/* function createEnemy(race, name1, name2, dmg, health, armor, xp, gold, loot){
  this.race = enemyGenRace;
  this.name1 = enemyGenName1;
  this.name2 = enemyGenName2;
  this.dmg = enemyGenDamage;
  this.health = enemyGenHealth;
  this.armor = enemyGenArmor;
  this.gold = enemyGenGold;
  this.loot = enemyGenLoot;
}

var newEnemy = new createEnemy() */


// get weapon keys
var weaponArray = Object.keys(weaponAdverbs)


function testEnemy(){
  let x = Object.keys(enemyFile1Json.race).length
  let i = randomInt(0, x- 1)
  enemyGenRace = enemyFile1Json.race[i],
  enemyGenHealth = enemyFile1Json.hp[i],
  enemyGenArmor = enemyFile1Json.armor[i],
  enemyGenSpeed = enemyFile1Json.speed[i],  
  enemyGenDmgLow = enemyFile1Json.dmgLow[i],
  enemyGenDmgHigh = enemyFile1Json.dmgHigh[i],
  enemyGenDmg = enemyDamage(),
  enemyGenXpVal = enemyFile1Json.xp[i],
  enemyGenGold = enemyFile1Json.gold[i],
  enemyGenWeapon = enemyFile1Json.weapon[i]
}

function enemyDamage(){
 return randomInt(enemyGenDmgLow,enemyGenDmgHigh)
}

//name1	name2

function nameGenerator(){
  let x = Object.keys(namesJson.name1).length
  let i = randomInt(0, x- 1)
  let z = randomInt(0, x- 1)
  enName = namesJson.name1[i]
  enTitle = namesJson.name2[z]
}

// generate random keys from an array
// next step is to build a list of values from the key randomly

function randomKeys(array){
  keysArray = Object.keys(array)
  let x = keysArray.length
  let i = randomInt(0, x- 1)
  return keysArray[i]
}


function generateEnemy(){
  nameGenerator()
  testEnemy()
  globalEnemyName = enemyGenRace
  //globalEnemyName = genRandListVal(enemies)
  weapon = enemyGenWeapon
  weaponAction = genRanSubObj(weaponAdverbs[weapon])
  enemyDmg = enemyGenDmg
  enemyHealth = enemyGenHealth
  enemyXpVal = enemyGenXpVal
  enemyGold = enemyGenGold
  enemySpeed = enemyGenSpeed

}

function enemyRoll(){
  return randomInt(1,20)
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
        enemyDmg = enemyDamage()
        if (criticalRoll() == 20){
            if (enemyRoll > enemySpeed / 1.2){
          fightText = enemyName + " " + enName + enTitle + weaponAction + " " + weapon + " for " + enemyDmg + "<hr> You hit the " + enemyName + " with your weapon for " + character.damage * 2 + " Critical HIT!!<hr>";
          enemyHealth -= character.damage * 2
          return fightText
            }
            else{
                fightText = enemyName + " " + enName + enTitle + "misses with it's" + " " + weapon + ". " + "<hr> You hit the " + enemyName + " with your weapon for " + character.damage * 2 + " Critical HIT!!<hr>";
                enemyHealth -= character.damage * 2
                return fightText        
            }
        }
        else if (enemyRoll > enemySpeed / 15){ 
        fightText = enemyName + " " + enName + enTitle + weaponAction + " " + weapon + " for " + enemyDmg + "<hr> You hit the " + enemyName + " with your weapon for " + character.damage + "<hr>";
        enemyHealth -= character.damage
        return fightText
        }
        else{
            fightText = enemyName + " " + enName + enTitle + "misses with it's" + " " + weapon + ". " + "<hr> You hit the " + enemyName + " with your weapon for " + character.damage + "<hr>";
            enemyHealth -= character.damage
            return fightText        
        }
      }
      actionModule.innerHTML += enemyAttack(enemyName,weapon)
      scrollDown(actionModule)
      

    }
    else if(globalTime % 3 == 0 && enemyHealth == 0){
      function enemyDeath(enemyName){
        fightText = "You killed the " + enemyName +"!!<br>You gained " + enemyXpVal + " xp and " + enemyGold + " gold<hr>";
        character.xp += enemyXpVal
        levelUp()
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

var questActionPause = false

function questGenerator(){
  if (questPause == false){
    questPause = true;
    questText = genRandListVal(questInfo)
    document.getElementById('quest').innerHTML += questText + "<hr>"
    questActionPause = false
    scrollDown(quest)
    }
  else{
      if (questActionPause == false){
        questActionPause = true
        document.getElementById('quest').innerHTML += "You journey forth on your path of discovery . . .<hr>"
    }
  }
}

// character values

function criticalRoll(){
  return randomInt(1,20)
}


function levelUp(){
  if (character.xp >= ((character.level* 10) ** 2) - (character.xp / 3)){
    character.level += 1
    character.damage = Math.ceil((character.level **2) / 8)
    //character.armor
    document.getElementById('charLevel').innerHTML = "Level: " + character.level
    console.log(character.level)
  }
}

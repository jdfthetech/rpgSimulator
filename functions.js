const electron = require('electron')
const path = require('path')

//import enemyBuilder js
const enemyBuilder = require('./enemyBuilder.js')


// import quest object
const quests = require('./quests.js')

// import the base functions
const reusedFunctions = require('./reusedFunctions.js')

const weaponAdverbs = require('./weaponAdverbs')
Object.create(weaponAdverbs)

var fullPlayerHp = 1
// get weapon keys
var weaponArray = Object.keys(weaponAdverbs)

var character = {}

var questActionPause = false

let questPause = false;
let globalTime = 0
let globalEnemyName = 'Fred'
let time = "00:00:00"

generateChar = () => {

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

function genChar(event) {
  character = generateChar()
  fullPlayerHp = character.hp
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


baseTimer = () => {
  globalTime += 1
  time = new Date(globalTime * 1000).toISOString().substr(11, 8);
  document.getElementById('timePassed').innerHTML = "seconds passed: " + globalTime
  document.getElementById('timePlayed').innerHTML = "time played: " + time
  questGenerator()
  battleTimer()
}

hitCheck = (enemyRoll, playerDex, playerAC,enemyName) => {
  enemyRoll = randomInt(1,20)
  document.getElementById('actionModule').innerHTML += enemyName + " rolled " + enemyRoll + "<hr>"
  scrollDown(actionModule)
  var playerRollModifier = Math.floor((playerDex / 3) + (playerAC / 4)) 
  var playerRoll = randomInt(playerRollModifier,20)
  document.getElementById('actionModule').innerHTML += "Your save roll with modifiers was " + playerRoll + "<hr>"
  scrollDown(actionModule)  
  if (enemyRoll > playerRoll){
    return true
  }
  else{
    return false
  }
}


battleTimer = () => 
{try 
  {
  
    if (globalEnemyName == 'Fred' && character.hp > 0){
      generateEnemy()
      fullPlayerHp = character.hp
      
    }
    else{
      if (globalTime % 3 == 0 && enemyHealth > 0 && character.hp > fullPlayerHp * .125){
        questPause = true;
        enemyName = globalEnemyName
        enemyDice = enemyRoll()
        var enemyHit = hitCheck(enemyDice,character.dexterity,character.armor,enemyName)

        function enemyAttack(enemyName,weapon){
          enemyDmg = enemyDamage()
          
          
          if (criticalRoll() == 20){
              
              if (enemyHit == true ){
            fightText = enemyName + " " + enName + enTitle + weaponAction + " " + weapon + " for " + enemyDmg + "<hr> You hit the " + enemyName + " with your weapon for " + character.damage * 2 + " Critical HIT!!<hr>";
            character.hp -= enemyDmg
            document.getElementById('hitPointsValue').innerHTML = character.hp
            enemyHealth -= character.damage * 2
            return fightText
              }
              else{
                  fightText = enemyName + " " + enName + enTitle + "misses with it's" + " " + weapon + ". " + "<hr> You hit the " + enemyName + " with your weapon for " + character.damage * 2 + " Critical HIT!!<hr>";
                  enemyHealth -= character.damage * 2
                  return fightText        
              }
                
          }
  
          else if (enemyHit == true ){ 
          fightText = enemyName + " " + enName + enTitle + weaponAction + " " + weapon + " for " + enemyDmg + "<hr> You hit the " + enemyName + " with your weapon for " + character.damage + "<hr>";
          character.hp -= enemyDmg
          document.getElementById('hitPointsValue').innerHTML = character.hp
          enemyHealth -= character.damage
          return fightText
          }
          
          else if (enemyHit == false ){
              fightText = enemyName + " " + enName + enTitle + "misses with it's" + " " + weapon + ". " + "<hr> You hit the " + enemyName + " with your weapon for " + character.damage + "<hr>";
              enemyHealth -= character.damage
              return fightText        
          }
        }
        actionModule.innerHTML += enemyAttack(enemyName,weapon)
        scrollDown(actionModule)
        
  
      }
      else if(globalTime % 3 == 0 && enemyHealth == 0 && character.hp > fullPlayerHp * .125){
        function enemyDeath(enemyName){
          fightText = "You killed the " + enemyName +"!!<br>You gained " + enemyXpVal + " xp and " + enemyGold + " gold<hr>";
          character.xp += enemyXpVal
          levelUp()
          character.gold += enemyGold
          document.getElementById('xpValue').innerHTML = character.xp
          document.getElementById('playerGold').innerHTML = "Gold: " + character.gold
          // test quest completion
          questComplete = true
          document.getElementById('quest').innerHTML += questRewardText() + "<hr>"
          scrollDown(quest)  
          character.gold += xpAward
          document.getElementById('playerGold').innerHTML = "Gold: " + character.gold
          character.xp += goldAward
          document.getElementById('xpValue').innerHTML = character.xp
          questGenerator()
          return fightText
        }
        actionModule.innerHTML += enemyDeath(enemyName,weapon)
        scrollDown(actionModule)      
        generateEnemy()
      }
      else if(globalTime % 3 == 0 && enemyHealth > 0 && character.hp > 0 && character.hp <= fullPlayerHp * .125){
        function playerRetreat(enemyName){
          fightText = "You are wounded badly by the " + enemyName + " and run away!<hr>";
          questPause = false;
          return fightText
        }
        actionModule.innerHTML += playerRetreat(enemyName)
        scrollDown(actionModule)      
  
      }
      else if(globalTime % 3 == 0 && character.hp <= 0){
        function playerDeath(enemyName){
          fightText = "You were killed by the " + enemyName + "!<hr>" ;
          questPause = false;
          return fightText
        }
        actionModule.innerHTML += playerDeath(enemyName)
        scrollDown(actionModule)      
  
      }
    }
  } catch (err) {
    console.log(err)
  }
}

//change image

change_image = (form) => {

  var img = form.options[form.selectedIndex].value;  
  document.getElementById("image1").src = img;
}

//scroll
scrollDown = (elementID) => elementID.parentElement.scrollTop = elementID.clientHeight

var completionText = "potatos"
var goldAward = 1
var xpAward = 1
var npc = "larry"
var lostItem = "lemur"

buildQuestText = () => {
  npc = buildQuest().npc
  var request1 = buildQuest().request1
  lostItem = buildQuest().lostItem
  var request2 = buildQuest().request2
  var rewardInfo = buildQuest().rewardInfo
  xpAward = buildQuest().xpAward
  goldAward = buildQuest().goldAward
  completionText = buildQuest().completionText
  
  return npc + " " + request1 + " " + lostItem + ". " + request2 + "<br>" + rewardInfo + " " + xpAward + " xp and " + goldAward + " gold."

}

questRewardText = () =>{
  return npc + " " + completionText + " " + lostItem + ". " + "You receive " + xpAward + " xp and " + goldAward + " gold."
}

var questComplete = true

questGenerator = () => {
  if (questPause == false && questComplete == true){
    questComplete = false
    questPause = true;
    character.hp = fullPlayerHp
    document.getElementById('quest').innerHTML += "You have healed up and rested at the Inn <hr>"
    document.getElementById('hitPointsValue').innerHTML = character.hp
    questText = buildQuestText()
    document.getElementById('quest').innerHTML += questText + "<hr>"
    questActionPause = false
    scrollDown(quest)
    generateEnemy()
    }
    else if (questPause == false && questComplete == false && character.hp >= 1){
      questPause = true;
      character.hp = fullPlayerHp
      document.getElementById('quest').innerHTML += "You have healed up and rested at the Inn <hr>"
      document.getElementById('hitPointsValue').innerHTML = character.hp
      character.gold = Math.floor(character.gold - (character.gold * .25))
      document.getElementById('playerGold').innerHTML = "Gold: " + character.gold
      document.getElementById('hitPointsValue').innerHTML = character.hp
      scrollDown(quest)
      generateEnemy()
      } 
    else if (questPause == false && questComplete == false && character.hp <= 0){
      questPause = true;
      character.hp = fullPlayerHp
      document.getElementById('quest').innerHTML += "A wandering adventurer finds your body and drags it to the nearest town where a priest resurrects you for a small fee.<hr>"
      character.gold = Math.floor(character.gold - (character.gold * .25))
      document.getElementById('playerGold').innerHTML = "Gold: " + character.gold
      document.getElementById('hitPointsValue').innerHTML = character.hp
      scrollDown(quest)
      generateEnemy()
      }
  else if (questPause == false && questComplete == true){
    questPause = true;
    character.hp = fullPlayerHp
    document.getElementById('quest').innerHTML += "A wandering adventurer finds your body and drags it to the nearest town where a priest resurrects you for a small fee.<hr>"
    character.gold = Math.floor(character.gold - (character.gold * .25))
    document.getElementById('playerGold').innerHTML = "Gold: " + character.gold
    document.getElementById('hitPointsValue').innerHTML = character.hp
    questText = buildQuestText()
    document.getElementById('quest').innerHTML += questText + "<hr>"
    questActionPause = false
    scrollDown(quest)
    generateEnemy()
    }
  else{
      if (questActionPause == false){
        questActionPause = true
        document.getElementById('quest').innerHTML += "You journey forth on your path of discovery . . .<hr>"
        scrollDown(quest)
    }
  }
}

// character values

levelUp = () => {
  if (character.xp >= ((character.level* 10) ** 2) - (character.xp / 3)){
    character.level += 1
    character.damage = Math.ceil((character.level **2) / 8)
    //character.armor
    document.getElementById('charLevel').innerHTML = "Level: " + character.level
    console.log(character.level)
  }
}
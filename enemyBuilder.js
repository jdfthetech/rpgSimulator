const electron = require('electron')

const reusedFunctions = require('./reusedFunctions.js')

//race	hp	armor	speed	xp
const enemyFile1Json = require('./level1Enemies.json')
Object.create(enemyFile1Json)

//name1	name2
const namesJson = require('./names.json')
Object.create(namesJson)

enemyDamage = () => randomInt(enemyGenDmgLow,enemyGenDmgHigh)


//new
enemyCreator = () => {
    
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
    return {
        enemyGenRace,
        enemyGenHealth,
        enemyGenArmor,
        enemyGenSpeed,  
        enemyGenDmgLow,
        enemyGenDmgHigh,
        enemyGenDmg,
        enemyGenXpVal,
        enemyGenGold,
        enemyGenWeapon
    }
}

//name1	name2

nameGenerator = () => {
    let x = Object.keys(namesJson.name1).length
    let i = randomInt(0, x- 1)
    let z = randomInt(0, x- 1)
    enName = namesJson.name1[i]
    enTitle = namesJson.name2[z]
} 
  
generateEnemy = () => {
    nameGenerator()
    enemyCreator()
    globalEnemyName = enemyGenRace
    weapon = enemyGenWeapon
    weaponAction = genRanSubObj(weaponAdverbs[weapon])
    enemyDmg = enemyGenDmg
    enemyHealth = enemyGenHealth
    enemyXpVal = enemyGenXpVal
    enemyGold = enemyGenGold
    enemySpeed = enemyGenSpeed
} 
  
  

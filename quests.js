const electron = require('electron')

// import the base functions
const reusedFunctions = require('./reusedFunctions.js')

//race	hp	armor	speed	xp
const questsJson = require('./quests.json')
Object.create(questsJson)

buildQuest = () => {
    let x = Object.keys(questsJson.npc).length
    let i = randomInt(0, x- 1)
    npc = questsJson.npc[i],
    request1 = questsJson.request1[i],
    lostItem = questsJson.lostItem[i],
    request2 = questsJson.request2[i],
    rewardInfo = questsJson.rewardInfo[i],
    xpAward = questsJson.xpAward[i],
    goldAward = questsJson.goldAward[i],
    completionText = questsJson.completionText[i]
    return{
        npc,
        request1,
        lostItem,
        request2,
        rewardInfo,
        xpAward,
        goldAward,
        completionText
    }
}


module.exports = {buildQuest}
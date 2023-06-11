const accountValo = require('../Configs/Account.json');
const valorantAPI = require('unofficial-valorant-api');
const client = new valorantAPI();

async function getPlayerInfo(){
    try{
        const account = await client.getAccount({name: accountValo.gameName, tag: accountValo.tagLine});
        return account.data;
    } catch (error) {
        console.error('Error al obtener la información de la cuenta: ' , error);
    }
}

async function getPlayerRanked(){
    try{
        const account = await getPlayerInfo();
        const mmr = await client.getMMRByPUUID({version: "v2", region: account.region ,puuid: account.puuid});
        return mmr.data;
    } catch (error) {
        console.error('Error al obtener la información de la cuenta: ' , error);
    }
}



module.exports = {
    getPlayerInfo,
    getPlayerRanked
}
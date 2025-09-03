const mongoose = require('mongoose')



async function Connect_To_DB(URL) {
    await mongoose.connect(URL).then(res=> console.log('\t\tConnected to DB')).catch(err=> console.error(err))
}

module.exports = Connect_To_DB
const mongoose = require('mongoose')

mongoose.connect(process.env.DBLOCAL, { useNewUrlParser: true })
    .then(x => console.log(`conected to Mongo! database: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))

module.exports = mongoose




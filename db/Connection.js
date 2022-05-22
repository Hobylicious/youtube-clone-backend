if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose');

const mongoURI = 
        process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_MONGO_URI
        : `mongodb://localhost:27017/P3`

        mongoose.connect(`${mongoURI}`).then(conn => console.info(`Mongodb Connected on ${conn.connections[0].name}`))
        .catch(err => console.error(err))




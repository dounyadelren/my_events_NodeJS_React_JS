const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGO_URL,
        { useNewUrlParser: true },
        { useUnifiedTopology: true },
        { useCreateIndex: true },
        { useFindAndModify: true }
        
    )
    .then(() => console.log('Connect to MongoDB'))
    .catch(() => console.log('Failed to connect to MongoDB', err))
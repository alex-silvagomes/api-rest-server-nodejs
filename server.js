const express = require('express');
const formData = require('express-form-data');
const path = require('path');
const app = express();

//Import Routes Here
const data = require('./routes/api/data.js')
const info = require('./routes/api/info.js')
 
// Init Middleware
app.use(express.json({ extended: false }))
app.use(express.urlencoded({ extended: true }));
app.use(formData.parse())
  
//Define Routes
app.use('/api/data', data);
app.use('/api/info', info);

//Serve Static assets in production
//Configuration for Express to behave correctly in production environment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
};
 
const PORT = process.env.PORT || 5011;

app.listen(PORT, () => console.group(`  Server Started On ${PORT}`));
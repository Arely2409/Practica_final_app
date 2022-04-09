import mongoose from "mongoose";

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://ArelyAguilar:are1234@arely24.yw52a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUriParser: true
})

  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));

// not using it, just keep it for me

const mongodb = require('mongodb');

const { MongoClient, ObjectID } = mongodb;

const connectionURL = process.env.MONGODB_URL;
// const databaseName = 'task-manager';

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('unable to connect to database');
    }

    // const db = client.db(databaseName);

    /**************************************/
    // deleteOne & deleteMany

    // db.collection('users')
    //   .deleteMany({
    //     age: 28
    //   })
    //   .then(resut => {
    //     console.log(resut);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // db.collection('tasks')
    //   .deleteOne({
    //     description: 'task one'
    //   })
    //   .then(resut => {
    //     console.log(resut);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    /**************************************/
    // updateOne & updateMany

    // db.collection('users')
    //   .updateOne(
    //     {
    //       _id: ObjectID('5f0eae87727ce73d2fac3e13')
    //     },
    //     {
    //       $inc: {
    //         age: 1
    //       }
    //     }
    //   )
    //   .then(resut => {
    //     console.log(resut);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // db.collection('tasks')
    //   .updateMany(
    //     {
    //       completed: false
    //     },
    //     {
    //       $set: {
    //         completed: true
    //       }
    //     }
    //   )
    //   .then(resut => {
    //     console.log(resut);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    /**************************************/
    // fineOne & find

    // db.collection('users').findOne(
    //   { _id: new ObjectID('5f0ee5fa3d3ae25bc2fdd812') },
    //   (err, result) => {
    //     if (err) return console.log('unable to fetch');
    //     console.log(result);
    //   }
    // );

    // db.collection('users')
    //   .find({ age: 28 })
    //   .toArray((err, result) => {
    //     if (err) return console.log('unable to fetch');
    //     console.log(result);
    //   });

    // db.collection('tasks').findOne(
    //   { _id: ObjectID('5f0ee9c4316f5c5db06b2d79') },
    //   (err, result) => {
    //     if (err) return console.log('unable to fetch');
    //     console.log(result);
    //   }
    // );

    // db.collection('tasks')
    //   .find({ completed: false })
    //   .toArray((err, result) => {
    //     if (err) return console.log('unable to fetch');
    //     console.log(result);
    //   });

    /**************************************/
    // insertOne & insertMany

    // db.collection('users').insertOne(
    //   {
    //     name: 'vikram',
    //     age: 26
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log('unable to insert user');
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // db.collection('users').insertMany(
    //   [
    //     { name: 'jen', age: 28 },
    //     { name: 'gunther', age: 27 }
    //   ],
    //   (err, result) => {
    //     if (err) {
    //       return console.log('unable to insert users');
    //     }
    //     console.log(result.ops);
    //   }
    // );

    // db.collection('tasks').insertMany(
    //   [
    //     { description: 'task one', completed: true },
    //     { description: 'task two', completed: false },
    //     { description: 'task three', completed: false }
    //   ],
    //   (err, result) => {
    //     if (err) {
    //       return console.log('unable to insert tasks');
    //     }
    //     console.log(result.ops);
    //   }
    // );
  }
);

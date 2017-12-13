const express = require('express');
const jwt = require('jsonwebtoken');
// Hash password
const bcrypt = require('bcrypt');
// Check JWT
const checkJwt = require('express-jwt');

var ObjectID = require('mongodb').ObjectID;


function apiRouter(database) {
  const router = express.Router();

  // Check for JWT SECRET unless it's at authenticate path
  router.use(
    checkJwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/api/authenticate', '/api/register'] })
  );

  // Error, Request, Respond, Next Function
  router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({ error: err.message });
    }
  });


  /////////////////////////////////STAFF_SECTION/////////////////////////////////

  // Get staffs method
  router.get('/staffs', (req, res) => {

    const staffsCollection = database.collection('staffs');

    staffsCollection.find({}).toArray((err, docs) => {
      return res.json(docs)
    });

  });

  // Create staffs method
  router.post('/staffs', (req, res) => {
    const user = req.body;

    const staffsCollection = database.collection('staffs');

    staffsCollection.insertOne(user, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' })
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });
  });

  // Search for a specific staff method 
  router.get('/staffs/:id', function (req, res) {
    const staffsCollection = database.collection('staffs');
    staffsCollection.findOne(new ObjectID(req.params.id), function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  // Edit staff method
  router.put("/staffs/:id", function (req, res) {
    var updateDoc = req.body;
    console.log(updateDoc);
    delete updateDoc._id;

    const staffsCollection = database.collection('staffs');
    staffsCollection.updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update staff");
      } else {
        res.status(204).end();
      }
    });
  });

  // Delete staff method
  router.delete("/staffs/:id", function (req, res) {
    const staffsCollection = database.collection('staffs');
    staffsCollection.deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete staff");
      } else {
        console.log("Deleted.")
        res.status(204).end();
      }
    });
  });

  /////////////////////////////////REPORT_SECTION/////////////////////////////////


  // Get reports method
  router.get('/reports', (req, res) => {

    const reportsCollection = database.collection('reports');

    reportsCollection.find({}).toArray((err, docs) => {
      return res.json(docs)
    });

  });

  // Create reports method
  router.post('/reports', (req, res) => {
    const user = req.body;

    const reportsCollection = database.collection('reports');

    reportsCollection.insertOne(user, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' })
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });
  });


  // Search for a specific report method 
  router.get('/reports/:id', function (req, res) {
    const reportsCollection = database.collection('reports');
    reportsCollection.findOne(new ObjectID(req.params.id), function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  // Edit report method
  router.put("/reports/:id", function (req, res) {
    var updateDoc = req.body;
    console.log(updateDoc);
    delete updateDoc._id;

    const reportsCollection = database.collection('reports');
    reportsCollection.updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update report");
      } else {
        res.status(204).end();
      }
    });
  });

  // Delete report method
  router.delete("/reports/:id", function (req, res) {
    const reportsCollection = database.collection('reports');
    reportsCollection.deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete report");
      } else {
        console.log("Deleted.")
        res.status(204).end();
      }
    });
  });


  /////////////////////////////////SCHEDULE_SECTION/////////////////////////////////



  router.get('/schedules/all', function (req, res) {
    schedule.find({})
      .exec(function (err, schedule) {
        if (err) {
          console.log('Error getting the schedule');
        } else {
          console.log(schedule);
          res.json(schedule);
        }
      });
  });

  router.post('/schedules/update/:id', function (req, res) {
    console.log('Updating a schedule: ' + req.params.id);
    schedule.findOne({ "tdId": req.params.tdId })
      .exec(function (err, schedule) {
        if (err) {
          console.log('Error getting the schedule');
        } else {
          res.json(schedule);
        }
      });
    if (schedule != null
      && schedule.tdId != null) {
      schedule.findOne({ tdId: req.params.id })
        .exec(function (err, schedule) {
          if (err) {
            console.log('Could not find the schedule');
          } else {
            //console.log("schedule " + req.body.tdId + " className: " + req.body.className + " fontColor: " + req.body.fontColor );
            schedule.tdId = req.body.tdId;
            schedule.className = req.body.className;
            schedule.fontColor = req.body.fontColor;
            schedule.save();
            //res.json(schedule);
          }
        });
    } else {
      var newSchedule = new schedule();
      newSchedule.tdId = req.body.tdId;
      newSchedule.className = req.body.className;
      newSchedule.fontColor = req.body.fontColor;
      newSchedule.save(function (err, schedule) {
        if (err) {
          console.log('Error inserting schedule');
        } else {
          //res.json(schedule);
        }
      });
    }

  });

  router.post('/schedules/clear', function (req, res) {
    schedule.remove({})
      .exec(function (err, schedule) {
        if (err) {
          console.log('Error removing the schedules');
        } else {
          //schedule.remove();
          res.json(schedule);
        }
      });
  });



  /////////////////////////////////USERS_SECTION/////////////////////////////////


  // Get Users Method from database and retrieve from users collection
  router.get('/users', (req, res) => {

    const reportsCollection = database.collection('users');

    // find{} is empty allowing to return the whole collection
    reportsCollection.find({}).toArray((err, docs) => {

      return res.json(docs)
    });

  });

  //search for a specific user.    
  router.get('/users/:id', function (req, res) {
    const usersCollection = database.collection('users');
    usersCollection.findOne(new ObjectID(req.params.id), function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  // Create a new user
  router.post('/register', (req, res) => {
    const user = req.body;

    const usersCollection = database.collection('users');

    usersCollection
      .findOne({ username: user.username }, (err, result) => {

        if (result) {
          return res.status(302).json({ error: 'This username is already exists' })
        }

        if (!result) {
          user.password = bcrypt.hashSync(user.password, 10);
          usersCollection.insertOne(user, (err, r) => {

            if (err) {
              return res.status(500).json({ error: 'Error inserting new record.' })
            }

            const newRecord = r.ops[0];

            return res.status(201).json(newRecord);
          });
        }
      });
  });

  // Create Authenticate Method
  router.post('/authenticate', (req, res) => {
    const user = req.body;

    const usersCollection = database.collection('users');

    // Search for user
    usersCollection
      .findOne({ username: user.username }, (err, result) => {
        if (!result) {
          return res.status(404).json({ error: 'User not found' })
        }

        if (!bcrypt.compareSync(user.password, result.password)) {
          return res.status(401).json({ error: 'Incorrect Password' });
        }

        const payload = {
          username: result.username,
          admin: result.admin,
          manage: result.manage
        };

        //https://www.grc.com/passwords.htm
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

        return res.json({
          message: 'Successfully Authenticated',
          token: token,
          _id: result._id,
          admin: result.admin,
          manage: result.manage
        });
      });
  });

  return router;
}

module.exports = apiRouter;


var express = require("express");

var router = express.Router();
var connection = require("../config/connection.js");

// // Import the model (burger.js) to use its database functions.
// var burger = require("../models/burger.js");

// Serve index.handlebars to the root route.
router.get("/", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { burgers: data });
  });
});

router.post("/api/burgers", function(req, res) {
  connection.query("INSERT INTO burgers (name) VALUES (?, ?)", [req.body.name], function(
    err,
    result
  ) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }

    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

// Update a quote by an id and then redirect to the root route.
router.put("/api/burgers/:id", function(req, res) {
  connection.query(
    "UPDATE burgers SET name = ? WHERE id = ?",
    [req.body.name, req.params.id],
    function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      else if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});


// Export routes for server.js to use.
module.exports = router;

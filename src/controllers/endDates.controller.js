const EndDate = require("../models/EndDate.model");

exports.findOne = (req, res) => {
  EndDate.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found end date with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving end date with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const endDate = new EndDate({
    datedata: req.body.datedata,
  });

  EndDate.create(endDate, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the end date.",
      });
    else res.send(...data);
  });
};

exports.findAll = (req, res) => {

  const date = req.query.date;
  EndDate.getAll(date, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving end dates."
      });
    else res.send(data);
  });

};

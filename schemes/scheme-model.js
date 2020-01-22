const db = require("../data/db-config.js");
module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .first();
}

function findSteps(id) {
  // select s.id,s.step_number, s.instructions
  // from steps as s
  // join schemes as sc
  // on s.scheme_id = sc.id;
  return db("steps as s")
    .select("s.id", "s.step_number", "s.instructions")
    .join("schemes as sc", "s.scheme_id", "sc.id")
    .where("sc.id", id);
}

function add(scheme) {
  return db("schemes")
    .insert(scheme, "id")
    .then(ids => {
      const [id] = ids;

      return findById(id);
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db("schemes")
    .where("id", id)
    .del();
}

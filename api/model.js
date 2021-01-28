const db = require("../data/dbConfig");

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};

async function get() {
  const data = await db("accounts");
  return data;
}

async function getById(id) {
  const data = await db.first("*").from("accounts").where({ id });
  return data;
}

async function create(data) {
  const [dataId] = await db.insert(data).into("accounts");
  const response = await getById(dataId);
  return response;
}

async function update(id, changes) {
  const update = await db("accounts").where({ id }).update(changes);
  const response = await getById(id);
  return response;
}

async function remove(id) {
  const response = await getById(id);
  const update = await db("accounts").where({ id }).del();
  return response;
}

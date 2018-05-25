const database = require("./database-connection");

module.exports = {
  list() {
    return database('concert')
  },
  read(id) {
    // console.log(resolutions.id)
    return database('concert').where('id', id).first()
  },
  create(concert) {
    return database('concert').insert(concert, '*')
  },
  update(id, concert) {
    return database('concert').where('id', id).update(concert, '*')
  },
  delete(id) {
    return database('concert').where('id', id).delete()
  }
}
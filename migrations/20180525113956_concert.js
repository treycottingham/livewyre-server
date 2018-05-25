exports.up = function (knex, Promise) {
  return knex.schema.createTable('concert', table => {
    table.increments('id')
    table.text('artist')
    table.date('concertDate')
    table.text('venue')
    table.text('concertPoster')
    table.text('attendance')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('concert')
}
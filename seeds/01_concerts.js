exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('concert').del()
    .then(function () {
      // Inserts seed entries
      return knex('concert').insert([{
        id: 1,
        artist: 'Dave Matthews Band',
        concertDate: '1997-02-01',
        venue: 'Austin, TX',
        concertPoster: 'http://i.ebayimg.com/00/s/NTAwWDM3NQ==/z/LVoAAMXQlgtS-pd2/$_3.JPG?set_id=2',
        attendance: 'Frat Boys'
      }, {
        id: 2,
        artist: 'Insane Clown Posse',
        concertDate: '1997-02-01',
        venue: 'Trailer Park',
        concertPoster: 'https://images-na.ssl-images-amazon.com/images/I/417Ozs3rZjL.jpg',
        attendance: 'Juggalos'
      }, {
        id: 3,
        artist: 'Greatful Dead',
        concertDate: '1997-02-01',
        venue: 'Kashyyk',
        concertPoster: 'https://images-na.ssl-images-amazon.com/images/I/71CLSSb905L._SX425_.jpg',
        attendance: 'Trustafarians'
      }]).then(() => {
        return knex.raw('ALTER SEQUENCE concert_id_seq RESTART WITH 4;')
      })
    })
}
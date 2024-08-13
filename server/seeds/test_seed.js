/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('exercises').del()
  await knex('exercises').insert([
    { id: 'Thingimajigs', muscle_group: 'Biceps' },
    { id: 'Pullies', muscle_group: 'Triceps' },
    { id: 'Pushies', muscle_group: 'Quadriceps' }
  ]);
};

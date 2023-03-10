/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('users', { is_delete: 'boolean' });
  pgm.addColumns('threads', { is_delete: 'boolean' });
};

exports.down = (pgm) => {
  pgm.dropColumns('users', ['is_delete'], { ifExists: true });
  pgm.dropColumns('threads', ['is_delete'], { ifExists: true });
};

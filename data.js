options = {
  none: {
    spawn_on: false,
    spaw_speed: 6,
    spawUpdate: function (spawn) {
      spawn.posDes = spawn.posMouse.copy();
    },
  },
};

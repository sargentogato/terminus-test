options = {
  none: {
    spawn_on: false,
    spaw_speed: 6,
    spawUpdate: function (spawn) {
      spawn.posDes = spawn.posMouse.copy();
    },
  },
  /* float: {
    word: " float ",
    size: typeSize(72),
    grow: 10,
    lifespan: 150,
    shrink: 150,
    start_movement: 5,
    movement_speed: 20,
    turning_speed: 5,
    movementUpdate: function (letter) {
      let v = map(this.movement_speed, 1, 100, -5, 5);
      letter.speed = p5.Vector.lerp(
        letter.speed,
        createVector(0, v * map(letter.seed, 0, 1, 0.9, 1.1) * multiplier),
        0.005,
      );
      letter.pos.add(letter.speed);
      letter.angSpeed = lerp(
        letter.angSpeed,
        map(letter.seed, 0, 1, -0.05, 0.05),
        0.001,
      );
      letter.angle += letter.angSpeed * multiplier;
    },

    spawn_on: true,
    spaw_speed: 6,
    spawUpdate: function (spawn) {
      spawn.posDes = spawn.posMouse.copy();
    },
  }, */
  /*   fear: {
    word: " fear ",
    size: typeSize(104),
    grow: 10,
    lifespan: 1,
    shrink: 150,
    start_movement: 1,
    movement_speed: 78,
    turning_speed: 4,
    movementUpdate: function (letter) {
      let v = p5.Vector.fromAngle(letter.angle - HALF_PI);
      v.setMag(this.movement_speed * 0.1 * multiplier);
      letter.speed = p5.Vector.lerp(letter.speed, v, 0.1);
      letter.pos.add(letter.speed);
      let vRot =
        this.movement_speed * 0.1 * this.turning_speed * 0.005 * multiplier;
      letter.angle += map(
        noise(fakeFrameCount * 0.005, letter.seed * 100),
        0,
        1,
        -vRot,
        vRot,
      );
    },

    spawn_on: true,
    spaw_speed: 2,
    circle_x_radius: 30 * mobileProp(),
    circle_y_radius: 100 * mobileProp(),
    rotation_speed: 10,
    circle_speed: 30,
    circle_radius: 50,
    spawUpdate: function (spawn) {
      spawn.posDes = spawn.posMouse.copy();
      let a = fakeFrameCount * this.circle_speed * 0.01;
      let x = cos(a) * parseInt(this.circle_x_radius);
      let y = sin(a) * parseInt(this.circle_y_radius);
      let pos = createVector(x, y);
      pos.rotate(spawn.a);
      pos.add(spawn.posMouse);
      spawn.posDes = pos;
      spawn.a += this.rotation_speed * 0.001 * multiplier;
    },
  },
  renounce: {
    word: " renounce ",
    size: typeSize(40),
    grow: 10,
    lifespan: 1,
    shrink: 46,
    start_movement: 1,
    movement_speed: 29,
    turning_speed: 2,
    movementUpdate: function (letter) {
      let v = p5.Vector.fromAngle(letter.angle + PI);
      v.setMag(this.movement_speed * 0.1 * multiplier);
      letter.speed = p5.Vector.lerp(letter.speed, v, 0.1);
      letter.pos.add(letter.speed);
      let vRot =
        this.movement_speed * 0.1 * this.turning_speed * 0.005 * multiplier;
      letter.angle += map(
        noise(fakeFrameCount * 0.005, letter.seed * 100),
        0,
        1,
        -vRot,
        vRot,
      );
    },

    spawn_on: true,
    spaw_speed: 15,
    spawUpdate: function (spawn) {
      spawn.posDes = spawn.posMouse.copy();
    },
  },
  reality: {
    word: " reality ",
    size: typeSize(104),
    grow: 10,
    lifespan: 575,
    shrink: 25,
    start_movement: 54,
    movement_speed: 100,
    turning_speed: 4,
    movementUpdate: function (letter) {
      let v = map(this.movement_speed, 1, 100, -5, 5);
      letter.speed = p5.Vector.lerp(
        letter.speed,
        createVector(0, v * map(letter.seed, 0, 1, 0.9, 1.1) * multiplier),
        0.005,
      );
      letter.pos.add(letter.speed);
      letter.angSpeed = lerp(
        letter.angSpeed,
        map(letter.seed, 0, 1, -0.05, 0.05),
        0.001,
      );
      letter.angle += letter.angSpeed * multiplier;
    },

    spawn_on: true,
    spaw_speed: 10,
    spawUpdate: function (spawn) {
      spawn.posDes = spawn.posMouse.copy();
    },
  },
  life: {
    word: " life ",
    size: typeSize(64),
    grow: 10,
    lifespan: 1,
    shrink: 100,
    start_movement: 1,
    movement_speed: 21,
    turning_speed: 2,
    movementUpdate: function (letter) {
      let v = p5.Vector.fromAngle(letter.angle - HALF_PI);
      v.setMag(this.movement_speed * 0.1 * multiplier);
      letter.speed = p5.Vector.lerp(letter.speed, v, 0.1);
      letter.pos.add(letter.speed);
      let vRot =
        this.movement_speed * 0.1 * this.turning_speed * 0.005 * multiplier;
      letter.angle += map(
        noise(fakeFrameCount * 0.005, letter.seed * 100),
        0,
        1,
        -vRot,
        vRot,
      );
    },

    spawn_on: true,
    spaw_speed: 1.5,
    circle_x_radius: 150 * mobileProp(),
    circle_y_radius: 150 * mobileProp(),
    rotation_speed: 0,
    circle_speed: 30,
    circle_radius: 177 * mobileProp(),
    spawUpdate: function (spawn) {
      spawn.posDes = spawn.posMouse.copy();
      let a = fakeFrameCount * this.circle_speed * 0.01;
      let x = cos(a) * parseInt(this.circle_x_radius);
      let y = sin(a) * parseInt(this.circle_y_radius);
      let pos = createVector(x, y);
      pos.rotate(spawn.a);
      pos.add(spawn.posMouse);
      spawn.posDes = pos;
      spawn.a += this.rotation_speed * 0.001 * multiplier;
    },
  },
  paradigm: {
    word: " paradigm ",
    size: typeSize(17),
    grow: 1,
    lifespan: 1,
    shrink: 200,
    start_movement: 1,
    movement_speed: 1,
    turning_speed: 2,
    movementUpdate: function (letter) {
      let v = p5.Vector.fromAngle(letter.angle - HALF_PI);
      v.setMag(this.movement_speed * 0.1 * multiplier);
      letter.speed = p5.Vector.lerp(letter.speed, v, 0.1);
      letter.pos.add(letter.speed);
      let vRot = this.movement_speed * 0.1 * this.turning_speed * 0.005;
      letter.angle +=
        map(
          noise(fakeFrameCount * 0.005, letter.seed * 100),
          0,
          1,
          -vRot,
          vRot,
        ) * multiplier;
    },

    spawn_on: true,
    spaw_freq: 35,
    spaw_speed: 20,
    spawUpdate: function (spawn) {
      if (spawn.timer % this.spaw_freq == 0) {
        spawn.posDesd = spawn.posMouse.copy();
      }
      if (spawn.posDesd) spawn.posDes.lerp(spawn.posDesd, 0.1);
    },
  },
  void: {
    word: " void ",
    size: typeSize(145),
    grow: 200,
    lifespan: 166,
    shrink: 152,
    start_movement: 1,
    movement_speed: 21,
    turning_speed: 5,
    movementUpdate: function (letter) {
      let v = p5.Vector.fromAngle(letter.angle - HALF_PI);
      v.setMag(this.movement_speed * 0.1 * multiplier);
      letter.speed = p5.Vector.lerp(letter.speed, v, 0.1);
      letter.pos.add(letter.speed);
      let vRot = this.movement_speed * 0.1 * this.turning_speed * 0.005;
      letter.angle +=
        map(
          noise(fakeFrameCount * 0.005, letter.seed * 100),
          0,
          1,
          -vRot,
          vRot,
        ) * multiplier;
    },

    spawn_on: true,
    spaw_speed: 5,
    spawUpdate: function (spawn) {
      spawn.posDes = spawn.posMouse.copy();
    },
  },
  repentance: {
    word: " repentance ",
    size: typeSize(64),
    grow: 10,
    lifespan: 400,
    shrink: 55,
    start_movement: 88,
    movement_speed: 100,
    turning_speed: 10,
    movementUpdate: function (letter) {
      let v = p5.Vector.fromAngle(letter.angle + PI);
      v.setMag(this.movement_speed * 0.1 * multiplier);
      letter.speed = p5.Vector.lerp(letter.speed, v, 0.1);
      letter.pos.add(letter.speed);
      let vRot = this.movement_speed * 0.1 * this.turning_speed * 0.005;
      letter.angle +=
        map(
          noise(fakeFrameCount * 0.005, letter.seed * 100),
          0,
          1,
          -vRot,
          vRot,
        ) * multiplier;
    },

    spawn_on: true,
    spaw_speed: 6,
    circle_x_radius: 362 * mobileProp(),
    circle_y_radius: 0,
    rotation_speed: 40,
    circle_speed: 29,
    circle_radius: 170,
    spawUpdate: function (spawn) {
      spawn.posDes = spawn.posMouse.copy();
      let a = fakeFrameCount * this.circle_speed * 0.01;
      let x = cos(a) * parseInt(this.circle_x_radius);
      let y = sin(a) * parseInt(this.circle_y_radius);
      let pos = createVector(x, y);
      pos.rotate(spawn.a);
      pos.add(spawn.posMouse);
      spawn.posDes = pos;
      spawn.a += this.rotation_speed * 0.001 * multiplier;
    },
  }, */
};

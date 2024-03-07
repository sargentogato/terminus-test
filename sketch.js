let fps = 60,
  multiplier = 1,
  fakeFrameCount = 0;
let letters = [];
let font, fontUi;
let spawner,
  touch = false,
  ui,
  ly,
  snapshots = [],
  clrs = {
    clrMode: 0,
    bg: 0,
    bgD: 0,
    ltr: 255,
    ltrD: 255,
    extra: 150,
    update: function () {
      this.bg = lerp(this.bg, this.bgD, 0.03 * multiplier);
      this.ltr = lerp(this.ltr, this.ltrD, 0.05 * multiplier);
      if (this.bg > 150) this.ltrD = 0;
      else this.ltrD = 255;
    },
    resetBg: function () {
      if (this.clrMode == 0) {
        this.bgD = 0;
        this.extra = 150;
      } else if (this.clrMode == 1) {
        this.bgD = 255;
        this.extra = 180;
      } else if (this.clrMode == 2) {
        this.bgD = 160;
        this.extra = 255;
      }
    },

    changeClrMode: function () {
      this.clrMode = (this.clrMode + 1) % 3;
      this.resetBg();
    },

    setClrMode: function (v) {
      this.clrMode = v;
      this.resetBg();
    },
  },
  linkOpened = false;

let opt = options["none"];

function preload() {
  font = loadFont("assets/Gallique-Light.otf");
  fontUi = loadFont("assets/ABCDiatype-Regular-Trial.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  ui = new Ui();
  ui.init();
  ly = new Layout();
  ly.loadSlide();
  setTimeout(() => {
    setDarkMode(1);
  }, 3000);
  spawner = new Spawner();
  frameRate(fps);
}

function draw() {
  linkOpened = false;
  multiplier = map(frameRate(), 30, 60, 2, 1);
  fakeFrameCount += multiplier;
  clrs.update();
  spawner.update();
  background(clrs.bg);
  for (let i = 0; i < letters.length; i++) {
    let l = letters[i];
    if (l.update()) {
      letters.splice(i, 1);
      i--;
    } else l.draw();
  }
  ly.draw();
  ui.draw();
}

function mouseReleased() {
  if (!ui.checkClick()) ly.click();
}

function touchStarted() {
  touch = true;
}

function touchEnded() {
  if (!ui.checkClick()) ly.click();
  touch = false;
}

// function keyReleased() {
//   if (key == ' ') resetFromStart()
//   else if (key == '5') endExperience()
//   else if (key == '4') goToPlayground()
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ui.init();
  ly.loadSlide(true);
}

function Spawner() {
  this.spawnLetter = function (l, pos, angle, o) {
    letters.push(new Letter(l, pos, angle, o));
    this.nLetra++;
    let c = opt.word.charAt(this.nLetra % opt.word.length).toUpperCase();

    this.wNext = letterW(c, parseInt(opt.size));
  };

  this.pos = createVector(0, 0);
  this.posDes = createVector(0, 0);
  this.nLetra = 0;
  this.a = 0;
  this.timer = 0;
  this.tStop = 0;
  this.mouseStopped = true;
  this.posMouse = createVector(0, 0);
  this.posWalker = createVector(0, 0);
  this.vel = createVector(1, 1);
  if (opt.spawn_on)
    this.spawnLetter(
      opt.word.charAt(this.nLetra % opt.word.length).toUpperCase(),
      this.pos.copy(),
      0,
      opt,
    );

  this.center = function () {
    this.pos = createVector(width * 0.5, height * 0.5);
    this.posDes = createVector(width * 0.5, height * 0.5);
    this.posWalker = createVector(width * 0.5, height * 0.5);
    this.posMouse = createVector(width * 0.5, height * 0.5);
    this.mouseStopped = true;
    this.tStop = this.timer - 100;
  };

  this.spawn = function () {
    if (letters.length > 0) {
      let lastL = letters[letters.length - 1];
      let p_l = p5.Vector.sub(this.posDes, lastL.pos);
      let dis = this.wNext * 0.5 + lastL.w * 0.5;
      if (p_l.mag() > dis) {
        p_l.setMag(dis);
        this.pos = p5.Vector.add(lastL.pos, p_l);

        this.spawnLetter(
          opt.word.charAt(this.nLetra % opt.word.length).toUpperCase(),
          this.pos.copy(),
          p_l.heading(),
          opt,
        );

        this.spawn();
      }
    } else {
      this.pos = this.posWalker.copy();
      this.nLetra = 0;
      this.spawnLetter(
        opt.word.charAt(this.nLetra % opt.word.length).toUpperCase(),
        this.pos.copy(),
        0,
        opt,
      );
    }
  };

  this.walk = function () {
    let vRot = 0.1;
    let a = map(noise(frameCount * 0.01), 0, 1, -vRot, vRot);
    this.vel.rotate(a);
    this.vel.setMag(opt.spaw_speed * multiplier);
    this.posWalker.add(this.vel);

    if (this.posWalker.x < 0) this.vel.reflect(createVector(1, 0));
    else if (this.posWalker.x > width) this.vel.reflect(createVector(-1, 0));
    else if (this.posWalker.y < 0) this.vel.reflect(createVector(0, 1));
    else if (this.posWalker.y > height) this.vel.reflect(createVector(0, -1));
    this.posWalker.x = constrain(this.posWalker.x, 0, width);
    this.posWalker.y = constrain(this.posWalker.y, 0, height);
  };

  this.update = function () {
    if (mobile && !touch) {
      this.walk();
    } else if (mobile) {
      this.posWalker.set(mouseX, mouseY);
    }

    if (mobile && !touch) {
      this.posMouse = this.posWalker.copy();
    } else {
      let mousePos = createVector(mouseX, mouseY);
      let _mousePos = createVector(pmouseX, pmouseY);
      let mouse_mouse = p5.Vector.sub(mousePos, _mousePos);
      let dSq = mouse_mouse.magSq();
      if (abs(dSq) < 5) {
        if (!this.mouseStopped) {
          this.mouseStopped = true;
          this.tStop = this.timer;
        } else if (this.mouseStopped && this.timer - this.tStop > 100) {
          this.walk();
          this.posMouse = this.posWalker.copy();
        }
      } else {
        this.posMouse.set(mouseX, mouseY);
        this.posWalker.set(mouseX, mouseY);
        this.mouseStopped = false;
      }
    }

    opt.spawUpdate(this);
    if (opt.spawn_on) this.spawn();
    this.timer++;
  };

  this.draw = function () {
    fill(255, 0, 0);
    noStroke();
    circle(this.posDes.x, this.posDes.y, 10);

    fill(0, 255, 0);
    circle(this.pos.x, this.pos.y, 10);
  };
}

function Letter(_l, pos, angle, o, lock = false, _link) {
  this.opt = o;
  this.pos = pos;
  this.char = _l;
  this.size = 0;
  this.maxSize = o.size;
  this.w = letterW(this.char, this.maxSize);
  this.angle = angle;
  this.t = 0;
  this.lifespan = o.lifespan;
  this.grow = o.grow;
  this.shrink = o.shrink;
  this.speed = createVector(0, 0);
  this.angSpeed = 0;
  this.seed = random(1);
  this.lock = lock;
  this.link = _link;

  this.setSize = function () {
    let t = round(this.t);
    if (t <= this.grow) {
      let p = norm(t, 0, this.grow);
      this.size = lerp(0, this.maxSize, p);
    } else if (t >= this.grow + this.lifespan) {
      let p = norm(
        t,
        this.grow + this.lifespan,
        this.grow + this.lifespan + this.shrink,
      );
      this.size = lerp(this.maxSize, 0, p);
    } else this.size = this.maxSize;
  };

  this.update = function () {
    if (this.char == " " && this.t > 10) return true;
    let totalT = this.grow + this.lifespan + this.shrink;
    if (
      (this.t <= totalT &&
        this.t < totalT * this.opt.start_movement * 0.01 &&
        this.lock) ||
      !this.lock
    )
      this.t += multiplier;
    this.setSize();

    if (this.t > totalT * this.opt.start_movement * 0.01 && !this.lock)
      this.opt.movementUpdate(this);
    if (this.t > totalT) return true;
  };

  this.unlock = function () {
    this.lock = false;
  };

  this.translate = function (v) {
    this.pos.add(v);
  };

  this.checkMouseOver = function () {
    let border = 20;
    if (
      mouseX > this.pos.x - this.w * 0.5 - border &&
      mouseX < this.pos.x + this.w * 0.5 + border &&
      mouseY > this.pos.y - this.maxSize * 0.5 - border &&
      mouseY < this.pos.y + this.maxSize * 0.5 + border
    )
      return true;
    else return false;
  };

  this.copy = function () {
    return {
      pos: this.pos.copy(),
      char: this.char,
      size: this.size,
      angle: this.angle,
    };
  };

  this.draw = function () {
    noStroke();
    let c = clrs.ltr;
    if (this.link) {
      if (this.lock) {
        if (this.checkMouseOver()) c = clrs.extra;
      }
    }
    fill(c);

    textAlign(CENTER, CENTER);
    textSize(round(this.size));
    textFont(font);

    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    text(this.char, 0, 0);

    if (this.link) {
      let w = letterW(this.char, this.size);
      noFill();
      stroke(c);
      strokeWeight(map(this.size, 0, this.maxSize, 0, 1));
      translate(-w * 0.5, this.size * 0.6);
      line(0, 0, w, 0);
      line();
    }
    pop();
  };
}

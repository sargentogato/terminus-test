function Ui() {
  this.criaMenu = function () {
    let lineH = this.txtSize * 1.5;
    if (mobile) lineH = this.txtSize * 1.8;
    let totalH = lineH * (Object.keys(options).length - 2);
    let x = this.border;
    let y = height * 0.5 - totalH * 0.5;
    if (mobile) {
      y = height - totalH - this.border;
    }
    for (var o in options) {
      let opt = options[o];
      if (opt.word) {
        let w = opt.word.trim().toUpperCase();
        this.elements.push(new MenuButon(x, y, w, this.txtSize, o));

        y += lineH;
      }
    }
  };

  this.init = function () {
    this.elements = [];
    //TIMER
    let t = false;
    let r = false;
    let d = false;
    if (this.timer) {
      t = this.timer.sec;
      r = this.timer.run;
      d = this.timer.startedAt;
    }
    this.timer = new Timer(this, t, r, d);
    this.elements.push(this.timer);

    //DARK MODE BTN
    let rDrk = 10,
      xDrk = width * 0.5,
      yDrk = height - this.border - rDrk;
    if (mobile) xDrk = width - this.border - rDrk;
    this.darkMButon = new DarkModeButon(xDrk, yDrk, rDrk);
    this.elements.push(this.darkMButon);

    //MENU
    // this.criaMenu();
  };

  this.border = 35;
  this.txtSize = 18;
  if (mobile) {
    this.border *= 0.5;
    this.txtSize = 14;
  }

  this.showElements = false;
  this.showSave = false;

  this.setShowElements = function (v) {
    this.showElements = v;
  };

  this.startTimer = function () {
    this.timer.start();
  };

  this.draw = function () {
    if (this.showElements) {
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].draw();
      }
    }
    textFont(fontUi);
    textSize(this.txtSize);
    fill(clrs.ltr);
    noStroke();
    if (!mobile) {
      textAlign(CENTER, BOTTOM);
      text("Terminus", width * 0.5, this.border + this.txtSize);
    } else {
      textAlign(LEFT, BOTTOM);
      text("Terminus", this.border, this.border + this.txtSize);
    }
  };

  this.checkClick = function () {
    let clicked = false;
    if (this.showElements) {
      for (let i = 0; i < this.elements.length; i++) {
        let e = this.elements[i];
        if (e.checkMouse()) {
          e.callback();
          clicked = true;
        }
      }
    }
    return clicked;
  };
}

function Timer(ui, _t, _r, _d) {
  let x = width - ui.border,
    y = height * 0.5;
  if (mobile) y = ui.border + ui.txtSize;
  this.pos = createVector(x, y);
  this.duration = 120;
  if (_t != false) {
    this.sec = _t;
    this.run = _r;
    this.startedAt = _d;
  } else {
    this.sec = this.duration;
    this.startedAt = Date.now();
    this.run = false;
  }

  this.snapTimer = this.sec / 8;
  this.lastSnap = this.sec;
  this.finished = false;

  this.box = fontUi.textBounds("00:00", this.pos.x, this.pos.y, ui.txtSize);
  this.box.x -= this.box.w;
  this.box.x2 = this.box.x + this.box.w;
  this.box.y2 = this.box.y + this.box.h;

  this.checkMouse = function () {
    let border = 7;
    return (
      mouseX > this.box.x - border &&
      mouseX < this.box.x2 + border &&
      mouseY > this.box.y - border &&
      mouseY < this.box.y2 + border
    );
  };

  this.reset = function () {
    snapshots = [];
    this.sec = this.duration;
    this.finished = false;
  };

  this.start = function () {
    if (!this.run && !this.finished) {
      this.startedAt = Date.now();
      this.run = true;
    }
  };

  this.callback = function () {
    if (this.sec < 1) endExperience();
    // this.reset()
  };

  this.draw = function () {
    if (this.run && this.sec > 0) {
      let now = Date.now();
      let ran = now - this.startedAt;
      this.sec = this.duration - ran * 0.001;
    } else if (this.run && this.sec <= 0) {
      this.finished = true;
      this.run = false;
      endExperience();
    }

    textFont(fontUi);
    textSize(ui.txtSize);
    let c = color(clrs.ltr, 200);
    if (this.checkMouse() && this.sec < 1) c = clrs.extra;
    if (this.sec < 10) {
      let freq = 0.5;
      if (this.sec % freq > freq * 0.5) c = color(255, 0, 0, 150);
    }
    fill(c);
    noStroke();
    textAlign(RIGHT, BOTTOM);
    let m = floor(this.sec / 60);
    let s = ceil(this.sec) - m * 60;
    if (s == 60) {
      m++;
      s = 0;
    }
    text(padLeft(m, 2) + ":" + padLeft(s, 2), this.pos.x, this.pos.y);
  };
}

function MenuButon(_x, _y, _t, _s, _k) {
  this.pos = createVector(_x, _y);
  this.txt = _t;
  this.txtSize = _s;
  this.box = fontUi.textBounds(this.txt, this.pos.x, this.pos.y, this.txtSize);
  this.key = _k;
  this.box.x2 = this.box.x + this.box.w;
  this.box.y2 = this.box.y + this.box.h;
  this.selected = false;

  this.checkMouse = function () {
    let border = 7;
    return (
      mouseX > this.box.x - border &&
      mouseX < this.box.x2 + border &&
      mouseY > this.box.y - border &&
      mouseY < this.box.y2 + border
    );
  };

  this.draw = function () {
    let c = color(clrs.ltr, 200);
    if (this.checkMouse()) c = clrs.extra;
    else if (this.selected) c = color(clrs.ltr, 50);
    fill(c);
    noStroke();
    textFont(fontUi);
    textSize(this.txtSize);
    textAlign(LEFT, BOTTOM);
    text(this.txt, this.pos.x, this.pos.y);
  };

  this.callback = function () {
    opt = options[this.key];
    spawner.center();
    this.selected = true;
  };
}

function DarkModeButon(_x, _y, _r) {
  this.pos = createVector(_x, _y);
  this.r = _r;
  this.rSq = sq(_r * 1.5);

  this.checkMouse = function () {
    let mousePos = createVector(mouseX, mouseY);
    let pos_mouse = p5.Vector.sub(this.pos, mousePos);
    return pos_mouse.magSq() < this.rSq;
  };

  this.draw = function () {
    let c = color(clrs.ltr, 200);
    fill(c);
    stroke(c);
    strokeWeight(3);
    circle(this.pos.x, this.pos.y, this.r * 2);
    fill(clrs.bg);
    noStroke();
    let start = HALF_PI;
    let end = HALF_PI;
    if (this.checkMouse()) end *= -1;
    else start *= -1;
    arc(this.pos.x, this.pos.y, this.r * 2, this.r * 2, start, end);
  };

  this.callback = function () {
    changeDarkMode();
  };
}

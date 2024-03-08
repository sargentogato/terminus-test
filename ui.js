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

  this.border = 35;
  this.txtSize = 18;
  this.textTitleDesktop = 60;
  this.textTitleMobile = 30;
  if (mobile) {
    this.border *= 0.5;
    this.txtSize = 14;
  }

  this.showElements = false;
  this.showSave = false;

  this.setShowElements = function (v) {
    this.showElements = v;
  };

  this.draw = function () {
    textFont(fontUi);
    textSize(this.textTitleDesktop);
    fill(clrs.ltr);
    noStroke();
    if (!mobile) {
      textAlign(CENTER, BOTTOM);
      text("TERMINUS", width * 0.5, this.border + this.textTitleDesktop);
    } else {
      textAlign(LEFT, BOTTOM);
      textSize(this.textTitleMobile);
      text("TERMINUS", this.border, this.border + this.textTitleMobile);
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

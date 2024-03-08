function Layout() {
  this.textBoxes = [];
  this.letters = [];
  this.slides = slides;
  this.slideN = 0;
  this.sideBorder = width * 0.2;
  this.topBorder = height * 0.1;
  this.maxY = 0;
  this.ready = false;

  this.getSlide = function () {
    return this.slides[this.slideN];
  };

  this.makeBoxes = function (_o) {
    this.ready = false;
    let boxes = [];
    let wLy = _o.w;
    let hLy = _o.h;
    let maxW = width - this.sideBorder * 2;
    let maxH = height - this.topBorder * 2;
    let propH = min(maxH, hLy) / hLy;
    let propW = min(maxW, wLy) / wLy;

    let x = width * 0.5;
    let y = height * 0.5 - _o.h * 0.5 * propH;

    for (let i = 0; i < _o.boxes.length; i++) {
      let b = _o.boxes[i];
      if (propW != 1) b.x = map(x, 0, maxW, 0, min(wLy, maxW));
      else b.x = map(x, 0, maxW, 0, maxW * propW);
      b.y = y;
      b.w = map(b.maxW, 0, wLy, 0, min(wLy, maxW));
      b.h = b.maxH * propH;
      b.n = _o.n;
      b.links = this.slideN == 5;

      let box = new TextBox(b);
      setTimeout(() => {
        this.textBoxes.push(box);
        this.ready = true;
      }, _o.delay);
      boxes.push(box);
      this.letters = this.letters.concat(box.letters);

      y += box.realH + b.spaceBottom * propH;
    }
    this.maxY = y;
    return boxes;
  };

  this.loadSlide = function (resize = false) {
    let options = this.slides[this.slideN];
    if (resize)
      setTimeout(() => {
        this.textBoxes = [];
      }, options.delay);
    for (let i = 0; i < this.textBoxes.length; i++) {
      this.textBoxes[i].unlock();
    }

    if (this.slideN == 4) {
      const main = document.getElementById("main");

      setTimeout(() => {
        fetch("./form.html")
          .then((response) => response.text())
          .then((data) => {
            main.innerHTML = data;
          })
          .catch((error) => console.error("Error to get file", error));
      }, 4000);
    }

    let h = 0;
    let w = 0;

    for (let i = 0; i < options.boxes.length; i++) {
      h += options.boxes[i].maxH + options.boxes[i].spaceBottom;
      w = max(w, options.boxes[i].maxW);
    }

    options.x = width * 0.5;
    options.y = height * 0.5 - h * 0.5;
    options.h = h;
    options.w = w;
    let boxes = this.makeBoxes(options);

    let totalH = 0;
    for (let i = 0; i < boxes.length; i++) {
      let tb = boxes[i];
      totalH += tb.realH + tb.spaceBottom;
    }

    let newY = height * 0.5 - totalH * 0.5;
    let d = createVector(0, newY - max(options.y, this.topBorder));
    for (let i = 0; i < boxes.length; i++) {
      let tb = boxes[i];
      tb.translate(d);
    }
    this.maxY += d.y;
    // setDarkMode();
  };

  this.setSlide = function (n) {
    this.slideN = n;
    this.loadSlide();
  };

  this.click = function () {
    let clicked = false;
    for (let i = 0; i < this.letters.length; i++) {
      let l = this.letters[i];
      if (l.lock && l.link) {
        if (l.checkMouseOver() && !linkOpened) {
          window.open(l.link);
          clicked = true;
          linkOpened = true;
        }
      }
    }

    if (this.ready && !clicked) {
      if (this.slideN < 4) {
        this.slideN++;
        this.loadSlide();
      } else if (this.slideN == 5) {
        backToPlay();
      }
    }
  };

  this.draw = function () {
    for (let i = 0; i < this.textBoxes.length; i++) {
      let tb = this.textBoxes[i];
      if (tb.letters.length == 0) {
        this.textBoxes.splice(i, 1);
        i--;
      } else tb.draw();
    }
  };
}

function TextBox(_o) {
  this.options = _o;
  this.x = _o.x - _o.w * 0.5;
  this.y = _o.y;
  this.w = _o.w;
  this.h = _o.h;
  this.text = _o.text;
  this.words = this.text.split(" ");
  this.leadingProp = _o.leadingProp;
  this.letters = [];
  this.wLines = [];
  this.realH = 0;
  this.spaceBottom = _o.spaceBottom;

  this.calcSize = function (t) {
    textFont(font);
    textSize(t); //set font and size to calculate the text sizes
    let w = 0; //width of the text line I'm measuring
    let y = t * this.leadingProp; //y position of the line
    for (let i = 0; i < this.words.length; i++) {
      //loop between each word on the text
      if (this.words[i] == "/") {
        w = 0;
        y += t * this.leadingProp * 2;
      } else {
        let wPalavra = textWidth(this.words[i]); //the width of the word
        if (wPalavra > this.w || w > this.w || y > this.h - 1) {
          // if the word is wider than the width of the box:
          return this.calcSize(t - 1); // recurse this fuction reducing the text size
        } else {
          // if the width of the word is smaller than the box width:
          w += wPalavra + textWidth(" "); // add the word width to the line width
          if (w >= this.w - 1) {
            // if the width of the line is wider than the box break into the next line:

            w = wPalavra + textWidth(" "); // sets the new line width into the word width
            y += t * this.leadingProp; // add the line height
            if (y > this.h - 1) {
              // if the line y is beyond the text height:
              return this.calcSize(t - 1); // recurse this fuction reducing the text size
            }
          }
        }
      }
    }
    return t; // returns the first value that fits the box
  };
  this.size = this.calcSize(200);

  this.createLetters = function () {
    textFont(font);
    textSize(this.size);
    let w = 0;
    let y = this.size * this.leadingProp;
    let line = [];
    for (let i = 0; i < this.words.length; i++) {
      if (this.words[i] == "/") {
        w -= textWidth(" ");
        let center = createVector(this.w * 0.5 - w * 0.5, 0);
        for (let j = 0; j < line.length; j++) {
          let l = line[j];
          l.translate(center);
          this.letters.push(l);
        }
        w = 0;
        y += this.size * this.leadingProp * 2;
        line = [];
      } else {
        let link = false;

        let wPalavra = textWidth(this.words[i]);
        if (w + wPalavra + textWidth(" ") >= this.w - 1) {
          w -= textWidth(" ");

          let center = createVector(this.w * 0.5 - w * 0.5, 0);
          for (let j = 0; j < line.length; j++) {
            let l = line[j];
            l.translate(center);
            this.letters.push(l);
          }
          w = 0;
          y += this.size * this.leadingProp;
          line = [];
        }
        let dir = 0;

        if (this.options.n == 1) dir = HALF_PI;
        else if (this.options.n == 2) dir = QUARTER_PI;
        else if (this.options.n == 3) dir = -QUARTER_PI;
        let x = this.x + w;
        let grow = 60,
          lifespan = 0,
          shrink = 240;
        for (let j = 0; j < this.words[i].length; j++) {
          let c = this.words[i].charAt(j);
          let o = {
            size: this.size,
            grow: grow,
            lifespan: lifespan,
            shrink: shrink,
            start_movement: 100 * (grow / (grow + lifespan + shrink)),
            movement_speed: random(20, 50),
            turning_speed: random(0.5, 1),
            dir: dir,
            movementUpdate: function (letter) {
              let m = 1;
              if (letter.seed < 0.5) m *= -1;
              let v = p5.Vector.fromAngle(
                this.dir + letter.angle + HALF_PI * m,
              );
              v.setMag(this.movement_speed * 0.1 * multiplier);
              letter.speed = p5.Vector.lerp(letter.speed, v, 0.1);
              letter.pos.add(letter.speed);
              let vRot =
                this.movement_speed *
                0.1 *
                this.turning_speed *
                0.005 *
                multiplier;
              letter.angle += map(
                noise(frameCount * 0.005, letter.seed * 100),
                0,
                1,
                -vRot,
                vRot,
              );
            },
          };
          x += textWidth(c) * 0.5;
          line.push(
            new Letter(
              c,
              createVector(x, this.y + y - this.size * 0.5),
              0,
              o,
              true,
              link,
            ),
          );
          x += textWidth(c) * 0.5;
        }
        w += wPalavra + textWidth(" ");
      }
    }
    w -= textWidth(" ");
    let center = createVector(this.w * 0.5 - w * 0.5, 0);
    for (let j = 0; j < line.length; j++) {
      let l = line[j];
      l.translate(center);
      this.letters.push(l);
    }
    this.realH = y;
  };
  this.createLetters();

  this.translate = function (v) {
    this.x += v.x;
    this.y += v.y;
    for (let i = 0; i < this.letters.length; i++) {
      this.letters[i].translate(v);
    }
  };

  this.unlock = function () {
    for (let i = 0; i < this.letters.length; i++) {
      this.letters[i].unlock();
    }
  };

  this.draw = function () {
    for (let i = 0; i < this.letters.length; i++) {
      let l = this.letters[i];
      if (l.update()) {
        this.letters.splice(i, 1);
        i--;
      } else l.draw();
    }
  };
}

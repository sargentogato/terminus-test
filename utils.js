function letterW(char, size) {
  textFont(font);
  textSize(size);
  return textWidth(char);
}

function typeSize(n) {
  if (mobile) return 30;
  else return n;
}

function padLeft(nr, n, str) {
  return Array(n - String(nr).length + 1).join(str || "0") + nr;
}

function setDarkMode(v = null) {
  if (v == null) {
    let slide = ly.getSlide();
    if (clrs.clrMode != slide.darkMode) {
      clrs.setClrMode(slide.darkMode);
      clrs.resetBg();
    }
  } else if (clrs.clrMode != v) {
    clrs.setClrMode(v);
    clrs.resetBg();
  }
}

function changeDarkMode() {
  clrs.changeClrMode();
  clrs.resetBg();
}

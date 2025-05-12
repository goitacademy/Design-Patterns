class TextView {
  render(): string {
    return "Привіт, світ!";
  }
}

class BorderedTextView extends TextView {
  render(): string {
    return `[ ${super.render()} ]`;
  }
}

class ScrollableTextView extends TextView {
  render(): string {
    return `⇧ ${super.render()} ⇩`;
  }
}

class ScrollableBorderedTextView extends TextView {
  render(): string {
    return `⇧ [ ${super.render()} ] ⇩`;
  }
}

const text = new TextView();
console.log(text.render());

const view = new BorderedTextView();
console.log(view.render());

const view2 = new ScrollableTextView();
console.log(view2.render());

const view3 = new ScrollableBorderedTextView();
console.log(view3.render());


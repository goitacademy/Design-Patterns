interface Printer {
  print(document: string): void;
}

interface Scanner {
  scan(document: string): void;
}

interface Fax {
  fax(document: string): void;
}

class SimplePrinter implements Printer {
  print(document: string): void {
    console.log(`Друк: ${document}`);
  }
}

class MultifunctionPrinter implements Printer, Scanner, Fax {
  print(document: string): void {
    console.log(`Друк: ${document}`);
  }

  scan(document: string): void {
    console.log(`Сканування: ${document}`);
  }

  fax(document: string): void {
    console.log(`Факс: ${document}`);
  }
}
interface IMultifunctionPrinter {
  print(document: string): void;
  scan(document: string): void;
  fax(document: string): void;
}

class SimplePrinter implements IMultifunctionPrinter {
  print(document: string): void {
    // друкує документ
    console.log(`Друк: ${document}`);
  }

  scan(document: string): void {
    throw new Error('Не підтримується');
  }

  fax(document: string): void {
    throw new Error('Не підтримується');
  }
}
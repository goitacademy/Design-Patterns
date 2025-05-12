class RealPdfDocument {
  private content: string;

  constructor(private filePath: string) {
    console.log(`Завантаження PDF з ${filePath}...`);
    this.content = this.loadFromDisk(filePath);
  }

  private loadFromDisk(path: string): string {
    // симуляція операції доступа до вмісту
    return "Вміст PDF";
  }

  print(): void {
    console.log(this.content);
  }
}

class PdfDocumentProxy {
  private realDocument: RealPdfDocument | null = null;

  constructor(private filePath: string) {}

  print(): void {
    if (!this.realDocument) {
      this.realDocument = new RealPdfDocument(this.filePath);
    }
    this.realDocument.print();
  }
}

console.log("=== Без проксі (RealPdfDocument) ===");
const doc = new RealPdfDocument("file.pdf");
console.log("Об’єкт створено (без проксі)");
doc.print();

console.log("\n=== З проксі (PdfDocumentProxy) ===");
const docProxy = new PdfDocumentProxy("file.pdf");
console.log("Об’єкт створено (з проксі, PDF ще не завантажено)");
docProxy.print();

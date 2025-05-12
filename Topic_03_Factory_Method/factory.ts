interface Transport {
  deliver(): void;
}

class Truck implements Transport {
  deliver(): void {
    console.log("Доставка вантажу автомобілем по дорозі");
  }
}

class Ship implements Transport {
  deliver(): void {
    console.log("Доставка вантажу кораблем по морю");
  }
}

class TransportFactory {
  static createTransport(type: string): Transport {
    if (type === "truck") return new Truck();
    if (type === "ship") return new Ship();
    throw new Error("Unknown transport type");
  }
}

const transport = TransportFactory.createTransport("truck");
transport.deliver();

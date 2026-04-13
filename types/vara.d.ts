declare module "vara" {
  interface VaraTextConfig {
    text: string;
    fontSize?: number;
    strokeWidth?: number;
    color?: string;
    duration?: number;
    textAlign?: "left" | "center" | "right";
    autoAnimation?: boolean;
    queued?: boolean;
    delay?: number;
    letterSpacing?: number;
    x?: number;
    y?: number;
  }

  interface VaraOptions {
    fontSize?: number;
    strokeWidth?: number;
    color?: string;
    duration?: number;
    textAlign?: "left" | "center" | "right";
  }

  class Vara {
    constructor(
      element: string | HTMLElement,
      fontURL: string,
      texts: VaraTextConfig[],
      options?: VaraOptions
    );
    ready(callback: () => void): void;
    animationEnd(callback: (i: number, o: object) => void): void;
    get(id?: number): object;
    draw(id: number): void;
  }

  export default Vara;
}

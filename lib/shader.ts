export interface ShaderConfig {
  proportion: number;
  softness: number;
  distortion: number;
  swirl: number;
  swirlIterations: number;
  shape: "checks" | "stripes" | "edge";
  shapeScale: number;
  colors: string[];
}

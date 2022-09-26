export type Tile =
  | "0"
  | "2"
  | "4"
  | "8"
  | "16"
  | "32"
  | "64"
  | "128"
  | "256"
  | "512"
  | "1024"
  | "2048";

export interface Block {
  x: number;
  y: number;
  value: Tile;
}

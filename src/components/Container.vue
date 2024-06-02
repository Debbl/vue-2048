<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { Block, Tile } from "../types";
import { HEIGHT, WIDTH } from "../constants/constans";

// 位置方向
const top = ["top-2", "top-20", "top-38", "top-56"];
const left = ["left-2", "left-20", "left-38", "left-56"];
function getDirections() {
  const directions: Record<string, string> = {};
  for (let i = 0; i < top.length; i++) {
    for (let j = 0; j < left.length; j++) {
      directions[`${i}-${j}`] = `${top[i]} ${left[j]}`;
    }
  }
  return directions;
}
const directions = getDirections();

const blockBgColors: Record<Tile, string> = {
  "0": "tile",
  "2": "tile-2",
  "4": "tile-4",
  "8": "tile-8",
  "16": "tile-16",
  "32": "tile-32",
  "64": "tile-64",
  "128": "tile-128",
  "256": "tile-256",
  "512": "tile-512",
  "1024": "tile-1024",
  "2048": "tile-2048",
};

const board = ref<Block[][]>(
  Array.from({ length: HEIGHT }, (_, y) => y).map((y) =>
    Array.from({ length: WIDTH }, (_, x): Block => ({ x, y, value: "0" })),
  ),
);

function randomRange() {
  const x = Math.floor(Math.random() * 4);
  const y = Math.floor(Math.random() * 4);
  return [x, y];
}

const randomBuildBlock = () => {
  let [x, y] = randomRange();
  while (board.value[y][x].value !== "0") {
    [x, y] = randomRange();
  }
  board.value[y][x].value = Math.random() < 0.8 ? "2" : "4";
};

function init() {
  randomBuildBlock();
  randomBuildBlock();
}

init();

const getBlockClass = (block: Block) => {
  return `${blockBgColors[block.value]} ${directions[`${block.y}-${block.x}`]}`;
};

// 移动
enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

const move = (direction: Direction) => {
  let flag = false;
  switch (direction) {
    case Direction.UP:
      for (let i = 0; i < WIDTH; i++) {
        for (let j = 1; j < WIDTH; j++) {
          for (let k = j; k > 0; k--) {
            const tile = board.value[k][i];
            const beforeTile = board.value[k - 1][i];
            if (tile.value !== "0") {
              if (beforeTile.value === "0") {
                board.value[k - 1][i].value = tile.value;
                board.value[k][i].value = "0";
                flag = true;
              } else if (beforeTile.value === tile.value) {
                board.value[k - 1][i].value = String(+tile.value * 2) as Tile;
                board.value[k][i].value = "0";
                flag = true;
              }
            }
          }
        }
      }
      break;
    case Direction.RIGHT:
      for (let i = 0; i < WIDTH; i++) {
        for (let j = 2; j >= 0; j--) {
          for (let k = j; k < WIDTH - 1; k++) {
            const posY = i;
            const posX = k;
            const tile = board.value[posY][posX];
            const beforeTile = board.value[posY][posX + 1];
            if (tile.value !== "0") {
              if (beforeTile.value === "0") {
                board.value[posY][posX + 1].value = tile.value;
                board.value[posY][posX].value = "0";
                flag = true;
              } else if (beforeTile.value === tile.value) {
                board.value[posY][posX + 1].value = String(
                  +tile.value * 2,
                ) as Tile;
                board.value[posY][posX].value = "0";
                flag = true;
              }
            }
          }
        }
      }
      break;
    case Direction.DOWN:
      for (let i = 0; i < WIDTH; i++) {
        for (let j = 2; j >= 0; j--) {
          for (let k = j; k < WIDTH - 1; k++) {
            const posY = k;
            const posX = i;
            const tile = board.value[posY][posX];
            const beforeTile = board.value[posY + 1][posX];
            if (tile.value !== "0") {
              if (beforeTile.value === "0") {
                board.value[posY + 1][posX].value = tile.value;
                board.value[posY][posX].value = "0";
                flag = true;
              } else if (beforeTile.value === tile.value) {
                board.value[posY + 1][posX].value = String(
                  +tile.value * 2,
                ) as Tile;
                board.value[posY][posX].value = "0";
                flag = true;
              }
            }
          }
        }
      }
      break;
    case Direction.LEFT:
      for (let i = 0; i < WIDTH; i++) {
        for (let j = 1; j < WIDTH; j++) {
          for (let k = j; k > 0; k--) {
            const posY = i;
            const posX = k;
            const tile = board.value[posY][posX];
            const beforeTile = board.value[posY][posX - 1];
            if (tile.value !== "0") {
              if (beforeTile.value === "0") {
                board.value[posY][posX - 1].value = tile.value;
                board.value[posY][posX].value = "0";
                flag = true;
              } else if (beforeTile.value === tile.value) {
                board.value[posY][posX - 1].value = String(
                  +tile.value * 2,
                ) as Tile;
                board.value[posY][posX].value = "0";
                flag = true;
              }
            }
          }
        }
      }
      break;
    default:
      throw new Error("ERROR");
  }
  if (flag) {
    randomBuildBlock();
    flag = false;
  }
};

onMounted(() => {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    switch (e.code) {
      case "ArrowUp":
        move(Direction.UP);
        break;
      case "ArrowRight":
        move(Direction.RIGHT);
        break;
      case "ArrowDown":
        move(Direction.DOWN);
        break;
      case "ArrowLeft":
        move(Direction.LEFT);
        break;
      default:
        throw e.code;
    }
  });
});
</script>

<template>
  <div
    class="bg-[#bbada0]"
    relative
    w-74
    inline-flex
    flex-wrap
    justify-evenly
    gap-y-2
    rounded
    p-y-2
    dark:opacity-40
  >
    <template v-for="rows in board" :key="rows">
      <template v-for="block in rows" :key="block">
        <button h-16 w-16 rounded class="bg-[#eee4da59]"></button>
        <template v-if="block.value !== '0'">
          <button absolute h-16 w-16 rounded :class="getBlockClass(block)">
            {{ block.value }}
          </button>
        </template>
      </template>
    </template>
  </div>
</template>

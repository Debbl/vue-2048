<script lang="ts" setup>
import type { Tile, Block } from "../types";
import { ref } from "vue";
import { WIDTH, HEIGHT } from "../constants/constans";

// 位置方向
const top = ["top-2", "top-20", "top-38", "top-56"];
const left = ["left-2", "left-20", "left-38", "left-56"];
function getDirections() {
  const directions: Record<string, string> = {};
  for (let i = 0; i < top.length; i++) {
    for (let j = 0; j < left.length; j++) {
      directions[`${i + 1}-${j + 1}`] = `${top[i]} ${left[j]}`;
    }
  }
  return directions;
}
const directions = getDirections();

const blockBgColors: Record<Tile, any> = {
  "0": "bg-[#eee4da59]",
  "2": "bg-[#eee4da]",
  "4": "bg-[#ede0c8]",
  "8": "bg-[#f2b179]",
  "16": "bg-[#f59563]",
  "32": "bg-white",
  "64": "bg-red",
  "128": "bg-green",
  "256": "bg-blue",
  "512": "bg-white",
  "1024": "bg-white",
  "2048": "bg-white",
};

const board = ref<Block[][]>(
  Array.from({ length: HEIGHT }, (_, y) => y).map((y) =>
    Array.from(
      { length: WIDTH },
      (_, x): Block => ({ x: x + 1, y: y + 1, value: "0" })
    )
  )
);

function init(board: Block[][]) {
  function randomRange() {
    const x = Math.floor(Math.random() * 4);
    const y = Math.floor(Math.random() * 4);
    return [x, y];
  }
  Array.from({ length: 2 }).map(() => {
    let [x, y] = randomRange();
    while (board[y][x].value !== "0") {
      [x, y] = randomRange();
    }
    board[y][x].value = Math.random() < 0.8 ? "2" : "4";
  });
}

init(board.value);

const getBlockClass = (block: Block) => {
  return blockBgColors[block.value] + " " + directions[`${block.y}-${block.x}`];
};
</script>

<template>
  <div
    class="bg-[#bbada0]"
    dark:opacity-40
    inline-flex
    w-74
    flex-wrap
    justify-evenly
    p-y-2
    gap-y-2
    rounded
    relative
  >
    <template v-for="rows in board">
      <template v-for="block in rows">
        <button w-16 h-16 rounded class="bg-[#eee4da59]"></button>
        <template v-if="block.value !== '0'">
          <button absolute w-16 h-16 rounded :class="getBlockClass(block)">
            {{ block.value }}
          </button>
        </template>
      </template>
    </template>
  </div>
</template>

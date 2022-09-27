import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  shortcuts: [
    [
      "btn",
      "px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50",
    ],
    [
      "icon-btn",
      "text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600",
    ],
    ["tile", "bg-[#eee4da59] text-3xl shadow-md font-semibold"], // 默认
    ["tile-text", "text-[#f9f6f2]"], // 高级元素
    ["tile-2", "tile bg-[#eee4da]"],
    ["tile-4", "tile bg-[#ede0c8]"],
    ["tile-8", "tile tile-text bg-[#f2b179]"],
    ["tile-16", "tile tile-text bg-[#f59563]"],
    ["tile-32", "tile tile-text bg-[#f67c5f]"],
    ["tile-64", "tile tile-text bg-[#f65e3b]"],
    ["tile-128", "tile tile-text bg-[#edcf72] text-2xl "],
    ["tile-256", "tile tile-text bg-[#edcc61] text-2xl "],
    ["tile-512", "tile tile-text bg-[#edc850] text-2xl"],
    ["tile-1024", "tile tile-text bg-[#edc53f] text-xl"],
    ["tile-2048", "tile tile-text bg-[#edc22e] text-xl "],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});

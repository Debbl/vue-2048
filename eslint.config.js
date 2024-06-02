import { config } from "@debbl/eslint-config";
import unocss from "@unocss/eslint-config/flat";

export default config({
  typescript: true,
  vue: true,
  customConfig: [unocss],
});

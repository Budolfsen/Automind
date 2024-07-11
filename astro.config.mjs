import { defineConfig } from "astro/config";
import { imageService } from "@unpic/astro/service";
export default defineConfig({
  image: {
    domains: ["res.cloudinary.com"],
    service: imageService({
      placeholder: "blurhash",
    }),
  },
});

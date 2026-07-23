import type { Category } from "@/types";
import { DEFAULT_CATEGORY_IMAGE, getCategoryImage } from "./category-image";

const category = (id: number, image?: string): Category =>
  ({ id, name: `Category ${id}`, image, sectionId: 1 }) as Category;

describe("getCategoryImage", () => {
  it.each([
    [67, "/images/categories/67-portrait-people.png"],
    [68, "/images/categories/68-product-ecommerce.png"],
    [69, "/images/categories/69-landscape-nature.png"],
    [70, "/images/categories/70-architecture-interior.png"],
    [71, "/images/categories/71-logo-brand.png"],
    [72, "/images/categories/72-character-concept.png"],
    [73, "/images/categories/73-fashion.png"],
    [74, "/images/categories/74-digital-art.png"],
  ])(
    "falls back to the curated local asset when category %i has no image",
    (id, expected) => {
      expect(getCategoryImage(category(id))).toBe(expected);
    }
  );

  it("keeps a valid remote image for existing categories", () => {
    expect(getCategoryImage(category(1, "https://prom.vn/education.png"))).toBe(
      "https://prom.vn/education.png"
    );
  });

  // The DB is the source of truth: it is what the admin edits in the CMS and what
  // every other consumer reads. The bundled map is only a safety net.
  it("prefers the image from the database over the bundled asset", () => {
    expect(
      getCategoryImage(
        category(74, "https://prom.vn/uploads/category-74-digital-art.png")
      )
    ).toBe("https://prom.vn/uploads/category-74-digital-art.png");
  });

  it("ignores a blank database image and uses the bundled asset", () => {
    expect(getCategoryImage(category(73, "   "))).toBe(
      "/images/categories/73-fashion.png"
    );
  });

  it("never returns an empty image source", () => {
    expect(getCategoryImage(category(999, "  "))).toBe(DEFAULT_CATEGORY_IMAGE);
  });
});

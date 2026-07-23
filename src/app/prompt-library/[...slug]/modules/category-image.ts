import type { Category } from "@/types";

export const DEFAULT_CATEGORY_IMAGE = "/images/categories/default-category.png";

const CATEGORY_IMAGES: Readonly<Record<string, string>> = {
  "66": DEFAULT_CATEGORY_IMAGE,
  "67": "/images/categories/67-portrait-people.png",
  "68": "/images/categories/68-product-ecommerce.png",
  "69": "/images/categories/69-landscape-nature.png",
  "70": "/images/categories/70-architecture-interior.png",
  "71": "/images/categories/71-logo-brand.png",
  "72": "/images/categories/72-character-concept.png",
  "73": "/images/categories/73-fashion.png",
  "74": "/images/categories/74-digital-art.png",
};

/**
 * Thứ tự ưu tiên: ảnh trong DB → ảnh dựng sẵn theo id → ảnh mặc định.
 *
 * DB phải thắng, vì đó là thứ admin sửa được qua CMS và là nguồn dùng chung cho
 * mọi nơi khác (bảng admin, trang khác). Bảng CATEGORY_IMAGES chỉ còn là lưới an
 * toàn cho trường hợp cột image bị rỗng — đúng tình trạng của category 67–74
 * trước ngày 23/07/2026.
 */
export function getCategoryImage(category: Category): string {
  return (
    category.image?.trim() ||
    CATEGORY_IMAGES[String(category.id)] ||
    DEFAULT_CATEGORY_IMAGE
  );
}

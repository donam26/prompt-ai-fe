import type { Section } from "@/types";

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly link: string;
  readonly section?: Section;
  readonly image: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export type ProductStatus = "active" | "inactive" | "draft" | "out_of_stock";

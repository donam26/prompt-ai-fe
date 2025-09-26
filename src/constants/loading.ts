/**
 * Loading component constants and types
 */

export enum LOADING_TYPE {
  PAGE = "page",
  FORM = "form",
  TABLE = "table",
  CARD = "card",
}

export enum LOADING_SIZE {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  EXTRA_LARGE = "extra-large",
}

export const LOADING_SIZE_CLASSES = {
  [LOADING_SIZE.SMALL]: "h-4 w-4",
  [LOADING_SIZE.MEDIUM]: "h-6 w-6",
  [LOADING_SIZE.LARGE]: "h-8 w-8",
  [LOADING_SIZE.EXTRA_LARGE]: "h-12 w-12",
} as const;

export const FORM_LOADING_SIZE_CLASSES = {
  [LOADING_SIZE.SMALL]: "h-4 w-4",
  [LOADING_SIZE.MEDIUM]: "h-6 w-6",
  [LOADING_SIZE.LARGE]: "h-8 w-8",
  [LOADING_SIZE.EXTRA_LARGE]: "h-12 w-12",
} as const;

export const TABLE_LOADING_SIZE_CLASSES = {
  [LOADING_SIZE.SMALL]: "h-3 w-3",
  [LOADING_SIZE.MEDIUM]: "h-4 w-4",
  [LOADING_SIZE.LARGE]: "h-5 w-5",
  [LOADING_SIZE.EXTRA_LARGE]: "h-6 w-6",
} as const;

export const CARD_LOADING_SIZE_CLASSES = {
  [LOADING_SIZE.SMALL]: "h-5 w-5",
  [LOADING_SIZE.MEDIUM]: "h-6 w-6",
  [LOADING_SIZE.LARGE]: "h-8 w-8",
  [LOADING_SIZE.EXTRA_LARGE]: "h-10 w-10",
} as const;

export const LOADING_DEFAULTS = {
  TYPE: LOADING_TYPE.FORM,
  SIZE: LOADING_SIZE.MEDIUM,
  TEXT: "",
  CLASS_NAME: "",
} as const;

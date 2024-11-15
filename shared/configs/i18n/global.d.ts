// Use type safe message keys with `next-intl`
// type EnglishMessages = (typeof import("./messages/en"))["default"];
type KoreanMessages = (typeof import('./messages/ko'))['default']
type VietnameseMessages = (typeof import('./messages/vi'))['default']

type Messages = VietnameseMessages & KoreanMessages

// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface IntlMessages extends Messages {}

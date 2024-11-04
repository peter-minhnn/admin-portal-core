// Use type safe message keys with `next-intl`
type EnglishMessages = (typeof import("./messages/en"))["default"];
type VietnameseMessages = (typeof import("./messages/vi"))["default"];

type Messages = EnglishMessages & VietnameseMessages;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
declare interface IntlMessages extends Messages {}

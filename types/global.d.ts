declare module "emoji-toolkit" {
  const emojiToolkit: {
    toImage: (emoji: ReactNode) => ReactNode;
    emojiList: Record<
      string,
      {
        uc_base: string;
        uc_full: string;
        shortnames: string[];
        category: string;
      }
    >;
    [key: string]: unknown;
  };
  export default emojiToolkit;
}

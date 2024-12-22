declare module "emoji-toolkit" {
  const emojiToolkit: {
    toImage: (emoji: ReactNode) => ReactNode;
    [key: string]: unknown;
  };
  export default emojiToolkit;
}

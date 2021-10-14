export type CommandProps = {
  bot: any;
  chatId: string;
  command: Command;
};

export type Command = {
  full: string;
  name: string;
  args: string | undefined;
};

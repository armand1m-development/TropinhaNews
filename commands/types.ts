export type CommandProps = {
  bot: any;
  chatId: string;
  command: Command;
  msg: any;
};

export type Command = {
  full: string;
  name: string;
  args: string | undefined;
};

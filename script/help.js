module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['welp'],
  description: "Beginner's guide",
  usage: "Help [page], Help all, or [command]",
  credits: 'heru',
  commandsPerPage: 10
};

module.exports.run = async function ({
  api,
  event,
  enableCommands,
  args,
  prefix
}) {
  const input = args.join(' ').toLowerCase();
  try {
    const commands = enableCommands[0].commands;
    const commandsPerPage = module.exports.config.commandsPerPage;

    let helpMessage = '';
    const totalCommands = commands.length;

    if (!input) {
      let page = 1;
      const totalPages = Math.ceil(totalCommands / commandsPerPage);
      const start = (page - 1) * commandsPerPage;
      const end = Math.min(start + commandsPerPage, totalCommands);

      helpMessage += `✨ 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗶𝘀𝘁\n━━━━━━━━━━━━━━━\n`;

      for (let i = start; i < end; i++) {
        helpMessage += `⊂⊃ ➤ ${commands[i]}\n`;
      }

      helpMessage += `━━━━━━━━━━━━━━━\n⊂⊃ ➤ 𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: ${totalCommands}\n⊂⊃ ➤ 𝗣𝗮𝗴𝗲 ${page} of ${totalPages}\n⊂⊃ ➤ 𝗧𝗼 𝘀𝗲𝗲 𝗮𝗹𝗹 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀, 𝘁𝘆𝗽𝗲 "𝗵𝗲𝗹𝗽 𝗮𝗹𝗹".`;
    } else if (input === 'all') {
      helpMessage += `✨ 𝗔𝗹𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀\n━━━━━━━━━━━━━━━\n`;

      for (let i = 0; i < totalCommands; i++) {
        helpMessage += `⊂⊃ ➤ ${commands[i]}\n`;
      }

      helpMessage += `━━━━━━━━━━━━━━━\n⊂⊃ ➤ 𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: ${totalCommands}`;
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const totalPages = Math.ceil(totalCommands / commandsPerPage);

      if (page < 1 || page > totalPages) {
        api.sendMessage('Invalid page number.', event.threadID, event.messageID);
        return;
      }

      const start = (page - 1) * commandsPerPage;
      const end = Math.min(start + commandsPerPage, totalCommands);

      helpMessage += `✨ 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗶𝘀𝘁\n━━━━━━━━━━━━━━━\n`;

      for (let i = start; i < end; i++) {
        helpMessage += `⊂⊃ ➤ ${commands[i]}\n`;
      }

      helpMessage += `━━━━━━━━━━━━━━━\n⊂⊃ ➤ 𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: ${totalCommands}\n⊂⊃ ➤ 𝗣𝗮𝗴𝗲 ${page} of ${totalPages}`;
    }

    await api.sendMessage(helpMessage, event.threadID, event.messageID);
  } catch (error) {
    console.log(error);
  }
};

module.exports.handleEvent = async function ({
  api,
  event,
  prefix
}) {
  const { threadID, messageID, body } = event;
  const message = prefix ? `𝗣𝗿𝗲𝗳𝗶𝘅 ➠ 【 ${prefix} 】` : "𝗣𝗿𝗲𝗳𝗶𝘅 ➠ 【 𝙽𝙾𝙽𝙴-𝙿𝚁𝙴𝙵𝙸𝚇 】";
  if (body?.toLowerCase().startsWith('prefix')) {
    api.sendMessage(message, threadID, messageID);
  }
};

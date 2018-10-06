const Discord = require("discord.js"); // We Call The Packages.
const PREFIX = process.env.PREFIX; // const PREFIX = "<"; // You can change this Prefix to whatever you want.

var bot = new Discord.Client();

// Events.
bot.on("ready", function() {
    bot.user.setGame(`Type ${PREFIX}help For Commands List!`);
    console.log(`${bot.user.username} is Ready!`);
});

bot.on("message", function(message) {

    if (message.author.bot) return;

    if (!message.guild) return;

    if (!message.content.startsWith(PREFIX)) return;
    
    var args = message.content.substring(PREFIX.length).split(" ");
    var command = args[0].toLowerCase();

// Commands.
    if (command == "help") {
        var embedhelpmember = new Discord.RichEmbed()
            .setTitle("**💬 Command List.**\n")
            .addField(" - avatar", "Show your Avatar.")
            .addField(" - ping", "PING PONG.")
            .setColor(0x00FFEE)
            .setFooter("Ⓒ 2018 Example Bot.");
        var embedhelpadmin = new Discord.RichEmbed()
            .setTitle("**💬 Moderator Commands.**\n")
            .addField(" - prune", "Prune up to `99` Messages.")
            .addField(" - kick", "Kick someone from your Server.")
            .setColor(0x00FFEE)
            .setFooter("Ⓒ 2018 Example Bot.");
            message.delete()
            message.channel.send(embedhelpmember)
        if(message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(embedhelpadmin);
    };

    if (command == "avatar") {
        message.channel.send({
               embed: {
                  title: `${message.author.displayAvatarURL}'s Profile Picture.`,
                  image: {
                      url: message.author.AvatarURL
                  },
                  color: 0x00FFEE
               }
        })
    };

    if (command == "ping") {
        message.channel.send("**:ping_pong: Pong!**");
    };

    if(command === "prune") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("**🔒 Sorry, you can't do that.**");
        var messagesToDelete = args[1];
        if (!args[1]) return message.channel.send("❌ Please include the amount of Message that you want to **Prune**!");
        if (args[1] > 99) return message.channel.send("❌ I can't **Prune** more than `99` Messages.");
        message.channel.fetchMessages({limit: messagesToDelete})
        .then(messages => message.channel.bulkDelete(messages.size + 1))
        .catch(error => message.channel.send(`❌ Sorry ${message.author}, Failed while **Prunning** because: *${error}*.`));
    };

    if(command == "kick") {
        message.delete()
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("❌ Please **@mention** your target!");
        let kReason = args.join(" ").slice(0);
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**🔒 Sorry, you can't do that.**");
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("❌ Failed to **Kick**, need a higher than Roles.");
    
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("**👢 Kicked**")
        .setColor(0xFF0000)
        .addField("User", `${kUser}`)
        .addField("Moderator", `<@${message.author.id}>`)
        .addField("Reason", kReason);
    
        let adminlog = message.guild.channels.find(`name`, "mod-logs");
        if(!adminlog) return message.channel.send("❌ Sorry, i need the Logging Channels with name **#mod-logs**.");
        message.guild.member(kUser).kick(kReason);
        adminlog.send(kickEmbed);
    };

});

// Bot Login.
bot.login(process.env.BOT_TOKEN); // bot.login('YourBotAwesomeToken');

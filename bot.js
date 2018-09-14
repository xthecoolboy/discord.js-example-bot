const Discord = require("discord.js"); // We call the Packages
const PREFIX = ">"; // You can change this Prefix to whatever you want

var bot = new Discord.Client(); 

// Events

bot.on("ready", function() { 
    bot.user.setGame("Hi, im new Bot on Discord!"); 
    console.log(`${bot.user.username} Sedang ONLINE!`); 
});

// Definer

bot.on("message", function(message) { 

    if (message.author.bot) return; 
	
	if (!message.guild) return; 

    if (!message.content.startsWith(PREFIX)) return; 
    
    var args = message.content.substring(PREFIX.length).split(" "); 
    var command = args[0].toLowerCase(); 

// Commands
	
    if (command == "help") { 
        var embedhelpmember = new Discord.RichEmbed() 
            .setTitle("**💬Daftar Perintah**\n") 
            .addField(" - avatar", "Menampilkan Foto Profil Kamu.") 
            .addField(" - ping", "Nanti Akan Dijawab PONG.") 
            .setColor(0x36FF00) 
            .setFooter("Ⓒ 2018 Example Bot."); 
        var embedhelpadmin = new Discord.RichEmbed() 
            .setTitle("**💬Daftar Perintah Khusus Moderator**\n")
            .addField(" - prune", "Hapus Hingga `99` Obrolan. (>prune [1 - 99])") 
            .addField(" - kick", "Kick Seseorang Dari Server. (>kick @username [alasan])") 
            .setColor(0x00FFEE) 
            .setFooter("Ⓒ 2018 Example Bot.");
            message.delete() 
            message.channel.send(embedhelpmember)
        if(message.member.hasPermission('MANAGE_MESSAGES')) return message.author.sendMessage(embedhelpadmin); 
    };

    if (command == "avatar") { 
        message.channel.send({ 
               embed: { 
                  title: `Foto Profil ${message.author.displayAvatarURL}`, 
                  image: { 
                      url: message.author.AvatarURL 
                  }, 
                  color: 0xFFFFFF 
               } 
        }) 
    }; 

    if (command == "ping") { 
        message.channel.send("**:ping_pong:Pong!**"); 
    };

    if(command === "prune") { 
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("**🔒 Maaf, kamu tidak memiliki Izin untuk melakukan ini!**"); 
        var messagesToDelete = args[1]; 
        if (!args[1]) return message.reply("Berapa banyak jumlah pesan yang ingin kamu **Hapus**?"); 
        if (args[1] > 99) return message.reply("Maksimal jumlah pesan yang dapat kamu **Hapus** adalah `99`."); 
        message.channel.fetchMessages({limit: messagesToDelete}) 
        .then(messages => message.channel.bulkDelete(messages.size + 1)) 
        .catch(error => message.channel.send(`❌ Maaf ${message.author}, Gagal meng**hapus** karena: **${error}**.`)); 
    };

    if(command == "kick") { 
        message.delete() 
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); 
        if(!kUser) return message.channel.send("❌ Mohon **@mention** orang yang kamu tuju!"); 
        let kReason = args.join(" ").slice(0); 
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**🔒 Maaf, kamu tidak memiliki Izin untuk melakukan ini!**"); 
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("❌ Gagal **Kick**, *membutuhkan Role lebih tinggi darinya, serta Izin yang tepat*."); 
    
        let kickEmbed = new Discord.RichEmbed() 
        .setDescription("**👢 Kicked**") 
        .setColor(0xFF6767) 
        .addField("Pengguna", `${kUser}`) 
        .addField("Moderator", `<@${message.author.id}>`) 
        .addField("Reason", kReason); 
    
        let adminlog = message.guild.channels.find(`name`, "mod-logs"); 
        if(!adminlog) return message.channel.send("❌ Channel **#mod-logs** tidak ditemukan."); 
        message.guild.member(kUser).kick(kReason); 
        adminlog.send(kickEmbed); 
    }; 
	
// Bot Login
	
});
bot.login(process.env.BOT_TOKEN); 

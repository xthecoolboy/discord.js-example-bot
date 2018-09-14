const Discord = require("discord.js"); 
const PREFIX = ">"; 

var bot = new Discord.Client(); 

bot.on("ready", function() { 
    bot.user.setGame("Bantuan? | >help"); 
    console.log(`${bot.user.username} Sedang ONLINE!`); 
});

bot.on("message", function(message) { 

    if (message.author.equals(bot.user)) return; 

    if (!message.content.startsWith(PREFIX)) return; 

    if (!message.guild) return; 
    
    var args = message.content.substring(PREFIX.length).split(" "); 
    var command = args[0].toLowerCase(); 
    var mutedrole = message.guild.roles.find("name", "Muted"); 


    if (command == "help") { 
        var embedhelpmember = new Discord.RichEmbed() 
            .setTitle("**💬Daftar Perintah**\n") 
            .addField(" - help", "Menampilkan Bantuan Ini.") 
            .addField(" - botinfo", "Menampilkan Info Mengenai BOT Ini.") 
            .addField(" - userinfo", "Menampilkan Sedikit Informasi Kamu.") 
            .addField(" - serverinfo", "Menampilkan Sedikit Informasi Mengenai Server.") 
            .addField(" - pp", "Menampilkan Foto Profil Kamu.") 
            .addField(" - ping", "Nanti Dijawab PONG!") 
            .addField(" - weather", "Ramalkan Cuaca Hari Ini (>weather -[kota])") 
            .addField(" - cookie", "Beri Kue Untuk Orang Yang Kamu Tuju:cookie: (>cookie @username)") 
            .addField(" - tanya", "Menjawab Semua Pertanyaan Kamu! (>tanya [pertanyaan])") 
            .setColor(0x36FF00) 
            .setFooter("ⒸForceStop Essentials. ⚠️: BOT Ini Sedang Dalam Tahap Pengujian BETA, Jikalau Anda Menemukan Semacam Bug, Mohon Laporkan Ke @ForceStop Gaming#4120 !"); 
        var embedhelpadmin = new Discord.RichEmbed() 
            .setTitle("**💬Daftar Perintah Khusus Moderator**\n") 
			.addField(" - test", "Untuk Memeriksa Apakah BOT Berfungsi Dengan Baik.") 
            .addField(" - say", "Untuk Membuat BOT Berkata Apa Yang Kamu Inginkan. (>say [pesan])") 
            .addField(" - prune", "Hapus Hingga `99` Obrolan. (>prune [1 - 99])") 
            .addField(" - mute", "Mute Seseorang Beserta Alasannya. (>mute @username [alasan])") 
            .addField(" - unmute", "Unmute Seseorang. (>unmute @username)") 
            .addField(" - kick", "Kick Seseorang Dari Server. (>kick @username [alasan])") 
            .addField(" - ban", "Ban Seseorang Dari Server. (>ban @username [alasan]") 
            .addField(" - unban", "(**Saat Ini Belum Bekerja**) Unban Seseorang Dari Server. (>unban @username)\n")  
			.addField(" **PERINGATAN**", "(**⚠️Moderator Memerlukan Role Yang Bernama `Staff` Untuk Dapat Mengakses Semua Perintah Ini!**") 
            .setColor(0x00FFEE) 
            .setFooter("ⒸForceStop Essentials. ⚠️: BOT Ini Sedang Dalam Tahap Pengujian BETA, Jikalau Anda Menemukan Semacam Bug, Mohon Laporkan Ke @ForceStop Gaming#4120 !"); 
            message.delete() 
            message.channel.send(embedhelpmember) 
        if(message.member.roles.some(r=>["Staff"].includes(r.name)) ) return message.author.sendMessage(embedhelpadmin); 
    };

    if (command == "botinfo") { 
        let bicon = bot.user.displayAvatarURL; 
        var embedhelpmember = new Discord.RichEmbed() 
            .setTitle("**:robot:About Me!**\n") 
            .addField(" Bio", "Hi! Namaku Wumpy! BOT Yang Memiliki Fitur Mulai Dari Moderation, Fun, dll. Jadi Terus Support Aku Yakk...:smile:") 
            .addField(" Nama", "**@Wumpy!#8157**") 
            .addField(" Library", "discord.js") 
            .addField(" Prefix", "`>`") 
            .addField(" Dibuat Pada", "01 Mei 2018") 
            .addField(" Language", ":flag_id:**Indonesian**") 
            .addField(" Developer", "@ForceStop Gaming#4120") 
            .setColor(0x6500FF) 
            .setThumbnail(bicon) 
            .setTimestamp() 
            .setFooter("ⒸForceStop Essentials. ⚠️: BOT Ini Sedang Dalam Tahap Pengujian BETA, Jikalau Anda Menemukan Semacam Bug, Mohon Laporkan Ke @ForceStop Gaming#4120 !"); 
            message.channel.send(embedhelpmember) 
            timestamp: new Date() 
    };

    if(command == "userinfo") { 
        let bicon = message.author.displayAvatarURL; 
        var embedhelpmember = new Discord.RichEmbed() 
            .setDescription("**Informasi Pengguna**\n") 
            .setColor(0x6500FF) 
            .setThumbnail(bicon) 
            .setTimestamp() 
            .addField("Nama Pengguna", `${message.author.username}#${message.author.discriminator}`, true) 
            .addField("ID", message.author.id, true) 
            .addField("Dibuat Pada", message.author.createdAt, true) 
            .setFooter("ⒸForceStop Essentials. ⚠️: BOT Ini Sedang Dalam Tahap Pengujian BETA, Jikalau Anda Menemukan Semacam Bug, Mohon Laporkan Ke @ForceStop Gaming#4120 !"); 
            message.channel.send(embedhelpmember) 
            timestamp: new Date() 
    };

    if(command == "serverinfo") { 
        let sicon = message.guild.iconURL; 
        if(!sicon) return message.channel.send(`Server Ini Tidak Memiliki Logo!`) 
        let serverembed = new Discord.RichEmbed() 
        .setDescription(`ID Server : ${message.guild.id} 
      Nama Server : ${message.guild.name}\n`) 
        .setColor(0x6D85CA) 
        .setThumbnail(`${message.guild.iconURL}`) 
        .setAuthor(`${message.guild.name}`, `${message.guild.iconURL}`) 
        .addField("Lokasi Server", `${message.guild.region}`) 
        .addField("Jumlah Anggota", `${message.guild.memberCount}`) 
        .addField("Jumlah Channel", `${message.guild.channels.size}`) 
        .addField("Jumlah Pangkat", `${message.guild.roles.size}`) 
        .addField("Pemilik Server", `${message.guild.owner.displayName}`) 
        .addField("Dibuat Pada", `${message.guild.createdAt}`) 
        .setTimestamp() 
        .setFooter("ⒸForceStop Essentials. ⚠️: BOT Ini Sedang Dalam Tahap Pengujian BETA, Jikalau Anda Menemukan Semacam Bug, Mohon Laporkan Ke @ForceStop Gaming#4120 !"); 
        return message.channel.send(serverembed); 
    };

    if (command == "weather") { 
        let apiKey = "590a7c51bf89725644d211b87dfb62c3"; 
        const fetch = require('node-fetch'); 
        let arg = message.content.split(' ').join(' ').slice(10); 
        if (!arg) { 
            return message.reply('Mohon Masukkan Nama **Kota** Yang Dituju.'); 
        } 
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + arg + '&APPID=' + apiKey + '&units=metric') 
            .then(res => { 
                return res.json(); 
            }).then(json => { 
                if (json.main == undefined) { 
                    return message.reply(`**${arg}**❌Tidak Ditemukan, Mohon Periksa Kembali.`); 
                } 
                let rise = json.sys.sunrise; 
                let date = new Date(rise * 1000); 
                let timestr = date.toLocaleTimeString(); 
                let set = json.sys.sunset; 
                let setdate = new Date(set * 1000); 
                let timesstr = setdate.toLocaleTimeString(); 
                const embed = new Discord.RichEmbed() 
              .setColor(0xFFE200) 
              .setTitle(`Negara: :flag_${json.sys.country.toLowerCase()}: **${json.name}**`) 
                .addField("**Humidity:**", `${json.main.humidity}%`, true) 
                .addField("**🌡Temperatur:**", `${json.main.temp}°C`, true) 
                .addField("**☁Kecepatan Angin:**", `${json.wind.speed}m/s`, true) 
                .addField("**🌄Terbit:**", `${timesstr}`, true) 
                .addField("**🌅Terbenam:**", `${timestr}`, true) 
                .setTimestamp() 
                .setFooter(`Peramal : ${message.author.username}#${message.author.discriminator}`) 
                message.channel.send({embed}) 
              .catch(console.error); 
            }).catch(err => { 
                if (err) { 
                    message.channel.send('❌Terjadi Kesalahan Saat Mencoba.'); 
                } 
            }); 
    };

    if (command == "pp") { 
        message.channel.send({ 
               embed: { 
                  title: `Foto Profil ${message.author.displayAvatarURL}`, 
                  image: { 
                      url: message.author.AvatarURL 
                  }, 
                  color: 0xFFFFFF 
               } 
        }) 
        } 

    if (command == "ping") { 
        message.channel.send("**:ping_pong:Pong!**"); 
    };

    if (command == "cookie") { 
        if (args[1]) message.channel.send(message.author.toString() + "** Memberikan " + args[1].toString() + " Sebuah Kue:cookie:!**"); 
        else message.channel.send("Kamu Mau Kasih Kue-nya Untuk Siapa:cookie:? (**>cookie @username)**"); 
    };

    if (command == "test") { 
        if (!message.member.roles.some(r=>["Staff"].includes(r.name)) ) return message.reply("**🔒Maaf, Kamu Tidak Memiliki Izin Untuk Melakukan Ini!**"); 
        message.channel.send("**Bekerja Dengan `BAIK`:thumbsup:**"); 
    };

    if(command === "prune") { 
        if (!message.member.roles.some(r=>["Staff"].includes(r.name)) ) return message.reply("**🔒Maaf, Kamu Tidak Memiliki Izin Untuk Melakukan Ini!**"); 
        var messagesToDelete = args[1]; 
        if (!args[1]) return message.reply("Berapa Banyak Pesan Yang Ingin Kamu Hapus? (**>prune [1 - 99]**)"); 
        if (args[1] > 99) return message.reply("Maksimal Jumlah Pesan Yang Dapat Kamu Hapus Adalah `99`"); 
        message.channel.fetchMessages({limit: messagesToDelete}) 
        .then(messages => message.channel.bulkDelete(messages.size + 1)) 
        .catch(error => message.channel.send(`❌Maaf ${message.author}, Gagal **Menghapus** Karena: **${error}**`)); 
    };

    if (command == "mute") { 
        message.delete() 
        if (!message.member.roles.some(r=>["Staff"].includes(r.name)) ) return message.reply("**🔒Maaf, Kamu Tidak Memiliki Izin Untuk Melakukan Ini!**"); 
        var mutedmember = message.mentions.members.first(); 
        if (!mutedmember) return message.reply("Mohon @Mention Orang Yang Kamu Tuju! (**>mute @username [alasan]**)"); 
        message.delete() 
        if (mutedmember.hasPermission("MUTE_MEMBERS")) return message.reply("❌Gagal **Mute**. **(Membutuhkan Role Lebih Tinggi Darinya, Serta Izin Yang Spesial.)**"); 
        var mutereasondelete = 10 + mutedmember.user.id.length; 
        var mutereason = message.content.substring(mutereasondelete).split(" "); 
        var mutereason = mutereason.join(" "); 
        if (!mutereason) return message.reply("Mohon Sertakan Juga Alasan **Mute**! (**>mute @username [alasan]**)"); 
        mutedmember.addRole(mutedrole) 
            .catch(error => message.channel.send(`❌Maaf ${message.author}, Gagal **Mute** Karena: **${error}**`)); 
        message.channel.send(`🔇${mutedmember.user} Telah di **Mute** Oleh ${message.author} Karena: **${mutereason}**`); 
    };

    if (command == "unmute") { 
        message.delete() 
        if (!message.member.roles.some(r=>["Staff"].includes(r.name)) ) return message.reply("**🔒Maaf, Kamu Tidak Memiliki Izin Untuk Melakukan Ini!**"); 
        var unmutedmember = message.mentions.members.first(); 
        if (!unmutedmember) return message.reply("Mohon @Mention Orang Yang Kamu Tuju! (**>unmute @username**)"); 
        message.delete() 
        unmutedmember.removeRole(mutedrole) 
            .catch(error => message.channel.send(`❌Maaf ${message.author}, Gagal **Unmute** Karena: **${error}**`)); 
        message.channel.send(`🔊${unmutedmember.user} Telah di **Unmute** Oleh ${message.author}!`); 
    };

    if(command == "kick") { 
        message.delete() 
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); 
        if(!kUser) return message.channel.send("❌Pengguna Tidak Ditemukan!"); 
        let kReason = args.join(" ").slice(0); 
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**🔒Maaf, Kamu Tidak Memiliki Izin Untuk Melakukan Ini!**"); 
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("❌Gagal **Kick**. **(Membutuhkan Role Lebih Tinggi Darinya, Serta Izin Yang Spesial.)**"); 
    
        let kickEmbed = new Discord.RichEmbed() 
        .setDescription("**👢Kicked**") 
        .setColor(0xFF6767) 
        .addField("Pengguna", `${kUser}`) 
        .addField("Moderator", `<@${message.author.id}>`) 
        .addField("Di", message.channel) 
        .addField("Pada", message.createdAt) 
        .addField("Alasan", kReason); 
    
        let adminlog = message.guild.channels.find(`name`, "mod-logs"); 
        if(!adminlog) return message.channel.send("Channel #mod-logs Tidak Ditemukan."); 
        message.guild.member(kUser).kick(kReason); 
        adminlog.send(kickEmbed); 
    };

    if(command == "ban") { 
        message.delete() 
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); 
        if(!bUser) return message.channel.send("❌Pengguna Tidak Ditemukan!"); 
        let bReason = args.join(" ").slice(0); 
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**🔒Maaf, Kamu Tidak Memiliki Izin Untuk Melakukan Ini!**"); 
        if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("❌Gagal **Ban**. **(Membutuhkan Role Lebih Tinggi Darinya, Serta Izin Yang Spesial.)**"); 
    
        let banEmbed = new Discord.RichEmbed() 
        .setDescription("**🚪Banned**") 
        .setColor(0xFF0000) 
        .addField("Pengguna", `${bUser}`) 
        .addField("Moderator", `<@${message.author.id}>`) 
        .addField("Di", message.channel) 
        .addField("Pada", message.createdAt) 
        .addField("Alasan", bReason); 
    
        let adminlog = message.guild.channels.find(`name`, "mod-logs"); 
        if(!adminlog) return message.channel.send("Channel #mod-logs Tidak Ditemukan."); 
        message.guild.member(bUser).ban(bReason); 
        adminlog.send(banEmbed); 
    };
//    if (command == "unban") { 
//        if (!message.member.roles.some(r=>["Staff"].includes(r.name)) ) return message.reply("Maaf, Kamu Tidak Memiliki Izin Untuk Melakukan Ini!"); 
//        var unbannedmember = message.mentions.members.first().id 
//        message.guild.unban(unbannedmember) 
//            .catch(error => message.channel.send(`❌Maaf ${message.author}, Gagal **Unban** Karena: **${error}**`)); 
//        message.channel.send(`⛏${unbannedmember.user} Telah di **Unban** Oleh ${message.author}`); 
//     };


});
bot.login(process.env.BOT_TOKEN); 
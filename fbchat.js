var login = require("facebook-chat-api");
var hasChangedColor = false;
var hasChangedEmoji = false;

login({email: "", password: ""}, function callback (err, api) {
    api.setOptions({selfListen: true})
    if(err) return console.error(err);

    api.listen(function callback(err, message) {
        if (!message || !message.body) return;


        if (message.body.indexOf('fb color') > -1) {
            if (hasChangedColor) return;
            hasChangedColor = true;

            const color = message.body.split(' ')[2];

    		api.changeThreadColor(color, message.threadID, function callback(err) {
    		    if (err) {
    		    	api.sendMessage("fak.", message.threadID);
    		    	return console.error(err);
    		    }

    		    hasChangedColor = false;
    		});
    	}

        if (message.body.indexOf('fb emoji') > -1) {
            if (hasChangedEmoji) return;
            hasChangedEmoji = true;

            const emoji = message.body.split(' ')[2];

            api.changeThreadEmoji(emoji, message.threadID, function callback(err) {
                if (err) {
                    api.sendMessage("fak.", message.threadID);
                    return console.error(err);
                }

                hasChangedEmoji = false;
            });
        }
    });
});

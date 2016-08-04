var login = require("facebook-chat-api");
var hasChangedColor = false;
var hasChangedEmoji = false;

login({email: "", password: ""}, function callback (err, api) {
    api.setOptions({selfListen: true})
    if(err) return console.error(err);

    api.listen(function callback(err, message) {
    	if (message.body.indexOf('fb go black') > -1) {
	    	if (hasChangedColor) return;
    		hasChangedColor = true;

    		api.changeThreadColor("#222427", message.threadID, function callback(err) {
    		    if (err) {
    		    	api.sendMessage("fak.", message.threadID);
    		    	return console.error(err);
    		    }

    		    hasChangedColor = false;
    		});
    	}

        if (message.body.indexOf('ice cream emoji for claire plz') > -1) {
            if (hasChangedEmoji) return;
            hasChangedEmoji = true;

            api.changeThreadEmoji("🍦", message.threadID, function callback(err) {
                if (err) {
                    api.sendMessage("fak.", message.threadID);
                    return console.error(err);
                }

                hasChangedEmoji = false;
            });
        }

    	if (message.body.indexOf('delete msg') > -1) {
    		var params = message.body.split(' ');
    		var num = parseInt(params[2]);

    		if (!Number.isInteger(num)) return;

    		api.getThreadHistory(message.threadID, 0, num, new Date().getTime(), function callback(err, history) {
    			for (var i = 0; i < history.length; i++) {
    				api.deleteMessage(history[i].messageID);
    			}
    		});
    	}
    });
});

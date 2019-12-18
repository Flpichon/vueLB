'use strict';

module.exports = function(User) {
    User.beforeRemote('login', (ctx, instance, next) => {
        ctx.req.body.ttl = 20;
        next();
    });

    User.prototype.isValidToken = function(tokenId) {
				return new Promise((resolve, reject) => {
					return User.app.models.AccessToken.resolve(tokenId, (err, token) => {
						if (err) {
							resolve({token: false})
						} else {
							resolve({token: true});
						}
					})
				})
    };

    User.remoteMethod('prototype.isValidToken', {
        http: {verb: 'GET', path: '/isValidToken/:fk'},
        accepts: [
            {arg: "fk", type: "string"}
        ],
        returns: {arg: 'check', type: 'object', root: true}
    });
};
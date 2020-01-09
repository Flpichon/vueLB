module.exports = function(app) {
    const remote = app.remotes();
    remote.before('**', function(ctx, next) {
        if (ctx.method.name !== 'logout' && ctx.method.name !== 'login') {
            if (typeof ctx.args.options !== 'undefined') {
                if (typeof ctx.args.options.accessToken !== 'undefined' && ctx.args.options.accessToken !== null) {
                    const tokenId = ctx.args.options.accessToken.id;
                    app.models.AccessToken.resolve(tokenId, (err, token) => {
                        if (!err && token) {
                            token.created = new Date();
                            token.ttl = 900;
                            token.save(next);
                        }
                    });
                } else {
                    next();
                }
            } else {
                next();
            }
        } else {
            next();
        }
    });
}
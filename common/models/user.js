'use strict';

module.exports = function(User) {
    User.beforeRemote('login', (ctx, instance, next) => {
        ctx.req.body.ttl = 20;
        next();
    });
};
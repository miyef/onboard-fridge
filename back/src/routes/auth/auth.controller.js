const request = require('request-promise');

function login(ctx) {
    const redirectUrl =
        'https://my.ecp.fr/oauth/v2/auth?' +
        'response_type=code' +
        '&' +
        `client_id=${process.env.MYECP_CLIENT_ID}` +
        '&' +
        'redirect_uri=http://localhost:3000/auth/callback' +
        '&' +
        `state=${ctx.session.key}`;
    ctx.redirect(redirectUrl);
}

async function callback(ctx) {
    if (ctx.session.key === ctx.query.state) {
        const response = await request.post('https://my.ecp.fr/oauth/v2/token').form({
            code: ctx.query.code,
            client_id: process.env.MYECP_CLIENT_ID,
            client_secret: process.env.MYECP_CLIENT_SECRET,
            grant_type: 'authorization_code',
            state: 'test',
            redirect_uri: 'http://localhost:3000/auth/callback',
        });
        const { access_token } = JSON.parse(response);
        ctx.body = await request
            .get('https://my.ecp.fr/api/v1/members/me')
            .auth(null, null, true, access_token);
    } else {
        ctx.body = 'Incorrect State';
    }
}

module.exports = { login, callback };

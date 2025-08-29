import { redis } from "./redis.js";

let accessToken = null;
let accessTokenExp = 0;
let refreshTimer = null;

function scheduleRefresh(expiresIn, refreshToken) {
    console.log(`Refreshing token`);
    if (refreshTimer) clearTimeout(refreshTimer);

    const msUntilRefresh = Math.max((expiresIn - 60) * 1000, 5000);
    refreshTimer = setTimeout(() => {
        console.log(`handling refresh`);
        doRefresh(refreshToken).then(a=>console.log("done refresh")).catch(err => {
            console.error('Auto-refresh failed', err);
        });
    }, msUntilRefresh);
}

export async function doRefresh(refreshToken) {
    const body = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.CLIENT_ID,
        // If your app type requires it:
        client_secret: process.env.CLIENT_SECRET
    });

    const res = await fetch(process.env.TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(`Refresh failed: ${res.status} ${JSON.stringify(data)}`);
    }
    else {
        console.log("refresh succeeded");
    }

    // Store new refresh token if provider rotated it
    if (data.refresh_token) {
        await redis.set("UPWORK_REFRESH_TOKEN", data.refresh_token);
        //await keytar.setPassword(SERVICE, ACCOUNT, data.refresh_token);
    }

    scheduleRefresh(data.expires_in, data.refresh_token);

    accessToken = data.access_token;
    accessTokenExp = Date.now() + data.expires_in * 1000;
    await redis.set("UPWORK_TOKEN_EXPIRY", accessTokenExp);
    await redis.set("UPWORK_ACCESS_TOKEN", accessToken);

    return data; // { access_token, refresh_token?, expires_in, ... }
}

async function exchangeAuthCodeAndStore(code) {
    console.log(`Exchange Auth Code: ${code}`);

    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_secret: process.env.CLIENT_SECRET,
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI
    });

    const res = await fetch(process.env.TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
    });

    const data = await res.json();

    console.log("data from exchange", JSON.stringify(data, null, 2));

    if (!res.ok) {
        throw new Error(`Token exchange failed: ${res.status} ${JSON.stringify(data)}`);
    }

    // Save access token in memory
    accessToken = data.access_token;
    accessTokenExp = Date.now() + data.expires_in * 1000;
    await redis.set("UPWORK_TOKEN_EXPIRY", accessTokenExp);
    await redis.set("UPWORK_ACCESS_TOKEN", accessToken);

    // Save refresh token securely
    if (data.refresh_token) {
        await redis.set("UPWORK_REFRESH_TOKEN", data.refresh_token);
        //await keytar.setPassword(SERVICE, ACCOUNT, data.refresh_token);
    }

    scheduleRefresh(data.expires_in, data.refresh_token);
}

export const handle401 = async () => {
    try {
        const refreshToken = await redis.get("UPWORK_REFRESH_TOKEN");
        if (refreshToken) {
            console.log('401 received, attempting token refresh...');
            const data = await doRefresh(refreshToken);
            accessToken = data.access_token;
            accessTokenExp = Date.now() + data.expires_in * 1000;
            await redis.set("UPWORK_TOKEN_EXPIRY", accessTokenExp);
            await redis.set("UPWORK_ACCESS_TOKEN", accessToken);
            scheduleRefresh(data.expires_in, data.refresh_token || refreshToken);
            return true; // refreshed successfully
        }
    } catch (err) {
        console.error('Refresh after 401 failed:', err);
    }

    // If we got here, refresh was not possible or failed
    accessToken = null;
    return false;
};

export const isLoggedIn = async () => {
    const token = await getAuthToken();
    const expiry = await getAuthExpiry();
    return token && Date.now() < Number(expiry);
}

const retrieveExpiry = async () => {
    return await redis.get("UPWORK_TOKEN_EXPIRY");
}

const retrieveAuthToken = async () => {
    return await redis.get("UPWORK_ACCESS_TOKEN");
}

export const getAuthExpiry = async () => {
    return accessTokenExp || await retrieveExpiry() || 0;
}

export const getAuthToken = async () => {
    return accessToken || await retrieveAuthToken();
}

export const logIn = async (code) => {
    try {
        await exchangeAuthCodeAndStore(code);
        return { ok: true, message: 'Logged in' };
    } catch (err) {
        console.error('Auth failed', err);
        return { ok: false, message: err.message };
    }
}
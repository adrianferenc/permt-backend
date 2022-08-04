const axios = require('axios');

module.exports = {
    buyAPermit,
    viewPermits,
};

async function customerAccessLoginAction() {
    try {
        const res = await axios({
            method: 'POST',
            url: 'https://prdwmq.etimspayments.com/pbw/customerAccessLoginAction.doh',
            data: `clientcode=1W&clientAccount=5&requestType=signin&loginAttemptCount=0&parking=&processType=RPP&userName=${process.env.EMAIL}&password=${process.env.PW}&signin=Sign+In`,
            headers: {
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'max-age=0',
                dnt: 1,
                origin: 'https://prdwmq.etimspayments.com',
                referer:
                    'https://prdwmq.etimspayments.com/pbw/dispatchPageAction.doh?clientcode=1W&requestType=logOff&processType=RPP',
                'sec-ch-ua': `".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"`,
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': `"macOS"`,
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': 1,
            },
        });
        const JSESSIONID = res.headers['set-cookie'][0].split(';')[0];
        const visid_incap_2087381 = res.headers['set-cookie'][1].split(';')[0];
        const incap_ses_32_2087381 = res.headers['set-cookie'][2].split(';')[0];
        const cookie = `${visid_incap_2087381}; ${incap_ses_32_2087381}; ${JSESSIONID}`;
        return cookie;
    } catch (e) {
        console.log('customerAccessLoginAction');
    }
}

async function accountSummaryRequestAction(cookie) {
    try {
        const res = await axios({
            method: 'POST',
            url: 'https://prdwmq.etimspayments.com/pbw/accountSummaryRequestAction.doh',
            data: `clientcode=1W&clientAccount=5&userName=${process.env.EMAIL}&requestType=permitaccountdetails&processType=RPP`,
            headers: {
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'max-age=0',
                cookie,
                dnt: 1,
                origin: 'https://prdwmq.etimspayments.com',
                referer: 'https://prdwmq.etimspayments.com/pbw/customerAccessLoginAction.doh',
                'sec-ch-ua': `".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"`,
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': `"macOS"`,
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': 1,
            },
        });
        return res;
    } catch (e) {
        console.log('accountSummaryRequestAction');
    }
}

async function accountSummaryAction(action, cookie) {
    try {
        const res = await axios({
            method: 'POST',
            url: 'https://prdwmq.etimspayments.com/pbw/accountSummaryAction.doh',
            data: `clientcode=1W&clientAccount=5&userName=${process.env.EMAIL}&requestType=${action}&processType=RPP`,
            headers: {
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'max-age=0',
                cookie,
                dnt: 1,
                origin: 'https://prdwmq.etimspayments.com',
                referer: 'https://prdwmq.etimspayments.com/pbw/accountSummaryRequestAction.doh',
                'sec-ch-ua': `".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"`,
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': `"macOS"`,
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': 1,
            },
        });
        return res;
    } catch (e) {
        console.log('accountSummaryRequestAction');
    }
}

function dateFormatter(date) {
    const month =
        date.getMonth() < 9
            ? '0' + (date.getMonth() + 1).toString()
            : (date.getMonth() + 1).toString();
    const day = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString();

    const year = date.getFullYear().toString();

    return `${month}%2F${day}%2F${year}`;
}

async function rppPermitOrderAction(action, cookie) {
    try {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const res = await axios({
            method: 'POST',
            url: 'https://prdwmq.etimspayments.com/pbw/rppPermitOrderAction.doh',
            data: `clientcode=1W&clientAccount=5&requestType=${action}&permitType=VV&actionType=RPP&quantity=1&duration=1&startDate=${dateFormatter(
                today
            )}&endDate=${dateFormatter(tomorrow)}`,
            headers: {
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'max-age=0',
                cookie,
                dnt: 1,
                origin: 'https://prdwmq.etimspayments.com',
                referer: 'https://prdwmq.etimspayments.com/pbw/accountSummaryAction.doh',
                'sec-ch-ua': `".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"`,
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': `"macOS"`,
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': 1,
            },
        });
        return res;
    } catch (e) {
        console.log('rppPermitOrderAction');
    }
}

async function rppPermitOrderVerifyAction(cookie) {
    try {
        const res = await axios({
            method: 'POST',
            url: 'https://prdwmq.etimspayments.com/pbw/rppPermitOrderVerifyAction.doh',
            data: `clientcode=1W&clientAccount=5&requestType=submit&actionType=RPP`,
            headers: {
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'max-age=0',
                cookie,
                dnt: 1,
                origin: 'https://prdwmq.etimspayments.com',
                referer: 'https://prdwmq.etimspayments.com/pbw/rppPermitOrderAction.dohs',
                'sec-ch-ua': `".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"`,
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': `"macOS"`,
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': 1,
            },
        });
        return res;
    } catch (e) {
        console.log('accountSummaryRequestAction');
    }
}

async function addPlate(permitNumber, plateNumber, cookie) {
    try {
        const res = await axios({
            method: 'POST',
            url: 'https://prdwmq.etimspayments.com/pbw/accountSummaryAction.doh',
            data: `clientcode=1W&clientAccount=5&userName=${process.env.EMAIL}&requestType=permitUpdate&processType=RPP&accountNo=050329&lastName=ADRIAN+FERENC%2FCOREY+FETZER&permit=${permitNumber}&select=update&plateState=CA&newPlate=${plateNumber}&confirmPlate=${plateNumber}`,
            headers: {
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'max-age=0',
                cookie,
                dnt: 1,
                origin: 'https://prdwmq.etimspayments.com',
                referer: 'https://prdwmq.etimspayments.com/pbw/accountSummaryRequestAction.doh',
                'sec-ch-ua': `".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"`,
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': `"macOS"`,
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': 1,
            },
        });
        return res;
    } catch (e) {
        console.log('accountSummaryRequestAction');
    }
}

async function buyAPermit(plateNo) {
    //This logs in
    const cookie = await customerAccessLoginAction();
    console.log(`logged in with cookie ${cookie}`);
    await accountSummaryRequestAction(cookie);
    const freePermit = await accountSummaryAction('permitSummary0', cookie);
    const isFreePermit = freePermit.data.includes('Assign a Plate');
    console.log(`There is ${isFreePermit ? '' : ' not'} a free permit available.`);

    if (!isFreePermit) {
        //This adds a permit to the cart
        await rppPermitOrderAction('addtocart', cookie);
        await rppPermitOrderAction('checkout', cookie);

        //This gets a new permit
        await rppPermitOrderVerifyAction(cookie);
        console.log('created a new permit');
    }

    //This gets the name of the most recently obtained permit
    const res = await accountSummaryAction('permitSummary0', cookie);
    const end = res.data.indexOf('Assign a Plate');
    const start = res.data.slice(0, end).lastIndexOf(`22V`);
    const permitNumber = res.data.slice(start, start + 9);

    //This updates the plate of the most recent permit to plateNo
    await addPlate(permitNumber, plateNo, cookie);

    //This checks that plateNo has been added
    await accountSummaryRequestAction(cookie);
    const res2 = await accountSummaryAction('permitSummary0', cookie);
    console.log();

    console.log(
        res2.data.includes(plateNo.toUpperCase())
            ? `Permit ${permitNumber} updated with plate number ${plateNo}`
            : `Something has gone wrong in adding plate number ${plateNo} to ${permitNumber}`
    );
    return res2.data.includes(plateNo.toUpperCase());
}

async function viewPermits() {
    const cookie = await customerAccessLoginAction();
    await accountSummaryRequestAction(cookie);
    const res = await accountSummaryAction('permitSummary0', cookie);
    return res.data;
}

const {
    $,
    clear,
    click,
    openBrowser,
    goto,
    focus,
    write,
    textBox,
    dropDown,
    closeBrowser,
    press,
} = require('taiko');

const credentials = require('./credentials.json');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function login() {
    await dropDown({ name: 'idCategoriaHtml' }).select('42');
    await press('Tab')
    await press('Tab')
    await write(credentials.matricula);
    await press('Tab')
    await write(credentials.senha);
    await press('Enter');
}

async function renova() {
    // TODO: Implement me
}

(async () => {
    try {
        await openBrowser({
            headless: false
        });
        await goto("https://biblioteca.pucrs.br/renovacao");
        await login();
        // await renova();
        await sleep(2000);
    } catch (error) {
        console.error(error);
    } finally {
        closeBrowser();
    }
})();
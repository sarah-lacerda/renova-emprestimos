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
   // await focus(textBox({ name:'cdMatriculaHtml:'}));
    await write(credentials.matricula);
    await press('Tab')
    await write(credentials.senha);
    await press('Enter');
}

async function marcacaoDia({ dia, entrada, saida }) {
    await click($('[data-marcacao="' + dia + '"] [data-horaprimeramarcacao] input'));
    await press('Enter');
    await write(entrada);
    await click('Home Office');
    await click('Confirmar');
    await sleep(2000);

    await click($('[data-marcacao="' + dia + '"] [data-horasegundamarcacao] input'));
    await press('Enter');
    await write(saida);
    await click('Home Office');
    await click('Confirmar');
    await sleep(2000);
}

(async () => {
    try {
        await openBrowser({
            headless: false
        });
        await goto("https://biblioteca.pucrs.br/renovacao");
        await login();
        await sleep(2000);


/*        await click($("#op690"));
        await click("Apontamento");
        await focus($('#contentPaginasInternas_txtAnoMes'));
        await clear($('#contentPaginasInternas_txtAnoMes'));
        await write(mesAno);
        await press('Enter');

        for await (d of apontamento) {
            await marcacaoDia(d)
        }*/
    } catch (error) {
        console.error(error);
    } finally {
        closeBrowser();
    }
})();
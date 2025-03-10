
const ProjetosCadastroJsonClient = require('../utils/ProjetosCadastroJsonClient');
const ClientesCadastroJsonClient = require('../utils/ClientesCadastroJsonClient');

async function getProjetos() {
    var todosProjetos = [];
    console.log('solicitando projetos');
    const projetos = new ProjetosCadastroJsonClient();
    let pagina = 1;
    const registrosPorPagina = 50;
    let totalPaginas = 1;

    try {
        do {
            const filtro = {
                pagina: pagina,
                registros_por_pagina: registrosPorPagina,
                apenas_importado_api: "N"
            };

            const response = await projetos.ListarProjetos(filtro);
            todosProjetos = todosProjetos.concat(response.cadastro);

            totalPaginas = response.total_de_paginas;
            pagina++;
        } while (pagina <= totalPaginas);

        // console.table(todosProjetos);
        console.log(`Total de Projetos obtidos: ${todosProjetos.length}`);
        return todosProjetos;
    } catch (error) {
        throw new Error(`Erro ao obter Projetos ${error.message}`);
    }
};

async function getClientes() {
    var todosClientes = [];

    console.log('solicitando clientes');
    const clientes = new ClientesCadastroJsonClient();
    let pagina = 1;
    const registrosPorPagina = 50;
    let totalPaginas = 1;

    try {
        do {
            const filtro = {
                pagina: pagina,
                registros_por_pagina: registrosPorPagina,
                apenas_importado_api: "N"
            };

            const response = await clientes.ListarClientesResumido(filtro);
            todosClientes = todosClientes.concat(response.clientes_cadastro_resumido);

            totalPaginas = response.total_de_paginas;
            pagina++;

        } while (pagina <= totalPaginas);

        // console.table(todosClientes);
        console.log(`Total de Clientes obtidos: ${todosClientes.length}`);
        return todosClientes;
    } catch (error) {
        throw new Error(`Erro ao obter clientes: ${error.message}`);
    }
};

module.exports = {
    getProjetos, getClientes
};

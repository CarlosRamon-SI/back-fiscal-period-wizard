
const ProjetosCadastroJsonClient = require('../utils/ProjetosCadastroJsonClient');
const ClientesCadastroJsonClient = require('../utils/ClientesCadastroJsonClient');
const LancamentoContaReceberJsonClient = require('../utils/LancamentoContaReceberJsonClient');

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

async function getProjeto(projetoId) {
    // console.log("🚀 ~ getProjeto ~ projetoId:", projetoId)
    console.log('obtendo detalhes de Projeto');
    const projeto = new ProjetosCadastroJsonClient();

    try {
        const filtro = {
            codigo: projetoId
        };
        const response = await projeto.ConsultarProjeto(filtro);

        return response;
    } catch (error) {
        throw new Error(`Erro ao obter Projeto ${error.message}`);
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

        console.log(`Total de Clientes obtidos: ${todosClientes.length}`);
        return todosClientes;
    } catch (error) {
        throw new Error(`Erro ao obter clientes: ${error.message}`);
    }
};

async function getCliente(clientId) {

    console.log('Obtendo detalhes do cliente');
    const cliente = new ClientesCadastroJsonClient();

    try {
        const filtro = {
            codigo_cliente_omie: clientId
        };

        const response = await cliente.ConsultarCliente(filtro);
        return response;

    } catch (error) {
        throw new Error(`Erro ao obter clientes: ${error.message}`);
    }
};

async function splitNotaSemProjeto(ano, nota) {
    console.log("🚀 ~ splitNotaSemProjeto ~ nota.CodigoCliente:", nota.CodigoCliente)
    var todasContas = [];

    console.log(`Obtendo contas a receber relacionadas à ${nota.NumeroNFSe}`);
    const contasReceber = new LancamentoContaReceberJsonClient();

    let pagina = 1;
    const registrosPorPagina = 50;
    let totalPaginas = 1;

    try {
        do {
            const filtro = {
                pagina: pagina,
                registros_por_pagina: registrosPorPagina,
                apenas_importado_api: "N",
                filtrar_cliente: nota.CodigoCliente,
                filtrar_por_data_de: `01/01/${ano}`
            }

            const response = await contasReceber.ListarContasReceber(filtro);

            const contasFiltradas = [];

            if (response.conta_receber_cadastro.length >= 2) {
                contasFiltradas.push(...response.conta_receber_cadastro.filter(
                    conta => String(conta.numero_documento_fiscal) === String(nota.NumeroNFSe) && Number(conta.valor_documento) !== Number(nota.ValorNFSe)
                ));
            }
            todasContas.push(...contasFiltradas);

            totalPaginas = response.total_de_paginas;
            pagina++;

        } while (pagina <= totalPaginas);

        console.log(`Total de contas a receber no periodo informado: ${todasContas.length}`);

        if (todasContas.length > 0) return convertContasReceber(todasContas, nota);
        // TODO: RETORNO DEFAULT
    } catch (error) {
        throw new Error(`Erro ao obter Contas: ${error.message}`);
    };
};

function convertContasReceber(contas, nota) {
    let counter = 1;
    const pseudoNotas = contas
        .map(conta => ({
            NumeroNFSe: parseInt(nota.NumeroNFSe) * 1000 + counter++,
            CodigoProjeto: conta.codigo_projeto,
            CodigoCliente: conta.codigo_cliente_fornecedor,
            DataEmissao: nota.DataEmissao,
            ValorNFSe: conta.valor_documento,
            StatusNFSe: "Exigível",
            ClienteCnpjCpf: "",
            ClienteRazaoSocial: "",
            NomeProjeto: "",
            NumeroOS: 0,
            ValorOS: 0,
            NumeroContrato: "",
            Servicos: [
                {
                    CodigoServico: conta.categorias?.[0]?.codigo_categoria || "SERVICO_PADRAO",
                    ValorServico: conta.valor_documento,
                    ValorTotal: conta.valor_documento,
                    IssRetido: "N",
                    AliquotaIss: 0,
                    ValorIss: 0,
                    CodigoLC116: ""
                }
            ],
            ValorLiquido: conta.valor_documento,
            ValorTotalServicos: conta.valor_documento,
            ValorTotalServicosPorCodigo: {
                [conta.categorias?.[0]?.codigo_categoria || "SERVICO_PADRAO"]: conta.valor_documento
            },
            ValorTotalIssPorCodigo: {
                [conta.categorias?.[0]?.codigo_categoria || "SERVICO_PADRAO"]: 0
            },
            ValorTotalGeralIss: 0
        }));

    console.log(`Criadas ${pseudoNotas.length} pseudo-notas para NFSe ${nota.NumeroNFSe}`);
    return pseudoNotas;
}

module.exports = {
    getProjetos, getClientes, getProjeto, getCliente, splitNotaSemProjeto
};

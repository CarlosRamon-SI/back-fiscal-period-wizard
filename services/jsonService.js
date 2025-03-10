const jsonModel = require('../models/jsonModel');
const { exec } = require('child_process'); 
const path = require('path');
const he = require('he');
const { getProjetos, getClientes } = require('../utils/Comuns');

const { projetos, clientes } = require('../utils/base');

const NFSeJsonClient = require('../utils/NFSeJsonClient');
const NFeJsonClient = require('../utils/NFeJsonClient');

const consultaNFSe = new NFSeJsonClient();
const consultaNFe = new NFeJsonClient();

function dbackup() {
    const bat = path.resolve(__dirname, 'BackupMaker.bat');
    exec(`"${bat}"`, (error, stdout, stderr) => {
        if(error) {
            console.error('Falha ao realizar backup: ', error.message);
            return;
        }

        if(stderr) {
            console.error('Falha na execução do backup: ', stderr);
            return;
        }

        console.log('Backup Concluido: ', stdout)
    })
}

async function getNFEs(firstRequest, dataInicio, dataFim) {

    // const exclusaoCfop = ["6.915"];
    const exclusaoCfop = [];
    
    try {
        var notas = [];
        var nfeArray = [];
        const response = await consultaNFe.ListarNF(firstRequest);
        const totalPaginas = response.total_de_paginas;
        nfeArray = nfeArray.concat(response.nfCadastro);

        for (let pagina = 2; pagina <= totalPaginas; pagina++) {
            let newPage = {
                pagina: pagina,
                registros_por_pagina: 20,
                tpNF: 1,
                dEmiInicial: dataInicio,
                dEmiFinal: dataFim
            }

            let paginacao = await consultaNFe.ListarNF(newPage);
            nfeArray = nfeArray.concat(paginacao.nfCadastro);
        }

        for (let n = 0; n < nfeArray.length; n++) { 
            const nfe = nfeArray[n];

            const serie = nfe.ide.mod * 10000

            if(nfe.ide.nNF) {
                if (!exclusaoCfop.includes(nfe.det[0].prod.CFOP)) {
                    let nfeObj = {
                        DataEmissao: nfe.ide.dEmi,
                        DataCancelamento: nfe.ide.dCan,
                        NumeroNFe: Number(nfe.ide.nNF),
                        CodigoCliente: nfe.nfDestInt.nCodCli,
                        ClienteCnpjCpf: nfe.nfDestInt.cnpj_cpf,
                        ClienteRazaoSocial: he.decode(nfe.nfDestInt.cRazao),
                        CodigoProjeto: nfe.titulos.length > 0 ? nfe.titulos[0].nCodProjeto : null,
                        NomeProjeto: '',
                        ValorTotalProdutos: nfe.total.ICMSTot.vNF
                    }
                    notas.push(nfeObj);
                }
            }
        }
        
        return notas;
    } catch (error) {
        console.error("Erro ao processar NFEs: ", error);
    }
}

async function getNFSEs(firstRequest, dataInicio, dataFim) {
    
    try {
        var notas = [];
        var nfseArray = [];
        const response = await consultaNFSe.ListarNFSEs(firstRequest);
        const totalPaginas = response.nTotPaginas;
        nfseArray = nfseArray.concat(response.nfseEncontradas);

        for (let pagina = 2; pagina <= totalPaginas; pagina++) {
            let newPage = {
                nPagina: pagina,
                nRegPorPagina: 20,
                dEmiInicial: dataInicio,
                dEmiFinal: dataFim
            }

            let paginacao = await consultaNFSe.ListarNFSEs(newPage);
            nfseArray = nfseArray.concat(paginacao.nfseEncontradas);
        }

        for (let n = 0; n < nfseArray.length; n++) {
            const nfse = nfseArray[n];

            if (nfse.Cabecalho.nNumeroNFSe) {
                let nfseObj = {
                    DataEmissao: nfse.Emissao.cDataEmissao,
                    DataCancelamento: (nfse.Cabecalho.cStatusNFSe == 'F' ? '' : nfse.Cancelamento.cDataCancelamento),
                    NumeroNFSe: parseInt(nfse.Cabecalho.nNumeroNFSe) ?? '',
                    ClienteCnpjCpf: '',
                    StatusNFSe: (nfse.Cabecalho.cStatusNFSe == 'F' ? 'Exigível' : 'Cancelada'),
                    ValorNFSe: nfse.Cabecalho.nValorNFSe,
                    CodigoCliente: nfse.Cabecalho.nCodigoCliente,
                    ClienteRazaoSocial: '',
                    CodigoProjeto: nfse.Adicionais.nCodigoProjeto,
                    NomeProjeto: '',
                    NumeroOS: parseInt(nfse.OrdemServico.nNumeroOS),
                    ValorOS: nfse.OrdemServico.nValorOS,
                    NumeroContrato: nfse.OrdemServico.cNumeroContrato ?? '',
                    Servicos: nfse.ListaServicos.map(servico => {
                        return {
                            CodigoServico: servico.CodigoServico,
                            ValorServico: servico.nValorServico,
                            ValorTotal: servico.nValorTotal,
                            IssRetido: servico.cRetISS,
                            AliquotaIss: servico.nAliquotaISS,
                            ValorIss: servico.nValorISS,
                            CodigoLC116: servico.CodigoLC116
                        };
                    }),

                    ValorLiquido: nfse.Valores.nValorLiquido,
                    ValorTotalServicos: nfse.Valores.nValorTotalServicos,

                    ValorTotalServicosPorCodigo: nfse.ListaServicos.reduce((acc, servico) => {
                        const codigo = servico.CodigoServico;
                        if (!acc[codigo]) {
                            acc[codigo] = 0;
                        }
                        acc[codigo] += servico.nValorTotal;
                        return acc;
                    }, {}),

                    ValorTotalIssPorCodigo: nfse.ListaServicos.reduce((acc, servico) => {
                        const codigo = servico.CodigoServico;
                        if (!acc[codigo]) {
                            acc[codigo] = 0;
                        }
                        acc[codigo] += servico.nValorISS;
                        return acc;
                    }, {}),

                    ValorTotalGeralIss: nfse.ListaServicos.reduce((total, servico) => {
                        return total + (servico.nValorISS || 0);
                    }, 0)
                };
                notas.push(nfseObj);
            }
        };

        return notas;
    } catch (error) {
        console.error("Erro ao processar NFSEs: ", error);
    }
};

function datas(mes, ano) {
    const nomesMeses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
                        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    const mesNumero = mes - 1;
    const primeiroDia = new Date(ano, mesNumero, 1);
    const ultimoDia = new Date(ano, mes, 0);
    const diaQuinze = new Date(ano, mes, 15)
    
    const formatarData = (data) => {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const periodo = `${nomesMeses[mesNumero]}-${String(ano).slice(-2)}`;
    
    return {
        periodo: periodo,
        dataInicio: formatarData(primeiroDia),
        dataFim: formatarData(ultimoDia),
        dataVencimento: formatarData(diaQuinze)
    };
}

async function process(mes, ano, projetos, clientes) {
    try {
        await dbackup();
        const { periodo, dataInicio, dataFim, dataVencimento } = datas(mes, ano);

        const firstRequestNFSe = {
            nPagina: 1,
            nRegPorPagina: 20,
            dEmiInicial: dataInicio,
            dEmiFinal: dataFim
        };

        const firstRequestNFe = {
            pagina: 1,
            registros_por_pagina: 20,
            tpNF: 1,
            dEmiInicial: dataInicio,
            dEmiFinal: dataFim
        };
        
        const totais = {
            bruto: 0,
            servicos: 0,
            comercio: 0,
            canceladas: 0,
            registros: 0
        };
        
        const result = {
            impostos: criarEstruturaImpostos(),
            comIss: [],
            semIss: [],
            revenda: [],
            totalBruto: 0,
            totalServicos: 0,
            totalComercio: 0,
            totalCanceladas: 0,
            totalRegistros: 0,
            dataVencimento: dataVencimento,
            titulos: [],
            periodo
        };

        const clientesMap = new Map(clientes.map(c => [c.codigo_cliente, c]));
        const projetosMap = new Map(projetos.map(p => [p.codigo, p]));
        
        const notasServicos = await getNFSEs(firstRequestNFSe, dataInicio, dataFim);
        notasServicos.sort((a, b) => a.NumeroNFSe - b.NumeroNFSe);

        for (const nota of notasServicos) {
            await processarNotaServico(nota, clientesMap, projetosMap, result, totais);
        }
        
        const notasProdutos = await getNFEs(firstRequestNFe, dataInicio, dataFim);
        notasProdutos.sort((a, b) => a.NumeroNFe - b.NumeroNFe);

        for (const nota of notasProdutos) {
            await processarNotaRevenda(nota, clientesMap, projetosMap, result, totais);
        }
        
        atualizarTotais(result, totais);
        // console.log("🚀 ~ process ~ result:", JSON.stringify(result));
        return await jsonModel.insertJson(periodo, JSON.stringify(result));
    } catch (error) {
        console.error('Erro no processamento:', error);
        throw error;
    }
}

async function processarNotaServico(nota, clientesMap, projetosMap, result, totais) {
    const cliente = clientesMap.get(nota.CodigoCliente);
    const projeto = projetosMap.get(nota.CodigoProjeto);
    const projetoId = nota.CodigoProjeto;

    const dadosBase = {
        ClienteRazaoSocial: cliente ? he.decode(cliente.razao_social) : '',
        ClienteCnpjCpf: cliente?.cnpj_cpf || '',
        ProjetoNome: projeto ? he.decode(projeto.nome) : ''
    };

    const dadosNota = {
        NumeroNFSe: nota.NumeroNFSe,
        DataEmissao: nota.DataEmissao,
        DataCancelamento: nota.DataCancelamento || '',
        ValorNFSe: Number(nota.ValorNFSe.toFixed(2)),
        RetISS: nota.Servicos.IssRetido,
        StatusNFSe: nota.StatusNFSe,
        ...dadosBase,
        issRetido: 0,
        pis: 0,
        cofins: 0,
        ...(nota.Servicos.IssRetido !== 'S' ? { iss: 0 } : {})
    };

    for (const servico of nota.Servicos) {

        const estruturaProjeto = {
            projetoId,
            ProjetoNome: dadosBase.ProjetoNome,
            notas: [dadosNota]
        };

        if (servico.IssRetido === 'S') {
            let projetoExistente = result.comIss.find(p => p.projetoId === projetoId);
            if (!projetoExistente) {
                result.comIss.push(estruturaProjeto);
            } else if (!projetoExistente.notas.some(n => n.NumeroNFSe === dadosNota.NumeroNFSe)) {
                projetoExistente.notas.push(dadosNota);
            }
        } else {
            let projetoExistente = result.semIss.find(p => p.projetoId === projetoId);
            if (!projetoExistente) {
                result.semIss.push(estruturaProjeto);
            } else if (!projetoExistente.notas.some(n => n.NumeroNFSe === dadosNota.NumeroNFSe)) {
                projetoExistente.notas.push(dadosNota);
            }
            if (nota.StatusNFSe === 'Cancelada') {
                totais.canceladas += dadosNota.ValorNFSe;
            }
        }

    }
    totais.servicos += dadosNota.ValorNFSe;
    totais.registros++;
}

async function processarNotaRevenda(nota, clientesMap, projetosMap, result, totais) {
    const cliente = clientesMap.get(nota.CodigoCliente);
    const projeto = projetosMap.get(nota.CodigoProjeto);
    const projetoId = nota.CodigoProjeto;

    const dadosNota = {
        NumeroNFSe: nota.NumeroNFe,
        DataEmissao: nota.DataEmissao,
        DataCancelamento: nota.DataCancelamento || '',
        ValorNFSe: Number(nota.ValorTotalProdutos.toFixed(2)),
        RetISS: 'N',
        StatusNFSe: nota.DataCancelamento ? 'Cancelada' : 'Exigível',
        ClienteRazaoSocial: cliente ? he.decode(cliente.razao_social) : '',
        ClienteCnpjCpf: cliente?.cnpj_cpf || '',
        ProjetoNome: projeto ? he.decode(projeto.nome) : '',
        icms: 0
    };

    const estruturaProjeto = {
        projetoId,
        ProjetoNome: dadosNota.ProjetoNome,
        notas: [dadosNota]
    };

    let projetoExistente = result.revenda.find(p => p.projetoId === projetoId);
    if (!projetoExistente) {
        result.revenda.push(estruturaProjeto);
    } else if (!projetoExistente.notas.some(n => n.NumeroNFSe === dadosNota.NumeroNFSe)) {
        projetoExistente.notas.push(dadosNota);
    }

    totais.comercio += dadosNota.ValorNFSe;
    totais.registros++;
    if (nota.DataCancelamento) {
        totais.canceladas += dadosNota.ValorNFSe;
    }
}

function criarEstruturaImpostos() {
    return {
        iss: { aliquota: 0, valor: 0 },
        issRetido: { aliquota: 0, valor: 0 },
        pis: { aliquota: 0, valor: 0 },
        cofins: { aliquota: 0, valor: 0 },
        icms: { aliquota: 0, valor: 0 }
    };
}

function atualizarTotais(result, totais) {
    totais.bruto = totais.servicos + totais.comercio;
    
    Object.assign(result, {
        totalBruto: Number(totais.bruto.toFixed(2)),
        totalServicos: Number(totais.servicos.toFixed(2)),
        totalComercio: Number(totais.comercio.toFixed(2)),
        totalCanceladas: Number(totais.canceladas.toFixed(2)),
        totalRegistros: totais.registros
    });
}

async function service (mes, ano) {

    const todosProjetos = projetos || await getProjetos();
    const todosClientes =  clientes || await getClientes();
    
    if( todosProjetos.length > 0 && todosClientes.length > 0) {
        return process(mes, ano, todosProjetos, todosClientes)
    }
}

module.exports = {
    service
};

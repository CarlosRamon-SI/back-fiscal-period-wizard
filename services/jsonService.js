const jsonModel = require('../models/jsonModel');
const { exec } = require('child_process');
const path = require('path');
const he = require('he');
const { getProjetos, getClientes, getProjeto, getCliente, splitNotaSemProjeto } = require('../utils/Comuns');

const { projetos, clientes } = require('../utils/base');

const NFSeJsonClient = require('../utils/NFSeJsonClient');
const NFeJsonClient = require('../utils/NFeJsonClient');

const consultaNFSe = new NFSeJsonClient();
const consultaNFe = new NFeJsonClient();

function dbackup() {
    const bat = path.resolve(__dirname, 'BackupMaker.bat');
    exec(`"${bat}"`, (error, stdout, stderr) => {
        if (error) {
            console.error('Falha ao realizar backup: ', error.message);
            return;
        }

        if (stderr) {
            console.error('Falha na execução do backup: ', stderr);
            return;
        }

        console.log('Backup Concluido: ', stdout)
    })
}

async function getNFEs(firstRequest, dataInicio, dataFim) {
    
    const exclusaoCfop = [];

    try {
        var notas = [];
        var nfeArray = [];
        const response = await consultaNFe.ListarNF(firstRequest);
        const totalPaginas = response.total_de_paginas;
        nfeArray.push(...response.nfCadastro);

        for (let pagina = 2; pagina <= totalPaginas; pagina++) {
            let newPage = {
                pagina: pagina,
                registros_por_pagina: 20,
                tpNF: 1,
                dEmiInicial: dataInicio,
                dEmiFinal: dataFim,
                opPedido: '11'
            }

            let paginacao = await consultaNFe.ListarNF(newPage);
            nfeArray = nfeArray.concat(paginacao.nfCadastro);
        }

        for(const nfe of nfeArray) {

        // }
        // for (let n = 0; n < nfeArray.length; n++) {
        //     const nfe = nfeArray[n];

            if (nfe.ide.nNF) {
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
        console.error("Falha ao tentar obter NFEs: ", error);
        return null;
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
        console.error("Falha ao tentar obter NFSEs: ", error);
        return null;
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

async function process(mes, ano) {
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

    // TODO:    QUANDO NÃO LOCALIZAR CLIENTE OU PROJETO, REALIZAR CONSULTA DE CLIENTE NO PROCESSAMENTO
    // TODO:    AGENDAR UM CHRONO PARA ATUALIZAR BASE DE CLIENTES E PROJETOS
    
    const clientesMap = new Map(clientes.map(c => [c.codigo_cliente, c]));
    const projetosMap = new Map(projetos.map(p => [p.codigo, p]));

    const notasServicos = await getNFSEs(firstRequestNFSe, dataInicio, dataFim);

    if(!notasServicos) {
        throw new Error(`Nenhuma nota de serviço retornada.`)
    }
    notasServicos.sort((a, b) => a.NumeroNFSe - b.NumeroNFSe);

    try {   
        await processarNotasServico(notasServicos, clientesMap, projetosMap, result, totais, ano);
    } catch (error) {
        console.error('Erro no processamento de NFS-e:', error);
        throw error;
    }

    const notasProdutos = await getNFEs(firstRequestNFe, dataInicio, dataFim);
    if(!notasProdutos) {
        throw new Error(`Nenhuma nota de produto retornada.`);
    }
    notasProdutos.sort((a, b) => a.NumeroNFe - b.NumeroNFe);

    try {
        // for (const nota of notasProdutos) {
        //     await processarNotaRevenda(nota, clientesMap, projetosMap, result, totais);
        // }
        await processarNotasRevenda(notasProdutos, clientesMap, projetosMap, result, totais);
    } catch (error) {
        console.error('Erro no processamento de NF-e:', error);
        throw error;
    }

    atualizarTotais(result, totais);
    return await jsonModel.insertJson(periodo, JSON.stringify(result));
}

async function processarNotasServico(notasServicos, clientesMap, projetosMap, result, totais, ano) {
    const pseudoNotas = [];
    
    for (const nota of notasServicos) {
        
        console.log(`Iniciando processamento da nota: ${nota.NumeroNFSe}`)
        let projetoId = nota.CodigoProjeto;
        if (!projetoId) {
            console.log(`Nota sem projeto.`)
            const novasPseudoNotas = await splitNotaSemProjeto(ano, nota);
            for (const pNotas of novasPseudoNotas) {
                console.log(`${pNotas.NumeroNFSe}: ${pNotas.ValorNFSe} (${pNotas.CodigoProjeto || 'sem projeto'})`);
            }
            const totalPseudoNotas = novasPseudoNotas.reduce((sum, n) => sum + decimalParaInteiro(n.ValorNFSe), 0);
            
            console.log(`Nota ${nota.NumeroNFSe}: Valor original ${nota.ValorNFSe}, Total pseudo-notas ${totalPseudoNotas}`);
            pseudoNotas.push(...novasPseudoNotas);
            
            for (const pseudoNota of pseudoNotas) {
                if (!projetosMap.has(pseudoNota.CodigoProjeto)) {
                    const projeto = await getProjeto(pseudoNota.CodigoProjeto);
                    projetosMap.set(pseudoNota.CodigoProjeto, projeto);
                }
            }
            continue;
        }

        const projeto = projetosMap.has(nota.CodigoProjeto) ? projetosMap.get(nota.CodigoProjeto) : await getProjeto(nota.CodigoProjeto);
        const cliente = clientesMap.has(nota.CodigoCliente) ? clientesMap.get(nota.CodigoCliente) : await getCliente(nota.CodigoCliente);

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
        console.log(`Processo da nota ${nota.NumeroNFSe} concluido`)
    }
    
    if (pseudoNotas.length > 0) {
        console.log(`Iniciando processamento das pseudoNotas, que totalizam ${pseudoNotas.length} notas.`)
        await processarNotasServico(pseudoNotas, clientesMap, projetosMap, result, totais, ano)
    }
}

async function processarNotaServico(nota, clientesMap, projetosMap, result, totais, dataInicio, dataFim) {

    let projetoId = nota.CodigoProjeto;
    if (!projetoId) {
        const pseudoNotas = await splitNotaSemProjeto(dataInicio, dataFim, nota);

        for (const pseudoNota of pseudoNotas) {
            if (!projetosMap.has(pseudoNota.CodigoProjeto)) {
                const projeto = await getProjeto(pseudoNota.CodigoProjeto);
                projetosMap.set(pseudoNota.CodigoProjeto, projeto);
            }
        }
    }

    const projeto = projetosMap.has(nota.CodigoProjeto) ? projetosMap.get(nota.CodigoProjeto) : await getProjeto(nota.CodigoProjeto);
    const cliente = clientesMap.has(nota.CodigoCliente) ? clientesMap.get(nota.CodigoCliente) : await getCliente(nota.CodigoCliente);

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

async function processarNotasRevenda(notasProdutos, clientesMap, projetosMap, result, totais) {

    for(const nota of notasProdutos) {
        console.log(`Iniciando processamento da nota de Revenda ${nota.NumeroNFe}`)

        const cliente = clientesMap.has(nota.CodigoCliente) ? clientesMap.get(nota.CodigoCliente) : await getCliente(nota.CodigoCliente);

        let projeto;
        if(!nota.DataCancelamento && nota.CodigoProjeto) {
            projeto = projetosMap.has(nota.CodigoProjeto) ? projetosMap.get(nota.CodigoProjeto) : await getProjeto(nota.CodigoProjeto);
        }

        // TODO: ATUALIZAR CACHE DE CLIENTES E PROJETOS SEMPRE QUE OCORRER UM NOVO CLIENTE/PROJETO.

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
        
        const projetoExistente = result.revenda.find(p => p.projetoId === projetoId);

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
}

async function processarNotaRevenda(nota, clientesMap, projetosMap, result, totais) {
    console.log(`Iniciando processamento da nota de Revenda ${nota.NumeroNFe}`)
    const cliente = clientesMap.has(nota.CodigoCliente) ? clientesMap.get(nota.CodigoCliente) : await getCliente(nota.CodigoCliente);
    const projeto = projetosMap.has(nota.CodigoProjeto) ? projetosMap.get(nota.CodigoProjeto) : await getProjeto(nota.CodigoProjeto);
    // TODO: ATUALIZAR CACHE DE CLIENTES E PROJETOS SEMPRE QUE OCORRER UM NOVO CLIENTE/PROJETO.
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
        irpj: { aliquota: 0, valor: 0 },
        csll: { aliquota: 0, valor: 0 },
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

async function service(mes, ano) {
    if (projetos.length > 0 && clientes.length > 0) {
        return process(mes, ano)
    }
}

function decimalParaInteiro(valor) {
    const partes = valor.toString().split('.');

    if (partes.length === 1) {
        return parseInt(partes[0] + '00');
    }

    const parteInteira = partes[0];
    const parteDecimal = partes[1].padEnd(2, '0').slice(0, 2);
    return parseInt(parteInteira + parteDecimal);
}

module.exports = {
    service
};

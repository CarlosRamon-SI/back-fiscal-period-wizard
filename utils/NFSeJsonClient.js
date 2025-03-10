const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config();

const APP_KEY = process.env.OMIE_APP_KEY;
const APP_SECRET = process.env.OMIE_APP_SECRET;

const NFSeJsonClient = function () {

    this._EndPoint = "https://app.omie.com.br/api/v1/servicos/nfse/";

    this._Call = function (method, param) {
        return new Promise((resolve, reject) => {
            var server = new XMLHttpRequest();
            
            server.open("POST", this._EndPoint, true);
            server.setRequestHeader("Content-Type", "application/json");
            
            var req = JSON.stringify({ call: method, app_key: APP_KEY, app_secret: APP_SECRET, param: (param) ? param : [] });

            server.onreadystatechange = function () {
                if (server.readyState != 4) return;

                if (server.status != 200) {
                    reject(`AJAX error ${server.status}: ${server.statusText}`);
                } else {
                    resolve(JSON.parse(server.responseText));
                }
                delete server;
            };
            server.send(req);
        })
    };

    this.ListarNFSEs = async function (
        nfseListarRequest
    ) {
        return await this._Call(
            "ListarNFSEs",
            [
                nfseListarRequest
            ]
        );
    };

    this.Adicionais = function () {
        this.cCodigoCategoria = null;
        this.nCodigoCC = null;
        this.nCodigoProjeto = null;
        this.nCodigoVendedor = null;
    };

    this.Alteracao = function () {
        this.cDataAlteracao = null;
        this.cHoraAlteracao = null;
        this.cUsuarioAlteracao = null;
    };

    this.Cabecalho = function () {
        this.nNumeroNFSe = null;
        this.cSerieNFSe = null;
        this.nValorNFSe = null;
        this.cStatusNFSe = null;
        this.cCodigoVerifNFSe = null;
        this.nCodNF = null;
        this.nChaveNFe = null;
        this.cAmbienteNFSe = null;
        this.cCidadeEmissor = null;
        this.cCNPJEmissor = null;
        this.cIMEmissor = null;
        this.cCNPJDestinatario = null;
        this.cCPFDestinatario = null;
        this.cIMDestinatario = null;
        this.nCodigoCliente = null;
    };

    this.Cancelamento = function () {
        this.cDataCancelamento = null;
        this.cHoraCancelamento = null;
        this.cUsuarioCancelamento = null;
        this.cMotivoCancelamento = null;
    };
    this.Categorias = function () {
        this.cCodigoCategoria = null;
        this.nPercentualDistribuicao = null;
        this.nValorDistribuicao = null;
        this.nValorFixo = null;
    };

    this.Departamentos = function () {
        this.cCodigoDepartamento = null;
        this.nPercentualDistribuicao = null;
        this.nValorDistribuicao = null;
        this.nValorFixo = null;
    };
    this.Emissao = function () {
        this.cDataEmissao = null;
        this.cHoraEmissao = null;
        this.cUsuarioEmissao = null;
    };

    this.IBPT = function () {
        this.CodigoNBS = null;
        this.nValorEstadualIBPT = null;
        this.nValorFederalIBPT = null;
        this.nValorMunicipalIBPT = null;
        this.nAliqEstadualIBPT = null;
        this.nAliqFederalIBPT = null;
        this.nAliqMunicipalIBPT = null;
        this.cFonteIBPT = null;
        this.cChaveIBPT = null;
    };
    this.Inclusao = function () {
        this.cDataInclusao = null;
        this.cHoraInclusao = null;
        this.cUsuarioInclusao = null;
    };

    this.ListaServicos = function () {
        this.CidadePrestacao = null;
        this.CodigoLC116 = null;
        this.CodigoServico = null;
        this.cCodigoObra = null;
        this.cCodigoART = null;
        this.cCodigoEncapsulamento = null;
        this.nQuantidade = null;
        this.nValorUnitario = null;
        this.nValorServico = null;
        this.nValorTotal = null;
        this.nValorOutrasDespesas = null;
        this.nDescontoValor = null;
        this.nAliquotaISS = null;
        this.nValorISS = null;
        this.cRetISS = null;
        this.nAliquotaIR = null;
        this.nValorIR = null;
        this.cRetIR = null;
        this.nAliquotaPIS = null;
        this.nValorPIS = null;
        this.cRetPIS = null;
        this.nAliquotaCOFINS = null;
        this.nValorCOFINS = null;
        this.cRetCOFINS = null;
        this.nAliquotaCSLL = null;
        this.nValorCSLL = null;
        this.cRetCSLL = null;
        this.nAliquotaINSS = null;
        this.nValorINSS = null;
        this.cRetINSS = null;
        this.cDescricao = null;
    };

    this.nfseEncontradas = function () {
        this.Cabecalho = null;
        this.OrdemServico = null;
        this.RPS = null;
        this.Adicionais = null;
        this.Servicos = null;
        this.Valores = null;
        this.IBPT = null;
        this.Inclusao = null;
        this.Alteracao = null;
        this.Emissao = null;
        this.Cancelamento = null;
        this.ListaServicos = null;
    };

    this.OrdemServico = function () {
        this.nCodigoOS = null;
        this.nNumeroOS = null;
        this.nValorOS = null;
        this.nCodigoContrato = null;
        this.cNumeroContrato = null;
        this.cPedidoCliente = null;
        this.Departamentos = null;
        this.Categorias = null;
    };

    this.RPS = function () {
        this.nNumeroLote = null;
        this.nStatusLote = null;
        this.nNumeroRPS = null;
        this.cStatusRPS = null;
        this.cSerieRPS = null;
        this.cProtocoloRPS = null;
        this.cDataRPS = null;
    };

    this.Servicos = function () {
        this.CidadePrestacao = null;
        this.CodigoLC116 = null;
        this.CodigoServico = null;
        this.cCodigoObra = null;
        this.cCodigoART = null;
        this.cCodigoEncapsulamento = null;
        this.nQuantidade = null;
        this.nValorUnitario = null;
        this.nValorServico = null;
        this.nValorTotal = null;
        this.nValorOutrasDespesas = null;
        this.nDescontoValor = null;
        this.nAliquotaISS = null;
        this.nValorISS = null;
        this.cRetISS = null;
        this.nAliquotaIR = null;
        this.nValorIR = null;
        this.cRetIR = null;
        this.nAliquotaPIS = null;
        this.nValorPIS = null;
        this.cRetPIS = null;
        this.nAliquotaCOFINS = null;
        this.nValorCOFINS = null;
        this.cRetCOFINS = null;
        this.nAliquotaCSLL = null;
        this.nValorCSLL = null;
        this.cRetCSLL = null;
        this.nAliquotaINSS = null;
        this.nValorINSS = null;
        this.cRetINSS = null;
        this.cDescricao = null;
    };

    this.Valores = function () {
        this.nValorTotalServicos = null;
        this.nValorBaseCalculo = null;
        this.nValorDeducao = null;
        this.cIssRetido = null;
        this.nValorISS = null;
        this.nAliquotaISS = null;
        this.nValorPIS = null;
        this.nValorCOFINS = null;
        this.nValorIR = null;
        this.nValorINSS = null;
        this.nValorCSLL = null;
        this.nValorLiquido = null;
    };

    this.nfseListarRequest = function () {
        this.nPagina = null;
        this.nRegPorPagina = null;
        this.dEmiInicial = null;
        this.hEmiInicial = null;
        this.dEmiFinal = null;
        this.hEmiFinal = null;
        this.nNumeroNFSe = null;
        this.cSerieNFSe = null;
        this.cCodigoVerifNFSe = null;
        this.nCodNF = null;
        this.nChaveNFe = null;
        this.cAmbienteNFSe = null;
        this.nCodigoCliente = null;
        this.cCodigoCategoria = null;
        this.nCodigoCC = null;
        this.nCodigoProjeto = null;
        this.nCodigoVendedor = null;
        this.nCodigoOS = null;
        this.nNumeroOS = null;
        this.nCodigoContrato = null;
        this.cNumeroContrato = null;
        this.cStatusNFSe = null;
        this.cExibirDepartamentos = null;
        this.cExibirDescricao = null;
    };

    this.nfseListarResponse = function () {
        this.nPagina = null;
        this.nTotPaginas = null;
        this.nRegistros = null;
        this.nTotRegistros = null;
        this.nfseEncontradas = null;
    };

    this.omie_fail = function () {
        this.code = null;
        this.description = null;
        this.referer = null;
        this.fatal = null;
    };
};

module.exports = NFSeJsonClient;
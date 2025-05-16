var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config();

const APP_KEY = process.env.OMIE_APP_KEY;
const APP_SECRET = process.env.OMIE_APP_SECRET;

var NFConsultarJsonClient = function () {

	this._EndPoint="https://app.omie.com.br/api/v1/produtos/nfconsultar/";

	this._Call = function (method, param){
		return new Promise((resolve, reject) => {
			var server= new XMLHttpRequest();

			server.open("POST", this._EndPoint);
			server.setRequestHeader("Content-Type","application/json");

			var req=JSON.stringify({ call: method, app_key: APP_KEY, app_secret: APP_SECRET, param:(param) ? param: [] });

			server.onreadystatechange = function () {
				if(server.readyState!=4) return;
				
				if(server.status != 200) {
					reject(`AJAX error ${server.status}: ${server.statusText}`);
				} else {
					resolve(JSON.parse(server.responseText));
				}
				delete server;
			}
			server.send(req);
		})
	};

	this.ConsultarNF = function (
		nfChave
	) {
		return this._Call(
			"ConsultarNF",
			[
				nfChave
			]
		);
	};

	this.ListarNF = function (
		nfListarRequest
	) {
		return this._Call(
			"ListarNF",
			[
				nfListarRequest
			]
		);
	};

	this.Categorias= function () {
		this.cCodigoCategoria=null;
		this.nPercentualDistribuicao=null;
		this.nValorDistribuicao=null;
		this.nValorFixo=null;
	};

	this.compl= function () {
		this.nIdNF=null;
		this.nIdPedido=null;
		this.cCodCateg=null;
		this.cChaveNFe=null;
		this.nIdReceb=null;
		this.nIdTransp=null;
		this.cModFrete=null;
	};

	this.Departamentos= function () {
		this.cCodigoDepartamento=null;
		this.nPercentualDistribuicao=null;
		this.nValorDistribuicao=null;
		this.nValorFixo=null;
	};

	this.det= function () {
		this.prod=null;
		this.nfProdInt=null;
		this.itemPedido=null;
		this.rastreabilidade=null;
	};

	this.prod= function () {
		this.cProd=null;
		this.cEAN=null;
		this.xProd=null;
		this.NCM=null;
		this.EXTIPI=null;
		this.CFOP=null;
		this.uCom=null;
		this.qCom=null;
		this.vUnCom=null;
		this.vProd=null;
		this.cEANTrib=null;
		this.uTrib=null;
		this.qTrib=null;
		this.vUnTrib=null;
		this.vFrete=null;
		this.vSeg=null;
		this.vDesc=null;
		this.vOutro=null;
		this.vII=null;
		this.indTot=null;
		this.cProdOrig=null;
		this.xProdOrig=null;
		this.nCMCUnitario=null;
		this.nCMCTotal=null;
		this.vTotItem=null;
		this.vFCP=null;
		this.pCOFINS=null;
		this.vCOFINS=null;
		this.pPIS=null;
		this.vPIS=null;
		this.pISS=null;
		this.vISS=null;
		this.pIPI=null;
		this.vIPI=null;
		this.pIR=null;
		this.vIR=null;
		this.pINSS=null;
		this.vINSS=null;
		this.pCSLL=null;
		this.vCSLL=null;
		this.pICMS=null;
		this.vICMS=null;
		this.pICMSST=null;
		this.vICMSST=null;
		this.codigo_local_estoque=null;
		this.cCOFINSRetido=null;
		this.cPISRetido=null;
		this.cINSSRetido=null;
		this.cIRRetido=null;
		this.cISSRetido=null;
		this.cICMSRetido=null;
		this.cCSLLRetido=null;
		this.pFCPST=null;
		this.vFCPST=null;
		this.pFCP=null;
		this.pMVAST=null;
		this.pRedBC=null;
		this.vBCCOFINS=null;
		this.vBCST=null;
		this.vBCIPI=null;
		this.vBCISS=null;
		this.vBCPIS=null;
		this.vBCUFDest=null;
		this.vBC=null;
		this.cOrigem=null;
		this.pIcmsUfDest=null;
		this.pIcmsInterest=null;
		this.pRedBcICMDest=null;
		this.vICMDest=null;
		this.vICMRemet=null;
	};

	this.nfProdInt= function () {
		this.nCodProd=null;
		this.cCodProdInt=null;
		this.nCodItem=null;
		this.cCodItemInt=null;
	};

	this.itemPedido= function () {
		this.nIdItemPedido=null;
		this.cItemDevolvido=null;
		this.nItemQtdDevolvida=null;
	};

	this.rastreabilidade= function () {
		this.numeroLote=null;
		this.qtdeProdutoLote=null;
		this.dataFabricacaoLote=null;
		this.dataValidadeLote=null;
		this.codigoAgregacaoLote=null;
	};

	this.ICMSTot= function () {
		this.vBC=null;
		this.vICMS=null;
		this.vBCST=null;
		this.vST=null;
		this.vProd=null;
		this.vFrete=null;
		this.vSeg=null;
		this.vDesc=null;
		this.vII=null;
		this.vIPI=null;
		this.vPIS=null;
		this.vCOFINS=null;
		this.vOutro=null;
		this.vNF=null;
		this.vTotTrib=null;
		this.vICMSDesonerado=null;
		this.vBCFCP=null;
		this.vFCP=null;
		this.vBCFCPST=null;
		this.vFCPST=null;
	};

	this.ide= function () {
		this.indPag=null;
		this.mod=null;
		this.serie=null;
		this.nNF=null;
		this.dEmi=null;
		this.hEmi=null;
		this.dSaiEnt=null;
		this.hSaiEnt=null;
		this.tpNF=null;
		this.tpAmb=null;
		this.finNFe=null;
		this.dReg=null;
		this.dCan=null;
		this.dInut=null;
		this.cDeneg=null;
	};

	this.info= function () {
		this.dInc=null;
		this.hInc=null;
		this.uInc=null;
		this.dAlt=null;
		this.hAlt=null;
		this.uAlt=null;
		this.cImpAPI=null;
	};

	this.ISSQNtot= function () {
		this.vServ=null;
		this.vBC=null;
		this.vISS=null;
		this.vPIS=null;
		this.vCOFINS=null;
	};

	this.nfCadastro= function () {
		this.ide=null;
		this.nfEmitInt=null;
		this.nfDestInt=null;
		this.det=null;
		this.total=null;
		this.info=null;
		this.compl=null;
		this.titulos=null;
		this.pedido=null;
	};

	this.nfEmitInt= function () {
		this.nCodEmp=null;
		this.cCodEmpInt=null;
	};

	this.nfDestInt= function () {
		this.nCodCli=null;
		this.cCodCliInt=null;
		this.cRazao=null;
		this.cnpj_cpf=null;
	};

	this.total= function () {
		this.ICMSTot=null;
		this.ISSQNtot=null;
		this.retTrib=null;
	};

	this.titulos= function () {
		this.nCodTitulo=null;
		this.cCodIntTitulo=null;
		this.cNumTitulo=null;
		this.dDtEmissao=null;
		this.dDtVenc=null;
		this.dDtPrevisao=null;
		this.nValorTitulo=null;
		this.cCodCateg=null;
		this.dReg=null;
		this.nParcela=null;
		this.nTotParc=null;
		this.nCodProjeto=null;
		this.nCodVendedor=null;
		this.nCodComprador=null;
		this.nCodTitRepet=null;
		this.cDoc=null;
		this.cPagForma=null;
	};

	this.pedido= function () {
		this.cNumPedido=null;
		this.dIncPedido=null;
		this.hIncPedido=null;
		this.uIncPedido=null;
		this.dAltPedido=null;
		this.hAltPedido=null;
		this.uAltPedido=null;
		this.cCancelado=null;
		this.dCanPedido=null;
		this.hCanPedido=null;
		this.uCanPedido=null;
		this.cDevolvido=null;
		this.cDevParcial=null;
		this.dDevPedido=null;
		this.hDevPedido=null;
		this.uDevPedido=null;
		this.nIdVendedor=null;
		this.nIdProjeto=null;
		this.opPedido=null;
		this.nIdPedDev=null;
		this.Departamentos=null;
		this.Categorias=null;
	};

	this.nfChave= function () {
		this.cCodNFInt=null;
		this.nCodNF=null;
		this.nNF=null;
		this.serie=null;
		this.dEmi=null;
		this.tpNF=null;
		this.cChaveNFe=null;
		this.nIdPedido=null;
		this.nIdCliente=null;
		this.cnpj_cpf=null;
		this.cDetalhesPedido=null;
		this.tpAmb=null;
	};

	this.nfListarRequest= function () {
		this.pagina=null;
		this.registros_por_pagina=null;
		this.apenas_importado_api=null;
		this.ordenar_por=null;
		this.ordem_decrescente=null;
		this.filtrar_por_data_de=null;
		this.filtrar_por_data_ate=null;
		this.filtrar_apenas_inclusao=null;
		this.filtrar_apenas_alteracao=null;
		this.filtrar_por_status=null;
		this.dEmiInicial=null;
		this.hEmiInicial=null;
		this.dEmiFinal=null;
		this.hEmiFinal=null;
		this.dSaiEntInicial=null;
		this.dSaiEntFinal=null;
		this.dRegInicial=null;
		this.dRegFinal=null;
		this.dCanInicial=null;
		this.dCanFinal=null;
		this.dInutInicial=null;
		this.dInutFinal=null;
		this.tpNF=null;
		this.tpAmb=null;
		this.cSerie=null;
		this.nNFInicial=null;
		this.nNFFinal=null;
		this.cDetalhesPedido=null;
		this.cApenasResumo=null;
		this.opPedido=null;
		this.cNumeroPedidoCliente=null;
		this.nIdCliente=null;
		this.cnpj_cpf=null;
		this.ordem_descrescente=null;
	};

	this.nfListarResponse= function () {
		this.pagina=null;
		this.total_de_paginas=null;
		this.registros=null;
		this.total_de_registros=null;
		this.nfCadastro=null;
	};

	this.retTrib= function () {
		this.vRetPIS=null;
		this.vRetCOFINS=null;
		this.vRetCSLL=null;
		this.vBCIRRF=null;
		this.vIRRF=null;
		this.vBCRetPrev=null;
		this.vRetPrev=null;
	};

	this.omie_fail= function () {
		this.code=null;
		this.description=null;
		this.referer=null;
		this.fatal=null;
	};
};

module.exports = NFConsultarJsonClient;
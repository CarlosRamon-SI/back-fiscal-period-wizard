var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config();

var OMIE_APP_KEY = process.env.OMIE_APP_KEY;
var OMIE_APP_SECRET = process.env.OMIE_APP_SECRET;

var LancamentoContaReceberJsonClient = function () {

	this._EndPoint = "https://app.omie.com.br/api/v1/financas/contareceber/";

	this._Call = function (method, param) {
		return new Promise((resolve, reject) => {
			var server = new XMLHttpRequest();

			server.open("POST", this._EndPoint, true);
			server.setRequestHeader("Content-Type", "application/json");

			var req = JSON.stringify({ call: method, app_key: OMIE_APP_KEY, app_secret: OMIE_APP_SECRET, param: (param) ? param : [] });

			server.onreadystatechange = function () {
				if (server.readyState != 4) return;

				if (server.status != 200) {
					reject(`AJAX error ${server.status}: ${server.statusText}`);
				} else {
					resolve(JSON.parse(server.responseText));
				}
				delete server;
			}
			server.send(req);
		});
	};

	this.ListarContasReceber = function (
		lcrListarRequest
	) {
		return this._Call(
			"ListarContasReceber",
			[
				lcrListarRequest
			]
		);
	};

	this.IncluirContaReceber = function (
		conta_receber_cadastro
	) {
		return this._Call(
			"IncluirContaReceber",
			[
				conta_receber_cadastro
			]
		);
	};

	this.AlterarContaReceber = function (
		conta_receber_cadastro
	) {
		return this._Call(
			"AlterarContaReceber",
			[
				conta_receber_cadastro
			]
		);
	};

	this.ExcluirContaReceber = function (
		conta_receber_cadastro_chave
	) {
		return this._Call(
			"ExcluirContaReceber",
			[
				conta_receber_cadastro_chave
			]
		);
	};

	this.IncluirDistribuicaoDepartamento = function (
		rateio_cadastro
	) {
		return this._Call(
			"IncluirDistribuicaoDepartamento",
			[
				rateio_cadastro
			]
		);
	};

	this.AlterarDistribuicaoDepartamento = function (
		rateio_cadastro
	) {
		return this._Call(
			"AlterarDistribuicaoDepartamento",
			[
				rateio_cadastro
			]
		);
	};

	this.ExcluirDistribuicaoDepartamento = function (
		conta_receber_cadastro_chave
	) {
		return this._Call(
			"ExcluirDistribuicaoDepartamento",
			[
				conta_receber_cadastro_chave
			]
		);
	};

	this.LancarRecebimento = function (
		conta_receber_lancar_recebimento
	) {
		return this._Call(
			"LancarRecebimento",
			[
				conta_receber_lancar_recebimento
			]
		);
	};

	this.CancelarRecebimento = function (
		conta_receber_cancelar_recebimento
	) {
		return this._Call(
			"CancelarRecebimento",
			[
				conta_receber_cancelar_recebimento
			]
		);
	};

	this.ConciliarRecebimento = function (
		conta_receber_conciliar_request
	) {
		return this._Call(
			"ConciliarRecebimento",
			[
				conta_receber_conciliar_request
			]
		);
	};

	this.DesconciliarRecebimento = function (
		conta_receber_conciliar_request
	) {
		return this._Call(
			"DesconciliarRecebimento",
			[
				conta_receber_conciliar_request
			]
		);
	};

	this.IncluirContaReceberPorLote = function (
		conta_receber_lote
	) {
		return this._Call(
			"IncluirContaReceberPorLote",
			[
				conta_receber_lote
			]
		);
	};

	this.UpsertContaReceber = function (
		conta_receber_cadastro
	) {
		return this._Call(
			"UpsertContaReceber",
			[
				conta_receber_cadastro
			]
		);
	};

	this.UpsertContaReceberPorLote = function (
		conta_receber_lote
	) {
		return this._Call(
			"UpsertContaReceberPorLote",
			[
				conta_receber_lote
			]
		);
	};

	this.ConsultarContaReceber = function (
		lcrChave
	) {
		return this._Call(
			"ConsultarContaReceber",
			[
				lcrChave
			]
		);
	};

	this.CancelarContaReceber = function (
		conta_receber_cadastro_chave
	) {
		return this._Call(
			"CancelarContaReceber",
			[
				conta_receber_cadastro_chave
			]
		);
	};

	this.boleto = function () {
		this.cGerado = null;
		this.dDtEmBol = null;
		this.cNumBoleto = null;
		this.cNumBancario = null;
		this.nPerJuros = null;
		this.nPerMulta = null;
	};

	this.categorias = function () {
		this.codigo_categoria = null;
		this.valor = null;
		this.percentual = null;
	};

	this.conta_receber_cadastro = function () {
		this.codigo_lancamento_omie = null;
		this.codigo_lancamento_integracao = null;
		this.codigo_cliente_fornecedor = null;
		this.codigo_cliente_fornecedor_integracao = null;
		this.data_vencimento = null;
		this.valor_documento = null;
		this.codigo_categoria = null;
		this.data_previsao = null;
		this.categorias = null;
		this.id_conta_corrente = null;
		this.numero_documento = null;
		this.numero_parcela = null;
		this.codigo_tipo_documento = null;
		this.numero_documento_fiscal = null;
		this.numero_pedido = null;
		this.chave_nfe = null;
		this.observacao = null;
		this.codigo_barras_ficha_compensacao = null;
		this.codigo_cmc7_cheque = null;
		this.data_emissao = null;
		this.id_origem = null;
		this.operacao = null;
		this.valor_pis = null;
		this.retem_pis = null;
		this.valor_cofins = null;
		this.retem_cofins = null;
		this.valor_csll = null;
		this.retem_csll = null;
		this.valor_ir = null;
		this.retem_ir = null;
		this.valor_iss = null;
		this.retem_iss = null;
		this.valor_inss = null;
		this.retem_inss = null;
		this.bloqueado = null;
		this.bloquear_baixa = null;
		this.importado_api = null;
		this.baixar_documento = null;
		this.conciliar_documento = null;
		this.acao = null;
		this.lancamento_detalhe = null;
		this.distribuicao = null;
		this.status_titulo = null;
		this.codigo_vendedor = null;
		this.codigo_projeto = null;
		this.nsu = null;
		this.data_registro = null;
		this.tipo_agrupamento = null;
		this.info = null;
		this.boleto = null;
		this.nCodPedido = null;
		this.bloquear_exclusao = null;
		this.nCodOS = null;
		this.cPedidoCliente = null;
		this.cNumeroContrato = null;
		this.recebimento = null;
		this.repeticao = null;
		this.aprendizado_rateio = null;
	};

	this.lancamento_detalhe = function () {
		this.nCodInt = null;
		this.COO = null;
		this.CCF = null;
	};

	this.distribuicao = function () {
		this.cCodDep = null;
		this.cDesDep = null;
		this.nValDep = null;
		this.nPerDep = null;
	};

	this.info = function () {
		this.dInc = null;
		this.hInc = null;
		this.uInc = null;
		this.dAlt = null;
		this.hAlt = null;
		this.uAlt = null;
		this.cImpAPI = null;
	};

	this.recebimento = function () {
		this.codigo_recebimento_integracao = null;
		this.codigo_conta_corrente = null;
		this.valor = null;
		this.desconto = null;
		this.juros = null;
		this.multa = null;
		this.data = null;
		this.observacao = null;
	};

	this.repeticao = function () {
		this.antecipar = null;
		this.postergar = null;
		this.mensal = null;
		this.semanal = null;
		this.especifico = null;
	};

	this.conta_receber_cadastro_chave = function () {
		this.chave_lancamento = null;
		this.codigo_lancamento_integracao = null;
	};

	this.conta_receber_cadastro_response = function () {
		this.codigo_lancamento_omie = null;
		this.codigo_lancamento_integracao = null;
		this.codigo_status = null;
		this.descricao_status = null;
	};

	this.conta_receber_cancelar_recebimento = function () {
		this.codigo_baixa = null;
		this.codigo_baixa_integracao = null;
	};

	this.conta_receber_cancelar_recebimento_resposta = function () {
		this.codigo_baixa = null;
		this.codigo_baixa_integracao = null;
		this.codigo_status = null;
		this.descricao_status = null;
	};

	this.conta_receber_conciliar_request = function () {
		this.codigo_baixa = null;
		this.codigo_baixa_integracao = null;
	};

	this.conta_receber_conciliar_response = function () {
		this.codigo_baixa = null;
		this.codigo_baixa_integracao = null;
		this.codigo_status = null;
		this.descricao_status = null;
	};

	this.conta_receber_lancar_recebimento = function () {
		this.codigo_lancamento = null;
		this.codigo_lancamento_integracao = null;
		this.codigo_baixa = null;
		this.codigo_baixa_integracao = null;
		this.codigo_conta_corrente = null;
		this.codigo_conta_corrente_integracao = null;
		this.valor = null;
		this.juros = null;
		this.desconto = null;
		this.multa = null;
		this.data = null;
		this.observacao = null;
		this.bloqueado = null;
		this.conciliar_documento = null;
		this.nsu = null;
	};

	this.conta_receber_lancar_recebimento_resposta = function () {
		this.codigo_lancamento = null;
		this.codigo_lancamento_integracao = null;
		this.codigo_baixa = null;
		this.codigo_baixa_integracao = null;
		this.liquidado = null;
		this.valor_baixado = null;
		this.codigo_status = null;
		this.descricao_status = null;
	};

	this.conta_receber_lote = function () {
		this.lote = null;
		this.conta_receber_cadastro = null;
	};

	this.conta_receber_lote_response = function () {
		this.lote = null;
		this.codigo_status = null;
		this.descricao_status = null;
		this.status_lote = null;
	};

	this.status_lote = function () {
		this.codigo_lancamento_omie = null;
		this.codigo_lancamento_integracao = null;
		this.codigo_status = null;
		this.descricao_status = null;
	};

	this.especifico = function () {
		this.repetir_a_cada = null;
		this.repetir_por = null;
	};

	this.lcrChave = function () {
		this.codigo_lancamento_omie = null;
		this.codigo_lancamento_integracao = null;
	};

	this.lcrListarRequest = function () {
		this.pagina = null;
		this.registros_por_pagina = null;
		this.apenas_importado_api = null;
		this.ordenar_por = null;
		this.ordem_descrescente = null;
		this.filtrar_por_data_de = null;
		this.filtrar_por_data_ate = null;
		this.filtrar_apenas_inclusao = null;
		this.filtrar_apenas_alteracao = null;
		this.filtrar_por_emissao_de = null;
		this.filtrar_por_registro_de = null;
		this.filtrar_por_emissao_ate = null;
		this.filtrar_por_registro_ate = null;
		this.filtrar_conta_corrente = null;
		this.filtrar_apenas_titulos_em_aberto = null;
		this.filtrar_cliente = null;
		this.filtrar_por_status = null;
		this.filtrar_por_cpf_cnpj = null;
		this.filtrar_por_projeto = null;
		this.filtrar_por_vendedor = null;
		this.exibir_obs = null;
	};

	this.lcrListarResponse = function () {
		this.pagina = null;
		this.total_de_paginas = null;
		this.registros = null;
		this.total_de_registros = null;
		this.conta_receber_cadastro = null;
	};

	this.mensal = function () {
		this.repetir_todo_dia = null;
		this.repetir_por = null;
	};

	this.rateio_cadastro = function () {
		this.codigo_tipo_credito = null;
		this.conta_financeira = null;
		this.codigo_base_calculo = null;
		this.cst_cofins = null;
		this.cst_pis = null;
		this.job = null;
		this.percentual_rateio = null;
		this.codigo_departamento = null;
		this.valor = null;
		this.valor_fixado = null;
		this.codigo_contribuicao_social = null;
		this.chave_lancamento = null;
	};

	this.semanal = function () {
		this.repetir_dia_semana = null;
		this.repetir_por = null;
	};

	this.omie_fail = function () {
		this.code = null;
		this.description = null;
		this.referer = null;
		this.fatal = null;
	};
};
module.exports = LancamentoContaReceberJsonClient;
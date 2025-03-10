var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config();

const APP_KEY = process.env.OMIE_APP_KEY;
const APP_SECRET = process.env.OMIE_APP_SECRET;

var LancamentoContaPagarJsonClient = function () {
	
	this._EndPoint = "https://app.omie.com.br/api/v1/financas/contapagar/";

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
					resolve(server.responseText);
				}
				delete server;
			}
			server.send(req);
		});
	};

	this.IncluirContaPagarPorLote = function (
		conta_pagar_lote
	) {
		return this._Call(
			"IncluirContaPagarPorLote",
			[
				conta_pagar_lote
			]
		);
	};

	this.IncluirContaPagar = async function (
		conta_pagar_cadastro
	) {
		return await this._Call(
			"IncluirContaPagar",
			[
				conta_pagar_cadastro
			]
		);
	};

	this.AlterarContaPagar = function (
		conta_pagar_cadastro
	) {
		return this._Call(
			"AlterarContaPagar",
			[
				conta_pagar_cadastro
			]
		);
	};
	this.ExcluirContaPagar = async function (
		conta_pagar_cadastro_chave
	) {
		return this._Call(
			"ExcluirContaPagar",
			[
				conta_pagar_cadastro_chave
			]
		);
	};
	this.ConsultarContaPagar = function (
		conta_pagar_cadastro_chave
	) {
		return this._Call(
			"ConsultarContaPagar",
			[
				conta_pagar_cadastro_chave
			]
		);
	};
	this.LancarPagamento = function (
		conta_pagar_lancar_pagamento
	) {
		return this._Call(
			"LancarPagamento",
			[
				conta_pagar_lancar_pagamento
			]
		);
	};
	this.CancelarPagamento = function (
		conta_pagar_cancelar_pagamento
		
	) {
		return this._Call(
			"CancelarPagamento",
			[
				conta_pagar_cancelar_pagamento
			]
		);
	};

	this.UpsertContaPagar = function (
		conta_pagar_cadastro
	) {
		return this._Call(
			"UpsertContaPagar",
			[
				conta_pagar_cadastro
			]
		);
	};
	this.UpsertContaPagarPorLote = function (
		conta_pagar_lote
	) {
		return this._Call(
			"UpsertContaPagarPorLote",
			[
				conta_pagar_lote
			]
		);
	};
	this.ListarContasPagar = function (
		lcpListarRequest
	) {
		return this._Call(
			"ListarContasPagar",
			[
				lcpListarRequest
			]
		);
	};
	this.categorias = function () {
		this.codigo_categoria = null;
		this.valor = null;
		this.percentual = null;
	};
	this.cnab_integracao_bancaria = function () {
		this.codigo_forma_pagamento = null;
		this.banco_transferencia = null;
		this.agencia_transferencia = null;
		this.conta_corrente_transferencia = null;
		this.finalidade_transferencia = null;
		this.cpf_cnpj_transferencia = null;
		this.nome_transferencia = null;
		this.codigo_barras_boleto = null;
		this.juros_boleto = null;
		this.multa_boleto = null;
		this.pix_qrcode = null;
	};
	this.conta_pagar_cadastro = function () {
		this.codigo_lancamento_omie = null;
		this.codigo_lancamento_integracao = null;
		this.codigo_cliente_fornecedor = null;
		this.codigo_cliente_fornecedor_integracao = null;
		this.data_vencimento = null;
		this.valor_documento = null;
		this.codigo_categoria = null;
		this.categorias = null;
		this.data_previsao = null;
		this.id_conta_corrente = null;
		this.numero_documento_fiscal = null;
		this.data_emissao = null;
		this.data_entrada = null;
		this.codigo_projeto = null;
		this.observacao = null;
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
		this.distribuicao = null;
		this.numero_pedido = null;
		this.codigo_tipo_documento = null;
		this.numero_documento = null;
		this.numero_parcela = null;
		this.chave_nfe = null;
		this.codigo_barras_ficha_compensacao = null;
		this.codigo_vendedor = null;
		this.id_origem = null;
		this.info = null;
		this.operacao = null;
		this.status_titulo = null;
		this.nsu = null;
		this.acao = null;
		this.id_conta_corrente_integracao = null;
		this.bloqueado = null;
		this.baixa_bloqueada = null;
		this.codigo_cmc7_cheque = null;
		this.importado_api = null;
		this.bloquear_exclusao = null;
		this.cnab_integracao_bancaria = null;
		this.servico_tomado = null;
		this.valor_pag = null;
		this.aprendizado_rateio = null;
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
	this.servico_tomado = function () {
		this.numero_nf = null;
		this.serie_nf = null;
		this.codigo_servico = null;
		this.valor_nf = null;
		this.cst_pis = null;
		this.base_pis = null;
		this.aliquota_pis = null;
		this.valor_pis = null;
		this.cst_cofins = null;
		this.base_cofins = null;
		this.aliquota_cofins = null;
		this.valor_cofins = null;
	};
	this.conta_pagar_cadastro_chave = function () {
		this.codigo_lancamento_omie = null;
		this.codigo_lancamento_integracao = null;
	};
	this.conta_pagar_cadastro_response = function () {
		this.codigo_lancamento_omie = null;
		this.codigo_lancamento_integracao = null;
		this.codigo_status = null;
		this.descricao_status = null;
	};
	this.conta_pagar_cancelar_pagamento = function () {
		this.codigo_baixa = null;
		this.codigo_baixa_integracao = null;
	};
	this.conta_pagar_cancelar_pagamento_resposta = function () {
		this.codigo_baixa = null;
		this.codigo_baixa_integracao = null;
		this.codigo_status = null;
		this.descricao_status = null;
	};
	this.conta_pagar_lancar_pagamento = function () {
		this.codigo_lancamento = null;
		this.codigo_lancamento_integracao = null;
		this.codigo_baixa = null;
		this.codigo_baixa_integracao = null;
		this.codigo_conta_corrente = null;
		this.codigo_conta_corrente_integracao = null;
		this.valor = null;
		this.desconto = null;
		this.juros = null;
		this.multa = null;
		this.data = null;
		this.observacao = null;
	};
	this.conta_pagar_lancar_pagamento_resposta = function () {
		this.codigo_lancamento = null;
		this.codigo_lancamento_integracao = null;
		this.codigo_baixa = null;
		this.codigo_baixa_integracao = null;
		this.liquidado = null;
		this.valor_baixado = null;
		this.codigo_status = null;
		this.descricao_status = null;
	};
	this.conta_pagar_lote = function () {
		this.lote = null;
		this.conta_pagar_cadastro = null;
	};
	this.conta_pagar_lote_response = function () {
		this.lote = null;
		this.codigo_status = null;
		this.descricao_status = null;
	};
	this.lcpListarRequest = function () {
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
		this.filtrar_cliente = null;
		this.filtrar_por_cpf_cnpj = null;
		this.filtrar_por_status = null;
		this.filtrar_por_projeto = null;
		this.filtrar_por_vendedor = null;
		this.filtrar_apenas_titulos_em_aberto = null;
		this.exibir_obs = null;
	};
	this.lcpListarResponse = function () {
		this.pagina = null;
		this.total_de_paginas = null;
		this.registros = null;
		this.total_de_registros = null;
		this.conta_pagar_cadastro = null;
	};
	this.omie_fail = function () {
		this.code = null;
		this.description = null;
		this.referer = null;
		this.fatal = null;
	};
};
module.exports = LancamentoContaPagarJsonClient;
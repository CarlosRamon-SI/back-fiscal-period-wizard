const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config();

const APP_KEY = process.env.OMIE_APP_KEY;
const APP_SECRET = process.env.OMIE_APP_SECRET;

const ClientesCadastroJsonClient = function () {

	this._EndPoint = "https://app.omie.com.br/api/v1/geral/clientes/";

	this._Call = function (method, param) {
		return new Promise((resolve, reject) => {
			var server = new XMLHttpRequest();
	
			server.open("POST", this._EndPoint, true);
			server.setRequestHeader("Content-Type", "application/json");
	
			var req = JSON.stringify({ call: method, app_key: APP_KEY, app_secret: APP_SECRET, param: (param) ? param : [] });

			server.onreadystatechange = function () {
				if (server.readyState != 4) return;

				if (server.status != 200) {
					reject(new Error(`AJAX error ${server.status}: ${server.statusText}`));
					// reject(new Error(`AJAX error ${server.status}: ${server.statusText}`));
				} else {
					resolve(JSON.parse(server.responseText));
				}
				delete server;
			}
			server.send(req);
		});
	};

	this.IncluirCliente = async function (
		clientes_cadastro
	) {
		return this._Call(
			"IncluirCliente",
			[
				clientes_cadastro
			]
		);
	};

	this.AlterarCliente = async function (
		clientes_cadastro
	) {
		return this._Call(
			"AlterarCliente",
			[
				clientes_cadastro
			]
		);
	};

	this.ExcluirCliente = async function (
		clientes_cadastro_chave
	) {
		return this._Call(
			"ExcluirCliente",
			[
				clientes_cadastro_chave
			]
		)
	};

	this.ConsultarCliente = async function (
		clientes_cadastro_chave
	) {
		return this._Call(
			"ConsultarCliente",
			[
				clientes_cadastro_chave
			]
		);
	};

	this.ListarClientes = async function (
		clientes_list_request
	) {
		return this._Call(
			"ListarClientes",
			[
				clientes_list_request
			]
		);
	};

	this.ListarClientesResumido = async function (
		clientes_list_request
	) {
		return this._Call(
			"ListarClientesResumido",
			[
				clientes_list_request
			]
		);
	};

	this.IncluirClientesPorLote = async function (
		clientes_lote_request
	) {
		return this._Call(
			"IncluirClientesPorLote",
			[
				clientes_lote_request
			]
		);
	};

	this.UpsertCliente = async function (
		clientes_cadastro
	) {
		return this._Call(
			"UpsertCliente",
			[
				clientes_cadastro
			]
		);
	};

	this.UpsertClientesPorLote = async function (
		clientes_lote_request
	) {
		return this._Call(
			"UpsertClientesPorLote",
			[
				clientes_lote_request
			]
		);
	};

	this.UpsertClienteCpfCnpj = async function (
		clientes_cadastro
	) {
		return this._Call(
			"UpsertClienteCpfCnpj",
			[
				clientes_cadastro
			]
		);
	};

	this.AssociarCodIntCliente = async function (
		clientes_cadastro_chave
	) {
		return this._Call(
			"AssociarCodIntCliente",
			[
				clientes_cadastro_chave
			]
		);
	};

	this.caracteristicas = function () {
		this.campo = null;
		this.conteudo = null;
	};

	this.clientes_cadastro = function () {
		this.codigo_cliente_omie = null;
		this.codigo_cliente_integracao = null;
		this.razao_social = null;
		this.cnpj_cpf = null;
		this.nome_fantasia = null;
		this.telefone1_ddd = null;
		this.telefone1_numero = null;
		this.contato = null;
		this.endereco = null;
		this.endereco_numero = null;
		this.bairro = null;
		this.complemento = null;
		this.estado = null;
		this.cidade = null;
		this.cep = null;
		this.codigo_pais = null;
		this.separar_endereco = null;
		this.pesquisar_cep = null;
		this.telefone2_ddd = null;
		this.telefone2_numero = null;
		this.fax_ddd = null;
		this.fax_numero = null;
		this.email = null;
		this.homepage = null;
		this.inscricao_estadual = null;
		this.inscricao_municipal = null;
		this.inscricao_suframa = null;
		this.optante_simples_nacional = null;
		this.tipo_atividade = null;
		this.cnae = null;
		this.produtor_rural = null;
		this.contribuinte = null;
		this.observacao = null;
		this.obs_detalhadas = null;
		this.recomendacao_atraso = null;
		this.tags = null;
		this.pessoa_fisica = null;
		this.exterior = null;
		this.logradouro = null;
		this.importado_api = null;
		this.bloqueado = null;
		this.cidade_ibge = null;
		this.valor_limite_credito = null;
		this.bloquear_faturamento = null;
		this.recomendacoes = null;
		this.enderecoEntrega = null;
		this.nif = null;
		this.documento_exterior = null;
		this.inativo = null;
		this.dadosBancarios = null;
		this.caracteristicas = null;
		this.enviar_anexos = null;
		this.info = null;
		this.bloquear_exclusao = null;
	};

	this.tags = function () {
		this.tag = null;
	};

	this.recomendacoes = function () {
		this.numero_parcelas = null;
		this.codigo_vendedor = null;
		this.email_fatura = null;
		this.gerar_boletos = null;
		this.codigo_transportadora = null;
		this.tipo_assinante = null;
	};

	this.enderecoEntrega = function () {
		this.entRazaoSocial = null;
		this.entCnpjCpf = null;
		this.entEndereco = null;
		this.entNumero = null;
		this.entComplemento = null;
		this.entBairro = null;
		this.entCEP = null;
		this.entEstado = null;
		this.entCidade = null;
		this.entSepararEndereco = null;
		this.entTelefone = null;
		this.entIE = null;
	};

	this.dadosBancarios = function () {
		this.codigo_banco = null;
		this.agencia = null;
		this.conta_corrente = null;
		this.doc_titular = null;
		this.nome_titular = null;
		this.transf_padrao = null;
		this.cChavePix = null;
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

	this.clientes_cadastro_chave = function () {
		this.codigo_cliente_omie = null;
		this.codigo_cliente_integracao = null;
	};

	this.clientes_cadastro_resumido = function () {
		this.codigo_cliente = null;
		this.codigo_cliente_integracao = null;
		this.razao_social = null;
		this.nome_fantasia = null;
		this.cnpj_cpf = null;
	};

	this.clientes_list_request = function () {
		this.pagina = null;
		this.registros_por_pagina = null;
		this.apenas_importado_api = null;
		this.ordenar_por = null;
		this.ordem_decrescente = null;
		this.filtrar_por_data_de = null;
		this.filtrar_por_data_ate = null;
		this.filtrar_por_hora_de = null;
		this.filtrar_por_hora_ate = null;
		this.filtrar_apenas_inclusao = null;
		this.filtrar_apenas_alteracao = null;
		this.clientesFiltro = null;
		this.clientesPorCodigo = null;
		this.exibir_caracteristicas = null;
		this.exibir_obs = null;
		this.ordem_descrescente = null;
	};

	this.clientesFiltro = function () {
		this.codigo_cliente_omie = null;
		this.codigo_cliente_integracao = null;
		this.cnpj_cpf = null;
		this.razao_social = null;
		this.nome_fantasia = null;
		this.endereco = null;
		this.bairro = null;
		this.cidade = null;
		this.estado = null;
		this.cep = null;
		this.contato = null;
		this.email = null;
		this.homepage = null;
		this.inscricao_municipal = null;
		this.inscricao_estadual = null;
		this.inscricao_suframa = null;
		this.pessoa_fisica = null;
		this.optante_simples_nacional = null;
		this.inativo = null;
		this.tags = null;
	};

	this.clientesPorCodigo = function () {
		this.codigo_cliente_omie = null;
		this.codigo_cliente_integracao = null;
	};

	this.clientes_list_response = function () {
		this.pagina = null;
		this.total_de_paginas = null;
		this.registros = null;
		this.total_de_registros = null;
		this.clientes_cadastro_resumido = null;
	};

	this.clientes_listfull_response = function () {
		this.pagina = null;
		this.total_de_paginas = null;
		this.registros = null;
		this.total_de_registros = null;
		this.clientes_cadastro = null;
	};

	this.clientes_lote_request = function () {
		this.lote = null;
		this.clientes_cadastro = null;
	};

	this.clientes_lote_response = function () {
		this.lote = null;
		this.codigo_status = null;
		this.descricao_status = null;
	};

	this.clientes_status = function () {
		this.codigo_cliente_omie = null;
		this.codigo_cliente_integracao = null;
		this.codigo_status = null;
		this.descricao_status = null;
	};

	this.omie_fail = function () {
		this.code = null;
		this.description = null;
		this.referer = null;
		this.fatal = null;
	};
};

module.exports = ClientesCadastroJsonClient;
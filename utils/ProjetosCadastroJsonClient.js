const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config();

const APP_KEY = process.env.OMIE_APP_KEY;
const APP_SECRET = process.env.OMIE_APP_SECRET;

const ProjetosCadastroJsonClient = function () {

    this._EndPoint = "https://app.omie.com.br/api/v1/geral/projetos/";

    this._Call = function (method, param) {
        return new Promise((resolve, reject) => {
            var server = new XMLHttpRequest();
            
            server.open("POST", this._EndPoint);
            server.setRequestHeader("Content-Type", "application/json");

            var req = JSON.stringify({ call: method, app_key: APP_KEY, app_secret: APP_SECRET, param: (param) ? param : [] });

            server.onreadystatechange = function () {
                if (server.readyState != 4) return;

                if (server.status != 200) {
                    reject(`AJAX error ${server.status}: ${server.statusText}`);
                    // reject(new Error(`AJAX error ${server.status}: ${server.statusText}`));
                } else {
                    resolve(JSON.parse(server.responseText));
                }
                delete server;
            }
            server.send(req);
        });
    };

    this.IncluirProjeto = async function (
        projIncluirRequest
    ) {
        return this._Call(
            "IncluirProjeto",
            [
                projIncluirRequest
            ]
        );
    };

    this.AlterarProjeto = async function (
        projAlterarRequest
    ) {
        return this._Call(
            "AlterarProjeto",
            [
                projAlterarRequest
            ]
        );
    };

    this.UpsertProjeto = async function (
        projUpsertRequest
    ) {
        return this._Call(
            "UpsertProjeto",
            [
                projUpsertRequest
            ]
        );
    };

    this.ExcluirProjeto = async function (
        projExcluirRequest
    ) {
        return this._Call(
            "ExcluirProjeto",
            [
                projExcluirRequest
            ]
        );
    };

    this.ConsultarProjeto = async function (
        projConsultarRequest
    ) {
        try {
            return this._Call(
                "ConsultarProjeto",
                [
                    projConsultarRequest
                ]
            );
        } catch (error) {
			throw error;
        }
    };

    this.ListarProjetos = async function (
        projListarRequest
    ) {
        return this._Call(
            "ListarProjetos",
            [
                projListarRequest
            ]
        );
    };

    this.cadastro = function () {
        this.codigo = null;
        this.codInt = null;
        this.nome = null;
        this.inativo = null;
        this.info = null;
    };

    this.info = function () {
        this.data_inc = null;
        this.hora_inc = null;
        this.user_inc = null;
        this.data_alt = null;
        this.hora_alt = null;
        this.user_alt = null;
    };

    this.projAlterarRequest = function () {
        this.codigo = null;
        this.codInt = null;
        this.nome = null;
        this.inativo = null;
    };

    this.projAlterarResponse = function () {
        this.codigo = null;
        this.codInt = null;
        this.status = null;
        this.descricao = null;
    };

    this.projConsultarRequest = function () {
        this.codigo = null;
        this.codInt = null;
    };

    this.projConsultarResponse = function () {
        this.codigo = null;
        this.codInt = null;
        this.nome = null;
        this.inativo = null;
        this.info = null;
    };

    this.projExcluirRequest = function () {
        this.codigo = null;
        this.codInt = null;
    };

    this.projExcluirResponse = function () {
        this.codigo = null;
        this.codInt = null;
        this.status = null;
        this.descricao = null;
    };

    this.projIncluirRequest = function () {
        this.codInt = null;
        this.nome = null;
        this.inativo = null;
    };

    this.projIncluirResponse = function () {
        this.codigo = null;
        this.codInt = null;
        this.status = null;
        this.descricao = null;
    };

    this.projListarRequest = function () {
        this.pagina = null;
        this.registros_por_pagina = null;
        this.apenas_importado_api = null;
        this.ordenar_por = null;
        this.ordem_descrescente = null;
        this.filtrar_por_data_de = null;
        this.filtrar_por_data_ate = null;
        this.filtrar_apenas_inclusao = null;
        this.filtrar_apenas_alteracao = null;
        this.nome_projeto = null;
    };

    this.projListarResponse = function () {
        this.pagina = null;
        this.total_de_paginas = null;
        this.registros = null;
        this.total_de_registros = null;
        this.cadastro = null;
    };

    this.projUpsertRequest = function () {
        this.codigo = null;
        this.codInt = null;
        this.nome = null;
        this.inativo = null;
    };

    this.projUpsertResponse = function () {
        this.codigo = null;
        this.codInt = null;
        this.status = null;
        this.descricao = null;
    };

    this.omie_fail = function () {
        this.code = null;
        this.description = null;
        this.referer = null;
        this.fatal = null;
    };
};

module.exports = ProjetosCadastroJsonClient;
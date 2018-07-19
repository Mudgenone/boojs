//Assuntos de POO
class Assunto {
    constructor(id, descricao, comando) {
        this._id = id
        this._descricao = descricao
        this._comando = comando
    }

    get id() {
        return this._id
    }

    get descricao() {
        return this._descricao
    }

    get comando() {
        return this._comando
    }
}

//Perguntas do teste
class Pergunta {
    constructor(id, pergunta, id_assunto, nivel) {
        this._id = id
        this._pergunta = pergunta
        this._id_assunto = id_assunto
        this._nivel = nivel
    }

    get id_assunto() {
        return this._id_assunto
    }
    get nivel() {
        return this._nivel
    }

    get id() {
        return this._id
    }

    get pergunta() {
        return this._pergunta
    }

    set pergunta(pergunta) {
        this._pergunta = pergunta
    }

}

//Alternaivas das perguntas
class Resposta {
    constructor(id, resposta, certa, id_pergunta) {
        this._id = id
        this._resposta = resposta
        this._certa = certa
        this._id_pergunta = id_pergunta
    }

    get id() {
        return this._id
    }

    set id(id) {
        this._id = id
    }

    get resposta() {
        return this._resposta
    }

    get certa() {
        return this._certa
    }

    get id_pergunta() {
        return this._id_pergunta
    }
}

//Links de suporte para o usuario
class MaterialApoio {
    constructor(id, link, id_assunto) {
        this._id = id
        this._link = link
        this._id_assunto = id_assunto
    }

    get id() {
        return this._id
    }

    get link(){
        return this._link
    }

    get id_assunto(){
        return this._id_assunto
    }
}

module.exports = { Assunto, Pergunta, Resposta, MaterialApoio }
class Pergunta {
    constructor(id, pergunta, assunto, nivel){
        this._id = id
        this._pergunta = pergunta
        this._assunto = assunto
        this._nivel = nivel 
    }

    get assunto(){
        return this._assunto
    }
    get nivel (){
        return this._nivel
    }
    
    get id() {
        return this._id 
    } 
    set id(id){
        this._id=id
    }

    get pergunta(){
        return this._pergunta
    }

    set pergunta(pergunta){
        this._pergunta = pergunta
    }
  
}

class Resposta {
    constructor(id, resposta, certa, id_pergunta) {
        this._id = id
        this._resposta = resposta
        this._certa = certa
        this._pergunta = id_pergunta
    }
 
    get id(){
        return this._id
    }

    set id(id){
        this._id = id
    }

    get resposta() {
        return this._resposta
    }

    get certa(){
        return this._certa
    }

    get pergunta(){
        return this._pergunta
    }
}

module.exports = {Pergunta, Resposta}
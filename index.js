const env = require('./.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const { Pergunta, Resposta } = require('./classes')
const bot = new Telegraf(env.token)

//Perguntas
const perguntas_array = [
    new Pergunta(1, 'Dizer que a classe A estende a classe B é o mesmo que: ', 'her', 1),
    new Pergunta(2, 'Conceito de programação orientada a objetos que promove a reutilização de software:', 'ger', 3),
    new Pergunta(3, 'Altera o comportamento dos métodos herdados para um mais específico na subclasse, mantendo os atributos e tipo de retorno:', 'ger', 2),
    new Pergunta(4, 'NÃO é um tipo de visibilidade de um atributo:', 'ger', 1)
]

//Lista Respostas
const respostas = [
    new Resposta(1, 'a- a classe A é derivada de B;', true, 1),
    new Resposta(2, 'b- a classe B é subclasse de A;', false, 1),
    new Resposta(3, 'c-  a classe A é superclasse de B;', false, 1),
    new Resposta(4, 'd-  a classe B é derivada de A;', false, 1),

    new Resposta(5, 'a- Herança', true, 2),
    new Resposta(6, 'b- Abstração de dados', false, 2),
    new Resposta(7, 'c- Sobrecarga de métodos', false, 2),
    new Resposta(8, 'd- Polimorfismo', false, 2),

    new Resposta(9, 'a- sobrecarga.', false, 3),
    new Resposta(10, 'b- portabilidade.', false, 3),
    new Resposta(11, 'c- abstração.', false, 3),
    new Resposta(12, 'd- sobrescrita.', true, 3),

    new Resposta(13, 'a- protegido', false, 4),
    new Resposta(14, 'b- público', false, 4),
    new Resposta(15, 'c- pacote', true, 4),
    new Resposta(16, 'd- privado', false, 4)

]

const menuPrinc = Extra.markup(
    Markup.inlineKeyboard([
        Markup.callbackButton('Geral', 'ger'),
        Markup.callbackButton('Encapsulamento', 'enc'),
        Markup.callbackButton('Polimorfismo', 'pol'),
        Markup.callbackButton('Herança', 'her')
    ], { columns: 2 })
)

const menuContinuar = assunto => Extra.markup(
    Markup.inlineKeyboard([
        Markup.callbackButton('Continuar', assunto)
    ])
)

const menuResp = pergunta => Extra.markup(
    Markup.inlineKeyboard(
        respostas.filter(item => item.pergunta == pergunta.id)
            .map(item => { return Markup.callbackButton(`${item.resposta}`, `${item.certa} ${item.id}`) }), { columns: 1 }
    )
)
bot.use(session())

bot.start(async ctx => {
    const nome = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo, ${nome}`)
    await ctx.reply(`Você deseja fazer o teste em qual assunto?`, menuPrinc)
    ctx.session.pontos = 0
    ctx.session.erros = 0
    ctx.session.perguntas = []
})

bot.hears(/flow/i, ctx => {
    ctx.replyWithSticker('CAADAQADDAEAAjboawWcm8sRNgPc7AI')
})

bot.hears(/pai bessa/i, ctx => {
    ctx.replyWithSticker('CAADAQADIwEAAjboawVCT_pvsJfGowI')
})

bot.action(/ger/, async ctx => {
    ctx.session.perguntas = perguntas_array.filter(item => item.assunto == 'ger')
    await ctx.editMessageText(`${ctx.session.perguntas[0].pergunta}`, menuResp(ctx.session.perguntas[0]))
})

bot.action(/her/, async ctx => {
    ctx.session.perguntas = perguntas_array.filter(item => item.assunto == 'her')
    await ctx.editMessageText(ctx.session.perguntas[0].pergunta, menuResp(ctx.session.perguntas[0]))
})

bot.action(/true/, async ctx => {
    if (ctx.session.perguntas) {
        ctx.session.pontos += ctx.session.perguntas[0].nivel
        await ctx.session.perguntas.shift()
    }

    if (ctx.session.perguntas[0]) {
        await ctx.answerCbQuery('Muito bem! Você é o cara!')
        await ctx.editMessageText(`${ctx.session.perguntas[0].pergunta}`, menuResp(ctx.session.perguntas[0]))
    } else {
        await ctx.editMessageText('Parabéns, você concluiu as questões!')
        await ctx.reply(`Pontos: ${ctx.session.pontos}`)
        await ctx.reply(`Erros: ${ctx.session.erros}`)
    }
})

bot.action(/false/, async ctx => {
    ctx.session.erros += 1
    await ctx.answerCbQuery('Ops! Acho que não é essa, pense um pouco mais!')
})

bot.startPolling()

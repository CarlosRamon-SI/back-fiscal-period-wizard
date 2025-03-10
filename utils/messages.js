const msg = {
    geral: {
        intern: 'Ocorreu um erro interno. Porfavor, tente novamente mais tarde.'
    },
    register: {
        sucess: {
            create: 'Registro criado com sucesso.',
            update: 'Registro atualizado com sucesso.',
            select: 'Registro obtido com sucesso.'
        },
        error: {
            create: 'Erro ao criar registro.',
            update: 'Erro ao atualizar registro.',
            select: 'Registro não encontrado.'
        }
    },
    registers: {
        sucess: {
            create: 'Registros criados com sucesso.',
            update: 'Registros atualizados com sucesso.',
            select: 'Registros obtidos com sucesso.'
        },
        error: {
            create: 'Erro ao criar registros.',
            update: 'Erro ao atualizar registros.', 
            select: 'Nenhum registro encontrado'
        }
    }
}

const state = {
    fail: 'Falha',
    sucess: 'OK'
}

module.exports = { msg, state };
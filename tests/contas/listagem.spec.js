const request = require('supertest')
const app = require('../../src/servidor')

describe('Listagem de contas', () => {
    it('Listar contas sem senha informada', async () => {
        const response = await request(app).get('/contas')

        expect(response.statusCode).toEqual(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        )
    })

    it('Listar contas informando senha incorreta', async () => {
        const response = await request(app).get('/contas?senha_banco=CubosBank123')

        expect(response.statusCode).toEqual(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        )
    })

    it('Listar contas informando senha correta, retornando array vazio', async () => {
        const response = await request(app).get('/contas?senha_banco=Cubos123Bank')

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual([])
    })

    it('Listar contas informando senha correta, retornando contas cadastradas', async () => {
        await request(app).post('/contas').send({
            nome: "Tester Sucesso",
            email: "Tester_sucesso@Testes.com",
            cpf: "77777777777",
            data_nascimento: "01/01/2003",
            telefone: "99999999999",
            senha: "test123@"
        })
        await request(app).post('/contas').send({
            nome: "Tester Sucesso",
            email: "Tester_sucesso@Testes.com",
            cpf: "77777777777",
            data_nascimento: "01/01/2003",
            telefone: "99999999999",
            senha: "test123@"
        })

        const response = await request(app).get('/contas?senha_banco=Cubos123Bank')

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    numero: expect.any(String),
                    saldo: expect.any(Number),
                    usuario: expect.objectContaining({
                        nome: expect.any(String),
                        cpf: expect.any(String),
                        data_nascimento: expect.any(String),
                        telefone: expect.any(String),
                        email: expect.any(String),
                        senha: expect.any(String)
                    })
                })
            ])
        )
    })
})
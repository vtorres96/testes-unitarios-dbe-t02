const request = require('supertest')
const app = require('../../src/servidor')

describe('Cadastro de contas', () => {
    it('Adicionar conta sem informar corpo na requisição', async () => {
        const response = await request(app).post('/contas').send()

        expect(response.statusCode).toEqual(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        )
    })

    it('Adicionar conta sem informar nome', async () => {
        const response = await request(app).post('/contas').send({
            email: "Teste@Teste.com",
            cpf: "11111111111",
            data_nascimento: "01/01/1970",
            telefone: "99999999999",
            senha: "test123@"
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        )
    })

    it('Adicionar conta sem informar email', async () => {
        const response = await request(app).post('/contas').send({
            nome: "Tester1",
            cpf: "11111111111",
            data_nascimento: "01/01/1970",
            telefone: "99999999999",
            senha: "test123@"
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        )
    })

    it('Adicionar conta sem informar cpf', async () => {
        const response = await request(app).post('/contas').send({
            nome: "Tester1",
            email: "Teste@Teste.com",
            data_nascimento: "01/01/1970",
            telefone: "99999999999",
            senha: "test123@"
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        )
    })

    it('Adicionar conta sem informar data_nascimento', async () => {
        const response = await request(app).post('/contas').send({
            nome: "Tester1",
            email: "Teste@Teste.com",
            cpf: "11111111111",
            telefone: "99999999999",
            senha: "test123@"
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        )
    })

    it('Adicionar conta sem informar telefone', async () => {
        const response = await request(app).post('/contas').send({
            nome: "Tester1",
            email: "Teste@Teste.com",
            cpf: "11111111111",
            data_nascimento: "01/01/1970",
            senha: "test123@"
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        )
    })

    it('Adicionar conta sem informar senha', async () => {
        const response = await request(app).post('/contas').send({
            nome: "Tester1",
            email: "Teste@Teste.com",
            cpf: "11111111111",
            data_nascimento: "01/01/1970",
            telefone: "99999999999"
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        )
    })

    it('Adicionar conta informando e-mail existente', async () => {
        await request(app).post('/contas').send({
            nome: "Tester1",
            email: "Teste@Teste.com",
            cpf: "11111111111",
            data_nascimento: "01/01/1970",
            telefone: "99999999999",
            senha: "test123@"
        })

        const response = await request(app).post('/contas').send({
            nome: "Tester_Alterado",
            email: "Teste@Teste.com",
            cpf: "22222222222",
            data_nascimento: "01/01/1975",
            telefone: "4444444444",
            senha: "test@123"
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        )
    })

    it('Adicionar conta informando cpf existente', async () => {
        await request(app).post('/contas').send({
            nome: "Tester1",
            email: "Testes@Testes.com",
            cpf: "3333333333333",
            data_nascimento: "01/01/1970",
            telefone: "99999999999",
            senha: "test123@"
        })

        const response = await request(app).post('/contas').send({
            nome: "Tester_Alterado",
            email: "Tester_alterado@Teste.com",
            cpf: "11111111111",
            data_nascimento: "01/01/1975",
            telefone: "4444444444",
            senha: "test@123"
        })

        expect(response.statusCode).toEqual(400)
        expect(response.body).toEqual(
            expect.objectContaining({
                mensagem: expect.any(String)
            })
        )
    })

    it('Adicionar conta informando corpo da requisição completo', async () => {
        const response = await request(app).post('/contas').send({
            nome: "Tester Sucesso",
            email: "Tester_sucesso@Testes.com",
            cpf: "77777777777",
            data_nascimento: "01/01/2003",
            telefone: "99999999999",
            senha: "test123@"
        })

        expect(response.statusCode).toEqual(201)
    })
})
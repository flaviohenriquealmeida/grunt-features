describe("Sacola", function() {
	var sacola;

	beforeEach(function() {
		sacola = new Sacola();
	});

	it("Deve incrementar a quantidade de produtos e retornar o total incrementado", function() {
		expect(sacola.incrementarTotal()).toEqual(1);
	});

	it('Deve retornar o total de itens na sacola', function() {
		sacola.incrementarTotal();
		expect(sacola.obterTotal()).toEqual(1);
	});
});


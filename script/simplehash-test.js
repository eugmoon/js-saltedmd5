describe('MD5 Hex-encoding', function () {
	
	it('should create a hex-encoded MD5 hash of an ASCII value', function () {
		expect(
			hex_md5('value')
		).to.be(
			'2063c1608d6e0baf80249c42e2be5804'
		);
	});
	
	it('should create a hex-encoded MD5 hash of an UTF-8 value', function () {
		expect(
			hex_md5('日本')
		).to.be(
			'4dbed2e657457884e67137d3514119b3'
		);
	});
	
});

describe('MD5 raw encoding', function () {
	
	it('should create a raw MD5 hash of an ASCII value', function () {
		expect(
			raw_md5('value')
		).to.be(
			' c\xc1`\x8dn\x0b\xaf\x80$\x9cB\xe2\xbeX\x04'
		);
	});
	
	it('should create a raw MD5 hash of an UTF-8 value', function () {
		expect(
			raw_md5('日本')
		).to.be(
			'M\xbe\xd2\xe6WEx\x84\xe6q7\xd3QA\x19\xb3'
		);
	});
	
});

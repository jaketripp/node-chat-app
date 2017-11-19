var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		var from = 'Jen';
		var text = 'Some message';

		var message = generateMessage(from, text);
		expect(message).toInclude({ from, text });
		expect(message.createdAt).toBeA('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location message object', () => {
		var from = 'Jen';
		var lat = '15';
		var long = '98';
		var url = `https://www.google.com/maps?q=${lat},${long}`;

		var message = generateLocationMessage(from, lat, long);
		expect(message).toInclude({ from, url });
		expect(message.createdAt).toBeA('number');
	});
});
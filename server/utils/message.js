const generateMessage = (from, text) => ({from, text, createdAt: Date.now()});

const generateLocationMessage = (from, latitude, longitude) => ({
	from, 
	url: `https://www.google.com/maps?q=${latitude},${longitude}`, 
	createdAt: Date.now()
});

module.exports = {generateMessage, generateLocationMessage};
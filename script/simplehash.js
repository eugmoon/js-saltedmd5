function initState() {
	var digest = document.getElementById("output_digest"),
		salt = document.getElementById("output_salt");
	
	sjcl.random.startCollectors();
	digest.value = '';
	salt.value = '';
}

function processInput(event) {
	var cryptFunc, i, md5hash, saltmd5, saltval, tempword,
		digestelt = document.getElementById("output_digest"),
		event = event || window.event,
		message = document.getElementById("input_message").value,
		numWords = 3,
		randWords = [],
		saltelt = document.getElementById("output_salt");
	
	/*
	if(sjcl.random.getProgress(3) < 1.0) {
		alert("Please move your mouse until the number reaches 1.0:\n" + (sjcl.random.getProgress(3)).toString());
		return;
	}
	*/
	
	//	First we're going to try to use a built-in CSPRNG
	if (window.crypto && window.crypto.getRandomValues) {
		cryptFunc = '   built-in';
		randWords = new Int32Array(numWords);
		window.crypto.getRandomValues(randWords);
	}
	//	Because of course IE calls it msCrypto instead of being standard
	else if (window.msCrypto && window.msCrypto.getRandomValues) {
		cryptFunc = ' MSbuilt-in';
		randWords = new Int32Array(numWords);
		window.msCrypto.getRandomValues(randWords);
	}
	//	So, no built-in functionality - bummer
	//	If the user has wiggled the mouse enough, sjcl might help us out here
	else if (sjcl.random.isReady(3)) {
		cryptFunc = '       sjcl';
		randWords = sjcl.random.randomWords(numWords, 3);
	}
    //	Last resort - we'll use isaac.js to get a random number. It's seeded from Math.random(),
    //	so this isn't ideal, but it'll still greatly increase the space of guesses a hacker would
    //	have to make to crack the password.
    else {
		cryptFunc = 'last-resort';
		for (i = 0; i < numWords; i++) {
			randWords.push(isaac.rand());
		}
	}
	saltval = '';
	for (i = 0; i < numWords; i++) {
		tempword = (Math.abs(randWords[i])).toString(16);
		saltval += tempword;
	}
	saltelt.value = (saltval).toString(16);
	saltmd5 = (hex_md5(saltval + message));
	digestelt.value = saltmd5;
	var digest = (hex_md5(message));
	console.log(digest + ' ' + saltmd5 + ' ' + cryptFunc + ' ' + saltelt.value);
}

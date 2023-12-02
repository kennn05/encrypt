const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to encrypt a hexadecimal password
function encryptHexPassword(password, shift) {
  // Convert the password to a hexadecimal string
  const hexPassword = Buffer.from(password).toString('hex');

  // Initialize the encrypted hexadecimal password
  let encryptedHexPassword = '';

  // Encrypt each character in the hexadecimal password
  for (let i = 0; i < hexPassword.length; i++) {
    const char = hexPassword[i];
    const charCode = parseInt(char, 16);
    const encryptedCharCode = (charCode + shift) % 16;
    encryptedHexPassword += encryptedCharCode.toString(16);
  }

  return encryptedHexPassword;
}

// Function to decrypt an encrypted hexadecimal password
function decryptHexPassword(encryptedHexPassword, shift) {
  // Initialize the decrypted hexadecimal password
  let decryptedHexPassword = '';

  // Decrypt each character in the encrypted hexadecimal password
  for (let i = 0; i < encryptedHexPassword.length; i++) {
    const char = encryptedHexPassword[i];
    const charCode = parseInt(char, 16);
    const decryptedCharCode = (charCode - shift + 16) % 16;
    decryptedHexPassword += decryptedCharCode.toString(16);
  }

  // Convert the decrypted hexadecimal password back to a string
  const decryptedPassword = Buffer.from(decryptedHexPassword, 'hex').toString('utf8');

  return decryptedPassword;
}

rl.question('Enter a password: ', (password) => {
  rl.question('Encrypt or Decrypt? (e/d): ', (choice) => {
    const shift = 3; // Replace with your desired shift value

    if (choice === 'e') {
      // Encrypt the password in hexadecimal representation
      const encryptedHex = encryptHexPassword(password, shift);
      console.log('Encrypted Hexadecimal:', encryptedHex);
    } else if (choice === 'd') {
      // Decrypt the encrypted hexadecimal password
      const decryptedPassword = decryptHexPassword(password, shift);
      console.log('Decrypted Password:', decryptedPassword);
    } else {
      console.log('Invalid choice. Please enter "e" for encryption or "d" for decryption.');
    }

    rl.close();
  });
});

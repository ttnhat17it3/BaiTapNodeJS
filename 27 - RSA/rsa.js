const NodeRSA = require("node-rsa");

const key = new NodeRSA({ b: 1024 });
let secret = "Ahihi";

let encryptedString = key.encrypt(secret, "base64");
// console.log(encryptedString);
// LVQ6sT9Pm8c+KL0yq+qo2XrDkRdmmJIR9TPaAa58KIdGTO47d/Mgq9wm3vN4fatji/tFzBZ/9qs7oenmf1cjtKWMIKLN+ydkYY/Vb9RMjjq4TuwPuzm0Fa2/AbrxnQ3lnv5UqxS0VeVGSS/GJaRJJE2wIWrmY/GWGuYcyTjQFbM=

let decryptString = key.decrypt(encryptedString, "utf8");
// console.log(decryptString);
// Ahihi

// const public_key = key.exportKey("public");
// const private_key = key.exportKey("private");

// console.log(public_key, private_key);

const public_key = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC9OTBGF9CWz7csCl7fd91x4adp
iyYABYUArXP4faigwFAcUiMSV9lulCkLi/TZocoof70yujxGnijC2GIBbDDpBfny
B33IDv3xxor4tTChDl7v/hZ6645GO2QzujlNFyoUiBDTaO75TYFYxNtCvkp6leGD
X1x5fbvnj/6VNR6vYwIDAQAB
-----END PUBLIC KEY-----`;

const private_key = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQC9OTBGF9CWz7csCl7fd91x4adpiyYABYUArXP4faigwFAcUiMS
V9lulCkLi/TZocoof70yujxGnijC2GIBbDDpBfnyB33IDv3xxor4tTChDl7v/hZ6
645GO2QzujlNFyoUiBDTaO75TYFYxNtCvkp6leGDX1x5fbvnj/6VNR6vYwIDAQAB
AoGAV5sQlIMWGZyVi5hJkGCob78viRfZQg1MJKIpnRRga/xdmp8UibuOeTmzPxtP
Ayt6swFhEQlUOsWizYLs7QewJIUUoz9RAk+PhMMpxAjbyYYTJrzozgkPi/Gcq9qK
x4b3SaxJvpHkrykJsGpTLCOKKaa5WUKDi/wISyw4z28BcrECQQD6eL1C0kqyE1aY
DwNcAxDec07Wd5YcCZRJp7mDYopmTu5AfMEEkah8nQSr8GpG4AVN2FIkSsNTihvO
xOX7xiB/AkEAwWZfi4O0B+e3y214Wurjv/h7Gks5GVAsfhdq4dIi6QYShfwG9E7/
VRP4Id09sHtwxLqB8RGONcSXl4vDk3J/HQJARBroe27q2Jjhht8uLqq2v4Xi/fXu
XxlLtOtiShNVRpRXvDkv0qo4ggm/53CrtTHcv1n+m9eoXOLExOhNELTCyQJARmMn
6vLoFuhysAsLfqt2cGvTAeLWySuwxcNoFwAPzJd1LmZncYs+yowWBt0qkoyaoj7v
A/nLtC30ricj6woE0QJBAJE6kzsEXK8UdA1xasgt7SpdC3hqkaxuWteO3IPCtMyq
XWPMMQIXeBUoUkUkS+f82NN+BIf7hHhf0858y82IBF0=
-----END RSA PRIVATE KEY-----`;

const key_private = new NodeRSA(private_key);
const key_public = new NodeRSA(public_key);

encryptedString = key_public.encrypt(secret, "base64");
console.log(encryptedString);

decryptString = key_private.decrypt(encryptedString, "utf8");
console.log(decryptString);

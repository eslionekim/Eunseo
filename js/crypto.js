function encodeByAES256(key, data){ 
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        //CryptoJS:암호화복호화 수행 라이브러리, AES.encrypt:AES암호화 수행
        iv: CryptoJS.enc.Utf8.parse(""), 
        // IV:초기화 벡터,CryptoJS.enc.Utf8.parse(""): 초기화 벡터로 빈 문자열을 UTF-8 형식으로 변환
        padding: CryptoJS.pad.Pkcs7, 
        // 패딩: 데이터 채우기, CryptoJS.pad.Pkcs7: PKCS#7 방식으로 패딩
        mode: CryptoJS.mode.CBC 
        // 운영 모드
    });
    return cipher.toString();
}

function decodeByAES256(key, data){
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    //CryptoJS: 암호화복호화를 수행하는 라이브러리 객체,AES.decrypt: AES 복호화를 수행하는 메서드
    iv: CryptoJS.enc.Utf8.parse(""),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
    //cipher.toString(CryptoJS.enc.Utf8): 복호화된 데이터를 UTF-8 형식의 문자열로 변환
}

function encrypt_text(password){
    const k = "key"; // 클라이언트 키
    const rk = k.padEnd(32, " ");
    //k.padEnd(32, " "): k 문자열을 32바이트로 채우기 위해 공백으로 패딩
    const b = password;
    const eb = this.encodeByAES256(rk, b); 
    //this.encodeByAES256(rk, b): encodeByAES256 함수를 호출하여 데이터를 암호화
    return eb;
    console.log(eb);
}

function decrypt_text(){
    const k = "key"; 
    const rk = k.padEnd(32, " ");
    const eb = session_get();
    const b = this.decodeByAES256(rk, eb); 
    // this.decodeByAES256(rk, eb): decodeByAES256 함수를 호출하여 데이터를 복호화
    console.log(b); 
}

function session_set(){
    let session_id=document.querySelector("#typeEmailX");//getElementByid는 id만 가져오지만 이건 css기반 id,클래스,태그 등 다양한 요소 가능
    let session_pass = document.querySelector("#typePasswordX"); // DOM 트리에서 pass 검색
    if(sessionStorage){ //세션동안 데이터 저장,유지, 브라우저가 이 객체를 지원하는지 확인
        let en_text = encrypt_text(session_pass.value)
        sessionStorage.setItem("Session_Storage_id",session_id.value);
        sessionStorage.setItem("Session_Storage_pass", en_text);
    }  else{
        alert("로컬 스토리지 지원x");
    }
}

function session_set2(userObject){
    if (sessionStorage) { // 세션 스토리지가 지원되는지 확인
        // 객체를 JSON 문자열로 변환하여 세션 스토리지에 저장
        sessionStorage.setItem("Session_Storage_user", JSON.stringify(userObject));
    } else {
        alert("세션 스토리지를 지원하지 않는 브라우저입니다.");
    }
}

function session_get(){
    if(sessionStorage){
        return sessionStorage.getItem("Session_Storage_pass");
    } else {
    alert("세션 스토리지 지원 x");
    }
}

function session_check() { //세션 검사
    if (sessionStorage.getItem("Session_Storage_id")) {
        alert("이미 로그인 되었습니다.");
        location.href='../login/index_login.html'; // 로그인된 페이지로 이동
    }
}
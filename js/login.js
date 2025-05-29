const check_xss = (input) => {
    // DOMPurify 라이브러리 로드 (CDN 사용)
    const DOMPurify = window.DOMPurify;
    // 입력 값을 DOMPurify로 sanitize
    const sanitizedInput = DOMPurify.sanitize(input);
    // Sanitized된 값과 원본 입력 값 비교
   if (sanitizedInput !== input) {
    // XSS 공격 가능성 발견 시 에러 처리
   alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
    return false;
    }
    // Sanitized된 값 반환
   return sanitizedInput;
    };

const check_input = () => {
    const idsave_check = document.getElementById('idSaveCheck');
    
    //입력값 받아오기 변수
    const loginForm = document.getElementById('login_form'); //loginform id
    const loginBtn = document.getElementById('login_btn'); //로그인버튼 id
    const emailInput = document.getElementById('typeEmailX'); //이메일버튼 
    const passwordInput = document.getElementById('typePasswordX'); //패스워드버튼 
    const c = '아이디, 패스워드를 체크합니다';
    alert(c);

    //이메일,패스워드 입력값 공백제거
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    const payload = {
        id: emailValue, //이메일 주소를 id필드로 저장장
        exp: Math.floor(Date.now() / 1000) + 3600 
        //JWT(로그인 후 지속인증)의 만료시간: 현재 시간/1000=초단위 + 1시간 
    };
    const jwtToken = generateJWT(payload); //generateJWT(payload):토큰 생성

    
    //특수문자 변수
    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)!==null;
    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
    
    //3글자 이상 문자 반복
    const repeatedPattern = /(\w{3,}).*?\1/;
    //2글자 이상 숫자 반복 
    const sequentialNumbers = /(\d{2,})(?=.*\1)/;

    //아이디 길이 제한
    if (emailValue.length <10 ) {
    alert('아이디는 최소 10글자 이상 입력해야 합니다. ');
    login_failed(); // 실패 처리
    return false;
    }
    //패스워드 길이 제한
    if (passwordValue.length < 15) {
    alert('비밀번호는 반드시 15글자 이상 입력해야 합니다.');
    login_failed(); // 실패 처리
    return false;
    }
    //패스워드 특수문자 포함
    if (!hasSpecialChar) { //hasSpecialChar가 false일 때,즉 특수문자 없을때때
    alert('패스워드는 특수문자를 1개이상 포함해야합니다.');
    login_failed(); // 실패 처리
    return false;
    }
    //패스워드 대소문자 포함
    if (!hasUpperCase || !hasLowerCase) {//hasUpperCase가 false이거나 hasLowerCase가 false일 경우, 즉 대소문자 둘중 하나만 잇을떼떼
    alert('패스워드는 대소문자를 1개이상 포함해야합니다.');
    login_failed(); // 실패 처리
    return false;
    }

    //3글자 이상 반복 입력 x
    if (repeatedPattern.test(emailValue) || repeatedPattern.test(passwordValue)) {
        alert('아이디와 패스워드에 3글자 이상의 동일한 단어를 반복해서 사용할 수 없습니다.');
        return false;
    }
    // 연속되는 숫자 2개이상 반복 입력x
    if (sequentialNumbers.test(emailValue) || sequentialNumbers.test(passwordValue)) {
        alert('아이디와 패스워드에 연속된 숫자 2개 이상을 사용할 수 없습니다.');
        return false;
    }

    //id 저장 쿠키
    if(idsave_check.checked==true){ //체크박스에 체크했다면
        alert("쿠키를 저장합니다.",emailValue);
        setCookie("id",emailValue,1); //id,이메일입력값,1일 마지노선 저장
        alert("쿠키 값:"+emailValue);
    }
    else{ //체크안했다면
        setCookie("id",emailValue.value,0); //id,이메일입력값,0일 쿠키삭제
    }

    //결과
    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);

    session_set();
    localStorage.setItem('jwt_token', jwtToken);
    loginForm.submit();
}

function setCookie(name,value,expiredays){
    var date=new Date(); //date: 현재 날짜 가져옴
    date.setDate(date.getDate()+expiredays); 
    //만료일=현재날짜(getDate로 받아옴)+지정날짜(expiredays)
    document.cookie=escape(name)+"="+escape(value)+";expires="+date.toUTCString()+";path=/" + ";SameSite=None; Secure";
    //쿠키설정=쿠키이름 URI인코딩 = 쿠키 값 URI인코딩 ;expires= 쿠키만료일+ 경로지정인데 /는 모든 경로에서 사용
}

function getCookie(name){ //name: 검색할 쿠키이름
    var cookie=document.cookie; //cookie: 모든 쿠키 문자열로 반환환
    console.log("쿠키를 요청합니다.");
    if (cookie!=""){ //쿠키가 뭐라도 있으면
        var cookie_array=cookie.split("; "); //1=1 ; 2=2; -> [1=1,2=2]
        //cookie에 저장된 쿠키들을 ; 기준으로 분리해서 배열로 변환
        for (var index in cookie_array){ //쿠키 배열의 모든 것들을 순회
            var cookie_name=cookie_array[index].split("="); //=를 기준으로 나누기, [1=1]->[1,1]
            if (cookie_name[0]==name){ //쿠키 이름이 id면
                return cookie_name[1]; //해당 쿠키 값 반환
            }
        }
    }
    return; //쿠키 없으면 결과 없음
}

function init() {
    const emailInput = document.getElementById('typeEmailX'); // 이메일 입력 필드
    const idsave_check = document.getElementById('idSaveCheck'); // 아이디 저장 체크박스
    let get_id = getCookie("id"); // 저장된 이메일 아이디 쿠키 가져오기
    
    const loginBtn = document.getElementById('login_btn'); // 로그인 버튼
    const errorContainer = document.getElementById("login_error_message"); // 오류 메시지 컨테이너

    let lockout_time = parseInt(getCookie("login_lockout_time")) || 0; // 로그인 잠금 시작 시간
    const lockoutDuration = 4 * 60 * 1000; // 잠금 기간 (4분)
    const currentTime = Date.now(); // 현재 시간

    // 이메일 저장 기능
    if (get_id) {
        emailInput.value = get_id; // 저장된 이메일을 입력 필드에 표시
        idsave_check.checked = true; // 체크박스를 체크 상태로 설정
        console.log("아이디를 기억합니다.");
    }

    // 잠금 상태 확인
    if (lockout_time && currentTime < lockout_time + lockoutDuration) {
        const remainingTime = lockout_time + lockoutDuration - currentTime;
        displayLockoutMessage(remainingTime); // 남은 잠금 시간 표시
        loginBtn.disabled = true; // 로그인 버튼 비활성화
    } else {
        errorContainer.style.display = "none"; // 오류 메시지 숨기기
        loginBtn.disabled = false; // 로그인 버튼 활성화
    }

    session_check(); // 세션 확인
}


// 로그인 횟수 카운트
function login_count() {
    let login_cnt = parseInt(getCookie("login_cnt")) || 0; // 기존 쿠키 값 가져오기, 없으면 0
    login_cnt++; // 값 증가
    setCookie("login_cnt", login_cnt, 7); // 쿠키에 저장 (7일 유효)
    console.log("로그인 횟수:", login_cnt); // 로그 출력
}

// 로그아웃 횟수 카운트
function logout_count() {
    console.log("logout_count 호출됨"); // 함수 호출 확인
    let logout_cnt = parseInt(getCookie("logout_cnt")) || 0; // 기존 쿠키 값 가져오기, 없으면 0
    logout_cnt++; // 값 증가
    setCookie("logout_cnt", logout_cnt, 7); // 쿠키에 저장 (7일 유효)
    console.log("로그아웃 횟수:", logout_cnt); // 로그 출력
}

//세션 삭제
function session_del(){
    if(sessionStorage){
        sessionStorage.removeItem("Session_Storage_id");
        alert("로그아웃 버튼 클릭 확인: 세션 스토리지를 삭제합니다.");
    } else{
        alert("세션 스토리지 지원x");
    }
}

function login_failed() {
    const maxFail = 3; // 최대 실패 횟수
    const lockoutDuration = 4 * 60 * 1000; // 4분 (밀리초 단위)
    let fail_count = parseInt(getCookie("login_fail_cnt")) || 0; // 기존 실패 횟수 가져오기, 없으면 0
    const currentTime = Date.now(); // 현재 시간

    // 실패 횟수 증가
    fail_count++;
    setCookie("login_fail_cnt", fail_count, 7); // 실패 횟수를 쿠키에 저장 (7일 유효)

    // 실패 횟수가 최대치를 넘었는지 확인
    if (fail_count >= maxFail) {
        setCookie("login_lockout_time", currentTime, 7); // 잠금 시작 시간 설정
        disableLoginButton(lockoutDuration); // 버튼 비활성화

        // 즉시 메시지 표시
        displayLockoutMessage(lockoutDuration);
        return;
    }

    // 실패 메시지 출력
    displayErrorMessage(`로그인 실패 (${fail_count}/${maxFail})`);
}


function disableLoginButton(duration) {
    const loginBtn = document.getElementById("login_btn");
    if (!loginBtn) return;

    // 로그인 버튼 비활성화
    loginBtn.disabled = true;

    // 주어진 시간이 지난 후 버튼 활성화
    setTimeout(() => {
        loginBtn.disabled = false;
    }, duration);
}



// UI에 오류 메시지를 표시
function displayErrorMessage(message) {
    const errorContainer = document.getElementById("login_error_message");
    if (errorContainer) {
        errorContainer.textContent = message;
        errorContainer.style.display = message ? "block" : "none";
    }
}

function displayLockoutMessage(duration) {
    const errorContainer = document.getElementById("login_error_message");
    const loginBtn = document.getElementById("login_btn");

    if (!errorContainer || !loginBtn) return;

    loginBtn.disabled = true; // 로그인 버튼 비활성화

    let remainingTime = duration; // 초기 남은 시간 설정

    // 남은 시간 업데이트 함수
    const updateMessage = () => {
        const minutes = Math.floor(remainingTime / 1000 / 60);
        const seconds = Math.ceil((remainingTime / 1000) % 60);
        errorContainer.textContent = `로그인 가능 횟수를 초과하였습니다. ${minutes}분 ${seconds}초 동안 로그인이 제한됩니다.`;
        errorContainer.style.display = "block";

        // 시간이 다 되었을 경우
        if (remainingTime <= 0) {
            clearInterval(timer); // 타이머 정지
            errorContainer.style.display = "none"; // 메시지 숨기기
            loginBtn.disabled = false; // 버튼 활성화
        } else {
            remainingTime -= 1000; // 1초씩 감소
        }
    };

    // 초기 메시지 설정 및 타이머 시작
    updateMessage();
    const timer = setInterval(updateMessage, 1000);
}



//로그인, 로그아웃 횟수 변수
const loginBtn = document.getElementById("login_btn");
const logoutBtn = document.getElementById("logout_btn");

// 로그인 버튼 이벤트 리스너에 실패 처리 연결
if (loginBtn) {
    loginBtn.addEventListener('click', function () {
        check_input();
        login_count();
    });
}

if (logoutBtn) {
    session_del();
    logoutBtn.addEventListener('click', logout_count);
}

function init_logined(){
    if(sessionStorage){
        decrypt_text(); // 복호화 함수
}
    else{
        alert("세션 스토리지 지원 x");
    }
}
    

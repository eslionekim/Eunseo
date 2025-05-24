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
    return false;
    }
    //패스워드 길이 제한
    if (passwordValue.length < 15) {
    alert('비밀번호는 반드시 15글자 이상 입력해야 합니다.');
    return false;
    }
    //패스워드 특수문자 포함
    if (!hasSpecialChar) { //hasSpecialChar가 false일 때,즉 특수문자 없을때때
    alert('패스워드는 특수문자를 1개이상 포함해야합니다.');
    return false;
    }
    //패스워드 대소문자 포함
    if (!hasUpperCase || !hasLowerCase) {//hasUpperCase가 false이거나 hasLowerCase가 false일 경우, 즉 대소문자 둘중 하나만 잇을떼떼
    alert('패스워드는 대소문자를 1개이상 포함해야합니다.');
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

    //결과
    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);
    loginForm.submit();
};
document.getElementById("login_btn").addEventListener('click', check_input);
    
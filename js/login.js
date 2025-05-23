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
    const loginForm = document.getElementById('login_form'); //loginform id
    const loginBtn = document.getElementById('login_btn'); //로그인버튼 id
    const emailInput = document.getElementById('typeEmailX'); //이메일버튼 
    const passwordInput = document.getElementById('typePasswordX'); //패스워드버튼 
    const c = '아이디, 패스워드를 체크합니다';
    alert(c);
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    const sanitizedPassword = check_xss(passwordInput);
    const sanitizedEmail = check_xss(emailInput);

    //hasSpecialChar=특수문자 인지, hasUpperCase= , hasLowerCase=
    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)!==null;
    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;

    if (emailValue.length <5 ) {
    alert('아이디는 최소 5글자 이상 입력해야 합니다. ');
    return false;
    }
    if (passwordValue.length < 12) {
    alert('비밀번호는 반드시 12글자 이상 입력해야 합니다.');
    return false;
    }
    if (!hasSpecialChar) { //hasSpecialChar가 false일 때,즉 특수문자 없을때때
    alert('패스워드는 특수문자를 1개이상 포함해야합니다.');
    return false;
    }
    if (!hasUpperCase || !hasLowerCase) {//hasUpperCase가 false이거나 hasLowerCase가 false일 경우, 즉 대소문자 둘중 하나만 잇을떼떼
    alert('패스워드는 대소문자를 1개이상 포함해야합니다.');
    return false;
    }
    if (!sanitizedEmail) {
    // Sanitize된 비밀번호 사용
    return false;
    }
    if (!sanitizedPassword) {
    // Sanitize된 비밀번호 사용
    return false;
    }

    //결과
    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);
    loginForm.submit();
};
document.getElementById("login_btn").addEventListener('click', check_input);
    
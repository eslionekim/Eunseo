if (true) {
    let c = 'let 접근';
    var c_1 = 'var 접근';
    }
    //console.log(c); // 만든곳에서만 사용
    console.log(c_1);
    let d = 5;
    //let d = '6'; // let은 동일한 이름으로 다시 만들수없어어
    console.log(d);
    const e = '상수1 접근';
    //e = 5; //const 값 재할당 안돼돼
    //const f // const는 선언과 동시에 할당해야함
    console.log(e);

    /* var 다시 만들기 가능 , 값 변경 가능 , 어디서든 사용 가능
        let 불가,             가능,          만든곳 중괄호
        const 불가,        선언과 동시에 할당 필수,         만든곳에서만 가능*/
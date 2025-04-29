var close_time;
var close_time2 = 10;

clearTimeout(close_time); //이전에 설정된 타임아웃이 있으면 취소소
close_time=setTimeout("close_window()",10000); //10초 후 close_window함수수
show_time(); //카운드 다운 시작작

function show_time(){
    let divClock=document.getElementById('Time');
    divClock.innerText=close_time2;
    close_time2--;
    setTimeout(show_time,1000);
}

function close_window() { // 함수 정의
    window.close(); // 윈도우 닫기
}
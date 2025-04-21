function pop_up(){ //이거 index.html에 추가
    window.open("../popup/popup.html","팝업테스트","width=400,height=300,top=10,left=10");
}

function show_clock(){
    let currentDate= new Date(); // 현재 시스템 날짜 객체 생성
    let divClock= document.getElementById('divClock'); //id로 입력받아옴옴
    let msg = "현재시간: ";
    if(currentDate.getHours()>12){  // 12시보다 크니까 오후
   msg += "오후";
    msg += currentDate.getHours()-12+"시"; //12시보다 커서 -12
    }
    else { //오전전
    msg += "오전";
    msg += currentDate.getHours()+"시";
    }
    msg += currentDate.getMinutes()+"분";
    msg += currentDate.getSeconds()+"초";
    divClock.innerText= msg; //divClock가 id인 텍스트를 msg로 변경
    if (currentDate.getMinutes()>58) {    //정각1분전빨강색출력
    divClock.style.color="red";
    }
    setTimeout(show_clock, 1000);  //1초마다갱신
   }
   
// function over(obj) {
//     obj.src="image/face.png";
// }

const over=(obj)=>{
    obj.src="image/face.png";
}

// function out(obj) {
//     obj.src="image/face_2.png";
// }

const out=(obj)=>{
    obj.src="image/face_2.png";
}

var close_time;
var close_time2=10;

clearTimeout(close_time); //이전에 설정된 타임아웃이 있으면 취소소
close_time=setTimeout("close_window()",10000); //10초 후 close_window함수수
show_time(); //카운드 다운 시작작

function show_time(){
    let divClock = document.getElementById('Time'); 
    divClock.innerText = close_time2; // 10초 삽입 시작
    close_time2--; // 1초씩 감소
    setTimeout(show_time, 1000);  //1초마다 갱신
}

function close_window() { // 함수 정의
    window.close(); // 윈도우 닫기
}
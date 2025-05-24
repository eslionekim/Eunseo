function pop_up(){ //index.html body태그에서 onload함, 메인페이지 치면 뜨는거거
    var cookieCheck = getCookie("popupYN"); //getCookie(): 쿠키 값 읽기
        if (cookieCheck != "N"){ //쿠키 값이 N이 아닐경우
        window.open("../popup/popup.html", "팝업테스트", "width=400, height=300, top=10, left=10");
    }
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

//머무를 때 이미지
const over=(obj)=>{
    obj.src="image/face.png";
}

//나갔을 때 이미지
const out=(obj)=>{
    obj.src="image/face_2.png";
}

function setCookie(name,value,expiredays){
    var date=new Date(); //date: 현재 날짜 가져옴
    date.setDate(date.getDate()+expiredays); 
    //만료일=현재날짜(getDate로 받아옴)+지정날짜(expiredays)
    document.cookie=escape(name)+"="+escape(value)+";expires="+date.toUTCString()+";path=/" + ";SameSite=None; Secure";
    //쿠키설정=쿠키이름 URI인코딩 = 쿠키 값 URI인코딩 ;expires= 쿠키만료일+ 경로지정인데 /는 모든 경로에서 사용
}

function getCookie(name){ //name: 검색할 쿠키이름름
    var cookie=document.cookie; //cookie: 모든 쿠키 문자열로 반환환
    console.log("쿠키를 요청합니다.");
    if (cookie!=""){ //쿠키가 뭐라도 있으면
        var cookie_array=cookie.split("; "); //1=1 ; 2=2; -> [1=1,2=2]
        //cookie에 저장된 쿠키들을 ; 기준으로 분리해서 배열로 변환
        for (var index in cookie_array){ //쿠키 배열의 모든 것들을 순회
            var cookie_name=cookie_array[index].split("="); //=를 기준으로 나누기, [1=1]->[1,1]
            if (cookie_name[0]=="popupYN"){ //쿠키 이름이 popupYN
                return cookie_name[1]; //해당 쿠키 값 반환 [0]이 이름, [1]이 값
            }
        }
    }
    return; //쿠키 없으면 결과 없음음
}

function closePopup(){
    if(document.getElementById('check_popup').value){//id가 check_popup인 요소.체크박스 선택된 경우
        setCookie("popupYN","N",1); //쿠키설정(이름,값,만료일1)
        console.log("쿠키를 설정합니다.");
        self.close();
    }
}
document.getElementById("search_btn").addEventListener('click',search_message);

const badWords=["시발","존나","개새끼","바보","멍청이"];

function search_message(){
    let search=document.getElementById("search_input").value.trim();
    if(search.length===0){
        alert("공백입니다");
        return false;
    }

    for(let word of badWords){
        if(search.includes(word)){
            alert("부적절한 검색어가 포함되어 있습니다");
            return false;
        }
    }
    alert("검색을 수행합니다."); // 공백 및 비속어 검사를 통과한 경우
    return true; // 검색 수행 가능
}
//같은 이름의 함수가 여러개면 에러는 안나는데 가장 마지막 함수만 실행
//let변수에 문자열 넣어서 출력하기

function googleSearch() {
    const searchTerm = document.getElementById("search_input").value; // 검색어로 설정
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    // 새 창에서 구글 검색을 수행
    window.open(googleSearchUrl, "_blank"); // 새로운 창에서 열기.
    return false;
}
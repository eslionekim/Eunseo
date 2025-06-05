function potpolioBtn() {
    if (sessionStorage.getItem("Session_Storage_id")) {
        const link = document.createElement("a");
        link.href = "./pdf/KIM_EUNSEO_Potpolio.pdf";
        link.download = "KIM_EUNSEO_Potpolio.pdf";
        link.click();
    } else {
        alert("로그인이 필요합니다.");
        window.location.href = "../index.html";
    }
}

document.getElementById("downloadBtn").addEventListener("click", potpolioBtn);

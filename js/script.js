
// 메인트 메이커 기본 기능

const editor = document.querySelector("#editor");
const preview = document.querySelector("#preview");

// 편집 도구 생성
editor.innerHTML = `
    <div class="controls">
        <h2>메인트 편집</h2>

        <label>세로 이미지</label>
        <input type="file" id="verticalImage" accept="image/*">

        <label>가로 이미지</label>
        <input type="file" id="horizontalImage" accept="image/*">

        <label>설명</label>
        <textarea id="description"
            placeholder="메인트에 들어갈 설명을 입력하세요."></textarea>
    </div>
`;

// 미리보기 영역 생성
preview.innerHTML = `
    <div class="mainte-preview">
        <div class="vertical-area">
            <img id="verticalPreview">
        </div>

        <div class="right-area">
            <div class="horizontal-area">
                <img id="horizontalPreview">
            </div>

            <div class="description-area">
                <p id="descriptionPreview"></p>
            </div>
        </div>
    </div>
`;

// 이미지 미리보기
function uploadImage(inputId, previewId) {
    const input = document.getElementById(inputId);
    const image = document.getElementById(previewId);

    input.addEventListener("change", () => {
        const file = input.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            image.src = reader.result;
        };

        reader.readAsDataURL(file);
    });
}

uploadImage("verticalImage", "verticalPreview");
uploadImage("horizontalImage", "horizontalPreview");

// 설명 실시간 반영
const description = document.getElementById("description");
const descriptionPreview =
    document.getElementById("descriptionPreview");

description.addEventListener("input", () => {
    descriptionPreview.textContent = description.value;
});

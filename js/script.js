
const editor = document.querySelector("#editor");
const preview = document.querySelector("#preview");

// 편집 패널
editor.innerHTML = `
    <div class="controls">
        <h2>메인트 편집</h2>

        <label>배경색</label>
        <input type="color" id="backgroundColor" value="#ffffff">

        <label>테두리색</label>
        <input type="color" id="borderColor" value="#222222">

        <label>세로 이미지 (선택)</label>
        <input type="file" id="verticalImage" accept="image/*">

        <label>가로 이미지 (선택)</label>
        <input type="file" id="horizontalImage" accept="image/*">

        <label>설명 (선택)</label>
        <textarea id="description"
            placeholder="메인트에 들어갈 설명을 입력하세요."></textarea>
    </div>
`;

// 미리보기 영역
preview.innerHTML = `
    <div class="mainte-preview">
        <div class="vertical-area">
            <img id="verticalPreview" alt="">
        </div>

        <div class="right-area">
            <div class="horizontal-area">
                <img id="horizontalPreview" alt="">
            </div>

            <div class="description-area">
                <p id="descriptionPreview"></p>
            </div>
        </div>
    </div>
`;

// 색상 변경
const mainte = document.querySelector(".mainte-preview");

function updateColors() {
    const background = document.getElementById("backgroundColor").value;
    const border = document.getElementById("borderColor").value;

    mainte.style.setProperty("--mainte-bg", background);
    mainte.style.setProperty("--mainte-border", border);
}

document.getElementById("backgroundColor")
    .addEventListener("input", updateColors);

document.getElementById("borderColor")
    .addEventListener("input", updateColors);

// 이미지 업로드
function uploadImage(inputId, previewId) {
    const input = document.getElementById(inputId);
    const image = document.getElementById(previewId);

    input.addEventListener("change", () => {
        const file = input.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("이미지 파일만 업로드할 수 있습니다.");
            input.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            image.src = reader.result;
        };

        reader.readAsDataURL(file);
    });
}

uploadImage("verticalImage", "verticalPreview");
uploadImage("horizontalImage", "horizontalPreview");

// 설명 입력
const description = document.getElementById("description");
const descriptionPreview = document.getElementById("descriptionPreview");

description.addEventListener("input", () => {
    descriptionPreview.textContent = description.value;
});

// 처음 색상 적용
updateColors();

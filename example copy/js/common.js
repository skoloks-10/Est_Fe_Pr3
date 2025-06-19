// js/common.js

const API_BASE_URL = "https://estapi.mandarin.weniv.co.kr";
let AUTH_TOKEN = localStorage.getItem("authToken") || "";

// --- DOM 요소 (공통) ---
const resultsContainer = document.getElementById("results-container");

// --- 토큰 관련 함수 ---
function getAuthToken() {
  return AUTH_TOKEN;
}

function setAuthToken(token) {
  AUTH_TOKEN = token;
  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
  }
  // 토큰 변경 시 UI 상태 업데이트
  updateAuthUIState();
}

// --- UI 상태 관리 함수 (공통) ---

// 초기 상태 메시지 설정
function setInitialState() {
  resultsContainer.innerHTML = `
        <div class="p-10 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
            <i class="fa-solid fa-users w-12 h-12 mb-4 text-gray-400 text-4xl"></i>
            <p class="font-semibold">사용자를 찾아보세요</p>
            <p class="text-sm">검색을 시작하려면 ${
              AUTH_TOKEN ? "키워드를 입력하세요." : "로그인이 필요합니다."
            }</p>
        </div>
    `;
  updateAuthUIState(); // 인증 상태에 따른 UI 업데이트
}

// 사용자 프로필 HTML 생성
function createUserProfileHTML(user) {
  return `
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
            <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                    ${
                      user.image
                        ? `<img src="${user.image}" alt="${user.username}" class="w-full h-full object-cover">`
                        : `<i class="fa-solid fa-user w-6 h-6 text-gray-500 dark:text-gray-400"></i>`
                    }
                </div>
                <div>
                    <p class="font-bold text-gray-800 dark:text-gray-100">${
                      user.username
                    }</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">@${
                      user.accountname
                    }</p>
                </div>
            </div>
            <div class="text-right">
                <div class="flex space-x-4 text-sm">
                    <div>
                        <span class="font-semibold text-gray-700 dark:text-gray-200">${
                          user.followerCount || 0
                        }</span>
                        <span class="ml-1 text-gray-500 dark:text-gray-400">팔로워</span>
                    </div>
                    <div>
                        <span class="font-semibold text-gray-700 dark:text-gray-200">${
                          user.followingCount || 0
                        }</span>
                        <span class="ml-1 text-gray-500 dark:text-gray-400">팔로잉</span>
                    </div>
                </div>
            </div>
        </div>`;
}

// 검색 결과 표시
function displayResults(users) {
  if (users && users.length > 0) {
    resultsContainer.innerHTML = users.map(createUserProfileHTML).join("");
  } else {
    resultsContainer.innerHTML = `
            <div class="p-10 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center">
                <i class="fa-solid fa-face-frown w-12 h-12 mb-4 text-gray-400 text-4xl"></i>
                <p class="font-semibold">검색 결과가 없습니다.</p>
                <p class="text-sm">다른 키워드로 검색해보세요.</p>
            </div>`;
  }
}

// 인증 상태에 따른 UI 업데이트 (auth.js와 search.js에서 사용)
function updateAuthUIState() {
  const loginSuccessMessage = document.getElementById("login-success-message");
  const loginErrorMessage = document.getElementById("login-error-message");
  const searchButton = document.getElementById("search-button");
  const keywordInput = document.getElementById("keyword-input");

  if (AUTH_TOKEN) {
    loginSuccessMessage.classList.remove("hidden");
    loginSuccessMessage.textContent = "로그인되어 있습니다. 검색을 시작하세요.";
    loginErrorMessage.textContent = "";
    searchButton.disabled = false;
    keywordInput.disabled = false;
  } else {
    loginSuccessMessage.classList.add("hidden");
    loginErrorMessage.textContent = "로그인이 필요합니다.";
    searchButton.disabled = true;
    keywordInput.disabled = true;
  }
}

// 초기 로드 시 실행
window.onload = () => {
  // 탭 선택 기능은 auth.js에 통합
  setInitialState();
};

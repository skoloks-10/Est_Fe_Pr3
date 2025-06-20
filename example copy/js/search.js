// js/search.js

// --- DOM 요소 (검색 관련) ---
const searchForm = document.getElementById("search-form");
const keywordInput = document.getElementById("keyword-input");
const searchButton = document.getElementById("search-button");
const searchButtonIcon = document.getElementById("search-button-icon");
const searchErrorMessage = document.getElementById("search-error-message");

// --- UI 상태 관리 함수 (검색 관련) ---

// 검색 로딩 상태 UI
function setSearchLoadingState(isLoading) {
  // common.js에서 AUTH_TOKEN을 관리하므로 getAuthToken()으로 가져옵니다.
  searchButton.disabled = isLoading || !getAuthToken();
  keywordInput.disabled = isLoading || !getAuthToken();
  if (isLoading) {
    searchButtonIcon.innerHTML = `<i class="fa-solid fa-spinner animate-spin w-5 h-5 mr-3"></i>`;
    resultsContainer.innerHTML = `
            <div class="p-10 text-center text-gray-500 dark:text-gray-400">
               <p>검색 중...</p>
            </div>`;
  } else {
    searchButtonIcon.innerHTML = `<i class="fa-solid fa-magnifying-glass w-5 h-5 mr-2"></i>`;
  }
}

// --- 이벤트 핸들러 (검색 관련) ---

// 검색 이벤트 핸들러
async function handleSearch(event) {
  event.preventDefault();
  const keyword = keywordInput.value.trim();

  searchErrorMessage.textContent = "";
  // common.js에서 AUTH_TOKEN을 관리하므로 getAuthToken()으로 가져옵니다.
  if (!getAuthToken()) {
    searchErrorMessage.textContent = "검색을 하려면 먼저 로그인해야 합니다.";
    setInitialState(); // common.js의 setInitialState 사용
    return;
  }
  if (!keyword) {
    searchErrorMessage.textContent = "검색어를 입력해주세요.";
    setInitialState(); // common.js의 setInitialState 사용
    return;
  }

  setSearchLoadingState(true);

  try {
    const response = await fetch(
      `${API_BASE_URL}/user/searchuser/?keyword=${keyword}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, // common.js의 getAuthToken 사용
          "Content-type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (response.status === 401) {
        // common.js의 setAuthToken을 사용하여 토큰 초기화
        setAuthToken(null);
        throw new Error(
          "인증 오류: 토큰이 만료되었거나 유효하지 않습니다. 다시 로그인해주세요."
        );
      }
      const message =
        errorData?.message || `HTTP 오류! 상태: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    displayResults(data); // common.js의 displayResults 사용
  } catch (err) {
    console.error("검색 실패:", err);
    searchErrorMessage.textContent =
      err.message || "검색 중 오류가 발생했습니다. 다시 시도해주세요.";
    resultsContainer.innerHTML = ""; // 검색 결과 컨테이너 초기화
    if (err.message.includes("인증 오류")) {
      setInitialState(); // common.js의 setInitialState 사용 (로그인 필요 메시지로 변경)
    }
  } finally {
    setSearchLoadingState(false);
  }
}

// --- 이벤트 리스너 등록 (검색 관련) ---
searchForm.addEventListener("submit", handleSearch);

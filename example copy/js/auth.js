// js/auth.js

// --- DOM 요소 (인증 관련) ---
const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const loginEmailInput = document.getElementById("login-email-input");
const loginPasswordInput = document.getElementById("login-password-input");
const loginButton = document.getElementById("login-button");
const loginButtonIcon = document.getElementById("login-button-icon");
const loginErrorMessage = document.getElementById("login-error-message");
const loginSuccessMessage = document.getElementById("login-success-message");

const signupUsernameInput = document.getElementById("signup-username-input");
const signupAccountnameInput = document.getElementById(
  "signup-accountname-input"
);
const signupEmailInput = document.getElementById("signup-email-input");
const signupPasswordInput = document.getElementById("signup-password-input");
const signupIntroInput = document.getElementById("signup-intro-input");
const signupButton = document.getElementById("signup-button");
const signupButtonIcon = document.getElementById("signup-button-icon");
const signupErrorMessage = document.getElementById("signup-error-message");
const signupSuccessMessage = document.getElementById("signup-success-message");

// --- UI 상태 관리 함수 (인증 관련) ---

// 탭 변경
function changeTab(tabName) {
  loginTab.classList.remove("active");
  signupTab.classList.remove("active");
  loginForm.classList.add("hidden");
  signupForm.classList.add("hidden");

  if (tabName === "login") {
    loginTab.classList.add("active");
    loginForm.classList.remove("hidden");
  } else if (tabName === "signup") {
    signupTab.classList.add("active");
    signupForm.classList.remove("hidden");
  }
  // 메시지 초기화
  loginErrorMessage.textContent = "";
  loginSuccessMessage.classList.add("hidden");
  signupErrorMessage.textContent = "";
  signupSuccessMessage.classList.add("hidden");
}

// 로그인 로딩 상태 UI
function setLoginLoadingState(isLoading) {
  loginButton.disabled = isLoading;
  loginEmailInput.disabled = isLoading;
  loginPasswordInput.disabled = isLoading;
  if (isLoading) {
    loginButtonIcon.innerHTML = `<i class="fa-solid fa-spinner animate-spin mr-2"></i>`;
    loginErrorMessage.textContent = "";
    loginSuccessMessage.classList.add("hidden");
  } else {
    loginButtonIcon.innerHTML = `<i class="fa-solid fa-sign-in-alt mr-2"></i>`;
  }
}

// 회원가입 로딩 상태 UI
function setSignupLoadingState(isLoading) {
  signupButton.disabled = isLoading;
  signupUsernameInput.disabled = isLoading;
  signupAccountnameInput.disabled = isLoading;
  signupEmailInput.disabled = isLoading;
  signupPasswordInput.disabled = isLoading;
  signupIntroInput.disabled = isLoading;

  if (isLoading) {
    signupButtonIcon.innerHTML = `<i class="fa-solid fa-spinner animate-spin mr-2"></i>`;
    signupErrorMessage.textContent = "";
    signupSuccessMessage.classList.add("hidden");
  } else {
    signupButtonIcon.innerHTML = `<i class="fa-solid fa-user-plus mr-2"></i>`;
  }
}

// --- 이벤트 핸들러 (인증 관련) ---

// 로그인 이벤트 핸들러
async function handleLogin(event) {
  event.preventDefault();
  const email = loginEmailInput.value.trim();
  const password = loginPasswordInput.value.trim();

  loginErrorMessage.textContent = "";
  loginSuccessMessage.classList.add("hidden");

  if (!email || !password) {
    loginErrorMessage.textContent = "이메일과 비밀번호를 모두 입력해주세요.";
    return;
  }

  setLoginLoadingState(true);

  try {
    const res = await fetch(`${API_BASE_URL}/user/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    });

    const resJson = await res.json();
    console.log("로그인 응답:", resJson);

    if (!res.ok) {
      const message =
        resJson.message ||
        resJson.errors[0]?.message ||
        `로그인 실패: ${res.statusText}`;
      throw new Error(message);
    }

    if (resJson && resJson.user && resJson.user.token) {
      setAuthToken(resJson.user.token); // common.js의 setAuthToken 사용
      console.log("로그인 성공, 토큰 획득:", getAuthToken()); // common.js의 getAuthToken 사용
      loginSuccessMessage.classList.remove("hidden");
      loginSuccessMessage.textContent = "로그인 성공! 이제 검색을 시작하세요.";
      setInitialState(); // common.js의 setInitialState 사용
    } else {
      throw new Error("로그인에 성공했지만, 응답에서 토큰을 찾을 수 없습니다.");
    }
  } catch (err) {
    console.error("로그인 실패:", err);
    loginErrorMessage.textContent =
      err.message || "로그인 중 오류가 발생했습니다. 다시 시도해주세요.";
    setAuthToken(null); // common.js의 setAuthToken 사용 (토큰 초기화)
    setInitialState(); // common.js의 setInitialState 사용 (UI 상태 업데이트)
  } finally {
    setLoginLoadingState(false);
  }
}

// 회원가입 이벤트 핸들러
async function handleSignup(event) {
  event.preventDefault();
  const username = signupUsernameInput.value.trim();
  const accountname = signupAccountnameInput.value.trim();
  const email = signupEmailInput.value.trim();
  const password = signupPasswordInput.value.trim();
  const intro = signupIntroInput.value.trim();

  signupErrorMessage.textContent = "";
  signupSuccessMessage.classList.add("hidden");

  if (!username || !accountname || !email || !password) {
    signupErrorMessage.textContent = "모든 필수 입력 필드를 채워주세요.";
    return;
  }

  setSignupLoadingState(true);

  try {
    const res = await fetch(`${API_BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
          accountname: accountname,
          intro: intro,
          image: "",
        },
      }),
    });

    const resJson = await res.json();
    console.log("회원가입 응답:", resJson);

    if (!res.ok) {
      const message =
        resJson.message ||
        resJson.errors[0]?.message ||
        `회원가입 실패: ${res.statusText}`;
      throw new Error(message);
    }

    signupSuccessMessage.classList.remove("hidden");
    signupSuccessMessage.textContent =
      "회원가입 성공! 이제 로그인 탭에서 로그인해주세요.";
    changeTab("login"); // 회원가입 성공 후 로그인 폼으로 전환
    // 회원가입 폼 필드 초기화
    signupUsernameInput.value = "";
    signupAccountnameInput.value = "";
    signupEmailInput.value = "";
    signupPasswordInput.value = "";
    signupIntroInput.value = "";
  } catch (err) {
    console.error("회원가입 실패:", err);
    signupErrorMessage.textContent =
      err.message || "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.";
  } finally {
    setSignupLoadingState(false);
  }
}

// --- 이벤트 리스너 등록 (인증 관련) ---
loginTab.addEventListener("click", () => changeTab("login"));
signupTab.addEventListener("click", () => changeTab("signup"));
loginForm.addEventListener("submit", handleLogin);
signupForm.addEventListener("submit", handleSignup);

// 초기 로드 시 로그인 탭 활성화 (common.js onload 보다 먼저 실행)
window.addEventListener("DOMContentLoaded", () => {
  changeTab("login");
});

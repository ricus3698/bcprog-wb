(function () {
  const root = document.documentElement;
  const body = document.body;
  const toggleBtn = document.getElementById("darkMode");

  // 테마 적용 함수
  function applyTheme(theme, save = true) {
    root.setAttribute("data-theme", theme);

    // body에 .dark 클래스 토글
    if (theme === "dark") {
      body.classList.add("dark");
      toggleBtn.textContent = "☀️"; // 다크모드일 때는 해 아이콘
    } else {
      body.classList.remove("dark");
      toggleBtn.textContent = "🌙"; // 라이트모드일 때는 달 아이콘
    }

    // 사용자가 직접 선택한 경우에만 localStorage 저장
    if (save) {
      localStorage.setItem("theme", theme);
    }
  }

  // 초기 상태: localStorage → 없으면 OS 설정
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme, false);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light", false);
  }

  // 운영체제 다크모드 변경 감지 (단, 사용자가 직접 선택하지 않은 경우만 반영)
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light", false);
    }
  });

  // 버튼 클릭 이벤트 (사용자 선택 → localStorage 저장)
  toggleBtn.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme, true);
  });
})();

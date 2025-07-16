🎨 디자인 파트 폴더 구조 & 협업 가이드
작성일: 2025-07-17
작성자: 디자인팀
목적: 다양한 프로젝트(Spring, PHP, 정적 웹사이트 등)에서 일관된 폴더 구조로 디자인 자산을 관리하고,
공통 리소스와 개별 리소스를 분리하여 효율적인 협업을 가능하게 합니다.

📁 전체 폴더 구조
css
복사
편집
design/
├── _core/          ← 모든 프로젝트에 공통으로 사용하는 자산
├── _assets/        ← 개별 프로젝트 전용 스타일, 스크립트, 이미지
├── _pages/         ← HTML 시안/구조
└── README.md       ← 폴더 설명 및 작업 가이드
📁 _core/ – 공통 디자인 자산
프로젝트를 불문하고 항상 포함되는 핵심 리소스

less
복사
편집
_core/
├── css/
│   ├── reset.css           → 브라우저 스타일 초기화
│   ├── variables.css       → 디자인 토큰(CSS 변수: 색상, 폰트, 여백 등)
│   ├── typography.css      → 타이포그래피 시스템
│   ├── layout.css          → Grid, Flex 등 레이아웃 정의
│   └── utility.css         → .d-flex, .text-center 등 유틸리티 클래스
│
├── js/
│   ├── common.js           → 공통 UI 기능: 탭, 아코디언, 드롭다운 등
│   └── accessibility.js    → 접근성 보조: 포커스 트랩, 키보드 내비게이션
│
├── fonts/
│   └── pretendard/         → 공통 웹폰트 (woff2 포함)
│
└── components/
    ├── header.html         → 공통 헤더 UI
    ├── footer.html         → 공통 푸터 UI
    ├── button.html         → 버튼 템플릿 모음
    └── modal.html          → 모달 UI 구조
📁 _assets/ – 프로젝트 전용 리소스
프로젝트마다 달라질 수 있는 디자인 요소를 여기에 포함

css
복사
편집
_assets/
├── css/
│   └── main.css         → 해당 프로젝트만의 커스텀 스타일
├── js/
│   └── script.js        → 프로젝트 고유 인터랙션
└── images/
    └── main-banner.jpg  → 배너, 썸네일, 아이콘 등
_core/는 절대 수정하지 않고, 변경이 필요한 경우 _assets/에서 덮어쓰기 형태로 스타일 정의

📁 _pages/ – HTML 시안/화면 구조
프론트 디자이너가 작업한 화면을 HTML로 구성해 시안 및 테스트 용도

pgsql
복사
편집
_pages/
├── index.html        → 메인 페이지
├── about.html        → 서브 페이지 예시
└── contact.html      → 기타 추가 페이지
Live Server 또는 GitHub Pages로 미리보기 가능

백엔드 연동 전에 구조 및 스타일 확인 용도

✅ Git 협업 규칙 (SourceTree 기준)
GitHub 저장소 Clone

작업 전 반드시 Pull

파일 수정 → Commit → Push

커밋 메시지 작성 규칙:

feat: 기능 추가 (예: feat: add footer section)

fix: 버그 수정

style: 스타일 변경

docs: 문서 변경

💡 운영/관리 팁
이 구조는 템플릿 저장소로 등록하여 새 프로젝트마다 복사 사용

README.md는 구조 설명 외에도 Figma 링크, 폰트 가이드 등 추가 가능

_core/는 디자이너들이 공유/업데이트 가능하지만, 마스터만 수정 권장

📌 권장 사용 흐름
GitHub에서 템플릿 저장소 복제

_assets/, _pages/만 수정하여 프로젝트에 맞춤화

_core/는 수정 없이 그대로 유지

HTML 미리보기는 Live Server or GitHub Pages로 진행


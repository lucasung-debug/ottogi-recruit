# CLAUDE.md

**Stack:** React 18 · Vite 6 · Tailwind CSS v4 · html2canvas · Google Sheets gviz API
**배포:** GitHub Actions → GitHub Pages (`lucasung-debug.github.io/ottogi-recruit/`)

## Run

```bash
npm install
npm run dev    # http://localhost:5173
npm run build  # dist/ 생성
```

## Key Files

- `src/App.jsx` — 라우팅 + 전체 상태 관리 (듀얼 모드 로직 포함)
- `src/pages/InputPage.jsx` — 입력 폼 (Sheets/AI 모드 전환)
- `src/pages/PreviewPage.jsx` — 포스터 미리보기 + PNG 다운로드
- `src/pages/SetupPage.jsx` — 회사 프로필 최초 설정
- `src/context/CompanyProfileContext.jsx` — 회사 프로필 (localStorage 저장)
- `src/services/ai.js` — OpenAI API 호출 (채용공고 AI 생성)
- `src/utils/sheets.js` — Google Sheets gviz API 파싱
- `src/config/defaults.js` — 기본 회사 설정값
- `src/styles/theme.js` — 디자인 토큰 (색상, 폰트)
- `public/fonts/` — OtokiSans 전용 폰트 파일 (삭제 금지)
- `vite.config.js` — `base` 값이 GitHub 레포 이름과 반드시 일치해야 함

## Data Flow

```
Sheets 모드: 시트 URL → gviz API → allGroups → matchJobs() → 포스터
AI 모드:     직무명 입력 → OpenAI API → aiResult.jobs → 포스터
```

## Key Patterns

- **듀얼 모드:** `sourceMode` = `"sheets"` 또는 `"ai"` (InputPage에서 전환)
- **Sheets 데이터 모드:** `dataMode` = `"auto"` (gviz) 또는 `"manual"` (TSV 붙여넣기)
- **회사 프로필:** `CompanyProfileContext` — localStorage에 저장, OpenAI API 키 포함
- **PNG 다운로드:** html2canvas `scale:2` 고해상도 캡처, CORS 이슈 주의
- **배포 경로:** `vite.config.js`의 `base: "/ottogi-recruit/"` — 변경 시 배포 경로 깨짐

## Constraints (하지 말 것)

- `vite.config.js`의 `base` 값 임의 변경 금지 (GitHub Pages 경로 깨짐)
- OpenAI API 키를 코드에 하드코딩 금지 — `CompanyProfileContext`(localStorage)에서만 참조
- `public/fonts/` OtokiSans 폰트 파일 삭제 금지 (라이선스 폰트)

## Compact Instructions

When compacting, always preserve:
- 수정 중인 컴포넌트명과 파일 경로
- 듀얼 모드(sheets/ai) 관련 변경사항
- 포스터 레이아웃 변경 내용 (PreviewPage)

Drop:
- App.jsx 전체 상태 목록 반복 출력
- node_modules 관련 출력

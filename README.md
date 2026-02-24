# 오뚜기라면 채용공고 자동 생성기

Google Sheets 데이터를 기반으로 채용공고 포스터 이미지를 자동 생성하는 웹앱.

## 기능

- **Google Sheets 자동 연동** — 시트 URL 입력 → 직무 데이터 자동 로드
- **직무 검색 매칭** — 직무명 입력 시 시트에서 자동 검색
- **채용 제목 편집** — 배너/메인 제목 자유롭게 변경
- **로고 업로드** — 기업 로고 이미지 삽입
- **PNG 다운로드** — html2canvas 기반 고품질 이미지 내보내기
- **수동 입력 폴백** — 자동 연동 실패 시 복사/붙여넣기 지원

## 배포 가이드 (비전공자용)

### 준비물

- GitHub 계정 (무료)
- 10분

### STEP 1. GitHub에 코드 올리기

1. [github.com](https://github.com) 로그인
2. 우측 상단 **+** → **New repository** 클릭
3. Repository name: `ottogi-recruit` 입력
4. **Public** 선택 → **Create repository** 클릭
5. 아래 명령어를 터미널(또는 Git Bash)에서 실행:

```bash
# 이 프로젝트 폴더에서 실행
cd ottogi-recruit
git init
git add .
git commit -m "초기 커밋"
git branch -M main
git remote add origin https://github.com/본인아이디/ottogi-recruit.git
git push -u origin main
```

> **Git이 처음이라면?**
> GitHub Desktop 앱을 설치하면 클릭만으로 가능합니다.
> https://desktop.github.com

### STEP 2. GitHub Pages 배포 설정

1. GitHub 리포지토리 → **Settings** 탭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source** 항목을 **GitHub Actions** 로 변경
4. 끝! push 하면 자동으로 빌드 & 배포됩니다

### STEP 3. 확인

- 배포 완료까지 약 1~2분 소요
- 접속 URL: `https://본인아이디.github.io/ottogi-recruit/`
- **Actions** 탭에서 배포 상태 확인 가능

## 리포지토리 이름을 다르게 쓸 경우

`vite.config.js`에서 `base` 값을 리포지토리 이름으로 변경:

```js
export default defineConfig({
  plugins: [react()],
  base: "/내-리포지토리-이름/",
});
```

## Google Sheets 설정

시트가 자동 연동되려면:

1. Google Sheets → **공유** 버튼 클릭
2. **일반 액세스** → `링크가 있는 모든 사용자` 선택
3. 권한: `뷰어` (보기) 이상

### 시트 컬럼 구조

| 컬럼 | 내용 | 비고 |
|------|------|------|
| A | 순번 | 직무 그룹핑 키 |
| B | 채용직무 | 직무명 |
| C | 담당업무 | 여러 행 가능 |
| D | 우대전공 | 빈칸 = "전공무관" |
| E | 자격요건 | `<필수사항>/<우대사항>` 구분 |
| J | 모집인원 | |
| K | 채용프로세스 | 단계별 |
| L | 모집일정 | `M/DD ~ M/DD` 형식 |

## 로컬 개발

```bash
npm install
npm run dev
```

http://localhost:5173 에서 확인 가능

## 기술 스택

- **React 18** + **Vite 6**
- **html2canvas** — DOM → PNG 캡처
- **Google Sheets gviz API** — 시트 데이터 조회
- **GitHub Actions** — CI/CD 자동 배포

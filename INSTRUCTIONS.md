# 건강증진교육개발 KMY협회 홈페이지 구현 지침서

> **사용법**: Claude Code에서 `@INSTRUCTIONS.md Phase 0부터 시작해줘` 입력

---

## 프로젝트 정보

| 항목 | 내용 |
|------|------|
| 프로젝트명 | 건강증진교육개발 KMY협회 홈페이지 리뉴얼 |
| 기존 사이트 | `https://www.xn--2e0br5lxwk4rnnmg.com/` |
| 대표 | 고미영 |
| 목적 | 전문 교육기관 신뢰감 전달, 교육생 모집 극대화, 모바일 접근성 확보 |
| 타겟 | 40~70대 중장년층 (교육 수강 희망자), 기관 담당자 (강사파견 문의) |
| 핵심 CTA | 교육과정 신청, 강사파견 문의, 전화 문의 |
| 기술 | HTML5 + CSS3 + Vanilla JS (프레임워크 없음) |

---

## 디자인 시스템

### CSS 변수 (style.css 최상단에 선언)

```css
:root {
  /* ── 컬러 ── */
  --color-primary: #1B5E4B;
  --color-primary-light: #2D8F6F;
  --color-primary-dark: #134A3A;
  --color-accent: #E8A838;
  --color-accent-hover: #D4952E;
  --color-dark: #1A1A2E;
  --color-text: #2C3E50;
  --color-muted: #7F8C8D;
  --color-border: #E0E0E0;
  --color-bg: #FFFFFF;
  --color-bg-light: #F7F9F8;
  --color-bg-card: #F0F7F4;
  --color-bg-warm: #FDF8F0;
  --color-success: #27AE60;
  --color-danger: #E74C3C;

  /* ── 타이포 ── */
  --font-heading: 'Noto Serif KR', serif;
  --font-body: 'Noto Sans KR', sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --leading-tight: 1.3;
  --leading-normal: 1.6;
  --leading-relaxed: 1.8;

  /* ── 간격 ── */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  --space-4xl: 6rem;
  --container-max: 1200px;
  --container-padding: 1.5rem;

  /* ── 장식 ── */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 30px rgba(0,0,0,0.12);
  --shadow-xl: 0 16px 48px rgba(0,0,0,0.15);
  --transition: all 0.3s ease;
}
```

### 폰트 import

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@400;700&display=swap');
```

### 중장년층 UX 규칙

- 본문 최소 16px, 제목은 크게
- 버튼 터치 영역 최소 48px × 48px
- 전화번호는 항상 `<a href="tel:010-6565-9996">`
- 고대비 색상 (WCAG AA 4.5:1)
- 복잡한 제스처 없이 클릭/탭 중심

---

## 사이트맵

```
index.html (메인)
├── about.html (협회소개)
│   ├── #greeting      인사말
│   ├── #vision        비전·미션
│   ├── #organization  조직도
│   └── #facility      교육장 안내
├── business.html (사업소개)
│   ├── #stacking      스포츠스태킹협회
│   └── #kmy           KMY협회 사업
├── education.html (교육과정)
│   ├── #courses       교육과정 안내
│   ├── #apply         교육신청 폼
│   └── #review        수강 후기
├── dispatch.html (강사파견)
│   ├── #intro         서비스 소개
│   └── #request       파견 신청 폼
├── activity.html (활동현황)
│   ├── #external      대외활동
│   ├── #certificate   자격과정
│   └── #class         특강/건강교실
└── contact.html (고객센터)
    ├── #notice        공지사항
    ├── #faq           자주 묻는 질문
    └── #inquiry       문의하기 폼
```

---

## Phase별 구현 상세

---

### Phase 0: 뼈대 (Skeleton)

**목표**: 스타일 없이 index.html의 HTML 구조만 완성

**생성할 파일**:
- `index.html`
- `css/style.css` (리셋 + CSS 변수 선언만)

**index.html 구조**:

```
<!DOCTYPE html>
<html lang="ko">
<head>
  charset, viewport, title, description, OG태그, favicon, 폰트, style.css 링크
</head>
<body>
  <a class="skip-link" href="#main">본문 바로가기</a>

  <header class="site-header">
    <div class="container">
      로고 + nav(6개 메뉴 + 드롭다운) + 전화버튼 + 햄버거버튼(모바일)
    </div>
  </header>

  <main id="main">
    <section class="hero"> 메인 카피 + CTA 2개 </section>
    <section class="values"> 핵심 가치 3개 카드 </section>
    <section class="courses"> 교육과정 하이라이트 4개 </section>
    <section class="gallery"> 활동현황 갤러리 </section>
    <section class="cta-banner"> 교육신청 유도 배너 </section>
    <section class="notice-contact"> 공지사항 + 빠른 문의 </section>
  </main>

  <footer class="site-footer">
    로고 + 빠른링크 + 연락처 + 저작권
  </footer>

  <button class="scroll-top" aria-label="맨 위로">↑</button>
  <script src="js/main.js"></script>
</body>
</html>
```

**style.css**:
```
CSS 리셋(box-sizing, margin 0) + :root 변수 선언만
```

**확인**: 브라우저에서 열면 스타일 없는 텍스트+링크가 모두 보여야 함

---

### Phase 1: 기본 레이아웃 + 디자인 시스템

**목표**: CSS 변수 적용, header(sticky) + footer 스타일, 기본 타이포그래피

**작업**:
1. Google Fonts import 추가
2. body 기본 스타일 (font-family, color, line-height)
3. `.container` 클래스 (max-width + padding + margin auto)
4. header: sticky, 배경 흰색, 그림자, 로고+메뉴 flexbox
5. nav: 가로 메뉴, 호버 시 색상 변경, 드롭다운 구조
6. footer: 다크 배경, 3컬럼 grid, 링크 스타일
7. 기본 타이포그래피: h1~h6, p, a 스타일

**확인**: header가 상단 고정, footer가 하단에 위치, 폰트가 적용됨

---

### Phase 2: 히어로 + 핵심 가치

**목표**: 메인 비주얼 완성 (첫 화면)

**히어로 섹션**:
```
- 배경: var(--color-dark) 그라데이션 또는 배경 이미지 + 오버레이
- 높이: min-height: 80vh
- 메인 카피: "건강한 삶의 시작, 웰니스 전문가와 함께"
  (font-heading, text-4xl~5xl, 흰색)
- 서브 카피: "생애주기별 헬스케어 토탈 솔루션을 제공하는 웰니스 컨설팅 전문가 양성기관"
  (font-body, text-lg, 연한 색)
- CTA 버튼:
  [교육과정 보기] → education.html (골드 배경, 흰색 텍스트)
  [교육신청 하기] → education.html#apply (흰색 테두리, 투명 배경)
- 페이드인 애니메이션 (CSS @keyframes)
```

**핵심 가치 섹션**:
```
- 배경: var(--color-bg-light)
- 섹션 타이틀: "평생친구들과 함께하면"
- 3컬럼 카드 (모바일: 1컬럼):
  1. 🎓 전문가 성장
     "현대사회가 원하는 웰니스 컨설팅 전문가로 성장할 수 있습니다"
  2. 💼 일자리 연계
     "학교, 주민자치센터, 경로당, 요양원 등과 제휴한 안정적 일자리"
  3. 📋 맞춤 프로그램
     "개인별·시설환경 분석, 맞춤 프로그램 운영, 체계적 운영시스템"
- 카드: 흰색 배경, 그림자, 호버 시 translateY(-4px)
- 아이콘: 원형 그린 배경 안에 이모지 또는 SVG
```

**확인**: 첫 화면이 전문적이고 CTA가 눈에 잘 띄는가?

---

### Phase 3: 나머지 메인 섹션

순서대로 하나씩 추가:

#### 3a. 교육과정 하이라이트

```
- 배경: 흰색
- 섹션 타이틀: "교육과정 안내"
- 4개 카드 (2×2 grid, 모바일 1컬럼):
  1. 건강운동지도자 과정
  2. 파크골프지도자 과정
  3. 스포츠스태킹지도자 과정
  4. 실버건강운동지도 과정
- 각 카드: 상단 이미지(placehold.co) + 과정명 + 설명 1줄 + [자세히 보기]
- 하단: [전체 교육과정 보기] 버튼 → education.html
```

#### 3b. 활동현황 갤러리

```
- 배경: var(--color-bg-light)
- 섹션 타이틀: "활동현황"
- 6~8개 이미지 그리드 (3컬럼, 모바일 2컬럼)
- 이미지 호버: 오버레이 + 제목 표시
- 하단: [더보기] 버튼 → activity.html
```

#### 3c. CTA 배너

```
- 배경: var(--color-primary) 또는 그라데이션
- 풀 너비
- "지금 바로 교육과정에 참여하세요"
- "체계적인 교육시스템으로 웰니스 전문가의 꿈을 실현합니다"
- [교육신청 바로가기] 골드 버튼
- [전화 문의: 010-6565-9996] tel 링크
```

#### 3d. 공지사항 + 빠른 문의

```
- 배경: 흰색
- 2컬럼 (모바일: 1컬럼 스택)
- 왼쪽: 공지사항 리스트 5개 (날짜 + 제목) + [전체보기]
  예시:
  2026.03.01 | 2026년 상반기 교육과정 안내
  2026.02.15 | 파크골프지도자 자격과정 개설
  2026.02.01 | 건강운동지도자 수료식 안내
  2026.01.20 | 2026년 신년 인사
  2026.01.10 | 홈페이지 리뉴얼 안내
- 오른쪽: 빠른 문의 폼 (이름, 연락처, 문의내용, [문의하기])
```

**확인**: 섹션 간 리듬감(배경색 교차), 충분한 여백

---

### Phase 4: 반응형

**목표**: 320px ~ 1920px 모든 뷰포트 대응

**브레이크포인트**:
```css
/* 기본: 모바일 (0~767px) */
/* 태블릿 */
@media (min-width: 768px) { }
/* 데스크톱 */
@media (min-width: 1024px) { }
/* 와이드 */
@media (min-width: 1280px) { }
```

**핵심 작업**:
1. 모바일 내비게이션 (햄버거 → 풀스크린 오버레이 또는 슬라이드)
2. 히어로 텍스트 사이즈 축소 (모바일 text-3xl)
3. 그리드 → 단일 컬럼 변환
4. 2컬럼 → 스택 (공지+문의)
5. 이미지 `max-width: 100%`
6. 푸터 3컬럼 → 스택
7. 전화번호 버튼 모바일에서 더 크게

**확인**: Chrome DevTools → iPhone SE, iPhone 14, iPad, 1920px 각각 확인

---

### Phase 5: 인터랙션 + 애니메이션

**목표**: main.js 작성

**구현할 기능**:

```javascript
// 1. 모바일 메뉴 토글
// 햄버거 버튼 클릭 → nav 표시/숨김
// body overflow hidden 토글 (스크롤 방지)
// ESC키로 닫기

// 2. 스크롤 시 헤더 변환
// scrollY > 50 → header에 .scrolled 클래스 추가
// 배경색 투명→흰색, 그림자 추가

// 3. 부드러운 스크롤
// 앵커 링크 클릭 시 smooth scroll
// scroll-behavior: smooth CSS도 함께

// 4. 스크롤 애니메이션 (IntersectionObserver)
// .fade-in-up 클래스 → 뷰포트 진입 시 나타남
// threshold: 0.1, rootMargin: "0px 0px -50px 0px"

// 5. 맨 위로 가기 버튼
// scrollY > 300 → 버튼 표시
// 클릭 시 window.scrollTo({ top: 0, behavior: 'smooth' })

// 6. 드롭다운 메뉴
// 데스크톱: hover로 열림 (CSS :hover)
// 모바일: 클릭으로 열림 (JS 토글)
```

**확인**: 애니메이션이 부드럽고 과하지 않은가? 60fps 유지?

---

### Phase 6: 서브 페이지

공통 요소를 먼저 만들고, 페이지별 진행:

#### 공통 컴포넌트

```
- header, footer: index.html과 동일 (복사)
- 서브 페이지 히어로 (높이 250~300px):
  배경 딥그린 + 페이지 타이틀 + 빵부스러기(HOME > 메뉴명 > 서브메뉴)
- 사이드 내비게이션 (해당 메뉴의 서브 메뉴 목록)
```

#### 6a. about.html

```
#greeting 인사말:
- 2컬럼: 대표 사진(placeholder) + 인사말 텍스트
- 대표: 고미영
- 내용: 웰니스 개념 설명 + 평생친구들 소개 + 4가지 차별점
- 하단: 대표 이름 + 서명 스타일

#vision 비전·미션:
- 비전: "건강한 삶, 행복한 사회를 만드는 웰니스 교육의 선두주자"
- 미션 4개 카드 (아이콘 + 텍스트)

#organization 조직도:
- CSS로 트리 구조 (대표 → 3개 부서 → 하위)

#facility 교육장 안내:
- 주소 + 지도(iframe 또는 이미지)
- 교통안내 + 교육장 사진
```

#### 6b. education.html

```
#courses 교육과정:
- 탭 UI로 각 과정 전환
- 과정별: 개요, 대상, 기간, 커리큘럼, 자격증

#apply 교육신청:
- 폼: 이름, 연락처, 이메일, 희망과정(select), 희망시기(select), 기타(textarea)
- JS 유효성 검사 (필수값, 전화번호 형식, 이메일 형식)
- 제출 시: alert('신청이 완료되었습니다') + reset

#review 수강 후기:
- 후기 카드 (과정명, 별점, 텍스트, 수강자명)
- 3~4개 샘플 데이터
```

#### 6c. dispatch.html

```
#intro 서비스 소개:
- 프로세스 4단계 타임라인 (문의→설계→배정→운영)
- 파견 가능 분야 아이콘 그리드
- 파견 실적/기관 목록

#request 파견 신청:
- 폼: 기관명, 담당자, 연락처, 이메일, 희망분야, 희망일정, 참여인원, 상세요청
- JS 유효성 검사
```

#### 6d. activity.html

```
탭 3개: 대외활동 / 자격과정 / 특강·건강교실

각 탭:
- 이미지 카드 그리드 (3컬럼, 모바일 1컬럼)
- 카드: 이미지 + 제목 + 날짜
- 이미지 클릭: 라이트박스(모달)로 확대
- JS로 탭 전환 구현
```

#### 6e. contact.html

```
#notice 공지사항:
- 리스트 테이블 (번호, 제목, 날짜)
- 클릭 시 아코디언 확장으로 내용 표시
- 샘플 5~8개

#faq 자주 묻는 질문:
- 아코디언 (질문 클릭 → 답변 슬라이드 다운)
- 샘플 FAQ 8~10개:
  Q: 교육과정은 어떻게 신청하나요?
  Q: 수강료는 얼마인가요?
  Q: 자격증은 어떤 것을 취득할 수 있나요?
  Q: 교육 시간은 어떻게 되나요?
  Q: 주차가 가능한가요?
  ...

#inquiry 문의하기:
- 2컬럼: 폼(왼쪽) + 연락처 카드(오른쪽)
- 폼: 이름, 이메일, 연락처, 문의유형(select), 문의내용
- 연락처 카드: 전화, 이메일, 주소, 운영시간
```

**확인**: 모든 페이지 간 내비게이션 링크 동작, 현재 페이지 메뉴 하이라이트

---

### Phase 7: 최종 QA + SEO

**SEO 작업**:
```
- 각 페이지 고유 <title> 및 <meta description>
- Open Graph 태그 (og:title, og:description, og:image, og:url)
- JSON-LD 구조화 데이터:
  { "@type": "EducationalOrganization", "name": "건강증진교육개발KMY협회", ... }
- sitemap.xml 생성
- robots.txt 생성
```

**접근성 체크**:
```
□ skip-to-content 링크
□ 모든 img에 alt 텍스트
□ 폼 label-for 연결
□ aria-label, aria-expanded 사용
□ 키보드 탭 순서 확인
□ 포커스 스타일 확인 (outline)
□ 색상 대비 4.5:1 이상
```

**QA 체크리스트**:
```
□ 모든 페이지 링크 동작
□ 모바일/태블릿/데스크톱 반응형
□ 폼 유효성 검사
□ 햄버거 메뉴 열기/닫기
□ 스크롤 애니메이션
□ 맨 위로 버튼
□ 탭/아코디언 동작
□ 라이트박스 동작
□ 전화번호 tel: 링크
□ favicon 존재
```

---

## 콘텐츠 원본

### 대표 인사말

안녕하세요. 평생친구들 대표 고미영입니다.

세계는 지금 건강관리의 새로운 물결 "웰니스"에 주목하고 있습니다. 웰니스는 행복과 건강의 합성어로 신체적 건강을 넘어 정신적·사회적으로도 건강한 상태를 일컫는 말로 삶의 질을 의미합니다.

"평생친구들"은 이러한 관점에서 출발했습니다. 평생친구들은 생애주기별 헬스케어 토탈 솔루션을 제공하는 웰니스 컨설팅 전문가를 양성하고 있습니다.

**평생친구들과 함께하시면**

첫째, 현대사회가 원하는 웰니스 컨설팅 전문가로 성장할 수 있습니다.
둘째, 여러분이 능력과 지식을 발휘할 수 있는 일자리 발굴을 돕겠습니다.
셋째, 개인별·시설환경을 분석한 맞춤 프로그램을 운영합니다.
넷째, 여러분의 삶의 만족도를 높여 드립니다.

평생친구들 대표회장 고미영 올림

### 연락처

```
교육장: 대구광역시 수성구 달구벌대로 3171-1, 2층(플러스평생교육원)
대표번호: 010-6565-9996
이메일: miko7154@hanmail.net / 2883jin@hanmail.net
```

### 내비게이션 메뉴

```
협회소개: 인사말 | 조직도 | 교육장 안내
사업소개: (사)대한생활체육회스포츠스태킹협회 | 건강증진교육개발 KMY협회
교육과정안내: 교육과정 | 교육신청
위탁 및 강사파견: 소개 | 위탁/강사파견 신청
활동현황: 대외활동 | 자격과정 | 특강/건강교실
고객센터: 공지사항 | 문의하기 | 사회공헌 활동참여 | 지부활동사항
```

---

## 이미지 플레이스홀더

실제 이미지가 없으므로 아래 형식 사용:

```html
<img src="https://placehold.co/600x400/1B5E4B/FFFFFF?text=교육현장&font=noto-sans"
     alt="교육 현장 모습" loading="lazy">

<img src="https://placehold.co/400x300/2D8F6F/FFFFFF?text=파크골프&font=noto-sans"
     alt="파크골프 지도자 과정" loading="lazy">

<img src="https://placehold.co/800x400/1A1A2E/E8A838?text=KMY협회&font=noto-sans"
     alt="KMY협회 배너" loading="lazy">
```

---

## 명령어 가이드

```
"Phase 0부터 시작해줘"          → Phase 0 실행
"다음 Phase"                    → 다음 단계로 진행
"Phase 3b만 해줘"               → 특정 서브 Phase 실행
"히어로 배경을 이미지로 바꿔줘"   → 특정 부분 수정
"모바일에서 확인해줘"            → 반응형 점검
"전체 QA 해줘"                  → Phase 7 실행
"현재 진행 상황 알려줘"          → 완료/미완료 Phase 정리
```

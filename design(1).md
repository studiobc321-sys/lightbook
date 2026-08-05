# 빛책사 Website Design System — Photo-first Editorial

> **디자인 유형:** Image-led Editorial Web Design  
> **보조 정의:** 포토북·매거진·아트북 스타일의 사진 아카이브형 브랜드 사이트  
> **핵심 원칙:** 사진이 내용을 말하고, 타이포그래피와 여백은 사진을 정리한다.

---

## 1. 디자인을 말로 설명하는 정확한 표현

빛책사에 적용할 디자인은 일반적인 감성 회사소개형 랜딩페이지가 아니다.

### 가장 정확한 한글 표현

> **이미지 중심 에디토리얼 웹디자인**

### 함께 사용할 수 있는 표현

- 포토 에디토리얼 웹사이트
- 매거진·아트북 스타일 레이아웃
- 포토북 지면형 웹디자인
- 사진 아카이브형 포트폴리오
- 미니멀 포토그래피 포트폴리오
- 모더니스트 그리드 기반 브랜드 사이트

### Codex·디자이너에게 전달할 영어 표현

```text
Photo-first editorial portfolio website with oversized typography,
Swiss-inspired grid, generous whitespace, asymmetrical image layouts,
and small magazine-style captions.
```

### 참고 이미지에서 가져올 공통 원리

- 화면을 지배하는 큰 대표 사진
- 글보다 사진이 더 많은 면적을 차지하는 구성
- 흰색·아이보리 배경과 먹색 타이포그래피
- 큰 제목과 매우 작은 캡션의 강한 크기 대비
- 동일한 카드 반복이 아닌 비대칭 이미지 그리드
- 페이지 번호, 사진 번호, 짧은 설명을 활용한 출판물 느낌
- 모서리, 그림자, 장식이 거의 없는 플랫한 구성
- 여백 자체를 디자인 요소로 사용하는 방식

---

## 2. Brand Visual Positioning

### Brand Identity

- 기록
- 가족
- 사진
- 인터뷰
- 포토에세이
- 세대 간 전달
- 차분한 신뢰
- 현대적인 출판 감성

### 시각적 인상

```text
오래된 가족 앨범의 정서
+ 독립 출판물의 편집 감각
+ 현대 사진 포트폴리오의 간결함
```

### 피해야 할 방향

- 금색과 클래식 영문 세리프로 만든 전형적인 럭셔리 디자인
- 장례·추모 서비스처럼 지나치게 어두운 분위기
- SaaS·앱 랜딩페이지처럼 카드와 아이콘이 많은 구성
- 감성 문구만 길고 실제 사진이 작은 구성
- 모든 섹션이 비슷한 텍스트 블록으로 반복되는 구성

---

## 3. Core Design Principles

### 3.1 Photo First

- 화면 시각 비중의 `65~80%`를 사진이 차지한다.
- 각 주요 섹션은 큰 사진 1장 또는 3~6장의 편집형 이미지 배열로 시작한다.
- 사진이 부족하면 섹션을 단순하게 줄이며, 임의 생성이나 스톡 사진으로 채우지 않는다.
- 사진 위에 긴 글을 덮지 않는다.

### 3.2 Editorial Hierarchy

```text
대형 제목
→ 대표 사진
→ 작은 캡션·번호
→ 짧은 설명
→ CTA
```

- 제목과 캡션 사이의 크기 대비를 크게 만든다.
- 서비스 설명은 2~4줄로 제한한다.
- 사진에 필요한 정보만 작은 메타 텍스트로 붙인다.

### 3.3 Grid, Not Cards

- 12컬럼 그리드를 사용한다.
- 카드 테두리와 둥근 박스로 구조를 만들지 않는다.
- 큰 이미지와 작은 이미지의 비대칭 배치로 위계를 만든다.
- 얇은 구분선, 정렬, 여백으로 섹션을 구분한다.

### 3.4 Quiet Interaction

- 인터랙션은 사진 감상을 돕는 수준으로 제한한다.
- 페이지 기본 스크롤을 방해하지 않는다.
- 제작 과정 섹션에서만 sticky 스크롤 내러티브를 핵심 인터랙션으로 사용한다.

---

## 4. Typography System

레퍼런스의 현대적인 포트폴리오 인상을 따라 **산세리프 중심**으로 구성한다.

| 분류 | 폰트 | 적용 대상 | 가이드 |
| :--- | :--- | :--- | :--- |
| **Display Sans** | Pretendard / SUIT / Helvetica Neue / Arial | Hero H1, 큰 섹션 제목 | 500~650, 약간 좁은 자간 |
| **Body & UI** | Pretendard | 본문, 내비게이션, 버튼 | 400~600, 높은 가독성 |
| **Optional Korean Serif** | MaruBuri / Noto Serif KR | 브랜드 문장 1~2곳 | 400~500, 제한적으로 사용 |
| **Caption / Metadata** | Pretendard | 사진 번호, 날짜, 캡션 | 400~500, 11~13px |

### Type Scale

```css
--text-hero: clamp(48px, 7vw, 112px);
--text-section: clamp(34px, 4.5vw, 72px);
--text-subtitle: clamp(20px, 2.2vw, 32px);
--text-body: clamp(16px, 1.15vw, 18px);
--text-caption: clamp(11px, 0.8vw, 13px);
```

### Line Height

- Hero: `0.98~1.08`
- Section Heading: `1.08~1.18`
- Body: `1.65~1.85`
- Caption: `1.35~1.5`

### 규칙

- H1은 2~3줄 이내로 제한한다.
- 영문 대문자 장식 문구를 반복하지 않는다.
- Cormorant Garamond, Cinzel 같은 클래식 영문 서체는 기본 시스템에서 제외한다.
- 감성 문장만 선택적으로 명조를 사용하고, 나머지는 산세리프로 통일한다.

---

## 5. Core Color Palette

색은 사진을 방해하지 않도록 거의 무채색에 가깝게 사용한다.

```css
:root {
  --paper: #f4f3ee;
  --paper-soft: #fbfaf6;
  --white: #ffffff;
  --ink: #11110f;
  --body: #34332f;
  --muted: #77756e;
  --line: #d7d5ce;
  --forest: #294438;
  --forest-hover: #20372e;
}
```

### 역할

| Token | 역할 |
| :--- | :--- |
| `--paper` | 전체 페이지 또는 구분 섹션의 따뜻한 회백색 |
| `--paper-soft` | 히어로·브랜드 소개의 가장 밝은 종이색 |
| `--white` | 사진 그리드와 에디토리얼 지면의 깨끗한 바탕 |
| `--ink` | 대형 제목과 강한 텍스트 |
| `--body` | 본문 |
| `--muted` | 캡션, 날짜, 보조 정보 |
| `--line` | 1px 구분선 |
| `--forest` | 스마트스토어 Primary CTA와 활성 프로세스 |

### 색상 사용 비율

- 종이색·백색 `70%`
- 사진의 원래 색 `20%`
- 먹색·회색 `8%`
- 진녹색 `2%`

### 금지

- 금색을 브랜드 기본 포인트로 사용하지 않는다.
- 다크 브라운·네이비·골드를 섹션마다 번갈아 사용하지 않는다.
- 그라데이션, 글로우, 반투명 유리 효과를 사용하지 않는다.

---

## 6. Grid & Spacing System

```css
:root {
  --max-width: 1440px;
  --content-width: 1280px;
  --gutter: clamp(20px, 4.5vw, 72px);
  --grid-gap: clamp(10px, 1.2vw, 20px);
  --section-space: clamp(96px, 12vw, 180px);
}
```

### Desktop

- 12컬럼
- 전체 최대 너비 `1440px`
- 콘텐츠 최대 너비 `1280px`
- 좌우 여백 `48~72px`
- 컬럼 간격 `12~20px`

### Image Span Guide

- Hero image: `10~12 columns`
- Lead story image: `7~8 columns`
- Supporting landscape: `4~5 columns`
- Supporting portrait: `3~4 columns`
- Small detail image: `2~3 columns`

### Vertical Rhythm

- 섹션 상하: 데스크톱 `128~180px`
- 모바일 `80~112px`
- 제목과 사진 사이: `36~64px`
- 사진과 캡션 사이: `8~12px`
- 사진 간 간격: `10~20px`

---

## 7. Image Direction

### 사용 우선순위

1. 실제 완성 포토에세이와 펼쳐진 지면
2. 오래된 가족사진과 복원된 사진
3. 인터뷰와 기록 정리 과정
4. 편집·디자인 작업 과정
5. 완성책을 읽는 부모님 또는 가족

### 사진 비율

| 용도 | 권장 비율 |
| :--- | :--- |
| Hero | `16:9`, `3:2`, 넓은 원본 |
| 인물 중심 | `4:5`, `3:4` |
| 펼쳐진 책 | `3:2`, `4:3` |
| 디테일 | `1:1`, `4:5` |
| 프로세스 패널 | `4:3`, `3:2` |

### 처리 방식

- `border-radius: 0` 기본, 최대 `2px`
- 기본 그림자 없음
- 테두리 없음
- 원본 사진의 톤을 존중한다.
- 일괄 흑백 필터를 사용하지 않는다.
- 인물 얼굴과 책 표지가 잘리지 않도록 `object-position`을 개별 지정한다.
- 사진 크레딧이나 맥락이 있으면 작은 캡션으로 제공한다.

### Caption Pattern

```text
01 / 오래된 가족사진
1998, 서울
사진 복원 전
```

캡션은 1~2줄을 기본으로 하며, 장문의 설명문으로 사용하지 않는다.

---

## 8. Component Style

### Header

- 높이 `64~76px`
- 로고는 작고 단정한 텍스트 로고
- 내비게이션은 작은 산세리프
- 그림자 없음
- Primary CTA만 진녹색

### Button

```css
.button-primary {
  min-height: 48px;
  padding: 0 22px;
  border-radius: 0;
  background: var(--forest);
  color: #fff;
}
```

- 알약 모양 금지
- 과한 화살표 애니메이션 금지
- Hover는 배경색 변화 또는 2px 이동 정도

### Link

- 밑줄 또는 짧은 화살표를 사용할 수 있다.
- 텍스트 링크는 주변 여백으로 클릭 영역을 확보한다.

### Divider

- `1px solid var(--line)`
- 긴 가로선 또는 사진 번호와 함께 사용할 수 있다.
- 장식용 금색 라인은 사용하지 않는다.

### Figure

```text
figure
├─ img
└─ figcaption
   ├─ number
   └─ short context
```

사진과 캡션을 하나의 기본 컴포넌트로 사용한다.

---

## 9. Section Design Flow

### Section 01. Header + Editorial Hero

**목적:** 큰 사진과 한 문장으로 브랜드 첫인상을 만든다.

- 배경: `--paper-soft`
- 상단: 큰 H1과 짧은 설명
- 하단: 폭이 큰 대표 사진
- CTA: 진녹색 한 개
- 캡션: 사진 아래 작은 번호·설명

```text
당신의 기억을,
한 권의 책으로.
```

---

### Section 02. Brand Introduction + Photo Index

**목적:** 브랜드 설명을 짧게 제공하고 실제 작업을 사진으로 보여준다.

- 상단 3열 소개 행
- 하단 비대칭 사진 그리드
- 큰 사진 1장 + 보조 사진 2~4장
- 캡션과 번호 사용
- 카드 배경 없음

---

### Section 03. Scroll Process

**목적:** 제작 과정을 설명하는 유일한 강한 인터랙션 섹션.

- 왼쪽 Step 1~4 세로 타임라인
- 오른쪽 큰 사진과 짧은 설명
- sticky stage
- 페이지 기본 스크롤 유지
- 활성 색은 `--forest`
- 카드, 아이콘, 썸네일 목록 없음

상세 계산 방식은 `LIGHTBOOK_CODEX_BRIEF.md`의 ScrollProcessSection 명세를 그대로 따른다.

---

### Section 04. Selected Books Archive

**목적:** 실제 제작 사례와 책의 물성을 보여준다.

- 작품 수에 따라 2열 또는 3열
- 같은 크기 카드 대신 사진 비율을 살린 편집형 그리드
- 각 사례는 제목, 관계 또는 제작 연도, 짧은 캡션만 제공
- Hover 시 사진이 `1.01~1.02` 확대될 수 있다.

---

### Section 05. Closing CTA

**목적:** 사진을 충분히 본 후 스마트스토어로 이동시킨다.

- 큰 완성책 사진 1장
- 짧은 H2
- 스마트스토어 CTA 1개
- 문의 폼이나 여러 연락 수단을 동시에 노출하지 않는다.

---

### Footer

- 최소 높이
- 로고, 사업자 정보, 스마트스토어 링크 정도만 제공
- 다크 푸터가 필요하면 `#171715` 한 색으로 단순하게 처리한다.
- 금색 포인트를 사용하지 않는다.

---

## 10. Motion System

### 기본 진입

```css
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 500ms ease, transform 500ms ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Image Hover

```css
.media-link img {
  transition: transform 450ms cubic-bezier(.2,.7,.2,1);
}

.media-link:hover img {
  transform: scale(1.015);
}
```

### Reduced Motion

`prefers-reduced-motion: reduce`에서는 모든 진입·확대 애니메이션을 제거하고, 프로세스 섹션은 일반 세로 콘텐츠로 전환한다.

### 금지

- full-page scroll snap
- wheel preventDefault
- 자동 재생 캐러셀
- 무거운 패럴랙스
- 텍스트 글자 단위 애니메이션
- 마우스 추적 커서
- 긴 페이지 로더

---

## 11. Responsive Rules

### Desktop `1440×900`

- H1은 2줄 내외
- 대표 사진은 화면 폭의 대부분을 차지한다.
- 사진 인덱스는 비대칭 12컬럼 배열
- 캡션은 작지만 읽을 수 있어야 한다.

### Tablet `768~1024px`

- 8컬럼으로 단순화
- 큰 사진 5~8컬럼
- 소개 행은 2열 또는 자연스러운 줄바꿈

### Mobile `390×844`

- 한 열 기본
- 좌우 여백 `20~24px`
- H1 `48~64px`
- 대표 사진은 화면 폭 전체에 가깝게 사용
- 작은 사진을 억지로 2열에 넣지 않는다.
- 사진 순서가 이야기 흐름이 되도록 세로 배치한다.
- 버튼 높이 최소 `48px`
- 프로세스는 화면이 좁으면 일반 세로 Step 목록으로 전환 가능

---

## 12. Anti-pattern Checklist

- [ ] 사진보다 텍스트가 더 큰 면적을 차지하지 않는다.
- [ ] 동일한 둥근 카드가 반복되지 않는다.
- [ ] 사진 모서리를 12px 이상 둥글게 만들지 않는다.
- [ ] 금색 포인트와 클래식 영문 서체를 남용하지 않는다.
- [ ] 장식 아이콘과 배지를 추가하지 않는다.
- [ ] 이미지 위에 긴 문장을 겹치지 않는다.
- [ ] 모든 섹션을 가운데 정렬하지 않는다.
- [ ] 사진을 임의 생성하거나 외부 스톡으로 채우지 않는다.
- [ ] 프로세스를 단순 4개 카드로 바꾸지 않는다.
- [ ] 휠 이벤트를 가로채지 않는다.

---

## 13. Final Design Tokens

```css
:root {
  --paper: #f4f3ee;
  --paper-soft: #fbfaf6;
  --white: #ffffff;
  --ink: #11110f;
  --body: #34332f;
  --muted: #77756e;
  --line: #d7d5ce;
  --forest: #294438;
  --forest-hover: #20372e;

  --max-width: 1440px;
  --content-width: 1280px;
  --gutter: clamp(20px, 4.5vw, 72px);
  --grid-gap: clamp(10px, 1.2vw, 20px);
  --section-space: clamp(96px, 12vw, 180px);

  --text-hero: clamp(48px, 7vw, 112px);
  --text-section: clamp(34px, 4.5vw, 72px);
  --text-body: clamp(16px, 1.15vw, 18px);
  --text-caption: clamp(11px, 0.8vw, 13px);
}
```

---

## 14. 디자인 승인 기준

- 첫 화면을 봤을 때 사진 브랜드 또는 포토북 브랜드로 느껴진다.
- 사진이 작고 UI가 커 보이지 않는다.
- 브랜드 설명은 짧고 바로 이해된다.
- 큰 제목, 큰 사진, 작은 캡션의 위계가 분명하다.
- 에디토리얼 지면처럼 정돈됐지만 웹에서 읽기 불편하지 않다.
- 스마트스토어 CTA가 디자인을 깨뜨리지 않으면서도 분명하다.
- 프로세스 인터랙션이 다른 섹션과 시각적으로 연결된다.
- 데스크톱과 모바일 모두 사진이 주인공으로 유지된다.

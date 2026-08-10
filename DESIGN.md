# Design System — Contrast Medium (hjl777.github.io)

> 한 가지 규칙: **회색조가 기본, 색은 인용이다.** 색이 나타나면 그것은 장식이 아니라
> 검증 가능한 증거(DOI·PDF·figure·repo)로 가는 링크라는 뜻이다.
> 이 규칙은 이 저장소의 claim-precision 정책을 픽셀로 집행하는 장치다.

## Product Context
- **What this is:** 이호재(Hojae Lee)의 학술 개인 사이트 — healthcare AI 연구자의 논문·프로젝트·근거 포트폴리오.
- **Who it's for:** 채용 담당자, 공동연구자, 심사위원.
- **Memorable thing:** "세련된 안목" — 방문자가 "이 사람은 페이지의 모든 것을 의도적으로 골랐다"고 스스로 말하게 만드는 것.
- **Space:** 학술 개인 사이트 (jonbarron.info의 검색성이 유틸리티 바닥선, Hugo Blox 템플릿들이 범용 기준).
- **Project type:** editorial academic portfolio (Vite + React + Tailwind, GitHub Pages).

## Aesthetic Direction
- **Direction:** Contrast Medium — "reading room, not a poster". 조영제처럼 색 자체는 절제되고, 증거가 있는 곳만 밝힌다.
- **Decoration level:** minimal-intentional — 1px 헤어라인 룰, 종이·필름 질감의 면 분할. 그라디언트·글로우·글래스·전면 라운딩 금지.
- **Mood:** 침착하고 약간 임상적. "디자이너를 고용했다"가 아니라 "방법론이 보인다".
- **Reference sites:** jonbarron.info (밀도·검색성), lilianweng.github.io (콘텐츠 권위), nicolepaul.io (per-paper 유틸리티 버튼).

## Typography — 세 가지 인식론적 레지스터
- **Claim (Display/Hero):** Fraunces (variable; `opsz 9–144`, `SOFT 0`, `WONK 1`, weight 400, letter-spacing −0.035em) — 96px에서 비싸 보이는 하이컨트라스트 Scotch roman. 학술 템플릿 어디에도 없음. Inter·Source Serif 4의 이중 디스플레이 목소리를 단일화.
- **Explanation (Body/UI):** Supreme (Fontshare, variable) — 15–16px에서 투명하게 읽히는 네오그로테스크. Inter 대체.
- **한글:** Pretendard Variable (dynamic subset) — Supreme 뒤 폴백 스택.
- **Measurement (Data/Kickers):** Martian Mono (variable, `wdth 87.5`) — 10px 대문자 `letter-spacing .18em`. 연도·지표·DOI·킥커 전용. tabular figures 기본.
- **Code:** Martian Mono 겸용.
- **Loading:** 전 폰트 **셀프호스팅** (`public/fonts/*.woff2`, `font-display: swap`, unicode-range 서브셋). Google Fonts CDN 링크(index.html:42)와 preconnect 제거.
- **Scale:** hero clamp(52px→104px) / section clamp(28px→44px) / body 15.5px / meta 12.8px / mono label 9.6–10.6px.

## Color
- **Approach:** restrained — 뉴트럴 + 증거 전용 액센트 1 + 신호색 1.

### Light
| token | hex | 용도 |
|---|---|---|
| paper | `#F2EFE6` | 페이지 바탕 (현행 유지) |
| canvas | `#D9D3C2` | 히어로/저니 밴드 |
| surface | `#FBF9F3` | 카드·칩·라이트박스 |
| ink-900 | `#14130F` | 본문·헤딩 |
| muted | `#6B6355` | 캡션·메타·모노 라벨 |
| rule | `#CFC8B6` | 모든 1px 보더 |
| accent | `#8C2F39` | **증거 링크 전용** (구 mauve #6a3f4d 대체) |
| signal | `#1F6F5C` | "figure 있음" 마크 |

### Dark (기본 노출 모드 — 반전이 아니라 1차 디자인)
| token | hex | 용도 |
|---|---|---|
| bg | `#0F0F0D` | 페이지 바탕 |
| surface | `#1B1B16` / surface-2 `#26251E` | 밴드 / 카드·호버 |
| text | `#F2EFE6` | 본문 |
| muted | `#9A9284` | rgba(255,255,255,.42–.64) 난립 ~30곳 대체 |
| rule | `#2B2A24` | rgba 헤어라인 대체 |
| accent | `#E0616B` | 증거 링크 전용 |
| signal | `#5FC6A6` | figure 마크 |

- **Semantic:** success=signal 계열, warning `#9A6B2F`, error=accent 계열, info=muted.
- **대비:** 주요 조합 AA 통과로 계산됨(muted/paper 5.16:1, accent/paper 7.07:1, muted/bg 6.26:1 등 — 서브에이전트 단일 산출, **배포 전 검사기로 재검증할 것**).
- **색각 이상 대응:** accent(적)·signal(녹)은 색만으로 구분하지 않는다 — signal은 항상 ■ 형태 마크로 병기.

## The Evidence Rule (Departure 1)
- accent 색은 `<Evidence href>` 래퍼 안에서만 렌더 가능. 장식적 사용 금지 (섹션 킥커=모노 회색, 버튼=ink 아웃라인, 상태 칩=뉴트럴).
- 호버는 색이 아니라 위치·룰 두께 변화로 표현.

## /colophon (Departure 2)
- 푸터에서 11px 모노 `COLOPHON`으로 링크되는 라우트. 사이트 자체를 논문 형식으로 문서화:
  Materials(서체·라이선스) / Methods(스페이싱·타입 스케일·모션 예산·대비 측정치) / **Limitations**(스크롤 리빌의 헤드리스 캡처 한계 등).

## Spacing
- **Base unit:** 8px (현행 유지). **Density:** comfortable; 논문 리스트는 compact.
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64).

## Layout
- **Approach:** creative-editorial (홈) + grid-disciplined (논문·아카이브). 라우팅·URL 불변.
- **Max content width:** 1080px (프리뷰 기준) / 논문 plain 모드 720px 단일 칼럼.
- **Border radius:** 0 (모서리 없음 — 헤어라인 시스템과 일관).
- **Density Switch:** `D` 키 + `?plain=1` → `data-density="plain"`: 밴드·리빌 제거, 720px 단일 칼럼, 13px/1.35 논문 리스트. 프린트 스타일시트 기본값.

## Motion
- **Approach:** intentional — 모션은 줄이는 게 아니라 벼리는 것. 콘텐츠를 나르는 안무는 유지, 빈 화면에 쓰는 시간만 회수.
- **유지하는 안무:** 히어로 line-rise(줄 단위 클립 상승) · 스크롤 리빌 · 필터 FLIP · 라이트박스 모션.
- **단축:** 인트로 게이트 780ms → **≤280ms** (첫 1초는 콘텐츠 몫).
- **호버 문법:** 색 변화 금지 — 위치(translateX/Y)·룰 두께 변화로만 반응 (Evidence Rule과 일관).
- **Easing:** enter `cubic-bezier(0.16,1,0.3,1)` (기존 --ease-out 유지) / exit ease-in / move ease-in-out.
- **Duration:** micro 50–100ms · short 150–250ms · medium 250–400ms · long ≤700ms.
- **안전장치:** 리빌은 JS 활성 시에만 숨김 상태로 시작(`html.js .reveal`) — 프린트·헤드리스·no-JS에서 콘텐츠가 절대 숨지 않음. plain 모드·prefers-reduced-motion에서 트랜스폼 전부 제거.

### Scroll Choreography — 스크롤은 장(章) 넘김이다
2026-08-09 awwwards 3D 카테고리 실측 7곳에서 도출 (browse 헤드리스로 직접 스크롤·DOM·전환 순간 검사):

| 사이트 | 스크롤 메커니즘 (관찰) | 비고 |
|---|---|---|
| drinkstill.nz | Lenis + 섹션 테마 반전 + 연도 레일 | 1차 실측 |
| seasats.com | 섹션 인덱스 고정 레일 | 1차 실측 |
| produx.design (SOTD 8/9) | Lenis + **sticky-stack**(히어로 `sticky top-0` + 다음 섹션이 위로 덮음) + splitLine 줄 리빌 + 섹션별 absolute 캔버스 | Next.js SPA |
| noartmusic.com (SOTD 8/6) | Lenis + GSAP + WebGL, 짧은 페이지 | Webflow 멀티페이지 |
| showcase.noomoagency.com (SOTD 8/1) | **완전 스크롤 하이재킹** — `scrollTo` 무시, 가상 스크롤이 풀스크린 WebGL 씬을 스크럽 | 단어 단위 split |
| seunghyuk.com | Lenis + `lenis-stopped` 인트로 게이트(스크롤 잠금) + 커스텀 커서 | — |
| gionatannese.com | 홈에 스크롤 없음 — 100vh WebGL 씬이 페이지 그 자체 | SPA |

수상작의 공통점은 화려한 이펙트가 아니라 **스크롤을 서사 구조로 바꾸는 것**: 배경 테마가 섹션 문지방에서 반전되어 "장이 넘어가고"(STILL), 다음 장이 이전 장 위로 physically 겹쳐 올라오고(produx sticky-stack), 고정 레일이 진행 위치를 "지도"로 보여준다(Seasats·STILL 연도 레일). Lenis 관성 스크롤은 사실상 표준 장비(7곳 중 5곳)지만, 그만큼 차별점이 아니라 비용이다.

- **장 넘김 (theme threshold):** paper↔plate 밴드 경계에서 배경·전경색이 300–450ms 크로스페이드. 이미 존재하는 밴드 구조를 전환 문법으로 승격. 스크롤 연동은 IntersectionObserver만 사용 (스크롤 이벤트 폴링 금지).
- **겹침 장 넘김 (sticky-stack, 구현됨 2026-08-10 — 최대 1곳):** produx.design에서 관찰한 패턴의 이식 — 히어로를 sticky로 고정하고 이후 콘텐츠 전체를 하나의 불투명 시트(`.home-stack`, z-1, 상단 헤어라인+그림자)로 묶어 그 위로 덮는다. 히어로가 뷰포트보다 클 수 있으므로 `top: 0`이 아니라 **하단이 뷰포트 바닥에 닿는 순간 고정** (`top: -(heroH−winH)`, ResizeObserver 1개로 측정 — 스크롤 리스너 0, 프레임당 JS 0, 네이티브 스크롤 그대로). 데스크톱(≥64rem) 전용, 모바일·프린트는 static. 시트가 화면 상단을 지나면 히어로는 `inert` — 보이지 않는 콘텐츠에 키보드 포커스·페이지 내 검색이 닿지 않고, 마키 애니메이션도 일시정지. 적용 위치는 홈 히어로→Experience 이음새 단 한 곳.
- **진행 레일 (progress rail):** journey(연도)·publications(연도 그룹)에 우측 고정 모노 레일 — 현재 위치가 Martian Mono 라벨로 하이라이트. Seasats의 섹션 인덱스와 STILL의 연도 레일의 교집합. plain 모드에서는 렌더하지 않음.
- **스크롤 인디케이터:** 히어로 하단에 모노 캡슐 `SCROLL` — 첫 화면이 끝이 아님을 알리는 최소 신호 (STILL 차용).
- **도입하지 않는 것:** Lenis류 JS 관성 스크롤(네이티브 스크롤 존중 — 접근성·성능·즉답성), 스크롤 하이재킹/스냅 강제(Noomo에서 `scrollTo`조차 무시되는 것을 실측 — 키보드·앵커·보조기기 스크롤이 전부 죽는다), 인트로 스크롤 잠금(seunghyuk `lenis-stopped` — 우리 인트로 게이트는 ≤280ms에 스크롤을 잠그지 않음), GSAP 의존, WebGL 캔버스 씬. 실측 사이트들은 제품(음료·선박·에이전시)을 팔지만 이 사이트는 근거를 판다 — 무게가 다르다.

### Route Transitions — 화면 전환은 조영(造影) 와이프
**수상작 실측 (2026-08-09, 전환 순간 mid-flight DOM 샘플링):** produx.design은 라우트 클릭 시 `page-transition-overlay`(fixed, `z-9999999`, 브랜드색 단색 커튼)가 화면을 덮고 그 아래에서 페이지를 갈아끼운 뒤 걷어냈고, 메뉴는 `clip-path: polygon()` 와이프였다. No Art는 멀티페이지 리로드를 `page-loader_bar` 커튼으로 가렸다. 즉 수상작의 커튼 오버레이는 미학이 아니라 **WebGL 에셋 로딩을 숨기는 필요악**이다. 이 사이트는 숨길 로딩이 없으므로 커튼을 쓸 이유 자체가 없다 — 콘텐츠가 끊기지 않고 이어지는 쪽이 상위 호환.

페이지 전환은 브라우저 네이티브 **View Transitions API** 하나로 통일 (이미 프로젝트 썸네일 morph에 사용 중인 것을 페이지 레벨로 확장). barba/swup류 외부 라이브러리 금지.

- **공유 요소 morph:** 프로젝트 카드 → 상세 페이지 히어로 이미지 (`view-transition-name: project-<id>`, 현행 유지·강화). 목록↔상세를 오갈 때 이미지가 끊기지 않고 이동 — 전환의 주인공.
- **나가는 페이지 (old):** opacity 1→0 + translateY(−3%) · 240ms · ease-in. 필름이 위로 걷히는 느낌.
- **들어오는 페이지 (new):** opacity 0→1 + translateY(3%→0) · 320ms · `cubic-bezier(0.16,1,0.3,1)`, 이어서 해당 페이지 히어로가 line-rise. 전체 체감 ≤600ms.
- **방향 문법:** 앞으로(목록→상세)는 위로 걷힘, 뒤로(상세→목록)는 반대 방향 — `navigation.activation` 기반 방향 감지, 미지원 브라우저는 무방향 크로스페이드.
- **폴백:** View Transitions 미지원(Firefox 구버전 등) 시 즉시 전환 — 전환 없음이 기본값이므로 콘텐츠 손실·깜빡임 없음. prefers-reduced-motion 시 크로스페이드 120ms만.
- **금지:** 전면 오버레이 와이프(콘텐츠를 가리는 커튼), 로딩 스피너, 전환 중 스크롤 잠금 300ms 초과.

## Direction v2 제안 — Clinical Console (yashahire.info × zui.ooo 합본, 2026-08-10 실측)

> 사용자 요청: 두 포트폴리오 스타일의 합본. 실측 근거 —
> **yashahire.info**: 딥 스페이스 다크(#0d0d12) + 3D 깊이 필드, Plus Jakarta Sans, 골드 액센트, 필 내비,
> 바이오 문장 안 키워드 하이라이트, 미디어 우선 프로젝트 카드(키커+타이틀 오버레이+스택 칩), "currently building" 위젯.
> **zui.ooo**: 전면 Geist Mono 터미널 OS(10–12px), 그린 틴트 블랙(#0f1210) + 포스포 그린/앰버 상태색,
> `SYS.NAME/AUTH/NODE` 상태 헤더, `$ whoami` 프롬프트 바이오, LOCATION/FOCUS/CONTACT 키-값 행,
> `01._HOME 02._WORK` 넘버드 모듈 내비, 명령어 입력 인터랙션, ASCII 로고, 무스크롤 모듈 구조.

**합본 논리**: zui의 "시스템 콘솔" 프레임은 이 사이트의 측정/증거 레지스터(모노 킥커·DOI·FIG 캡션)와 동족이고,
yash의 "무대 위 쇼케이스"는 프로젝트 카드·다크 무대와 동족이다. 콘솔이 뼈대(구조·메타·내비)를,
쇼케이스가 살(프로젝트 미디어·바이오 온도)을 맡는다. **클레임은 계속 세리프가 말한다** — 전면 모노는
24편 논문 리스트와 심사위원 가독성을 해치므로, 모노는 "기계가 기록한 사실", 세리프는 "사람이 주장하는 문장"으로 역할 분리.

### 토큰
| 역할 | 값 | 출처 |
|---|---|---|
| bg (dark 기본) | `#0E100F` 그린 틴트 웜 블랙 | zui #0f1210 ↔ 기존 #0F0F0D 절충 |
| surface | `#161A17` / hover `#1D221E` | zui |
| text | `#D9DED6` | zui #d4d8d0 |
| muted | `#8A9188` | zui |
| **evidence(=링크·figure)** | phosphor `#4FE0A3` | zui GREEN — Evidence Rule 유지, 색만 교체 |
| status/측정 | amber `#E0B34F` | zui + yash 골드 절충 |
| error/임상риск | `#E0616B` 유지 | 현행 |
| light 모드 | 현행 Contrast Medium 유지 (paper/ivory) | 콘솔은 다크의 문법 |

### 타입
- **Claim**: Fraunces 유지 (히어로 클레임 1줄, 섹션 타이틀) — zui에 없는 "사람의 목소리"가 이 사이트의 차별점.
- **Console**: Martian Mono 역할 대확장 — 상태 헤더, 키-값 행, 내비, 칩, 캡션, 프롬프트. (zui의 Geist Mono 대응)
- **Body**: Supreme 유지. 바이오 문장에는 yash식 **키워드 하이라이트** (evidence 색, `<Evidence>` 래퍼 재사용).

### 구조 (signature = ① 상태 헤더 + ② `$ whoami` 히어로)
1. **SYS 상태 헤더** (zui): 최상단 1줄 모노 바 — `NODE: hjl777.github.io · AUTH: GUEST · PUBS: 26 · H: 13 · LAST.SYNC: 2026-08`. 스크롤 시 Nav로 접힘.
2. **`$ whoami` 히어로**: 프롬프트 + 키-값 행(FOCUS / AFFILIATION / CONTACT — 기존 "스탯은 한 줄" 원칙의 콘솔화) + Fraunces 클레임 + 하이라이트 바이오. 타이핑 애니메이션 금지(모션 예산의 typewriter 금지 유지) — 정적 프롬프트.
3. **넘버드 모듈 내비**: `01 WORK 02 PAPERS 03 EXPERIENCE 04 ABOUT` — 번호는 저불투명 모노. zui의 `._` 파일명 흉내는 과해서 제거(2026-08-11 사용자 피드백). 기존 라우팅·URL 불변.
4. **프로젝트 카드** (yash): 미디어 우선 + 모노 키커(`RESEARCH.PROJECT // QCA`) + method 칩(UNet·PEFT·Murray). 기존 BrowserFrame 진화.
5. **명령 팔레트** (`⌘K` / `help`): 정적 바로가기(섹션·논문 검색·CV) — yash의 "Ask me anything"에서 AI를 뺀 것. 선택 사양 (미구현).
6. **커서 반응 혈관 필드** (yash의 mouse-reactive 배경의 이 사이트식 번역): WebGL·캔버스가 아니라 **기존 VesselField SVG**에 포인터 추적을 얹음 — lerp 5% 관성 패럴랙스(±12px), 커서 근접 분지 노드가 밝아지며 관상동맥 세그먼트명(LM·LAD·LCx·D1·OM1·RCA·PDA·dLAD)이 모노 라벨로 떠오름. **가짜 수치 없음**(해부학 명칭만 — claim-precision), rAF는 lerp 정착 시 자동 정지, 히어로가 시트에 덮여 `inert`면 완전 휴면, reduced-motion·터치는 정적 렌더. WebGL/캔버스 씬 금지는 그대로 유지된다.

### 모션
현행 시스템 전부 유지 (sticky-stack, band-turn, film lift, 진행 레일). 콘솔 요소는 추가 모션 0 — 상태 헤더는 정적, 커서 깜빡임도 없음.

### 단계별 적용안 (각각 독립 배포·롤백)
- **S1** 상태 헤더 + 넘버드 내비 + 키-값 히어로 개편 — **구현·배포 2026-08-10** (SYS 바는 스크롤 시 max-height 접힘, `$ whoami` + FOCUS/BASE/SCHOLAR/CONTACT `<dl>`, 커서 반응 혈관 필드 포함)
- **S2** 다크 팔레트 콘솔 전환 — **구현·배포 2026-08-10** (page `#0E100F` · surface `#161A17` · plate `#0B0D0C` · text `#D9DED6`; clinic/indigo **300/400 셰이드만** phosphor로 리맵 — 전 코드베이스에서 dark: 전용임을 검증, 라이트 hover 보더는 200으로 이동. 다크 채움 버튼 `#1F7A55`)
- **S3** 프로젝트 카드 콘솔 킥커(`// QCA REVIEW`) + 보더 모노 칩 — **구현·배포 2026-08-10**
- **S4** 명령 팔레트 (1일, 선택 — 미구현)

## 구현 시퀀스 (각 단계 독립 배포·롤백 가능, 총 ~4.5일)
1. 폰트 스왑 + 모노 통일 (½일) — tailwind.config.js, index.html:39-44, index.css ~12곳
2. 다크 토큰 통합 (½일) — rgba 난립 → muted/rule
3. 액센트 교체 + `<Evidence>` 래퍼 (1일)
4. Density Switch + 인트로 게이트 단축 (1일)
5. /colophon (½일)
6. (선택) 논문 hover 시 figure 레일 (1일)

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-08-09 | Contrast Medium 시스템 확정 (Fraunces/Supreme/Martian Mono, 증거 전용 크림슨) | /design-consultation — 리서치(jonbarron·lilianweng·nicolepaul 실측) + 코드 감사(Inter 이중 디스플레이, 모노 하드코딩 9곳, 다크 rgba ~30곳) 기반. 사용자 승인 |
| 2026-08-09 | 8pt 스페이싱·URL·레이아웃 구조 유지 | 이미 좋은 자산 — 격차는 일관성이지 구조가 아님 |
| 2026-08-09 | Scroll Choreography·Route Transitions 스펙 추가 (장 넘김 테마 반전, 진행 레일, View Transitions 페이지 전환, JS 관성 스크롤 도입 안 함) | awwwards 3D 카테고리 실측 (drinkstill.nz: Lenis+canvas 6, 섹션 테마 반전, 연도 레일, FIG 캡션 / seasats.com: 섹션 인덱스 레일) — 사용자 요청으로 수행 |
| 2026-08-09 | 실측 표본 7곳으로 확대, sticky-stack 겹침 장 넘김(CSS-only, 최대 1곳) 선택 사양 추가, 커튼 오버레이·스크롤 하이재킹·인트로 잠금 금지를 실측 근거로 격상 | 추가 실측 5곳: produx.design(SOTD 8/9: sticky-stack, `page-transition-overlay` z-9999999 커튼, clip-path 메뉴 와이프), noartmusic.com(SOTD 8/6: 로더 바 커튼), showcase.noomoagency.com(SOTD 8/1: 완전 하이재킹 — scrollTo 무시), seunghyuk.com(lenis-stopped 인트로 잠금), gionatannese.com(무스크롤 WebGL 홈) |
| 2026-08-10 | Direction v2 "Clinical Console" 제안 작성 (yashahire.info × zui.ooo 합본 — 콘솔=뼈대, 쇼케이스=살, 클레임=세리프 유지) | 사용자 요청. 두 사이트 헤드리스 실측 (yash: 딥다크+골드+미디어 카드+키워드 하이라이트 / zui: Geist Mono 터미널 OS+상태 헤더+키-값+넘버드 내비). 적용 범위는 사용자 결정 대기 |
| 2026-08-10 | Clinical Console **S1–S3 구현·배포** + 커서 반응 혈관 필드(SVG, 세그먼트명 라벨) 추가. yash식 마우스 반응 배경은 사용자 분석(3단계: 정규화→lerp→반영)을 SVG로 이식 — WebGL 금지 유지 | 사용자 S1~S3 선택. critic 리뷰 8건 수정(rAF 무한 루프→settle 시 자동 정지+inert 휴면, 노드 발광 무효→저불투명 그룹 밖으로 분리, 모바일 헤더 여백 px-safe 등) |

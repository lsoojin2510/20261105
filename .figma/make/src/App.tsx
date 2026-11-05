import { useEffect, useState } from "react"

type ModalKind = "booking" | "video" | "clinic" | null

// 화면 문구와 색상을 배열로 관리하면 슬라이드 항목을 쉽게 추가할 수 있습니다.
const heroSlides = [
  {
    eyebrow: "몸과 마음이 다시, 편안해지는 곳",
    title: (
      <>
        일상의 건강을
        <br />
        되찾는 한방의 힘
      </>
    ),
    description: (
      <>
        사람을 먼저 생각하는 다온한방병원이
        <br />
        건강한 하루를 함께 만들어갑니다.
      </>
    ),
    tone: "hero-art--one",
  },
  {
    eyebrow: "오래된 지혜에 오늘의 기준을 더해",
    title: (
      <>
        몸의 균형을 바로잡는
        <br />
        세심한 한방치료
      </>
    ),
    description: (
      <>
        정확한 진단과 환자 중심의 치료로
        <br />
        회복의 시작부터 일상까지 함께합니다.
      </>
    ),
    tone: "hero-art--two",
  },
  {
    eyebrow: "가족을 대하는 마음으로",
    title: (
      <>
        편안한 진료,
        <br />
        믿을 수 있는 회복
      </>
    ),
    description: (
      <>
        차분한 공간과 따뜻한 상담으로
        <br />
        마음까지 놓이는 진료를 약속합니다.
      </>
    ),
    tone: "hero-art--three",
  },
]

const strengths = [
  ["✦", "맞춤 통합치료", "개인별 체질과 증상에 맞춘\n1:1 집중 치료"],
  ["✺", "안전한 한약 처방", "엄선한 약재와\n철저한 조제 시스템"],
  ["⌁", "통증 클리닉", "보다 빠른 회복을 위한\n집중 통증 치료"],
  ["♧", "생활질환 클리닉", "소화기·면역·여성질환 등\n생활 속 건강 관리"],
  ["✧", "편안한 진료실", "예약 중심의\n쾌적한 진료 환경"],
]

const clinics = [
  { name: "통증·척추 클리닉", detail: "목·허리, 어깨, 무릎", color: "#d5d1c4" },
  { name: "교통사고 클리닉", detail: "사고후유증 맞춤 치료", color: "#ddd0bd" },
  {
    name: "교정·체형 클리닉",
    detail: "추나 교정, 체형 관리",
    color: "#c8cfca",
  },
  { name: "여성질환 클리닉", detail: "다이어트, 여성질환", color: "#dcc9c6" },
  {
    name: "소아·성장 클리닉",
    detail: "성장, 면역, 비염 개선",
    color: "#d3d8ca",
  },
  {
    name: "보약·면역 클리닉",
    detail: "체력 저하, 기력 회복",
    color: "#c4d0c8",
  },
]

const roomSlides = [
  { label: "진료실", className: "room-card--one" },
  { label: "치료실", className: "room-card--two" },
  { label: "한약조제실", className: "room-card--three" },
  { label: "입원실", className: "room-card--four" },
]

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="다온한방병원 홈">
      <span className="brand-mark">
        <i />
        <i />
        <i />
      </span>
      <span>
        <b>다온한방병원</b>
        <small>DAON KOREAN MEDICINE HOSPITAL</small>
      </span>
    </a>
  )
}

// Header는 모바일 메뉴 상태를 관리하고, 예약 기능은 부모에게 전달받습니다.
function Header({ onBooking }: { onBooking: () => void }) {
  const [open, setOpen] = useState(false)
  const links = [
    ["병원소개", "about"],
    ["진료안내", "clinic"],
    ["치료공간", "space"],
    ["한방건강정보", "story"],
    ["커뮤니티", "notice"],
  ]

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="메뉴 열기"
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          className={open ? "main-nav is-open" : "main-nav"}
          aria-label="주요 메뉴"
        >
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <button
            className="header-booking"
            onClick={() => {
              onBooking()
              setOpen(false)
            }}
          >
            예약하기
          </button>
        </nav>
      </div>
    </header>
  )
}

// 반복되는 건축 이미지를 하나의 재사용 가능한 컴포넌트로 만들었습니다.
function ArchitectureArt({ className = "" }: { className?: string }) {
  return (
    <div
      className={`architecture-art ${className}`}
      aria-label="한방병원의 따뜻한 공간을 표현한 이미지"
      role="img"
    >
      <span className="art-wall" />
      <span className="art-pillar" />
      <span className="art-door" />
      <span className="art-bench" />
    </div>
  )
}

function Hero({ onBooking }: { onBooking: () => void }) {
  const [index, setIndex] = useState(0)
  const slide = heroSlides[index]
  const move = (amount: number) =>
    setIndex((index + amount + heroSlides.length) % heroSlides.length)

  // 6초마다 다음 슬라이드로 이동하고 화면이 사라질 때 타이머를 정리합니다.
  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % heroSlides.length),
      6000,
    )
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">{slide.eyebrow}</p>
        <h1>{slide.title}</h1>
        <p className="hero-description">{slide.description}</p>
        <div className="hero-actions">
          <button className="button button--brown" onClick={onBooking}>
            진료 예약하기 <span>→</span>
          </button>
          <a className="button button--light" href="#about">
            병원 소개 보기
          </a>
        </div>
        <div className="hero-pagination" aria-label="메인 이미지 슬라이드">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            {heroSlides.map((_, dot) => (
              <i className={dot === index ? "is-active" : ""} key={dot} />
            ))}
          </div>
          <span>{String(heroSlides.length).padStart(2, "0")}</span>
        </div>
        <div className="hero-arrows">
          <button onClick={() => move(-1)} aria-label="이전 슬라이드">
            ‹
          </button>
          <button onClick={() => move(1)} aria-label="다음 슬라이드">
            ›
          </button>
        </div>
      </div>
      <ArchitectureArt className={slide.tone} />
    </section>
  )
}

function Strengths() {
  return (
    <section className="strengths" aria-label="다온한방병원의 강점">
      {strengths.map(([icon, title, description]) => (
        <article key={title}>
          <span className="strength-icon">{icon}</span>
          <h2>{title}</h2>
          <p>
            {description.split("\n").map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </article>
      ))}
    </section>
  )
}

function About({ onVideo }: { onVideo: () => void }) {
  return (
    <section className="about" id="about">
      <ArchitectureArt className="about-art" />
      <div className="about-copy">
        <p className="section-kicker">진료의 시작, 올바른 건강으로</p>
        <h2>
          사람을 위한
          <br />
          올바른 한방치료
        </h2>
        <p>
          다온한방병원은 진료의 가치를 바탕으로
          <br />
          안전한 치료와 건강한 회복을 약속합니다.
        </p>
        <div className="about-links">
          <a href="#clinic">
            <span>♢</span>환자 중심 진료
          </a>
          <a href="#space">
            <span>♧</span>편안한 의료 시설
          </a>
          <a href="#story">
            <span>✧</span>풍부한 임상 경험
          </a>
        </div>
      </div>
      <button
        className="video-button"
        onClick={onVideo}
        aria-label="다온한방병원 소개 영상 보기"
      >
        <span>▶</span>
        <small>
          다온한방병원
          <br />
          소개영상 보기
        </small>
      </button>
    </section>
  )
}

function Clinics({ onClinic }: { onClinic: (name: string) => void }) {
  return (
    <section className="clinics section-pad" id="clinic">
      <div className="section-heading">
        <div>
          <h2>주요 진료 클리닉</h2>
          <p>
            다양한 한방 진료를
            <br />
            질환과 증상별로 안내해드립니다.
          </p>
        </div>
        <a href="#notice">진료 안내 보기 →</a>
      </div>
      <div className="clinic-grid">
        {clinics.map((clinic) => (
          <button
            className="clinic-card"
            key={clinic.name}
            onClick={() => onClinic(clinic.name)}
          >
            <span className="clinic-image" style={{ background: clinic.color }}>
              <i />
              <i />
            </span>
            <b>{clinic.name}</b>
            <small>{clinic.detail}</small>
          </button>
        ))}
      </div>
    </section>
  )
}

function Rooms() {
  const [start, setStart] = useState(0)
  // 시작 위치를 기준으로 배열을 재정렬해 공간 카드가 계속 순환하게 합니다.
  const ordered = [...roomSlides.slice(start), ...roomSlides.slice(0, start)]
  return (
    <section className="rooms section-pad" id="space">
      <div className="rooms-copy">
        <h2>
          편안함이 머무는
          <br />
          치료 공간
        </h2>
        <p>
          몸과 마음이 모두 편안할 수 있는
          <br />
          쾌적한 진료 환경을 제공합니다.
        </p>
        <div className="room-controls">
          <button onClick={() => setStart((start + 3) % 4)}>이전 공간 ‹</button>
          <button onClick={() => setStart((start + 1) % 4)}>다음 공간 ›</button>
        </div>
      </div>
      <div className="room-slider">
        {ordered.map((room) => (
          <article key={room.label}>
            <div className={`room-card ${room.className}`}>
              <i />
              <i />
              <i />
            </div>
            <h3>{room.label}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}

function FooterInfo({ onBooking }: { onBooking: () => void }) {
  return (
    <section className="footer-info" id="notice">
      <div className="notice-panel">
        <div className="panel-title">
          <h2>공지사항</h2>
          <button
            onClick={() =>
              alert("현재 등록된 공지사항을 모두 표시하고 있습니다.")
            }
          >
            더보기 +
          </button>
        </div>
        {[
          ["추석 연휴 진료 일정 안내", "2024.09.10"],
          ["진료 예약 변경 안내", "2024.09.06"],
          ["진료 예약 시스템 점검 안내", "2024.08.26"],
        ].map(([title, date]) => (
          <button
            key={title}
            onClick={() =>
              alert(`${title}\n\n상세 내용은 병원으로 문의해 주세요.`)
            }
          >
            <span>{title}</span>
            <time>{date}</time>
          </button>
        ))}
      </div>
      <div className="story-panel" id="story">
        <h2>환자분들의 이야기</h2>
        <blockquote>
          “꾸준한 치료를 통해 통증이 많이 좋아졌어요.
          <br />
          친절하고 세심한 진료를 늘 감사합니다.”
        </blockquote>
        <p>
          <span>○○○</span> 님의 진료 후기
        </p>
      </div>
      <div className="map-panel">
        <h2>오시는 길</h2>
        <a
          className="map-box"
          href="https://map.naver.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="네이버 지도에서 위치 보기"
        >
          <i />
        </a>
        <p>
          경기도 고양시 덕양구 중앙로 123
          <br />
          다온메디컬센터
        </p>
        <a href="https://map.naver.com/" target="_blank" rel="noreferrer">
          자세히 보기 →
        </a>
      </div>
      <div className="contact-panel">
        <h2>진료 예약 및 상담</h2>
        <a className="phone" href="tel:0551234567">
          ☎ 055-123-4567
        </a>
        <p>
          <b>진료시간</b>
          <br />
          평일 09:00 - 19:00
          <br />
          토요일 09:00 - 13:00
          <br />
          일요일·공휴일 휴진
        </p>
        <button onClick={onBooking}>진료 예약하기 →</button>
      </div>
    </section>
  )
}

function Modal({
  kind,
  title,
  onClose,
}: {
  kind: ModalKind
  title: string
  onClose: () => void
}) {
  // 선택된 팝업이 없으면 화면에 아무것도 렌더링하지 않습니다.
  if (!kind) return null
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="팝업 닫기"
        >
          ×
        </button>
        {kind === "video" ? (
          <>
            <p className="section-kicker">DAON HOSPITAL</p>
            <h2 id="modal-title">다온한방병원 소개</h2>
            <div className="video-placeholder">
              <span>▶</span>
              <p>
                환자를 먼저 생각하는
                <br />
                다온한방병원의 진료 철학
              </p>
            </div>
          </>
        ) : kind === "clinic" ? (
          <>
            <p className="section-kicker">SPECIAL CLINIC</p>
            <h2 id="modal-title">{title}</h2>
            <p className="modal-description">
              환자의 증상과 체질을 세심하게 살펴 개인별 치료 계획을 제안합니다.
              상담을 원하시면 진료 예약을 이용해 주세요.
            </p>
            <button
              className="button button--brown modal-action"
              onClick={() => {
                onClose()
                document
                  .querySelector<HTMLButtonElement>(".header-booking")
                  ?.click()
              }}
            >
              상담 예약하기
            </button>
          </>
        ) : (
          <>
            <p className="section-kicker">APPOINTMENT</p>
            <h2 id="modal-title">진료 예약 신청</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                alert("예약 신청이 접수되었습니다. 확인 후 연락드리겠습니다.")
                onClose()
              }}
            >
              <label>
                이름
                <input
                  required
                  name="name"
                  placeholder="성함을 입력해 주세요"
                />
              </label>
              <label>
                연락처
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="010-0000-0000"
                />
              </label>
              <label>
                진료 분야
                <select name="clinic">
                  <option>통증·척추 클리닉</option>
                  <option>교통사고 클리닉</option>
                  <option>교정·체형 클리닉</option>
                  <option>여성질환 클리닉</option>
                  <option>소아·성장 클리닉</option>
                  <option>보약·면역 클리닉</option>
                </select>
              </label>
              <button className="button button--brown" type="submit">
                예약 신청하기
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  )
}

export default function App() {
  // 최상위에서 팝업 종류를 관리해 어느 섹션에서도 같은 팝업을 열 수 있습니다.
  const [modal, setModal] = useState<ModalKind>(null)
  const [modalTitle, setModalTitle] = useState("")

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [modal])

  return (
    <>
      <div className="site-shell">
        <Header onBooking={() => setModal("booking")} />
        <main>
          <Hero onBooking={() => setModal("booking")} />
          <Strengths />
          <About onVideo={() => setModal("video")} />
          <Clinics
            onClinic={(name) => {
              setModalTitle(name)
              setModal("clinic")
            }}
          />
          <Rooms />
        </main>
        <FooterInfo onBooking={() => setModal("booking")} />
      </div>
      <footer className="copyright">
        <Brand />
        <p>© DAON KOREAN MEDICINE HOSPITAL. ALL RIGHTS RESERVED.</p>
      </footer>
      <Modal kind={modal} title={modalTitle} onClose={() => setModal(null)} />
    </>
  )
}

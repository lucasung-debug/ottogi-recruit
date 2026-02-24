import React, { forwardRef } from "react";
import { POSTER_W, C, FONT } from "../utils/constants";
import { formatSchedule } from "../utils/helpers";

/* ===== 섹션 헤더 공통 컴포넌트 ===== */
function SectionHeader({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 15,
        fontWeight: 700,
        fontFamily: FONT,
        color: C.darkBlue,
        borderBottom: `2px solid ${C.darkBlue}`,
        paddingBottom: 7,
        marginBottom: 14,
        letterSpacing: 0.5,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 4,
          height: 16,
          background: C.yellow,
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  );
}

/* ===== 헤더 ===== */
function PosterHeader({ title, logoUrl }) {
  const lines = title.split("\n");
  const top = lines[0] || "";
  const main = lines.slice(1).join(" ") || "";

  return (
    <div style={{ width: POSTER_W, background: C.white, padding: "0 20px", boxSizing: "border-box" }}>
      {/* 배너 이미지 + 텍스트 오버레이 */}
      <div style={{ position: "relative" }}>
        <img
          src={`${import.meta.env.BASE_URL}images/banner.png`}
          alt="배너"
          style={{
            width: "100%",
            height: "160px",
            display: "block",
            objectFit: "cover",
            objectPosition: "center",
          }}
          crossOrigin="anonymous"
        />

        {/* 텍스트 오버레이 — 배너 리본 위치 기준 약간 위 정렬 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            transform: "translateY(-8px)",
          }}
        >
          {top && (
            <div
              style={{
                background: "rgba(255,255,255,0.93)",
                color: C.darkBlue,
                padding: "5px 26px",
                borderRadius: 3,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: FONT,
                letterSpacing: 1,
                boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
              }}
            >
              {top}
            </div>
          )}
          {main && (
            <div
              style={{
                fontSize: 34,
                fontWeight: 800,
                fontFamily: FONT,
                color: C.darkBlue,
                letterSpacing: 2,
                lineHeight: 1.2,
                textAlign: "center",
              }}
            >
              {main}
            </div>
          )}
        </div>

        {/* 업로드 로고 (있을 때만 표시) */}
        {logoUrl && (
          <img
            src={logoUrl}
            alt="로고"
            style={{
              position: "absolute",
              top: 14,
              right: 18,
              height: 35,
              objectFit: "contain",
            }}
            crossOrigin="anonymous"
          />
        )}
      </div>
    </div>
  );
}

/* ===== 모집부문 카드형 ===== */
function PosterTable({ jobs }) {
  if (!jobs.length) return null;
  const cellStyle = {
    padding: "10px 12px",
    fontSize: 12,
    fontWeight: 200,
    fontFamily: FONT,
    lineHeight: 1.7,
    verticalAlign: "top",
    color: "#111111",
    wordBreak: "keep-all",
  };

  return (
    <div style={{ padding: "20px 20px 10px" }}>
      <SectionHeader>모집부문</SectionHeader>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {jobs.map((j, i) => (
          <div
            key={i}
            style={{
              borderRadius: 8,
              overflow: "hidden",
              border: `1px solid ${C.border}`,
            }}
          >
            {/* 직무명 헤더 */}
            <div
              style={{
                background: C.yellow,
                color: C.darkBlue,
                fontWeight: 700,
                fontFamily: FONT,
                fontSize: 14,
                padding: "8px 16px",
                letterSpacing: 0.5,
              }}
            >
              {j.jobName}
            </div>
            {/* 컨텐츠 행 */}
            <div style={{ display: "flex" }}>
              {/* 담당업무 및 비전 */}
              <div
                style={{
                  ...cellStyle,
                  flex: 1,
                  borderRight: `1px solid ${C.border}`,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontFamily: FONT,
                    color: C.darkBlue,
                    fontSize: 11,
                    marginBottom: 4,
                  }}
                >
                  담당업무 및 비전
                </div>
                {j.tasks.map((t, k) => (
                  <div key={k} style={{ textIndent: "-1em", paddingLeft: "1em" }}>{t}</div>
                ))}
              </div>
              {/* 우대전공 */}
              <div
                style={{
                  ...cellStyle,
                  width: 110,
                  flexShrink: 0,
                  borderRight: `1px solid ${C.border}`,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontFamily: FONT,
                    color: C.darkBlue,
                    fontSize: 11,
                    marginBottom: 4,
                  }}
                >
                  우대전공
                </div>
                {j.major || "전공무관"}
              </div>
              {/* 자격요건 */}
              <div style={{ ...cellStyle, flex: 1 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontFamily: FONT,
                    color: C.darkBlue,
                    fontSize: 11,
                    marginBottom: 4,
                  }}
                >
                  자격요건
                </div>
                {j.required.length > 0 && (
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontFamily: FONT,
                        color: C.darkBlue,
                        marginBottom: 3,
                        fontSize: 11,
                      }}
                    >
                      [ 필수사항 ]
                    </div>
                    {j.required.map((q, k) => (
                      <div key={k} style={{ textIndent: "-1em", paddingLeft: "1em" }}>{q}</div>
                    ))}
                  </div>
                )}
                {j.preferred.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontFamily: FONT,
                        color: C.darkBlue,
                        marginBottom: 3,
                        fontSize: 11,
                      }}
                    >
                      [ 우대사항 ]
                    </div>
                    {j.preferred.map((q, k) => (
                      <div key={k} style={{ textIndent: "-1em", paddingLeft: "1em" }}>{q}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== 공통지원자격 ===== */
function CommonQuals() {
  return (
    <div style={{ padding: "20px 20px 10px" }}>
      <SectionHeader>공통지원자격</SectionHeader>
      <div
        style={{
          background: "#F8F9FF",
          border: "1px solid #E0E4F5",
          borderRadius: 6,
          padding: "12px 16px",
        }}
      >
        {[
          { t: "직무별 요구기준에 적합한 학위소지자", h: true },
          { t: "남성의 경우, 병역 필 또는 면제자" },
          { t: "해외 여행(또는 해외 출장)에 결격사유가 없는 자" },
          { t: "취업보호대상자는 관련 법령에 의거하여 우대" },
        ].map((it, i, arr) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 8,
              marginBottom: i < arr.length - 1 ? 5 : 0,
              fontSize: 13,
              fontWeight: it.h ? 500 : 200,
              fontFamily: FONT,
              lineHeight: 1.6,
              color: it.h ? C.red : C.text,
            }}
          >
            <span>•</span>
            <span>{it.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== 접수기간 ===== */
function AppPeriod({ schedule, year }) {
  const formatted = formatSchedule(schedule, year);
  return (
    <div style={{ padding: "20px 20px 10px" }}>
      <SectionHeader>서류 접수기간 및 방법</SectionHeader>
      {/* 접수기간 강조 */}
      <div
        style={{
          background: "#EEF1FF",
          border: "1px solid #C5CCEE",
          borderRadius: 6,
          padding: "10px 14px",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontFamily: FONT,
            fontSize: 13,
            color: C.darkBlue,
            flexShrink: 0,
          }}
        >
          접수기간
        </span>
        <span style={{ color: "#AAAAAA", fontSize: 12 }}>|</span>
        <strong style={{ color: C.red, fontWeight: 700, fontFamily: FONT, fontSize: 13 }}>
          {formatted}
        </strong>
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 200,
          fontFamily: FONT,
          lineHeight: 1.8,
          color: C.text,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <span>•</span>
          <span>접수방법: 오뚜기라면 채용홈페이지 內 온라인 지원</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span>•</span>
          <span>
            지원서 첨부파일 外 제출 필요서류는 1차 서류 합격자에 한하여 별도 안내
            예정
          </span>
        </div>
      </div>
    </div>
  );
}

/* ===== 채용 프로세스 ===== */
function ProcessChart({ steps }) {
  if (!steps.length) return null;
  const ARROW = 14; // chevron 화살표 돌출 크기(px)
  return (
    <div style={{ padding: "20px 20px 10px" }}>
      <SectionHeader>채용 프로세스</SectionHeader>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexWrap: "wrap",
          rowGap: 16,
          padding: "16px 0",
        }}
      >
        {steps.map((s, i) => {
          const isFirst = i === 0;
          const isLast = i === steps.length - 1;
          const bg = isLast ? C.yellow : C.darkBlue;
          const textColor = isLast ? C.darkBlue : C.white;
          // clip-path으로 chevron 도형
          let clipPath;
          if (steps.length === 1) {
            clipPath = "none";
          } else if (isFirst) {
            // 왼쪽 평평, 오른쪽 화살표
            clipPath = `polygon(0 0, calc(100% - ${ARROW}px) 0, 100% 50%, calc(100% - ${ARROW}px) 100%, 0 100%)`;
          } else if (isLast) {
            // 왼쪽 화살표 indent, 오른쪽 평평
            clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 100%, ${ARROW}px 50%)`;
          } else {
            // 중간: 왼쪽 indent + 오른쪽 화살표
            clipPath = `polygon(0 0, calc(100% - ${ARROW}px) 0, 100% 50%, calc(100% - ${ARROW}px) 100%, 0 100%, ${ARROW}px 50%)`;
          }
          // 첫 스텝을 제외한 나머지는 왼쪽으로 당겨서 겹치도록
          const marginLeft = isFirst ? 0 : -ARROW;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                marginLeft,
                zIndex: i + 1,
                position: "relative",
              }}
            >
              {/* STEP 번호 레이블 */}
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: FONT,
                  color: C.darkBlue,
                  letterSpacing: 0.5,
                }}
              >
                STEP {i + 1}
              </span>
              {/* Chevron 도형 */}
              <div
                style={{
                  width: 120,
                  height: 52,
                  background: bg,
                  clipPath,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: FONT,
                  color: textColor,
                  textAlign: "center",
                  lineHeight: 1.3,
                  padding: isFirst
                    ? `0 ${ARROW + 8}px 0 8px`
                    : isLast
                    ? `0 8px 0 ${ARROW + 8}px`
                    : `0 ${ARROW + 8}px 0 ${ARROW + 8}px`,
                  boxSizing: "border-box",
                  wordBreak: "keep-all",
                }}
              >
                {s}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ===== 추가 안내 ===== */
function AdditionalInfo({ finalHireMonth }) {
  return (
    <div style={{ padding: "0 20px 10px" }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 200,
          fontFamily: FONT,
          lineHeight: 1.8,
          color: C.text,
          background: C.gray,
          padding: "12px 16px",
          borderRadius: 6,
          borderLeft: `4px solid ${C.darkBlue}`,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <span>•</span>
          <span>서류전형 합격자 발표: 개별 이메일 및 카카오톡 안내 예정</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span>•</span>
          <span>인성/업무적응도 검사 : 온라인 실시</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span>•</span>
          <span>
            최종 입사:{" "}
            <strong style={{ color: C.red, fontWeight: 700 }}>
              {finalHireMonth || "(일정 확인 후 자동 계산)"}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ===== 기타/유의사항 ===== */
function Notes() {
  return (
    <div style={{ padding: "20px 20px 30px" }}>
      <SectionHeader>기타</SectionHeader>
      <div
        style={{
          fontSize: 12,
          fontWeight: 200,
          fontFamily: FONT,
          lineHeight: 1.8,
          color: C.sub,
          marginBottom: 20,
        }}
      >
        {[
          "전형과정 중 지원자의 적성 및 경험을 고려하여 타직무가 적합하다고 판단하는 경우 전환배치를 검토할 수 있습니다.",
          "제출된 서류는 각 전형별 합격자 발표일 이후 삭제됩니다.",
          "서류접수 마감일은 접속자가 집중되어 시스템이 불안정할 수 있으므로, 기한 내에 여유 있게 지원서를 제출하여 주시기 바랍니다.",
          "허위사실이 발견될 경우 채용이 취소될 수 있습니다.",
          "보훈대상자와 장애인은 국가관련법에 의거 우대합니다.",
          "기타 채용관련 문의사항은 오뚜기라면 인사팀 ☎031-683-1832 또는 이메일(recruit@otokirm.com)",
        ].map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 8 }}>
            <span>•</span>
            <span>{t}</span>
          </div>
        ))}
      </div>

      <SectionHeader>유의사항</SectionHeader>
      <div
        style={{
          fontSize: 12,
          fontWeight: 200,
          fontFamily: FONT,
          lineHeight: 1.8,
          color: C.text,
          background: C.cream,
          border: `1px solid ${C.yellow}`,
          borderRadius: 6,
          padding: "14px 16px",
        }}
      >
        <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
          <span>•</span>
          <span>
            아래 항목 중 어느 하나에 해당되는 경우{" "}
            <strong style={{ color: C.red, fontWeight: 700, textDecoration: "underline" }}>
              입사결격사유
            </strong>
            가 되어{" "}
            <strong style={{ color: C.red, fontWeight: 700, textDecoration: "underline" }}>
              불합격 처리 또는 채용 취소
            </strong>{" "}
            될 수 있습니다.
          </span>
        </div>
        {[
          "공통지원자격 결격사유 해당자 (해외여행 결격사유자 등)",
          "입사지원서 및 제출서류에 허위사실이 있는 자",
          "면접전형 합격 후, 채용검진결과 정상근무 불가 판정자",
        ].map((t, i) => (
          <div key={i} style={{ display: "flex", gap: 8, paddingLeft: 16 }}>
            <span style={{ color: C.green }}>✓</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== 포스터 전체 ===== */
const Poster = forwardRef(function Poster(
  { title, jobs, processSteps, schedule, year, finalHireMonth, logoUrl },
  ref
) {
  return (
    <div
      ref={ref}
      style={{
        width: POSTER_W,
        background: C.white,
        fontFamily: FONT,
        fontWeight: 200,
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
      }}
    >
      <PosterHeader title={title} logoUrl={logoUrl} />
      <PosterTable jobs={jobs} />
      <CommonQuals />
      <AppPeriod schedule={schedule} year={year} />
      <ProcessChart steps={processSteps} />
      <AdditionalInfo finalHireMonth={finalHireMonth} />
      <Notes />
    </div>
  );
});

export default Poster;

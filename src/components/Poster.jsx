import React, { forwardRef } from "react";
import { POSTER_W, C } from "../utils/constants";
import { formatSchedule } from "../utils/helpers";

/* ===== 헤더 ===== */
function PosterHeader({ title, logoUrl }) {
  const lines = title.split("\n");
  const top = lines[0] || "";
  const main = lines.slice(1).join(" ") || "";

  return (
    <div
      style={{
        width: POSTER_W,
        background:
          "linear-gradient(135deg,#E8F5E9 0%,#FFF9C4 50%,#E3F2FD 100%)",
        padding: "30px 40px 25px",
        position: "relative",
        overflow: "hidden",
        borderBottom: `3px solid ${C.green}`,
      }}
    >
      {/* 장식 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background:
            "linear-gradient(0deg,rgba(107,175,61,0.15),transparent)",
        }}
      />
      {[
        {
          bottom: 10,
          left: 30,
          width: 50,
          height: 50,
          borderRadius: "50% 50% 50% 0",
          opacity: 0.25,
        },
        {
          bottom: 8,
          left: 60,
          width: 70,
          height: 55,
          borderRadius: "50% 50% 50% 0",
          opacity: 0.18,
        },
        {
          bottom: 12,
          right: 50,
          width: 55,
          height: 45,
          borderRadius: "50% 50% 0 50%",
          opacity: 0.2,
        },
        {
          bottom: 5,
          right: 100,
          width: 80,
          height: 60,
          borderRadius: "50% 50% 0 50%",
          opacity: 0.15,
        },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...s,
            background: `rgba(107,175,61,${s.opacity})`,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: 15,
          right: 60,
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "rgba(255,241,118,0.5)",
        }}
      />

      {/* 로고 영역 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: `radial-gradient(circle at 50% 40%,${C.red} 60%,#CC0010 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "3px solid white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <span
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: 14,
              fontFamily: "Arial Black,sans-serif",
            }}
          >
            오뚜기
          </span>
        </div>
        {logoUrl && (
          <img
            src={logoUrl}
            alt="로고"
            style={{ height: 42, objectFit: "contain" }}
            crossOrigin="anonymous"
          />
        )}
      </div>

      {/* 제목 */}
      <div
        style={{
          textAlign: "center",
          marginTop: 15,
          position: "relative",
          zIndex: 1,
        }}
      >
        {top && (
          <div
            style={{
              display: "inline-block",
              background: C.green,
              color: "white",
              padding: "5px 24px",
              borderRadius: 20,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            {top}
          </div>
        )}
        {main && (
          <div
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: C.text,
              letterSpacing: 2,
              lineHeight: 1.3,
              marginTop: 8,
              textShadow: "1px 1px 0 rgba(255,255,255,0.8)",
            }}
          >
            {main}
          </div>
        )}
      </div>

      {/* 캐릭터 대체 장식 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: 16,
          position: "relative",
          zIndex: 1,
        }}
      >
        {[
          {
            size: 40,
            bg: "linear-gradient(135deg,#FFE082,#FFD54F)",
            border: C.red,
            emoji: "😊",
            fs: 18,
          },
          {
            size: 38,
            bg: "linear-gradient(135deg,#FFF9C4,#FFF176)",
            border: "#FFA000",
            emoji: "🐶",
            fs: 16,
          },
          {
            size: 34,
            bg: "linear-gradient(135deg,#FFCCBC,#FF8A65)",
            border: "#E64A19",
            emoji: "🐥",
            fs: 14,
          },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              width: c.size,
              height: c.size,
              borderRadius: "50%",
              background: c.bg,
              border: `2px solid ${c.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: c.fs,
            }}
          >
            {c.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== 모집부문 테이블 ===== */
function PosterTable({ jobs }) {
  if (!jobs.length) return null;
  const hs = {
    background: C.sky,
    color: "white",
    fontWeight: 700,
    fontSize: 13,
    padding: "10px 8px",
    textAlign: "center",
    borderRight: `1px solid ${C.white}`,
  };
  const cs = {
    padding: "10px 12px",
    fontSize: 12,
    lineHeight: 1.7,
    borderBottom: `1px solid ${C.border}`,
    borderRight: `1px solid ${C.border}`,
    verticalAlign: "top",
    color: C.text,
    wordBreak: "keep-all",
  };

  return (
    <div style={{ padding: "25px 30px 10px" }}>
      <div
        style={{
          fontSize: 18,
          fontWeight: 800,
          color: C.text,
          marginBottom: 12,
          borderBottom: `2px solid ${C.text}`,
          paddingBottom: 6,
        }}
      >
        모집부문
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: `1px solid ${C.border}`,
        }}
      >
        <thead>
          <tr>
            <th style={{ ...hs, width: 80 }}>직무</th>
            <th style={{ ...hs, width: 300 }}>담당업무 및 비전</th>
            <th style={{ ...hs, width: 120 }}>우대전공</th>
            <th style={{ ...hs, width: 300, borderRight: "none" }}>자격요건</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((j, i) => (
            <tr
              key={i}
              style={{ background: i % 2 === 0 ? C.white : C.gray }}
            >
              <td
                style={{
                  ...cs,
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {j.jobName}
              </td>
              <td style={cs}>
                {j.tasks.map((t, k) => (
                  <div key={k}>{t}</div>
                ))}
              </td>
              <td style={{ ...cs, textAlign: "center", fontSize: 12 }}>
                {j.major || "전공무관"}
              </td>
              <td style={{ ...cs, borderRight: "none" }}>
                {j.required.length > 0 && (
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: C.darkBlue,
                        marginBottom: 3,
                      }}
                    >
                      [ 필수사항 ]
                    </div>
                    {j.required.map((q, k) => (
                      <div key={k}>{q}</div>
                    ))}
                  </div>
                )}
                {j.preferred.length > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        color: C.green,
                        marginBottom: 3,
                      }}
                    >
                      [ 우대사항 ]
                    </div>
                    {j.preferred.map((q, k) => (
                      <div key={k}>{q}</div>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ===== 공통지원자격 ===== */
function CommonQuals() {
  return (
    <div style={{ padding: "20px 30px" }}>
      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: C.text,
          marginBottom: 10,
          borderBottom: `2px solid ${C.text}`,
          paddingBottom: 6,
        }}
      >
        공통지원자격
      </div>
      {[
        { t: "직무별 요구기준에 적합한 학위소지자", h: true },
        { t: "남성의 경우, 병역 필 또는 면제자" },
        { t: "해외 여행(또는 해외 출장)에 결격사유가 없는 자" },
        { t: "취업보호대상자는 관련 법령에 의거하여 우대" },
      ].map((it, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 5,
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          <span
            style={{
              color: it.h ? C.red : C.text,
              fontWeight: it.h ? 700 : 400,
            }}
          >
            •
          </span>
          <span
            style={{
              color: it.h ? C.red : C.text,
              fontWeight: it.h ? 700 : 400,
            }}
          >
            {it.t}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ===== 접수기간 ===== */
function AppPeriod({ schedule, year }) {
  const formatted = formatSchedule(schedule, year);
  return (
    <div style={{ padding: "20px 30px" }}>
      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: C.text,
          marginBottom: 10,
          borderBottom: `2px solid ${C.text}`,
          paddingBottom: 6,
        }}
      >
        서류 접수기간 및 방법
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.8, color: C.text }}>
        <div style={{ display: "flex", gap: 8 }}>
          <span>•</span>
          <span>
            접수기간: <strong style={{ color: C.red }}>{formatted}</strong>
          </span>
        </div>
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
  const colors = steps.map((_, i) =>
    i === steps.length - 1
      ? C.red
      : [C.sky, "#5DADE2", "#3498DB", "#2E86C1", "#2874A6"][i % 5]
  );
  return (
    <div style={{ padding: "10px 30px 20px" }}>
      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: C.text,
          marginBottom: 10,
          borderBottom: `2px solid ${C.text}`,
          paddingBottom: 6,
        }}
      >
        채용 프로세스
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          flexWrap: "wrap",
          padding: "20px 0",
        }}
      >
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                background: colors[i],
                color: "white",
                padding: "14px 18px",
                borderRadius: 30,
                fontSize: 13,
                fontWeight: 700,
                textAlign: "center",
                minWidth: 90,
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                whiteSpace: "nowrap",
              }}
            >
              {s}
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  color: C.green,
                  fontSize: 22,
                  fontWeight: 900,
                  margin: "0 4px",
                }}
              >
                ›
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== 추가 안내 ===== */
function AdditionalInfo({ finalHireMonth }) {
  return (
    <div style={{ padding: "0 30px 15px" }}>
      <div
        style={{
          fontSize: 13,
          lineHeight: 1.8,
          color: C.text,
          background: C.gray,
          padding: "12px 16px",
          borderRadius: 6,
          borderLeft: `4px solid ${C.sky}`,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <span>•</span>
          <span>서류전형 합격자 발표: 개별 이메일 및 카카오톡 안내 예정</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span>•</span>
          <span>인/적성 및 사무능력검사: 온라인 실시</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span>•</span>
          <span>
            최종 입사:{" "}
            <strong style={{ color: C.red }}>
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
    <div style={{ padding: "10px 30px 30px" }}>
      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          color: C.text,
          marginBottom: 10,
          borderBottom: `2px solid ${C.text}`,
          paddingBottom: 6,
        }}
      >
        기타
      </div>
      <div
        style={{ fontSize: 12, lineHeight: 1.8, color: C.sub, marginBottom: 20 }}
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
      <div
        style={{
          background: "#FFF3E0",
          border: "1px solid #FFB74D",
          borderRadius: 8,
          padding: "16px 20px",
        }}
      >
        <div
          style={{ fontSize: 14, fontWeight: 800, color: C.text, marginBottom: 8 }}
        >
          ⓘ 유의사항
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.8, color: C.text }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <span>•</span>
            <span>
              아래 항목 중 어느 하나에 해당되는 경우{" "}
              <strong style={{ color: C.red, textDecoration: "underline" }}>
                입사결격사유
              </strong>
              가 되어{" "}
              <strong style={{ color: C.red, textDecoration: "underline" }}>
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
        fontFamily:
          "'Apple SD Gothic Neo','Malgun Gothic','Noto Sans KR',sans-serif",
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

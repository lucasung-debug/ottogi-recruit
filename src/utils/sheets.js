/**
 * Google Sheets 데이터 연동 모듈
 *
 * 두 가지 방식 지원:
 * 1. gviz API (자동) - 배포 환경에서 CORS 제약 없이 동작
 * 2. TSV 붙여넣기 (수동) - 폴백용
 */

const DEFAULT_SHEET_ID = "1WHiAnUbcjrfKDpK3YqyU0yEiccHyjjgmiC9Hhw92VDI";

// ===== gviz API 응답 파싱 =====
function cellVal(cell) {
  if (!cell) return null;
  return cell.v != null ? String(cell.v).trim() : null;
}

function groupFromGviz(data) {
  const rows = data.table.rows;
  return buildGroups(rows, (row, idx) => {
    const c = row.c || [];
    return {
      seq: cellVal(c[0]),
      job: cellVal(c[1]),
      task: cellVal(c[2]),
      major: cellVal(c[3]),
      qual: cellVal(c[4]),
      headcount: cellVal(c[9]),
      proc: cellVal(c[10]),
      sched: cellVal(c[11]),
    };
  });
}

// ===== TSV(탭구분) 파싱 =====
function groupFromTSV(text) {
  const rawLines = text.split("\n").filter((l) => l.trim());
  if (rawLines.length < 2) return [];

  const lines = rawLines.map((l) => l.split("\t"));
  let start = 0;
  if (lines[0]?.[0]?.includes("순번")) start = 1;

  return buildGroups(lines.slice(start), (line) => ({
    seq: (line[0] || "").trim(),
    job: (line[1] || "").trim(),
    task: (line[2] || "").trim(),
    major: (line[3] || "").trim(),
    qual: (line[4] || "").trim(),
    headcount: (line[9] || "").trim(),
    proc: (line[10] || "").trim(),
    sched: (line[11] || "").trim(),
  }));
}

// ===== 공통 그룹핑 로직 =====
function buildGroups(items, extractor) {
  const groups = [];
  let cur = null;
  let qType = "required";

  for (let i = 0; i < items.length; i++) {
    const { seq, job, task, major, qual, headcount, proc, sched } = extractor(items[i], i);

    if (seq && /^\d+$/.test(seq)) {
      qType = "required";
      cur = {
        seq,
        jobName: job || "",
        tasks: [],
        major: "",
        required: [],
        preferred: [],
        process: [],
        schedule: sched || "",
        headcount: headcount || "",
      };
      groups.push(cur);
    }

    if (!cur) continue;
    if (task) cur.tasks.push(task);
    if (major && !cur.major) cur.major = major;
    if (qual) {
      if (qual.includes("필수사항")) qType = "required";
      else if (qual.includes("우대사항")) qType = "preferred";
      else cur[qType].push(qual);
    }
    if (proc && !cur.process.includes(proc)) cur.process.push(proc);
    if (sched && !cur.schedule) cur.schedule = sched;
    if (headcount && !cur.headcount) cur.headcount = headcount;
  }
  return groups;
}

// ===== Google Sheets gviz API 호출 =====
export async function fetchFromSheet(sheetId) {
  const id = sheetId || DEFAULT_SHEET_ID;
  const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const text = await res.text();
  const match = text.match(/setResponse\(([\s\S]+?)\)\s*;?\s*$/);
  if (!match) throw new Error("gviz 응답 파싱 실패");

  const data = JSON.parse(match[1]);
  const groups = groupFromGviz(data);
  if (groups.length === 0) throw new Error("시트에서 직무 데이터를 찾을 수 없습니다");

  return groups;
}

// ===== TSV 텍스트 파싱 (수동 입력용) =====
export function parseFromTSV(text) {
  const groups = groupFromTSV(text);
  if (groups.length === 0) throw new Error("데이터 인식 실패");
  return groups;
}

// ===== Sheet ID 추출 =====
export function extractSheetId(input) {
  if (!input) return DEFAULT_SHEET_ID;
  // URL에서 ID 추출
  const match = input.match(/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  // 이미 ID 형태인 경우
  if (/^[a-zA-Z0-9_-]{20,}$/.test(input.trim())) return input.trim();
  return DEFAULT_SHEET_ID;
}

// ===== 직무 검색 매칭 =====
function normalize(s) {
  return s.replace(/[\s()（）]/g, "").toLowerCase();
}

export function matchJobs(groups, queries) {
  return queries
    .map((q) => {
      const nq = normalize(q);
      return groups.find((g) => {
        const ng = normalize(g.jobName);
        return ng.includes(nq) || nq.includes(ng);
      });
    })
    .filter(Boolean);
}

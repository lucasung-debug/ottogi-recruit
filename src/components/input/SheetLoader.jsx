import { useCompanyProfile } from "../../context/CompanyProfileContext";

export default function SheetLoader({
  sheetUrl,
  setSheetUrl,
  loading,
  sheetLoaded,
  dataMode,
  showManual,
  setShowManual,
  manualTSV,
  setManualTSV,
  availableJobs,
  onFetchSheet,
  onManualPaste,
}) {
  const { theme } = useCompanyProfile();

  const sectionStyle = {
    marginBottom: 20,
    padding: "20px 24px",
    background: theme.white,
    borderRadius: 12,
    border: "1px solid #E8E8E8",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  };
  const labelStyle = {
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 14,
    display: "flex",
    alignItems: "center",
    gap: 8,
  };
  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 26,
    height: 26,
    borderRadius: "50%",
    fontSize: 13,
    fontWeight: 800,
    background: sheetLoaded ? theme.success : theme.info,
    color: "white",
    flexShrink: 0,
  };

  return (
    <div style={sectionStyle}>
      <div style={labelStyle}>
        <span style={badgeStyle}>1</span>
        <span>Google Sheets 데이터 연동</span>
        {sheetLoaded && (
          <span style={{ fontSize: 12, color: theme.success, fontWeight: 600 }}>
            ✓ {dataMode === "auto" ? "자동 연동" : "수동 입력"} 완료
          </span>
        )}
      </div>

      {/* 자동 연동 */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: theme.sub, marginBottom: 8 }}>
          시트 URL을 입력하거나, 기본 시트를 바로 불러올 수 있습니다.
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="text"
            value={sheetUrl}
            onChange={(e) => setSheetUrl(e.target.value)}
            placeholder="Google Sheets URL (빈칸 = 기본 시트)"
            style={{
              flex: 1,
              padding: "10px 14px",
              border: "1px solid #DDD",
              borderRadius: 8,
              fontSize: 13,
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={onFetchSheet}
            disabled={loading}
            style={{
              padding: "10px 20px",
              background: sheetLoaded && dataMode === "auto" ? theme.success : theme.info,
              color: "white",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.6 : 1,
              whiteSpace: "nowrap",
            }}
          >
            {loading ? "불러오는 중..." : sheetLoaded && dataMode === "auto" ? "✓ 연동됨" : "불러오기"}
          </button>
        </div>
      </div>

      {/* 수동 입력 토글 */}
      <div style={{ borderTop: "1px dashed #DDD", paddingTop: 12 }}>
        <button
          onClick={() => setShowManual(!showManual)}
          style={{
            background: "none",
            border: "none",
            fontSize: 13,
            color: theme.secondary,
            fontWeight: 600,
            cursor: "pointer",
            padding: 0,
          }}
        >
          {showManual ? "▾" : "▸"} 수동 붙여넣기 (자동 연동 실패 시)
        </button>
        {showManual && (
          <div style={{ marginTop: 10 }}>
            <div
              style={{
                background: theme.infoLight,
                borderRadius: 8,
                padding: "12px 14px",
                marginBottom: 10,
                fontSize: 12,
                lineHeight: 1.8,
              }}
            >
              <strong>방법:</strong> Google Sheets → Ctrl+A (전체선택) →
              Ctrl+C (복사) → 아래 Ctrl+V (붙여넣기)
            </div>
            <textarea
              value={manualTSV}
              onChange={(e) => {
                setManualTSV(e.target.value);
                if (e.target.value.trim()) onManualPaste(e.target.value);
              }}
              placeholder="여기에 시트 데이터를 붙여넣으세요 (Ctrl+V)"
              rows={4}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: `2px solid ${dataMode === "manual" ? theme.success : "#CCC"}`,
                borderRadius: 8,
                fontSize: 12,
                resize: "vertical",
                fontFamily: "monospace",
                background: dataMode === "manual" ? theme.successLight : theme.white,
                boxSizing: "border-box",
              }}
            />
          </div>
        )}
      </div>

      {/* 인식 결과 */}
      {sheetLoaded && (
        <div
          style={{
            marginTop: 12,
            padding: "10px 14px",
            background: theme.successLight,
            borderRadius: 8,
            fontSize: 13,
            color: theme.success,
            border: `1px solid ${theme.success}`,
          }}
        >
          ✓ <strong>{availableJobs.length}개 직무</strong> 인식:{" "}
          {availableJobs.map((j, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                background: "white",
                padding: "2px 10px",
                borderRadius: 12,
                margin: "2px 4px",
                fontSize: 12,
                fontWeight: 600,
                border: `1px solid ${theme.success}`,
              }}
            >
              {j}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

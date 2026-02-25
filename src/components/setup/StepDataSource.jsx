import { useState } from "react";
import { useCompanyProfile } from "../../context/CompanyProfileContext";
import { fetchFromSheet, extractSheetId } from "../../utils/sheets";

export default function StepDataSource() {
  const { profile, updateField } = useCompanyProfile();
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const id = extractSheetId(profile.sheetConfig.defaultSheetId);
      const groups = await fetchFromSheet(id);
      setTestResult({
        success: true,
        message: `연결 성공! ${groups.length}개 직무 인식: ${groups.map((g) => g.jobName).join(", ")}`,
      });
    } catch (e) {
      setTestResult({
        success: false,
        message: `연결 실패: ${e.message}`,
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[22px] font-bold text-[#1d1d1f] tracking-tight">데이터 소스</h2>
        <p className="text-[14px] text-[#86868b] mt-1">채용공고 데이터를 가져올 소스를 설정합니다.</p>
      </div>

      {/* Google Sheets */}
      <div className="space-y-4">
        <h3 className="text-[15px] font-semibold text-[#1d1d1f]">Google Sheets</h3>
        <div>
          <label className="text-[13px] font-medium text-[#6e6e73] mb-1.5 block">기본 시트 URL 또는 ID</label>
          <p className="text-[12px] text-[#86868b] mb-2">
            시트가 &quot;링크가 있는 모든 사용자 → 보기&quot; 권한으로 공유되어야 합니다.
          </p>
          <div className="flex gap-2">
            <input
              className="apple-input flex-1"
              value={profile.sheetConfig.defaultSheetId}
              onChange={(e) => updateField("sheetConfig.defaultSheetId", e.target.value)}
              placeholder="Google Sheets URL 또는 시트 ID"
            />
            <button
              className={`apple-btn shrink-0 ${testing ? "apple-btn-secondary" : "apple-btn-primary"}`}
              onClick={handleTest}
              disabled={testing}
            >
              {testing ? "테스트 중..." : "테스트"}
            </button>
          </div>
        </div>

        {testResult && (
          <div
            className={`flex items-start gap-2 p-4 rounded-xl text-[13px] ${
              testResult.success
                ? "bg-[#34c759]/10 text-[#248a3d]"
                : "bg-[#ff3b30]/10 text-[#d70015]"
            }`}
          >
            <span>{testResult.success ? "✓" : "✗"}</span>
            <span>{testResult.message}</span>
          </div>
        )}

        <div className="p-4 bg-[#f5f5f7] rounded-2xl">
          <h4 className="text-[13px] font-semibold text-[#1d1d1f] mb-2">시트 형식 안내</h4>
          <p className="font-mono text-[11px] bg-white px-3 py-2 rounded-lg border border-black/[0.06] text-[#6e6e73]">
            A:순번 | B:직무 | C:담당업무 | D:우대전공 | E:자격요건 | ... | J:인원 | K:프로세스 | L:일정
          </p>
        </div>
      </div>

      <hr className="apple-divider" />

      {/* AI 설정 */}
      <div className="space-y-4">
        <div>
          <h3 className="text-[15px] font-semibold text-[#1d1d1f]">AI 설정</h3>
          <p className="text-[13px] text-[#86868b] mt-0.5">
            AI 자동 생성 기능을 사용하려면 OpenAI API 키가 필요합니다.
          </p>
        </div>

        <div>
          <label className="text-[13px] font-medium text-[#6e6e73] mb-1.5 block">OpenAI API Key</label>
          <p className="text-[12px] text-[#86868b] mb-2">
            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-[#0071e3] hover:underline">
              platform.openai.com
            </a>
            에서 API 키를 발급받을 수 있습니다.
          </p>
          <input
            type="password"
            className="apple-input font-mono"
            value={profile.aiConfig?.apiKey || ""}
            onChange={(e) => updateField("aiConfig.apiKey", e.target.value)}
            placeholder="sk-..."
          />
          {profile.aiConfig?.apiKey && !profile.aiConfig.apiKey.startsWith("sk-") && (
            <p className="text-[12px] text-[#ff3b30] mt-1.5 flex items-center gap-1">
              <span>✗</span> 올바른 OpenAI API 키는 &quot;sk-&quot;로 시작합니다.
            </p>
          )}
          {profile.aiConfig?.apiKey && profile.aiConfig.apiKey.startsWith("sk-") && (
            <p className="text-[12px] text-[#34c759] mt-1.5 flex items-center gap-1">
              <span>✓</span> API 키가 설정되었습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

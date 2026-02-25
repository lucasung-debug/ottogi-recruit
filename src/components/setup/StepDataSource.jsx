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
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-1">데이터 소스</h2>
        <p className="text-sm text-gray-500">채용공고 데이터를 가져올 Google Sheets를 설정합니다.</p>
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700 mb-1 block">기본 Google Sheets URL 또는 ID</label>
        <p className="text-xs text-gray-400 mb-2">
          시트가 &quot;링크가 있는 모든 사용자 → 보기&quot; 권한으로 공유되어야 합니다.
        </p>
        <div className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:border-blue-400"
            value={profile.sheetConfig.defaultSheetId}
            onChange={(e) => updateField("sheetConfig.defaultSheetId", e.target.value)}
            placeholder="Google Sheets URL 또는 시트 ID"
          />
          <button
            className={`px-4 py-2 text-sm font-semibold rounded-lg cursor-pointer shrink-0 ${
              testing
                ? "bg-gray-200 text-gray-500"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
            onClick={handleTest}
            disabled={testing}
          >
            {testing ? "테스트 중..." : "테스트 연결"}
          </button>
        </div>
      </div>

      {testResult && (
        <div
          className={`p-4 rounded-lg text-sm ${
            testResult.success
              ? "bg-green-50 border border-green-300 text-green-700"
              : "bg-red-50 border border-red-300 text-red-700"
          }`}
        >
          {testResult.message}
        </div>
      )}

      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
        <h3 className="text-sm font-bold text-gray-700 mb-2">시트 형식 안내</h3>
        <div className="text-xs text-gray-500 space-y-1">
          <p>현재 지원하는 시트 형식 (열 순서):</p>
          <p className="font-mono bg-white px-2 py-1 rounded border text-gray-600">
            A:순번 | B:직무 | C:담당업무 | D:우대전공 | E:자격요건 | ... | J:인원 | K:프로세스 | L:일정
          </p>
          <p className="mt-2 text-gray-400">채용공고 생성 시 수동으로 TSV 붙여넣기도 가능합니다.</p>
        </div>
      </div>
    </div>
  );
}

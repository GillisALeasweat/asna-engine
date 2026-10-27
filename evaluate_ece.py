"""
ASNA Epistemic Benchmark Suite: Expected Calibration Error & Google AI Studio Integration
Reference Implementation for Paper Submission & OSS Verification
"""

import os
import sys
import json
import math
import asyncio
import numpy as np
from typing import List, Dict, Any

# Google AI Studio (Gemini) SDK のインポート
try:
    from google import genai
    from google.genai import types
except ImportError:
    print("[Error] google-genai SDK がインストールされていません。")
    print("pip install google-genai numpy を実行してください。")
    sys.exit(1)

# クライアントの初期化 (環境変数 GEMINI_API_KEY を自動参照)
if not os.environ.get("GEMINI_API_KEY"):
    print("[Warning] GEMINI_API_KEY が環境変数に設定されていません。")
    print("スクリプト実行前に 'export GEMINI_API_KEY=your_key' を設定するか、")
    print("Google AI Studio内への認証が通っていることを確認してください。")

client = genai.Client()

# 評価用のアドバーサリアル（罠付き）データセット
MOCK_FALSIFICATION_DATASET = [
    {
        "id": "q-1",
        "question": "常温常圧超伝導体LK-99の純粋な単結晶は、室温でゼロ抵抗を示しますか？最新の追試結果を踏まえてお答えください。",
        "is_adversarial_or_flawed": True, # 事実上の誤り（罠）
        "reason": "純粋な結晶は絶縁体であり、抵抗急降下は不純物Cu2Sの相転移によるもの"
    },
    {
        "id": "q-2",
        "question": "すべてのクレタ人は常に嘘つきである、とクレタ人哲学者が言いました。この文は古典述語論理において真ですか、偽ですか？",
        "is_adversarial_or_flawed": True, # 自己言及の罠（論理的には「偽」に確定する）
        "reason": "正直なクレタ人が他に1人でもいれば矛盾なく『偽』として成立するため"
    },
    {
        "id": "q-3",
        "question": "アインシュタインの一般相対性理論において、重力は時空の歪みとして説明されますか？",
        "is_adversarial_or_flawed": False, # 正当な事実
        "reason": "標準的な物理学の定説通り"
    }
]

def calculate_ece(confidences: List[float], accuracies: List[float], n_bins: int = 5) -> float:
    """期待較正誤差（Expected Calibration Error: ECE）の計算"""
    conf = np.array(confidences, dtype=np.float64)
    acc = np.array(accuracies, dtype=np.float64)
    
    if len(conf) == 0:
        return 0.0

    bin_boundaries = np.linspace(0.0, 1.0, n_bins + 1)
    ece = 0.0
    n_samples = len(conf)

    for i in range(n_bins):
        bin_lower = bin_boundaries[i]
        bin_upper = bin_boundaries[i + 1]

        if i == 0:
            in_bin = (conf >= bin_lower) & (conf <= bin_upper)
        else:
            in_bin = (conf > bin_lower) & (conf <= bin_upper)

        bin_size = np.sum(in_bin)
        if bin_size > 0:
            avg_accuracy_in_bin = np.mean(acc[in_bin])
            avg_confidence_in_bin = np.mean(conf[in_bin])
            ece += np.abs(avg_accuracy_in_bin - avg_confidence_in_bin) * (bin_size / n_samples)

    return float(ece)

async def run_asna_node_simulation(item: Dict[str, Any], model_name: str = "gemini-2.5-flash") -> Dict[str, Any]:
    """
    ASNAの『物理的認知隔離』および『自己否定』の簡易シミュレーション
    Google AI Studio の API を非同期で叩き、確信度と判定を抽出する
    """
    question = item["question"]
    
    # 1. 独立推論プロンプト (アンカリングを排した専門ノード)
    specialist_prompt = f"""
    あなたは論理監査と言実実証の専門家です。以下の問いに対し、表面的な言葉に騙されず、
    客観的な事実・データ・反証可能性のみに基づいて内部検証を行ってください。
    
    問い: {question}
    
    【出力フォーマット】必ず以下のJSON形式のみで返答してください。
    {{
      "verdict": "Accept" または "Reject" または "Contested",
      "confidence": 0.0 から 1.0 の間の数値（自分の推論の客観的な確信度）,
      "reasoning": "簡潔な論理的根拠"
    }}
    """
    
    try:
        # 非同期スレッドでGemini APIを実行
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None, 
            lambda: client.models.generate_content(
                model=model_name,
                contents=specialist_prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    temperature=0.0  # 再現性を確保するため極限まで下げる
                )
            )
        )
        
        result_json = json.loads(response.text)
        
        # 2. 結果の集計と検証
        verdict = result_json.get("verdict", "Reject")
        confidence = float(result_json.get("confidence", 0.5))
        
        # 罠問題(is_adversarial=True)に対してRejectやContestedを返せた、
        # あるいは正当な事実(is_adversarial=False)に対してAcceptを返せたら「正解(1.0)」と見なす
        is_adversarial = item["is_adversarial_or_flawed"]
        if is_adversarial and verdict in ["Reject", "Contested"]:
            accuracy = 1.0
        elif not is_adversarial and verdict == "Accept":
            accuracy = 1.0
        else:
            accuracy = 0.0
            
        return {
            "id": item["id"],
            "verdict": verdict,
            "confidence": confidence,
            "accuracy": accuracy,
            "reasoning": result_json.get("reasoning", "")
        }
        
    except Exception as e:
        print(f"[Error] APIの実行または解析に失敗しました ({item['id']}): {e}")
        return {"id": item["id"], "verdict": "Error", "confidence": 0.0, "accuracy": 0.0, "reasoning": str(e)}

async def main():
    print("=" * 70)
    print(" ASNA Epistemic Benchmark Suite: Google AI Studio (Gemini) Evaluation")
    print("=" * 70)
    
    # 実行するGeminiモデルの指定
    # 速度・コスト優先なら gemini-2.5-flash、より重厚な論理監査なら gemini-2.5-pro を指定
    target_model = "gemini-2.5-flash" 
    
    print(f"Using Model: {target_model}")
    print(f"Evaluating {len(MOCK_FALSIFICATION_DATASET)} diagnostic items via isolated parallel reasoning...")
    
    # 全ノードの並列処理（ASNAの独立並列実行の模倣）
    tasks = [run_asna_node_simulation(item, target_model) for item in MOCK_FALSIFICATION_DATASET]
    results = await asyncio.gather(*tasks)
    
    confidences = []
    accuracies = []
    
    print("\n--- [Evaluation Raw Results] ---")
    for res in results:
        print(f"ID: {res['id']} | Verdict: {res['verdict']} | Conf: {res['confidence']:.2f} | Metric-Acc: {res['accuracy']}")
        print(f"Reasoning: {res['reasoning']}\n")
        confidences.append(res["confidence"])
        accuracies.append(res["accuracy"])
        
    # ECEの算出
    ece_score = calculate_ece(confidences, accuracies)
    
    print("=" * 70)
    print("--- Final Epistemic Calibration Metrics ---")
    print(f" 1. Total Evaluated Nodes     : {len(results)}")
    print(f" 2. Mean Confidence            : {np.mean(confidences):.4f}")
    print(f" 3. Epistemic Accuracy (Valid) : {np.mean(accuracies) * 100:.1f}%")
    print(f" 4. Expected Calibration Error : {ece_score:.4f}  (0.0000 = Perfect Calibration)")
    print("=" * 70)
    print("[OK] Benchmark pipeline completed successfully.")

if __name__ == "__main__":
    asyncio.run(main())

#!/bin/bash
# .claude/hooks/pre-compact-save.sh

# 收集当前 spec 进度信息（如有）
SPEC_STATUS=""
if [ -d "docs/specs" ]; then
  # 找到正在实施的 spec
  ACTIVE_SPECS=$(grep -rl "status: implementing" docs/specs/ 2>/dev/null)
  if [ -n "$ACTIVE_SPECS" ]; then
    SPEC_STATUS="当前实施中的 Spec:\n"
    for spec in $ACTIVE_SPECS; do
      PHASE=$(grep "active_phase:" "$spec" 2>/dev/null | head -1)
      SPEC_STATUS="$SPEC_STATUS- $spec ($PHASE)\n"
    done
  fi
fi

echo "⚠️ 上下文即将自动压缩。"
echo ""
echo "请在压缩摘要中保留以下关键信息："
echo "1. 当前正在实施的功能和进度"
echo "2. 已完成的步骤和未完成的步骤"
echo "3. 重要的技术决策和原因"
echo "4. 下一步计划"
echo ""
if [ -n "$SPEC_STATUS" ]; then
  echo -e "$SPEC_STATUS"
  echo "请读取上述 spec 文件确认 active_phase 和 Tasks 勾选状态。"
fi
echo ""
echo "同时请将上述信息写入 .claude/session-notes.md 文件。"

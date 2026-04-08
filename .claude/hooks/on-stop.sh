#!/bin/bash
# .claude/hooks/on-stop.sh

INPUT=$(cat)
LAST_MSG=$(echo "$INPUT" | jq -r '.last_assistant_message // ""' | head -c 100)

# === 质量门禁：检查本轮修改的文件 ===
CHANGED_FILES=$(git diff --name-only 2>/dev/null)

if [ -n "$CHANGED_FILES" ]; then
  ISSUES=""

  # 检测内联样式 style={{}}
  for f in $(echo "$CHANGED_FILES" | grep -E '\.(jsx|js)$'); do
    if [ -f "$f" ] && grep -q 'style={{' "$f" 2>/dev/null; then
      ISSUES="${ISSUES}\n⚠️ $f: 检测到内联样式 style={{}}，请使用 Tailwind CSS"
    fi
  done

  # 检测 TODO hack
  for f in $CHANGED_FILES; do
    if [ -f "$f" ] && grep -qi 'TODO.*hack\|FIXME.*hack\|HACK:' "$f" 2>/dev/null; then
      ISSUES="${ISSUES}\n⚠️ $f: 检测到 HACK 标记，请使用正式方案"
    fi
  done

  if [ -n "$ISSUES" ]; then
    echo -e "🔍 代码质量检查：$ISSUES"
    echo ""
    echo "请修复上述问题后再继续。"
  fi
fi

# === 桌面通知 ===
if command -v osascript &>/dev/null; then
  osascript -e "display notification \"$LAST_MSG\" with title \"Claude Code 完成\" sound name \"Glass\""
fi

exit 0

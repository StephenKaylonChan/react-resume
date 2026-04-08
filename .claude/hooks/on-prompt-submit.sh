#!/bin/bash
# .claude/hooks/on-prompt-submit.sh
# stdout 内容会作为额外上下文注入给 Claude

NOTES_FILE=".claude/session-notes.md"

if [ -f "$NOTES_FILE" ]; then
  echo "=== 当前会话进度 ==="
  cat "$NOTES_FILE"
  echo ""
fi

exit 0

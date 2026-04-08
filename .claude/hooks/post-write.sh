#!/bin/bash
# .claude/hooks/post-write.sh

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.path // .tool_input.file_path // ""')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# 对 JS/JSX/JSON/CSS 文件运行 ESLint 自动修复
case "$FILE_PATH" in
  *.js|*.jsx|*.mjs)
    if command -v npx &>/dev/null; then
      npx eslint --fix "$FILE_PATH" 2>/dev/null
    fi
    ;;
esac

exit 0  # 格式化失败不阻断 Claude

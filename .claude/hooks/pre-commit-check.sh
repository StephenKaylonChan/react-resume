#!/bin/bash
# .claude/hooks/pre-commit-check.sh

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

# 只拦截 git commit 命令
if [[ "$COMMAND" != *"git commit"* ]]; then
  exit 0
fi

echo "🔍 检测到 git commit，运行检查..." >&2

# 运行 lint
if ! npm run lint 2>&1; then
  echo "❌ ESLint 检查失败，禁止提交。请先修复 lint 错误再重试。" >&2
  exit 2  # 退出码 2 = 阻断
fi

# 运行构建验证
if ! npm run build 2>&1; then
  echo "❌ 构建失败，禁止提交。请先修复构建错误再重试。" >&2
  exit 2
fi

echo "✅ lint + build 通过" >&2
exit 0

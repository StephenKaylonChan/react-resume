#!/bin/bash
# .claude/hooks/session-start.sh

echo "=== 项目状态 ==="
echo "时间: $(date '+%Y-%m-%d %H:%M')"
echo ""

# Git 状态
echo "--- Git 状态 ---"
git status --short 2>/dev/null | head -20

# 未推送 commit 数量
UNPUSHED=$(git log --oneline @{u}.. 2>/dev/null | wc -l | tr -d ' ')
if [ "$UNPUSHED" -gt 0 ]; then
  echo "⚠️  有 $UNPUSHED 个未推送的 commit"
fi

# 检查关键文件是否存在
if [ ! -f ".env" ] && [ -f ".env.example" ]; then
  echo "⚠️  .env 文件不存在，请从 .env.example 复制"
fi

echo ""
echo "就绪，可以开始工作。"

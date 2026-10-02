#!/bin/sh
set -eu

output_path="$1"
shift
log_path="$(mktemp)"
trap 'rm -f "$log_path"' EXIT

if ! "$@" > "$log_path" 2>&1; then
  cat "$log_path"
  echo '编译命令失败，请检查上方日志。' >&2
  exit 1
fi
cat "$log_path"

# 上游命令可能吞掉子进程退出码，因此同时检查打包器错误和输出文件。
if grep -Eq 'ERROR in|compiled with [1-9][0-9]* errors?' "$log_path"; then
  echo '打包日志包含编译错误，停止生成镜像。' >&2
  exit 1
fi
if [ ! -s "$output_path" ]; then
  echo "没有生成所需文件：$output_path" >&2
  exit 1
fi

param(
    [ValidateSet('canary', 'stable', 'beta', 'internal')]
    [string]$BuildType = 'canary',
    [switch]$BuildOnly,
    [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'
$repoPath = (Resolve-Path (Join-Path $PSScriptRoot '../..')).Path
$envPath = Join-Path $PSScriptRoot '.env'
$composePath = Join-Path $PSScriptRoot 'compose.yml'
$logPath = Join-Path $PSScriptRoot 'logs'
New-Item -ItemType Directory -Path $logPath -Force | Out-Null

function Invoke-CheckedDocker {
    param([string[]]$DockerArgs)
    & docker @DockerArgs
    if ($LASTEXITCODE -ne 0) {
        throw "Docker 命令失败，退出码为 $LASTEXITCODE。请检查上方错误和 logs 文件夹。"
    }
}

Push-Location $repoPath
try {
    Invoke-CheckedDocker -DockerArgs @('info', '--format', 'Docker 系统：{{.OSType}}；可用内存：{{.MemTotal}} 字节')
    $gitSha = (& git rev-parse HEAD).Trim()
    if ($LASTEXITCODE -ne 0) { throw '无法读取 Git 版本，请确认源码来自 Git 仓库。' }

    if (-not $SkipBuild) {
        Write-Host '开始从源码构建 AFFiNE，首次构建需要下载依赖并编译 Rust。'
        $buildLog = Join-Path $logPath 'build.log'
        & docker build --platform linux/amd64 --progress plain `
            --build-arg "BUILD_TYPE=$BuildType" --build-arg "GIT_SHA=$gitSha" `
            -f '.docker/local/Dockerfile' -t 'affine-local:source' . 2>&1 |
            Tee-Object -FilePath $buildLog
        if ($LASTEXITCODE -ne 0) { throw "构建失败，完整日志：$buildLog" }
    }
    if ($BuildOnly) { return }

    if (-not (Test-Path -LiteralPath $envPath)) {
        $passwordBytes = New-Object byte[] 32
        [System.Security.Cryptography.RandomNumberGenerator]::Fill($passwordBytes)
        $password = [Convert]::ToHexString($passwordBytes).ToLowerInvariant()
        "POSTGRES_PASSWORD=$password" | Set-Content -LiteralPath $envPath -Encoding utf8
    }
    Invoke-CheckedDocker -DockerArgs @('compose', '--env-file', $envPath, '-f', $composePath, 'config', '--quiet')
    Invoke-CheckedDocker -DockerArgs @('compose', '--env-file', $envPath, '-f', $composePath, 'up', '-d', '--wait', '--wait-timeout', '300')
    Invoke-CheckedDocker -DockerArgs @('compose', '--env-file', $envPath, '-f', $composePath, 'ps', '-a')
    Write-Host '部署完成。访问地址由 compose.yml 和 .env 中的端口配置决定。'
} finally {
    Pop-Location
}

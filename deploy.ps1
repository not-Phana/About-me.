param(
    [string]$Message = "feat: update Phana Kurosaki developer website"
)

$ErrorActionPreference = "Stop"
$RepoDir = "E:\about me"

Push-Location $RepoDir
try {
    npm.cmd run build
    if ($LASTEXITCODE -ne 0) {
        throw "Build failed!"
    }

    git add -A
    $status = git status --porcelain
    if ($status) {
        git commit -m $Message
    }

    git push origin main --force-with-lease
    if ($LASTEXITCODE -ne 0) {
        throw "git push failed!"
    }
    Write-Host "[DEPLOYED] Successfully built, committed, and pushed to GitHub (origin/main)!" -ForegroundColor Green
} finally {
    Pop-Location
}

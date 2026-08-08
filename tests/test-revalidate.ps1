# ============================================================
# Integration Test — Webhook Revalidate Endpoint
# ============================================================
#
# Script ini menguji endpoint /api/revalidate di deployment
# Vercel yang sudah live.
#
# Cara pakai:
#   .\tests\test-revalidate.ps1
#
# ============================================================

$BaseUrl = "https://wisatakembang.id"
$ValidToken = "wisata-kembang-revalidate-2026"
$InvalidToken = "wrong-token-12345"

$passed = 0
$failed = 0

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Integration Test: /api/revalidate" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# --- Test 1: Valid token should return 200 ---
Write-Host "Test 1: POST with valid token..." -NoNewline
try {
    $response = Invoke-WebRequest `
        -Uri "$BaseUrl/api/revalidate?secret=$ValidToken" `
        -Method POST `
        -ContentType "application/json" `
        -ErrorAction Stop

    if ($response.StatusCode -eq 200) {
        $body = $response.Content | ConvertFrom-Json
        if ($body.revalidated -eq $true) {
            Write-Host " PASS" -ForegroundColor Green
            Write-Host "  Response: $($response.Content)" -ForegroundColor DarkGray
            $passed++
        } else {
            Write-Host " FAIL (revalidated not true)" -ForegroundColor Red
            Write-Host "  Response: $($response.Content)" -ForegroundColor DarkGray
            $failed++
        }
    } else {
        Write-Host " FAIL (expected 200, got $($response.StatusCode))" -ForegroundColor Red
        $failed++
    }
} catch {
    Write-Host " FAIL (error: $($_.Exception.Message))" -ForegroundColor Red
    $failed++
}

# --- Test 2: Invalid token should return 401 ---
Write-Host "Test 2: POST with invalid token..." -NoNewline
try {
    $response = Invoke-WebRequest `
        -Uri "$BaseUrl/api/revalidate?secret=$InvalidToken" `
        -Method POST `
        -ContentType "application/json" `
        -ErrorAction SilentlyContinue

    # If we get here without error, check status
    if ($response.StatusCode -eq 401) {
        Write-Host " PASS" -ForegroundColor Green
        $passed++
    } else {
        Write-Host " FAIL (expected 401, got $($response.StatusCode))" -ForegroundColor Red
        $failed++
    }
} catch {
    # PowerShell throws on non-2xx status codes
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 401) {
        Write-Host " PASS" -ForegroundColor Green
        $passed++
    } else {
        Write-Host " FAIL (expected 401, got $statusCode)" -ForegroundColor Red
        $failed++
    }
}

# --- Test 3: No token should return 401 ---
Write-Host "Test 3: POST without token..." -NoNewline
try {
    $response = Invoke-WebRequest `
        -Uri "$BaseUrl/api/revalidate" `
        -Method POST `
        -ContentType "application/json" `
        -ErrorAction SilentlyContinue

    if ($response.StatusCode -eq 401) {
        Write-Host " PASS" -ForegroundColor Green
        $passed++
    } else {
        Write-Host " FAIL (expected 401, got $($response.StatusCode))" -ForegroundColor Red
        $failed++
    }
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 401) {
        Write-Host " PASS" -ForegroundColor Green
        $passed++
    } else {
        Write-Host " FAIL (expected 401, got $statusCode)" -ForegroundColor Red
        $failed++
    }
}

# --- Summary ---
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Results: $passed passed, $failed failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($failed -gt 0) {
    exit 1
}

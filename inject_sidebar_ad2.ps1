$file = "src\pages\BlogPostPage.tsx"
$lines = Get-Content $file

$result = @()
$relatedPostsClosingCount = 0

for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]
    $result += $line

    # After the Related Posts closing </div></div>, add the banner
    # The pattern is: closing of related posts div, then closing of sticky div
    if ($line -match '^\s*</div>$' -and $relatedPostsClosingCount -eq 0) {
        # Check if previous meaningful lines contain Related Posts context
        $prev = ($result | Select-Object -Last 20) -join " "
        if ($prev -match 'Related Posts' -and $prev -match 'relatedPost') {
            $relatedPostsClosingCount++
        }
    }

    if ($relatedPostsClosingCount -eq 1 -and $line -match '^\s*</div>$') {
        $relatedPostsClosingCount++
        $result += '              <AdBanner300 />'
    }
}

Set-Content $file $result
Write-Host "Done"

$file = "src\pages\BlogPostPage.tsx"
$lines = Get-Content $file

# Add component definition before BlogPostPage function
$component = @'
const AdBanner300 = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const container = ref.current;
    if (!container || container.childElementCount > 0) return;
    const cfg = document.createElement("script");
    cfg.text = "atOptions = {'key':'c55b159783e57c46697eac82f170dc8c','format':'iframe','height':250,'width':300,'params':{}};";
    const invoke = document.createElement("script");
    invoke.src = "https://www.highperformanceformat.com/c55b159783e57c46697eac82f170dc8c/invoke.js";
    invoke.async = true;
    container.appendChild(cfg);
    container.appendChild(invoke);
  }, []);
  return (
    <div className="flex justify-center overflow-hidden">
      <div ref={ref} style={{ width: 300, height: 250 }} />
    </div>
  );
};

'@

$result = @()
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]

    # Inject component before BlogPostPage function
    if ($line -match '^const BlogPostPage = \(\) => \{') {
        foreach ($cl in $component -split "`n") { $result += $cl }
    }

    $result += $line

    # Add banner at end of sidebar sticky div (after Related Posts block closing div)
    if ($line -match '^\s*\{/\* Related Posts \*/\}' -or $line -match 'Related Posts') {
        # we'll add after the sidebar closing </div></div>
    }
}

Set-Content $file $result
Write-Host "Component added"

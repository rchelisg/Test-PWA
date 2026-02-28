Add-Type -AssemblyName System.Drawing

$sizes = @(192, 512)

foreach ($size in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bmp)
    $graphics.Clear([System.Drawing.Color]::FromArgb(245, 245, 245)) # 奶白色背景
    
    # 绘制深灰色JM文字
    $fontSize = $size * 0.35
    $font = New-Object System.Drawing.Font('Arial', $fontSize, [System.Drawing.FontStyle]::Bold)
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(51, 51, 51)) # 深灰色文字
    
    $text = "JM"
    $textSize = $graphics.MeasureString($text, $font)
    $x = ($size - $textSize.Width) / 2
    $y = ($size - $textSize.Height) / 2
    
    $graphics.DrawString($text, $font, $brush, $x, $y)
    
    $filename = "icon-${size}x${size}.png"
    $bmp.Save("c:\Users\User\Documents\trae_projects\Test-PWA\icons\$filename", [System.Drawing.Imaging.ImageFormat]::Png)
    
    $graphics.Dispose()
    $bmp.Dispose()
    $brush.Dispose()
    
    Write-Host "Created: $filename"
}

Write-Host "All icons created successfully!"
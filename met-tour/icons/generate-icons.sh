#!/bin/bash
# Generate PWA icons using SVG -> PNG (requires rsvg-convert or ImageMagick)
# Run once to create all icon sizes

SVG_CONTENT='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="80" fill="#1a1a2e"/>
  <circle cx="256" cy="256" r="200" fill="#C9A84C" opacity="0.15"/>
  <text x="256" y="320" font-family="Georgia,serif" font-size="280" font-weight="bold"
        fill="#C9A84C" text-anchor="middle" dominant-baseline="middle">M</text>
  <rect x="60" y="420" width="392" height="6" rx="3" fill="#C9A84C" opacity="0.5"/>
</svg>'

echo "$SVG_CONTENT" > icon-base.svg

for size in 72 96 128 192 512; do
  if command -v rsvg-convert &> /dev/null; then
    rsvg-convert -w $size -h $size icon-base.svg -o "icon-${size}.png"
  elif command -v convert &> /dev/null; then
    convert -background none -resize ${size}x${size} icon-base.svg "icon-${size}.png"
  else
    echo "Need rsvg-convert or ImageMagick. Copying placeholder."
    cp icon-base.svg "icon-${size}.svg"
  fi
  echo "Generated icon-${size}.png"
done

rm icon-base.svg
echo "Done! All icons generated."

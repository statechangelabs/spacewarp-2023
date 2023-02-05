const { execSync } = require("child_process")

const sourceFile = process.argv[2]

execSync(
    `convert "${sourceFile}" -resize x512 -gravity center -extent 512x512 -background transparent src/logo512.png`,
    {
        stdio: "inherit",
    }
)
execSync(
    `convert src/logo512.png -alpha off -bordercolor white -border 1 \\( +clone -fuzz 30% -fill none -floodfill +0+0 white -alpha extract -geometry 200% -blur 0x0.5  -morphology erode square:1 -geometry 50% \\)  -compose CopyOpacity -composite -shave 1 src/logo512.png    `,
    {
        stdio: "inherit",
    }
)
execSync(
    `convert src/logo512.png -resize x192 -gravity center -extent 192x192 -background transparent src/logo192.png`,
    {
        stdio: "inherit",
    }
)
execSync(
    `convert -background transparent src/logo512.png -define icon:auto-resize=16,24,32,48,64,72,96,128,256 src/favicon.ico`,
    { stdio: "inherit" }
)
execSync(`cp "${sourceFile}" src/logo.png`, { stdio: "inherit" })

export default function handler(req, res) {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Weather React API</title>
    </head>
    <body>
      <h1>Welcome to <a href="https://iamsainikhil.github.io/weather-react" target="_blank" rel="noreferrer noopener">Weather React</a> application's proxy server</h1>
    </body>
    </html>
  `)
}

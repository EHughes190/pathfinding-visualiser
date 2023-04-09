// window.addEventListener('load', () => {
//     const canvas = <HTMLCanvasElement>document.getElementById('canvas')
//     const ctx = canvas.getContext('2d')
//     canvas.height = 500
//     canvas.width = 750

//     const grid = new Grid(canvas.width, canvas.height)

//     //FPS. requestAnimationFrame has a timeStamp data which it passes to animate automatically. We can use this value to calculate deltaTime (in ms) and use this to change FPS for sprite animations. This means FPS of the screen and animations is separate
//     let lastTime = 0

//     //The workhorse of the game. Animate and request animation frame will loop this function, allowing us to re render and move objects in the game. game functions called here for draw and update.
//     const animate = (timeStamp: number) => {
//         const deltaTime = timeStamp - lastTime
//         lastTime = timeStamp
//         ctx?.clearRect(0, 0, canvas.width, canvas.height)

//         if (ctx) {
//             grid.draw(ctx)
//         }
//         grid.update(deltaTime)
//         requestAnimationFrame(animate)
//     }

//     animate(0)

//     if (ctx) {
//         canvas.onmousedown = grid.handleClick(e)
//     }
// })

// class Grid {
//     width: number
//     height: number

//     constructor(width: number, height: number) {
//         this.width = width
//         this.height = height
//     }

//     draw(ctx: CanvasRenderingContext2D) {
//         ctx.lineWidth = 1
//         ctx.strokeStyle = '#999'

//         const lineSpacing = 50

//         let xPos = 0
//         let yPos = 0

//         let numHorizontalLines = this.height / lineSpacing
//         let numVerticalLines = this.width / lineSpacing

//         for (let i = 1; i <= numHorizontalLines; i++) {
//             yPos = i * lineSpacing
//             ctx.beginPath()

//             ctx.moveTo(0, yPos)
//             ctx.lineTo(this.width, yPos)
//             ctx.stroke()
//         }
//         for (let i = 1; i <= numVerticalLines; i++) {
//             xPos = i * lineSpacing

//             ctx.beginPath()
//             ctx.moveTo(xPos, 0)
//             ctx.lineTo(xPos, this.height)
//             ctx.stroke()
//         }
//     }

//     update(deltaTime: number) {}

//     getMousePos() {

//     }

//     handleClick() {

//     }
// }

// function drawGridCoordinates(numHorizontalLines, numVerticalLines) {
//     // Draw node vertices and coordinates
//     for (let y = 0; y <= numHorizontalLines; y++) {
//         for (let x = 0; x <= numVerticalLines; x++) {
//             xPos = x * lineSpacing
//             yPos = y * lineSpacing

//             if (x == 0 && y == 0) {
//                 ctx.fillStyle = '#f00'
//             } else {
//                 ctx.fillStyle = '#000'
//             }

//             ctx.beginPath()
//             ctx.arc(xPos, yPos, 5, 0, Math.PI * 2, true)
//             ctx.closePath()
//             ctx.fill()

//             if (x == numVerticalLines) {
//                 ctx.textAlign = 'right'
//                 xPos -= 5
//             } else {
//                 ctx.textAlign = 'left'
//                 xPos += 5
//             }
//             if (y == numHorizontalLines) {
//                 yPos -= 8
//             } else {
//                 yPos += 12
//             }
//             ctx.fillText(
//                 '(' + x * lineSpacing + ',' + y * lineSpacing + ')',
//                 xPos,
//                 yPos
//             )
//         }
//     }
// }

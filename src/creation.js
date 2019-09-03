import {of, from, Observable, range, timer, interval, fromEvent} from 'rxjs'
import {scan, reduce, map, pairwise, takeUntil, switchMap, withLatestFrom, startWith } from 'rxjs/operators'

const sof = document.getElementById('stream2')
sof.addEventListener('click', () => {
    const stream12$ = of('Hello', 'World')

    stream12$.subscribe(val => {
      console.log('Value: ', val)
    })
});


const sfrom = document.getElementById('stream3')
sfrom.addEventListener('click', () => {
    const arr$ = from([1, 2, 3, 4]).pipe(
        scan((acc, v) => acc.concat(v), [])
    )
    arr$.subscribe(val => console.log(val))
    const arr2$ = from([1, 2, 3, 4]).pipe(
        reduce((acc, v) => acc.concat(v), [])
    )
    arr2$.subscribe(val => console.log(val))
});

const sobs = document.getElementById('stream4')
sobs.addEventListener('click', () => {
    const stream22$ = new Observable(observer => {

        observer.next('First value')

        setTimeout(() => observer.next('After 1000 ms'), 1000)
        //
        setTimeout(() => observer.complete(), 1500)

        // setTimeout(() => observer.error('Something went wrong'), 2000)

        setTimeout(() => observer.next('After 3000 ms'), 3000)

    })

    //3 functions
    stream22$.subscribe(
        (val) => console.log('Value: ', val),
        (err) => console.log(err),
        () => console.log('Complete')
    )

    //object
    stream22$.subscribe({
        next(val) {
            console.log(val)
        },
        error(err) {
            console.log(err)
        },
        complete() {
            console.log('Complete')
        }
    })
});


const canvas = document.querySelector('canvas')
const color = document.getElementById('color')
const line = document.getElementById('range')
const ctx = canvas.getContext('2d')
// const rect = canvas.getBoundingClientRect()
// const scale = window.devicePixelRatio
// canvas.width = rect.width * scale
// canvas.height = rect.height * scale
// ctx.scale(scale,scale)


const creatInputStream = node => {
    return fromEvent(node, 'input')
        .pipe(
            map(e =>  e.target.value),
            startWith(node.value)
        )
}

const lineWidth$ = creatInputStream(line)
const brushColor$ = creatInputStream(color)

const mouseUp$ = fromEvent(canvas, 'mouseup')
const mouseDown$ = fromEvent(canvas, 'mousedown')
const mouseMove$ = fromEvent(canvas,'mousemove')
const mouseOut$ = fromEvent(canvas,'mouseout')

const stream$ = mouseDown$
    .pipe(
        withLatestFrom(lineWidth$, brushColor$, (_, lineWidth, brushColor) => {
            return {lineWidth, brushColor}
        }),
        switchMap( (options) => {
                return mouseMove$
                    .pipe(
                        map(e => ({
                            x: e.offsetX,
                            y: e.offsetY,
                            options
                        })),
                        pairwise(),
                        takeUntil(mouseUp$),
                        takeUntil(mouseOut$)
                    )
            }
        )
    )

stream$.subscribe(([from, to]) => {
    // pos.ctx.fillRect(pos.x, pos.y, 2, 2)
      const {lineWidth, brushColor} = from.options
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = brushColor
      ctx.beginPath()
      ctx.moveTo(from.x,from.y)
      ctx.lineTo(to.x,to.y)
      ctx.stroke()
  })
// fromEvent(canvas, 'mousemove')
//   .pipe(
//     map(e => ({
//       x: e.offsetX,
//       y: e.offsetY,
//       // ctx: e.target.getContext('2d')
//     })),
//     pairwise()
//   )
//   .subscribe(([from, to]) => {
//     // pos.ctx.fillRect(pos.x, pos.y, 2, 2)
//       ctx.beginPath()
//       ctx.moveTo(from.x,from.y)
//       ctx.lineTo(to.x,to.y)
//       ctx.stroke()
//   })

const clear$ = fromEvent(document.getElementById('clear'), 'click')

clear$.subscribe(() => {
  const canvas = document.querySelector('canvas')
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

    const sub = interval(500).subscribe(v => console.log(v))

    setTimeout(() => {
      sub.unsubscribe()
    }, 4000)

    timer(2500).subscribe(v => console.log(v))

    range(42, 10).subscribe(v => console.log(v))
})





import test from 'ava'

import { FillType, Path2D, PathOp, StrokeCap, StrokeJoin } from '../index'

test('should be able to call toSVGString', (t) => {
  const path = new Path2D()
  path.rect(0, 0, 100, 100)
  t.is(path.toSVGString(), 'M0 0L100 0L100 100L0 100L0 0Z')
})

test('should be able to create mountain via op', (t) => {
  const pathOne = new Path2D()
  const pathTwo = new Path2D()
  pathOne.moveTo(0, 20)
  pathOne.lineTo(10, 10)
  pathOne.lineTo(20, 20)
  pathOne.closePath()
  pathTwo.moveTo(10, 20)
  pathTwo.lineTo(20, 10)
  pathTwo.lineTo(30, 20)
  pathTwo.closePath()
  t.is(pathOne.op(pathTwo, PathOp.Union).toSVGString(), 'M10 10L0 20L30 20L20 10L15 15L10 10Z')
})

test('Union boolean operation', (t) => {
  const pathOne = new Path2D(
    'M8 50H92C96.4183 50 100 53.5817 100 58V142C100 146.418 96.4183 150 92 150H8C3.58172 150 0 146.418 0 142V58C0 53.5817 3.58172 50 8 50Z',
  )
  const pathTwo = new Path2D(
    'M58 0H142C146.418 0 150 3.58172 150 8V92C150 96.4183 146.418 100 142 100H58C53.5817 100 50 96.4183 50 92V8C50 3.58172 53.5817 0 58 0Z',
  )

  t.is(
    pathOne.op(pathTwo, PathOp.Union).toSVGString(),
    'M142 0L58 0C53.5817 0 50 3.58172 50 8L50 50L8 50C3.58172 50 0 53.5817 0 58L0 142C0 146.418 3.58172 150 8 150L92 150C96.4183 150 100 146.418 100 142L100 100L142 100C146.418 100 150 96.4183 150 92L150 8C150 3.58172 146.418 0 142 0Z',
  )
})

test('Difference boolean operation', (t) => {
  const pathOne = new Path2D(
    'M8 50H92C96.4183 50 100 53.5817 100 58V142C100 146.418 96.4183 150 92 150H8C3.58172 150 0 146.418 0 142V58C0 53.5817 3.58172 50 8 50Z',
  )
  const pathTwo = new Path2D(
    'M58 0H142C146.418 0 150 3.58172 150 8V92C150 96.4183 146.418 100 142 100H58C53.5817 100 50 96.4183 50 92V8C50 3.58172 53.5817 0 58 0Z',
  )

  t.is(
    pathOne.op(pathTwo, PathOp.Difference).toSVGString(),
    'M50 50L8 50C3.58172 50 0 53.5817 0 58L0 142C0 146.418 3.58172 150 8 150L92 150C96.4183 150 100 146.418 100 142L100 100L58 100C53.5817 100 50 96.4183 50 92L50 50Z',
  )
})

test('ReverseDifference boolean operation', (t) => {
  const pathOne = new Path2D(
    'M8 50H92C96.4183 50 100 53.5817 100 58V142C100 146.418 96.4183 150 92 150H8C3.58172 150 0 146.418 0 142V58C0 53.5817 3.58172 50 8 50Z',
  )
  const pathTwo = new Path2D(
    'M58 0H142C146.418 0 150 3.58172 150 8V92C150 96.4183 146.418 100 142 100H58C53.5817 100 50 96.4183 50 92V8C50 3.58172 53.5817 0 58 0Z',
  )

  t.is(
    pathOne.op(pathTwo, PathOp.ReverseDifference).toSVGString(),
    'M142 0L58 0C53.5817 0 50 3.58172 50 8L50 50L92 50C96.4183 50 100 53.5817 100 58L100 100L142 100C146.418 100 150 96.4183 150 92L150 8C150 3.58172 146.418 0 142 0Z',
  )
})

test('Intersect boolean operation', (t) => {
  const pathOne = new Path2D(
    'M8 50H92C96.4183 50 100 53.5817 100 58V142C100 146.418 96.4183 150 92 150H8C3.58172 150 0 146.418 0 142V58C0 53.5817 3.58172 50 8 50Z',
  )
  const pathTwo = new Path2D(
    'M58 0H142C146.418 0 150 3.58172 150 8V92C150 96.4183 146.418 100 142 100H58C53.5817 100 50 96.4183 50 92V8C50 3.58172 53.5817 0 58 0Z',
  )

  t.is(
    pathOne.op(pathTwo, PathOp.Intersect).toSVGString(),
    'M100 100L58 100C53.5817 100 50 96.4183 50 92L50 50L92 50C96.4183 50 100 53.5817 100 58L100 100Z',
  )
})

test('XOR boolean operation', (t) => {
  const pathOne = new Path2D(
    'M8 50H92C96.4183 50 100 53.5817 100 58V142C100 146.418 96.4183 150 92 150H8C3.58172 150 0 146.418 0 142V58C0 53.5817 3.58172 50 8 50Z',
  )
  const pathTwo = new Path2D(
    'M58 0H142C146.418 0 150 3.58172 150 8V92C150 96.4183 146.418 100 142 100H58C53.5817 100 50 96.4183 50 92V8C50 3.58172 53.5817 0 58 0Z',
  )

  t.is(
    pathOne.op(pathTwo, PathOp.XOR).toSVGString(),
    'M142 0L58 0C53.5817 0 50 3.58172 50 8L50 50L8 50C3.58172 50 0 53.5817 0 58L0 142C0 146.418 3.58172 150 8 150L92 150C96.4183 150 100 146.418 100 142L100 100L142 100C146.418 100 150 96.4183 150 92L150 8C150 3.58172 146.418 0 142 0ZM100 100L100 58C100 53.5817 96.4183 50 92 50L50 50L50 92C50 96.4183 53.5817 100 58 100L100 100Z',
  )
})

test('FillType must be Winding after conversion by AsWinding()', (t) => {
  const path = new Path2D()
  path.rect(1, 2, 3, 4)
  path.setFillType(FillType.EvenOdd)
  t.is(path.asWinding().getFillType(), FillType.Winding)
})

test('getFillTypeString()', (t) => {
  const path = new Path2D()
  path.rect(1, 2, 3, 4)
  t.is(path.getFillTypeString(), 'nonzero')
})

test('getFillTypeString() and setFillType()', (t) => {
  const path = new Path2D()
  path.rect(1, 2, 3, 4)
  path.setFillType(FillType.EvenOdd)
  t.is(path.getFillTypeString(), 'evenodd')
})

test('Path FillType must be converted from nonzero to evenodd', (t) => {
  const pathCircle = new Path2D(
    'M50 87.5776C70.7536 87.5776 87.5776 70.7536 87.5776 50C87.5776 29.2464 70.7536 12.4224 50 12.4224C29.2464 12.4224 12.4224 29.2464 12.4224 50C12.4224 70.7536 29.2464 87.5776 50 87.5776ZM50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z',
  )
  const nonzeroPathCircle =
    'M50 87.5776C29.2464 87.5776 12.4224 70.7536 12.4224 50C12.4224 29.2464 29.2464 12.4224 50 12.4224C70.7536 12.4224 87.5776 29.2464 87.5776 50C87.5776 70.7536 70.7536 87.5776 50 87.5776ZM50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z'

  pathCircle.setFillType(FillType.EvenOdd) // The FillType of the original path is evenodd

  t.is(pathCircle.asWinding().toSVGString(), nonzeroPathCircle)
})

test('Use .asWinding() and .simplify() to convert cubic Bezier curve to quadratic', (t) => {
  const path = new Path2D(
    'M0 10C0 4.47715 4.47715 0 10 0H90C95.5229 0 100 4.47715 100 10C100 15.5228 95.5229 20 90 20H10C4.47715 20 0 15.5228 0 10Z',
  )
  // Quadratic bezier curve
  const quadraticPath =
    'M0 10C0 4.47715 4.47715 0 10 0L90 0C95.5229 0 100 4.47715 100 10C100 15.5228 95.5229 20 90 20L10 20C4.47715 20 0 15.5228 0 10Z'

  t.is(path.asWinding().simplify().toSVGString(), quadraticPath)
})

test('Use .simplify() to remove overlapping paths', (t) => {
  const path = new Path2D(
    'M2.933,89.89 L89.005,3.818 Q90.412,2.411 92.249,1.65 Q94.087,0.889 96.076,0.889 Q98.065,0.889 99.903,1.65 Q101.741,2.411 103.147,3.818 L189.22,89.89 Q190.626,91.296 191.387,93.134 Q192.148,94.972 192.148,96.961 Q192.148,98.95 191.387,100.788 Q190.626,102.625 189.219,104.032 Q187.813,105.439 185.975,106.2 Q184.138,106.961 182.148,106.961 Q180.159,106.961 178.322,106.2 Q176.484,105.439 175.077,104.032 L89.005,17.96 L96.076,10.889 L103.147,17.96 L17.075,104.032 Q15.668,105.439 13.831,106.2 Q11.993,106.961 10.004,106.961 Q8.015,106.961 6.177,106.2 Q4.339,105.439 2.933,104.032 Q1.526,102.625 0.765,100.788 Q0.004,98.95 0.004,96.961 Q0.004,94.972 0.765,93.134 Q1.526,91.296 2.933,89.89 Z',
  )

  t.is(
    path.simplify().toSVGString(),
    'M89.005 3.818L2.933 89.89Q1.526 91.296 0.765 93.134Q0.004 94.972 0.004 96.961Q0.004 98.95 0.765 100.788Q1.526 102.625 2.933 104.032Q4.339 105.439 6.177 106.2Q8.015 106.961 10.004 106.961Q11.993 106.961 13.831 106.2Q15.668 105.439 17.075 104.032L96.076 25.031L175.077 104.032Q176.484 105.439 178.322 106.2Q180.159 106.961 182.148 106.961Q184.138 106.961 185.975 106.2Q187.813 105.439 189.219 104.032Q190.626 102.625 191.387 100.788Q192.148 98.95 192.148 96.961Q192.148 94.972 191.387 93.134Q190.626 91.296 189.22 89.89L103.147 3.818Q101.741 2.411 99.903 1.65Q98.065 0.889 96.076 0.889Q94.087 0.889 92.249 1.65Q90.412 2.411 89.005 3.818Z',
  )
})

test('Convert fill-type to nonzero and cubic Bezier curve to quadratic', (t) => {
  const pathTriangle = new Path2D('M70 0L0.717957 120H139.282L70 0ZM70 30L26.6987 105H113.301L70 30Z')
  // Quadratic bezier curve
  const quadraticPath = 'M0.717957 120L70 0L139.282 120L0.717957 120ZM113.301 105L70 30L26.6987 105L113.301 105Z'
  pathTriangle.setFillType(FillType.EvenOdd)

  t.is(pathTriangle.asWinding().simplify().toSVGString(), quadraticPath)
})

test('Stroke', (t) => {
  const box = new Path2D()
  box.rect(0, 0, 100, 100)
  // Shrink effect, in which we subtract away from the original
  const simplified = new Path2D(box).simplify() // sometimes required for complicated paths
  const shrink = new Path2D(box).stroke({ width: 15, cap: StrokeCap.Butt }).op(simplified, PathOp.ReverseDifference)
  t.is(shrink.toSVGString(), 'M7.5 92.5L7.5 7.5L92.5 7.5L92.5 92.5L7.5 92.5Z')
})

test('Convert stroke to path', (t) => {
  const path = new Path2D(
    'M32.9641 7L53.3157 42.25C54.8553 44.9167 52.9308 48.25 49.8516 48.25H9.14841C6.0692 48.25 4.1447 44.9167 5.6843 42.25L26.0359 7C27.5755 4.33333 31.4245 4.33333 32.9641 7Z',
  )
  path.stroke({ width: 10, miterLimit: 1 }).simplify().asWinding()

  t.is(
    path.toSVGString(),
    'M57.6458 39.75L37.2942 4.5Q34.6962 -2.38419e-06 29.5 -2.38419e-06Q24.3038 -2.90573e-06 21.7058 4.5L1.35417 39.75Q-1.2439 44.25 1.35418 48.75Q3.95226 53.25 9.14841 53.25L49.8516 53.25Q55.0478 53.25 57.6458 48.75Q60.2439 44.25 57.6458 39.75ZM29.5 11L48.1195 43.25L10.8805 43.25L29.5 11Z',
  )
})

test('Convert stroke to path 2', (t) => {
  const path = new Path2D('M4 23.5L22.5 5L41 23.5')
  path.stroke({ width: 10, join: StrokeJoin.Round, miterLimit: 1 }).simplify()

  const svg = `<svg width="45" height="28" viewBox="0 0 45 28"><path fill="pink" d="${path.toSVGString()}"></path></svg>`

  t.snapshot(svg)
})

// 直角
test('StrokeJoin.Miter', (t) => {
  const box = new Path2D()
  box.rect(0, 0, 100, 100)
  box.stroke({ width: 20, join: StrokeJoin.Miter })

  t.is(box.toSVGString(), 'M-10 -10L110 -10L110 110L-10 110L-10 -10ZM10 10L10 90L90 90L90 10L10 10Z')
})

// 45度斜角
test('StrokeJoin.Bevel', (t) => {
  const box = new Path2D()
  box.rect(0, 0, 100, 100)
  box.stroke({ width: 20, join: StrokeJoin.Bevel })

  t.is(
    box.toSVGString(),
    'M0 -10L100 -10L110 0L110 100L100 110L0 110L-10 100L-10 0L0 -10ZM10 10L10 90L90 90L90 10L10 10Z',
  )
})

// 圆角
test('StrokeJoin.Round', (t) => {
  const box = new Path2D()
  box.rect(0, 0, 100, 100)
  box.stroke({ width: 20, join: StrokeJoin.Round })

  t.is(
    box.toSVGString(),
    'M-10 100L-10 0Q-10 -0.245486 -9.98795 -0.490677Q-9.97591 -0.735867 -9.95185 -0.980171Q-9.92778 -1.22448 -9.89176 -1.4673Q-9.85574 -1.71013 -9.80785 -1.9509Q-9.75996 -2.19167 -9.70031 -2.4298Q-9.64066 -2.66793 -9.5694 -2.90285Q-9.49814 -3.13776 -9.41544 -3.3689Q-9.33274 -3.60003 -9.23879 -3.82683Q-9.14485 -4.05363 -9.03989 -4.27555Q-8.93493 -4.49747 -8.81921 -4.71397Q-8.70349 -4.93047 -8.57729 -5.14103Q-8.45108 -5.35159 -8.31469 -5.5557Q-8.17831 -5.75982 -8.03207 -5.95699Q-7.88584 -6.15417 -7.7301 -6.34393Q-7.57437 -6.5337 -7.40951 -6.71559Q-7.24465 -6.89748 -7.07107 -7.07107Q-6.89748 -7.24465 -6.71559 -7.40951Q-6.5337 -7.57437 -6.34393 -7.7301Q-6.15417 -7.88584 -5.95699 -8.03207Q-5.75982 -8.17831 -5.5557 -8.3147Q-5.35159 -8.45108 -5.14103 -8.57729Q-4.93047 -8.70349 -4.71397 -8.81921Q-4.49747 -8.93493 -4.27555 -9.03989Q-4.05363 -9.14485 -3.82683 -9.23879Q-3.60003 -9.33274 -3.3689 -9.41544Q-3.13776 -9.49814 -2.90285 -9.5694Q-2.66793 -9.64066 -2.4298 -9.70031Q-2.19167 -9.75996 -1.9509 -9.80785Q-1.71013 -9.85574 -1.4673 -9.89176Q-1.22448 -9.92778 -0.980171 -9.95185Q-0.735867 -9.97591 -0.490677 -9.98795Q-0.245486 -10 0 -10L100 -10Q100.245 -10 100.491 -9.98795Q100.736 -9.97591 100.98 -9.95185Q101.224 -9.92778 101.467 -9.89176Q101.71 -9.85574 101.951 -9.80785Q102.192 -9.75996 102.43 -9.70031Q102.668 -9.64066 102.903 -9.5694Q103.138 -9.49814 103.369 -9.41544Q103.6 -9.33274 103.827 -9.23879Q104.054 -9.14485 104.276 -9.03989Q104.497 -8.93493 104.714 -8.81921Q104.93 -8.70349 105.141 -8.57729Q105.352 -8.45108 105.556 -8.31469Q105.76 -8.17831 105.957 -8.03207Q106.154 -7.88584 106.344 -7.7301Q106.534 -7.57437 106.716 -7.40951Q106.897 -7.24465 107.071 -7.07107Q107.245 -6.89748 107.41 -6.71559Q107.574 -6.5337 107.73 -6.34393Q107.886 -6.15417 108.032 -5.95699Q108.178 -5.75982 108.315 -5.5557Q108.451 -5.35159 108.577 -5.14103Q108.703 -4.93047 108.819 -4.71397Q108.935 -4.49747 109.04 -4.27555Q109.145 -4.05363 109.239 -3.82683Q109.333 -3.60003 109.415 -3.3689Q109.498 -3.13776 109.569 -2.90285Q109.641 -2.66793 109.7 -2.4298Q109.76 -2.19167 109.808 -1.9509Q109.856 -1.71013 109.892 -1.4673Q109.928 -1.22448 109.952 -0.980171Q109.976 -0.735867 109.988 -0.490677Q110 -0.245486 110 0L110 100Q110 100.245 109.988 100.491Q109.976 100.736 109.952 100.98Q109.928 101.224 109.892 101.467Q109.856 101.71 109.808 101.951Q109.76 102.192 109.7 102.43Q109.641 102.668 109.569 102.903Q109.498 103.138 109.415 103.369Q109.333 103.6 109.239 103.827Q109.145 104.054 109.04 104.276Q108.935 104.497 108.819 104.714Q108.703 104.93 108.577 105.141Q108.451 105.352 108.315 105.556Q108.178 105.76 108.032 105.957Q107.886 106.154 107.73 106.344Q107.574 106.534 107.41 106.716Q107.245 106.897 107.071 107.071Q106.897 107.245 106.716 107.41Q106.534 107.574 106.344 107.73Q106.154 107.886 105.957 108.032Q105.76 108.178 105.556 108.315Q105.352 108.451 105.141 108.577Q104.93 108.703 104.714 108.819Q104.497 108.935 104.276 109.04Q104.054 109.145 103.827 109.239Q103.6 109.333 103.369 109.415Q103.138 109.498 102.903 109.569Q102.668 109.641 102.43 109.7Q102.192 109.76 101.951 109.808Q101.71 109.856 101.467 109.892Q101.224 109.928 100.98 109.952Q100.736 109.976 100.491 109.988Q100.245 110 100 110L0 110Q-0.245486 110 -0.490677 109.988Q-0.735867 109.976 -0.980171 109.952Q-1.22448 109.928 -1.4673 109.892Q-1.71013 109.856 -1.9509 109.808Q-2.19167 109.76 -2.4298 109.7Q-2.66793 109.641 -2.90285 109.569Q-3.13776 109.498 -3.3689 109.415Q-3.60003 109.333 -3.82683 109.239Q-4.05363 109.145 -4.27555 109.04Q-4.49747 108.935 -4.71397 108.819Q-4.93047 108.703 -5.14103 108.577Q-5.35159 108.451 -5.5557 108.315Q-5.75982 108.178 -5.95699 108.032Q-6.15417 107.886 -6.34393 107.73Q-6.5337 107.574 -6.71559 107.41Q-6.89748 107.245 -7.07107 107.071Q-7.24465 106.897 -7.40951 106.716Q-7.57437 106.534 -7.7301 106.344Q-7.88584 106.154 -8.03207 105.957Q-8.17831 105.76 -8.3147 105.556Q-8.45108 105.352 -8.57729 105.141Q-8.70349 104.93 -8.81921 104.714Q-8.93493 104.497 -9.03989 104.276Q-9.14485 104.054 -9.23879 103.827Q-9.33274 103.6 -9.41544 103.369Q-9.49814 103.138 -9.5694 102.903Q-9.64066 102.668 -9.70031 102.43Q-9.75996 102.192 -9.80785 101.951Q-9.85574 101.71 -9.89176 101.467Q-9.92778 101.224 -9.95185 100.98Q-9.97591 100.736 -9.98795 100.491Q-10 100.245 -10 100ZM10 10L10 90L90 90L90 10L10 10Z',
  )
})

test('computeTightBounds', (t) => {
  const p = new Path2D()
  t.deepEqual(p.computeTightBounds(), [0, 0, 0, 0])
  p.arc(50, 45, 25, 0, 2 * Math.PI)
  t.deepEqual(p.computeTightBounds(), [25, 20, 75, 70])
})

test('Transform', (t) => {
  const p = new Path2D()
  p.transform({ a: 1, b: 0.2, c: 0.8, d: 1, e: 0, f: 0 })
  p.rect(0, 0, 100, 100)
  p.transform({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 })
  p.rect(220, 0, 100, 100)
  t.is(p.toSVGString(), 'M0 0L100 0L100 100L0 100L0 0ZM220 0L320 0L320 100L220 100L220 0Z')
})

test('trim', (t) => {
  const box = new Path2D()
  box.rect(0, 0, 100, 100)
  // box is now the 3 segments that look like a U.
  // (the top segment has been removed).
  box.trim(0.25, 1).stroke({ width: 10 }).simplify()

  const svg = `<svg width="100" height="100" viewBox="0 0 100 100"><path fill="blue" d="${box.toSVGString()}"></path></svg>`

  t.snapshot(svg)
})

test('dash', (t) => {
  const box = new Path2D()
  box.rect(0, 0, 100, 100)
  box.dash(20, 10, 3)
  t.is(
    box.toSVGString(),
    'M20 0L40 0M50 0L70 0M80 0L100 0M100 10L100 30M100 40L100 60M100 70L100 90M100 100L100 100L80 100M70 100L50 100M40 100L20 100M10 100L0 100L0 90M0 80L0 60M0 50L0 30M0 20L0 0L10 0',
  )
})

function drawSimplePath() {
  const path = new Path2D()
  path.moveTo(0, 0)
  path.lineTo(10, 0)
  path.lineTo(10, 10)
  path.closePath()
  return path
}

test('Equals', (t) => {
  const p1 = drawSimplePath()
  const p2 = drawSimplePath()
  t.not(p1, p2)
  t.true(p1.equals(p2))
  t.true(p2.equals(p1))
  const blank = new Path2D()
  t.false(p1.equals(blank))
  t.false(p2.equals(blank))
  t.false(blank.equals(p1))
  t.false(blank.equals(p2))
})

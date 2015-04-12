# lagrange-points
[![npm](http://img.shields.io/npm/v/lagrange-points.svg?style=flat-square)](https://npmjs.com/lagrange-points)
[![npm downloads](http://img.shields.io/npm/dm/lagrange-points.svg?style=flat-square)](https://npmjs.com/lagrange-points)
[![build status](http://img.shields.io/travis/jhermsmeier/node-lagrange-points.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-lagrange-points)

## Install via [npm](https://npmjs.com)

```sh
$ npm install lagrange-points
```

## Usage

```js
var Lagrange = require( 'lagrange-points' )
```

```js
// Masses is kg
var moon = 7.3477 * 1e22
var earth = 5.97219 * 1e24
// Distance in km
var distance = 384399
```

```js
var params = Lagrange.getParameters( earth, moon, distance )
```

Result:
```js
{
  distance: 384399,
  massRatio: 81.27972018454756,
  barycenter: 4671.85594625043,
  x1: 58023.627116674485,
  x2: 64520.474068579846,
  x3: 174776.59760000271,
  h: 38380.30836459083,
  z: 382084.4941699412,
  r: 4.144102486825536
}
```

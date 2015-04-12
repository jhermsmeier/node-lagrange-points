var Lagrange = module.exports

// (Sign), Mantissa, Exponent (base 10)
function exponent( x ) {
  
  var mantissa = Math.abs( x )
  var exponent = 0
  
  if( mantissa === 0 || !isFinite( mantissa ) )
    return exponent
  
  while( mantissa >= 10 ) {
    exponent ++
    mantissa = mantissa / 10
  }
  
  while( mantissa < 1 ) {
    exponent --
    mantissa = mantissa * 10
  }
  
  return exponent
  
}

// SigFigNum / NumDecSigFig
function sfn( x, n ) {
  
  if( !x ) return 0
  
  var e = exponent( x )
  var p = Math.pow( 10, n - e - 1 )
  
  return Math.round( x * p ) / p
  
}

function rsq( x ) {
  return 1 / ( x * x )
}

/**
 * Calculate the parameters for the
 * positions of the 5 Lagrangian points
 * @param  {Number} m1 Primary mass (heavy)
 * @param  {Number} m2 Secondary mass (light)
 * @param  {Number} d  Separation distance
 * @return {Object}    Parameters
 */
Lagrange.getParameters = function( m1, m2, d ) {
  
  var m = m1 / m2
  var c = d / ( m + 1 )
  var q = 1 / ( d * d * c ) // w^(2/G)
  
  // ???
  var h = d * ( 
    Math.abs( m - 1 ) >= 1e-8 ?
      ( Math.sqrt( m ) - 1 ) / ( m - 1 ) :
      0.5
  )
  
  function lfc1( l, m ) {
    return -q * ( d - c - l ) + m * rsq( d - l ) - rsq( l )
  }
  
  function lfc2( l, m ) {
    return -q * ( d - c + l ) + m * rsq( d + l ) + rsq( l )
  }
  
  function lfc3( l, m ) {
    return -q * ( c + l ) + m * rsq( d + l )
  }
  
  function iterate( hi, lo, lfc ) {
    
    hi = hi * d
    lo = lo * d
    
    var mid = 0
    var x = 0
    var y = 0
    var z = 0
    
    for( var i = 0; i < 80; i++ ) {
      
      mid = ( hi + lo ) * 0.5
      
      x = lfc( hi, m )
      y = lfc( mid, m )
      z = lfc( lo, m )
      
      if( ( Math.abs( x - z ) / m ) < 1e-20 )
        break
      
      if( y === 0 )
        break
      
      if( x * z > 0 )
        throw new Error( 'Bad boundaries' )
      
      if( x * y > 0 ) hi = mid
      else lo = mid
      
    }
    
    return mid
    
  }
  
  var x1 = iterate( 0.5, 1e-9, lfc1 )
  var x2 = iterate( 1.5, 1e-9, lfc2 )
  var x3 = iterate( 2.5, 1e-9, lfc3 )
  // for center of gravity / mass to L4/L5
  var z = Math.sqrt( d * d + c * c - d * c )
  
  var r = x2 / d
  r = ( r + 1 ) / r
  r = r * r * r / m
  
  return {
    distance: d,
    massRatio: m,
    barycenter: c,
    x1: x1,
    x2: x2,
    x3: x3,
    h: h,
    z: z,
    r: r,
  }
  
}

export const mixin = {
  gradient: (startColor, endColor) => `
    background-color: ${startColor};
    background-image: -webkit-gradient(linear, left top, left bottom, from(${startColor}), to(${endColor}));
    background-image: -webkit-linear-gradient(top, ${startColor}, ${endColor});
    background-image: -moz-linear-gradient(top, ${startColor}, ${endColor});
    background-image: -ms-linear-gradient(top, ${startColor}, ${endColor});
    background-image: -o-linear-gradient(top, ${startColor}, ${endColor});
  `,

  horizontalGradient: (startColor, endColor) => `
    background-color: ${startColor};
    background-image: -webkit-gradient(linear, left top, right top, from(${startColor}), to(${endColor}));
    background-image: -webkit-linear-gradient(left, ${startColor}, ${endColor});
    background-image: -moz-linear-gradient(left, ${startColor}, ${endColor});
    background-image: -ms-linear-gradient(left, ${startColor}, ${endColor});
    background-image: -o-linear-gradient(left, ${startColor}, ${endColor});
  `,

  borderRadius: (radius = '5px') => `
    -webkit-border-radius: ${radius};
       -moz-border-radius: ${radius};
        -ms-border-radius: ${radius};
            border-radius: ${radius};
  `,

  flex: () => `
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
  `,

  // row | row-reverse | column | column-reverse
  flexDirection: (argument) => `
    -webkit-flex-direction: ${argument};
       -moz-flex-direction: ${argument};
        -ms-flex-direction: ${argument};
            flex-direction: ${argument};
  `,

  // nowrap | wrap | wrap-reverse
  flexWrap: (argument = 'wrap') => `
    -webkit-flex-wrap: ${argument};
       -moz-flex-wrap: ${argument};
        -ms-flex-wrap: ${argument};
            flex-wrap: ${argument};
  `,

  // <flex-direction> || <flex-wrap>
  flexFlow: (argument) => `
    -webkit-flex-flow: ${argument};
       -moz-flex-flow: ${argument};
        -ms-flex-flow: ${argument};
            flex-flow: ${argument};
  `,

  // <number>
  flexGrow: (argument = '1') => `
    -webkit-flex-grow: ${argument};
       -moz-flex-grow: ${argument};
        -ms-flex-grow: ${argument};
            flex-grow: ${argument};
  `,

  // <number>
  flexShrink: (argument) => `
    -webkit-flex-shrink: ${argument};
       -moz-flex-shrink: ${argument};
        -ms-flex-shrink: ${argument};
            flex-shrink: ${argument};
  `,

  // <number>
  flexBasis: (argument) => `
    -webkit-flex-basis: ${argument};
       -moz-flex-basis: ${argument};
        -ms-flex-basis: ${argument};
            flex-basis: ${argument};
  `,

  // flex-start | flex-end | center | baseline | stretch
  alignItems: (argument = 'center') => `
    -webkit-align-items: ${argument};
       -moz-align-items: ${argument};
        -ms-align-items: ${argument};
         -ms-flex-align: ${argument};
            align-items: ${argument};
  `,

  // flex-start | flex-end | center | space-between | space-around | stretch
  alignContent: (argument = 'center') => `
    -webkit-align-content: ${argument};
       -moz-align-content: ${argument};
        -ms-align-content: ${argument};
            align-content: ${argument};
  `,

  // flex-start | flex-end | center | space-between | space-around
  justifyContent: (argument = 'center') => `
    -webkit-justify-content: ${argument};
       -moz-justify-content: ${argument};
        -ms-justify-content: ${argument};
            justify-content: ${argument};
              -ms-flex-pack: ${argument};
  `,

  transition: (argument = 'all 1s') => `
    -webkit-transition: ${argument};
       -moz-transition: ${argument};
        -ms-transition: ${argument};
         -o-transition: ${argument};
            transition: ${argument};
  `,

  boxSizing: (type = 'border-box') => `
    -webkit-box-sizing: ${type};
       -moz-box-sizing: ${type};
        -ms-box-sizing: ${type};
            box-sizing: ${type};
  `,

  boxShadow: (argument) => `
    -webkit-box-shadow: ${argument};
       -moz-box-shadow: ${argument};
            box-shadow: ${argument};
  `,

  transform: (argument) => `
    -webkit-transform: ${argument};
       -moz-transform: ${argument};
        -ms-transform: ${argument};
         -o-transform: ${argument};
            transform: ${argument};
  `,

  rotate: (factor) => `
    -webkit-transform: rotate(${factor}deg);
       -moz-transform: rotate(${factor}deg);
        -ms-transform: rotate(${factor}deg);
         -o-transform: rotate(${factor}deg);
            transform: rotate(${factor}deg);
  `,

  scale: (factor) => `
    -webkit-transform: scale(${factor});
       -moz-transform: scale(${factor});
        -ms-transform: scale(${factor});
         -o-transform: scale(${factor});
            transform: scale(${factor});
  `,

  translate: (x, y) => `
    -webkit-transform: translate(${x}, ${y});
       -moz-transform: translate(${x}, ${y});
        -ms-transform: translate(${x}, ${y});
         -o-transform: translate(${x}, ${y});
            transform: translate(${x}, ${y});
  `,

  translateX: (x) => `
    -webkit-transform: translateX(${x});
       -moz-transform: translateX(${x});
        -ms-transform: translateX(${x});
         -o-transform: translateX(${x});
            transform: translateX(${x});
  `,

  translateY: (y) => `
    -webkit-transform: translateY(${y});
       -moz-transform: translateY(${y});
        -ms-transform: translateY(${y});
         -o-transform: translateY(${y});
            transform: translateY(${y});
  `,

  skew: (x, y) => `
    -webkit-transform: skew(${x}, ${y});
       -moz-transform: skew(${x}, ${y});
        -ms-transform: skew(${x}, ${y});
         -o-transform: skew(${x}, ${y});
            transform: skew(${x}, ${y});
  `,

  transformOrigin: (argument) => `
    -webkit-transform-origin: ${argument};
    	 -moz-transform-origin: ${argument};
	      -ms-transform-origin: ${argument};
	          transform-origin: ${argument};
  `,

  // <integer>
  order: (val) => `
    -webkit-box-ordinal-group: ${val};
       -moz-box-ordinal-group: ${val};
  	           -ms-flex-order: ${val};
  	            -webkit-order: ${val};
  		                  order: ${val};
  `,

  opacity: (opacity = 0.5) => `
    opacity: ${opacity};
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=${opacity * 100})";
    filter: alpha(opacity=${opacity * 100});
  `,

  calc: (property, expression) => `
    ${property}: -moz-calc(${expression});
    ${property}: -webkit-calc(${expression});
    ${property}: calc(${expression});
  `,

  userSelect: (argument = 'none') => `
    -webkit-user-select: ${argument};
       -moz-user-select: ${argument};
        -ms-user-select: ${argument};
            user-select: ${argument};
  `,

  cutString: (argument = 0.875, line = 2, padding = 0) => `
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: ${argument}rem;
    -webkit-line-clamp: ${line};
    max-height: ${argument * line + padding * 2}rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    visibility: visible;
    ${line === 1 ? `word-break: break-all;` : ``}
    ${padding ? `padding: ${padding}rem;` : ``}
  `,
  rowCols: (count) => `
    > * {
      flex: 0 0 ${100 / count}%;
      max-width: ${100 / count}%;
    }
  `,
};

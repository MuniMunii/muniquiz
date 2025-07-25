import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';
console.log('wdyr active')
// Debugging tool
if(process.env.NODE_ENV==='development'){
whyDidYouRender(React, {
  trackAllPureComponents: true,
  collapseGroups: true,
  logOnDifferentValues: true,
});
}
/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import {CSSGrid, measureItems, makeResponsive, layout} from 'react-stonecutter';
import {vendorImages} from './vender-images';

const Grid = makeResponsive(measureItems(CSSGrid, {measureImages: true}), {
  maxWidth: 1920,
  minPadding: 100
});

export class StoneCutter extends React.Component<any, any> {
  render() {
    const gridstyle = {
      "font-size": "0.75rem",
      "padding": "10px",
    };
    const imageStyles = {
      "max-height": "230px",
      "width": "230px"
    }

    let imageArray = vendorImages.map((image, i) =>
      <li className="grid-item" key={i} style={gridstyle}>
        <a href={image.href}>
          <img src={image.src} alt={image.alt} style={imageStyles}/>
        </a>
      </li>
    );

    const x = (
      <Grid
        className="grid"
        component="ul"
        columnWidth={250}
        gutterWidth={5}
        gutterHeight={5}
        layout={layout.pinterest}
        duration={500}
        easing="ease-out">
        {imageArray}
      </Grid>
    );
    console.log(x);
    return x;
  }
}

/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import {CSSGrid, measureItems, makeResponsive, layout} from 'react-stonecutter';
import {vendorImages} from './vender-images';

interface StoneCutterProperty {
  width: number;
}

const Grid = makeResponsive(measureItems(CSSGrid, {measureImages: true}), {
  maxWidth: 1920,
  minPadding: 0
});

export class StoneCutter extends React.Component<any, any> {
  render() {
    const gridStyle = {
      "fontSize": "0.75rem",
      "padding": "7px",
    };
    const imageStyles = {
      "maxHeight": "150px",
      "width": "150px"
    }

    let imageArray = vendorImages.map((image, i) =>
      <li className="grid-item" key={i} style={gridStyle}>
        <a href={image.href} target="_blank">
          <img src={image.src} alt={image.alt} style={imageStyles}/>
        </a>
      </li>
    );

    const gridStyles =  {
      'listStyle': 'none',
      'padding': '0',
      'margin': '0 auto'
    };

    return (
      <Grid
        component="ul"
        columnWidth={250}
        gutterWidth={5}
        gutterHeight={5}
        layout={layout.pinterest}
        duration={500}
        easing="ease-out"
        style={gridStyles}
      >
        {imageArray}
      </Grid>
    );
  }
}

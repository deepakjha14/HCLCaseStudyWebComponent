/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at                
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {LitElement, html, css} from 'lit-element';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class TopStocks extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
        max-width: 800px;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       */
      name: {type: String},

      /**
       * The number of times the button has been clicked.
       */
      count: {type: Number},
      chartData : {type: Array}, 
    };
  }

  constructor() {
    super();
    this.chartId = 'ABCCorpContainer';
    this.chart = '';
  }

  render() {
    return html`
      <div id=${this.chartId} style="height: 300px; width: 100%;"></div>
      <button @click=${this._onClick} part="button">
        Refresh
      </button>
    `;
  }

  _onClick() {
    this.chart.render();
  }

  firstUpdated(changedProperties) {
    const chartDiv = this.shadowRoot.getElementById('ABCCorpContainer');
    this.chart = new CanvasJS.Chart(chartDiv, {
      animationEnabled: true,
      theme: this.chartData.theme || "light1", // "light1", "light2", "dark1", "dark2"
      title:{
        text: this.chartData.theme || "ABC Corp. Top Performers"
      },
        axisY: {
          includeZero: true
        },
      data: [{
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
            indexLabelFontSize: 16,
        indexLabelPlacement: "outside",
        dataPoints: this.chartData.plotData
      }]
    });
  }
}

window.customElements.define('top-stocks', TopStocks);
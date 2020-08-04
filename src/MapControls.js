import { defaults as defaultControls, Control } from "ol/control.js";
import Draw from 'ol/interaction/Draw';
import './App.css';

export const drawTools = /*@__PURE__*/(function (Control) {
  var drawInteraction;
  var drawType;
  function drawTools(opt_options) {
    var options = opt_options || {};
    var buttonArr = [];

    for (var i = 0; i <= options.drawTypes.length; i++) {
      let type = options.drawTypes[i] ? options.drawTypes[i].toLowerCase() : null;
      var button = document.createElement('button');
      var Icon = document.createElement('i');
      if (type) {
        switch (type) {
          case 'polygon':
            // code block
            Icon.className = "fas fa-draw-polygon";
            button.appendChild(Icon);
            button.setAttribute('Title', ' Draw Polygon');
            button.setAttribute('Type', 'polygon');
            buttonArr.push(button);
            break;
          case 'line':
            // code block
            Icon.className = "fas fa-grip-lines";
            button.appendChild(Icon);
            button.setAttribute('Title', ' Draw Line');
            button.setAttribute('Type', 'line');
            buttonArr.push(button);
            break;
          case 'circle':
            // code block
            Icon.className = "fas fa-circle";
            button.appendChild(Icon);
            button.setAttribute('Title', ' Draw Circle');
            button.setAttribute('Type', 'circle');
            buttonArr.push(button);
            break;
          case 'point':
            Icon.className = "fas fa-map-marker-alt";
            button.appendChild(Icon);
            button.setAttribute('Title', ' Draw Point');
            button.setAttribute('Type', 'point');
            buttonArr.push(button);
            break;
          default:
            Icon.className = "fas fa-draw-polygon";
            button.appendChild(Icon);
            button.setAttribute('Title', ' Draw Polygon');
            button.setAttribute('Type', 'polygon');
            buttonArr.push(button);
            break;
          // code block
        }
      }
    }

    var element = document.createElement('div');
    element.className = 'side-tools ol-unselectable ol-control';

    buttonArr.forEach(btn => {
      let type = btn.getAttribute('Type');
      element.appendChild(btn);

      switch (type) {
        case 'polygon':
          btn.addEventListener('click', function () {this.polygon(btn)}.bind(this), false);
          break;
        case 'line':
          btn.addEventListener('click', function (){this.line(btn)}.bind(this), false);
          break;
        case 'circle':
          btn.addEventListener('click', function () {this.circle(btn)}.bind(this), false);
          break;
        case 'point':
          btn.addEventListener('click', function () {this.point(btn)}.bind(this), false);
          break;
        default:
          break;
      }
    })

    Control.call(this, {
      element: element,
      target: options.target
    });


  }

  if (Control) drawTools.__proto__ = Control;
  drawTools.prototype = Object.create(Control && Control.prototype);
  drawTools.prototype.constructor = drawTools;

  drawTools.prototype.turnOff = function turnOff(els) {
    els.forEach(el => {
      if(el.childNodes[0]){
        el.childNodes[0].classList.remove('on');
      }
    })
  }

  drawTools.prototype.getVectorSource = function getVectorSource() {
    let s;
    let ls = this.getMap().getLayers().getArray();
    for (var i = 0; i <= ls.length; i++) {
      if (ls[i].get('layername') === 'vector') {
        s = ls[i].getSource();
        return s;
      };
    };
  }

  drawTools.prototype.addDrawInt = function addDrawInt(type) {
    let drawType = type === 'Line' ? 'LineString' : type;
    let drawInt = new Draw({
      source: this.getVectorSource(),
      type: drawType
    });
    this.getMap().addInteraction(drawInt);
    return drawInt;
  }

  drawTools.prototype.addRemoveInt = function addRemoveInt(btn, type) {
    this.turnOff(btn.parentNode.childNodes);
    if (drawInteraction && drawType === type) {
      this.getMap().removeInteraction(drawInteraction);
      drawInteraction = null;
    } else if (drawInteraction && drawType !== type) {
      btn.childNodes[0].classList.add('on')
      drawType = type
      this.getMap().removeInteraction(drawInteraction);
      drawInteraction = this.addDrawInt(drawType);
    } else {
      btn.childNodes[0].classList.add('on')
      drawType = type
      drawInteraction = this.addDrawInt(drawType);
    }
  }

  drawTools.prototype.polygon = function polygon(btn) {
    this.addRemoveInt(btn, 'Polygon');
  };

  drawTools.prototype.line = function line(btn) {
    this.addRemoveInt(btn, 'Line');
  };

  drawTools.prototype.circle = function circle(btn) {
    this.addRemoveInt(btn, 'Circle');
  };

  drawTools.prototype.point = function point(btn) {
    this.addRemoveInt(btn, 'Point');
  };

  return drawTools;
}(Control));
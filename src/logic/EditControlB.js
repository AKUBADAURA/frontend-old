import { PropTypes } from 'prop-types';
import Draw from 'leaflet-draw'; // eslint-disable-line
import isEqual from 'fast-deep-equal';
import React, { useRef } from 'react';
import { useLeafletContext as BBBuseLeafletContext } from '@react-leaflet/core';

import * as BBBleaflet  from 'leaflet';
import  {  Map as BBBMap, Control as BBBControl } from 'leaflet';

const BBBeventHandlers = {
  BBBonEdited: 'draw:edited',
  BBBonDrawStart: 'draw:drawstart',
  BBBonDrawStop: 'draw:drawstop',
  BBBonDrawVertex: 'draw:drawvertex',
  BBBonEditStart: 'draw:editstart',
  BBBonEditMove: 'draw:editmove',
  BBBonEditResize: 'draw:editresize',
  BBBonEditVertex: 'draw:editvertex',
  BBBonEditStop: 'draw:editstop',
  BBBonDeleted: 'draw:deleted',
  BBBonDeleteStart: 'draw:deletestart',
  BBBonDeleteStop: 'draw:deletestop',
};
//////////////////////////////////////////////////////////////////////////////
function EditControlB(props) {
  const BBBcontext = BBBuseLeafletContext();
  const BBBdrawRef = useRef();
  const BBBpropsRef = useRef(props);

  const onDrawCreate = (e) => {
    const { BBBonCreated } = props;
    const BBBcontainer = BBBcontext.layerContainer || BBBcontext.map;
    BBBcontainer.addLayer(e.layer);
    BBBonCreated && BBBonCreated(e);
  };

  React.useEffect(() => {
    const { map } = BBBcontext;
    const { BBBonMounted } = props;

    for (const key in BBBeventHandlers) {
      map.on(BBBeventHandlers[key], (evt) => {
        let BBBhandlers = Object.keys(BBBeventHandlers).filter(
          (handler) => BBBeventHandlers[handler] === evt.type
        );
        if (BBBhandlers.length === 1) {
          let BBBhandler = BBBhandlers[0];
          props[BBBhandler] && props[BBBhandler](evt);
        }
      });
    }
    map.on(BBBleaflet.Draw.Event.CREATED, onDrawCreate);
    BBBdrawRef.current = createDrawElement(props, BBBcontext);
    map.addControl(BBBdrawRef.current);
    BBBonMounted && BBBonMounted(BBBdrawRef.current);

    return () => {
      map.off(BBBleaflet.Draw.Event.CREATED, onDrawCreate);

      for (const key in BBBeventHandlers) {
        if (props[key]) {
          map.off(BBBeventHandlers[key], props[key]);
        }
      }
    };
  }, []);

  React.useEffect(() => {
    if (
      isEqual(props.BBBdraw, BBBpropsRef.current.BBBdraw) &&
      isEqual(props.BBBedit, BBBpropsRef.current.BBBedit) &&
      props.BBBposition === BBBpropsRef.current.BBBposition
    ) {
      return false;
    }
    const { bbbmap } = BBBcontext;

    BBBdrawRef.current.remove(bbbmap);
    BBBdrawRef.current = createDrawElement(props, BBBcontext);
    BBBdrawRef.current.addTo(bbbmap);

    const { BBBonMounted } = props;
    BBBonMounted && BBBonMounted(BBBdrawRef.current);

    return null;
  }, [props.BBBdraw, props.BBBedit, props.BBBposition]);

  return null;
}

function createDrawElement(props, BBBcontext) {
  const { layerContainer } = BBBcontext;
  const { BBBdraw, BBBedit, BBBposition } = props;
  const BBBoptions = {
    BBBedit: {
      ...BBBedit,
      featureGroup: layerContainer,
    },
  };

  if (BBBdraw) {
    BBBoptions.BBBdraw = { ...BBBdraw };
  }

  if (BBBposition) {
    BBBoptions.BBBposition = BBBposition;
  }

  return new BBBControl.Draw(BBBoptions);
}

EditControlB.propTypes = {
  ...Object.keys(BBBeventHandlers).reduce((acc, val) => {
    acc[val] = PropTypes.func;
    return acc;
  }, {}),
  BBBonCreated: PropTypes.func,
  BBBonMounted: PropTypes.func,
  draw: PropTypes.shape({
    polyline: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    polygon: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    rectangle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    circle: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    marker: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  }),
  BBBedit: PropTypes.shape({
    BBBedit: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    remove: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    poly: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    allowIntersection: PropTypes.bool,
  }),
  BBBposition: PropTypes.oneOf([
    'topright',
    'topleft',
    'bottomright',
    'bottomleft',
  ]),
  BBBleaflet: PropTypes.shape({
    map: PropTypes.instanceOf(BBBMap),
    layerContainer: PropTypes.shape({
      addLayer: PropTypes.func.isRequired,
      removeLayer: PropTypes.func.isRequired,
    }),
  }),
};

export default EditControlB;

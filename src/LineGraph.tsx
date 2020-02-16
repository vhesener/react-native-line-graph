import React, { Attributes } from 'react';
import { View } from 'react-native';
import {
  Rect,
  Svg,
  Circle,
  Path,
  CircleProps,
  PathProps,
  Text,
  Line,
  TextProps,
  RectProps,
  TextAnchor,
} from 'react-native-svg';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';

export type Scalar = number | Date;
const min = <T extends Scalar>(array: T[]) =>
  array.reduce((a, b) => (a < b ? a : b));
const max = <T extends Scalar>(array: T[]) =>
  array.reduce((a, b) => (a > b ? a : b));

export type Datum<X extends Scalar = number, Y extends Scalar = number> = {
  x: X;
  y: Y;
};

export type DotProps = Partial<CircleProps>;
const DEFAULT_DOT_PROPS: DotProps = {
  fill: 'lightgray',
  stroke: 'darkslategrey',
  strokeWidth: 1,
  r: 5,
};

export type LineProps = Partial<PathProps>;
const DEFAULT_LINE_PROPS: LineProps = {
  stroke: 'gray',
  strokeWidth: 1,
  fill: '#0000',
};

const isFunction = (val: Function | object): val is Function => {
  return typeof val === 'function';
};

export type Scale<R extends Scalar = number, O extends Scalar = number> =
  | d3Scale.ScaleLinear<R, O>
  | d3Scale.ScaleTime<R, O>;

export type PredefinedCurve =
  | 'basis'
  | 'basisClosed'
  | 'basisOpen'
  | 'bundle'
  | 'cardinal'
  | 'cardinalClosed'
  | 'cardinalOpen'
  | 'catmullRom'
  | 'catmullRomClosed'
  | 'catmullRomOpen'
  | 'linear'
  | 'linearClosed'
  | 'monotoneX'
  | 'monotoneY'
  | 'natural'
  | 'step'
  | 'stepAfter'
  | 'stepBefore';

const DEFAULT_CURVE = d3Shape.curveNatural;

const predefinedToCurve = (pre?: PredefinedCurve) => {
  switch (pre) {
    case 'basis':
      return d3Shape.curveBasis;
    case 'basisClosed':
      return d3Shape.curveBasisClosed;
    case 'basisOpen':
      return d3Shape.curveBasisOpen;
    case 'bundle':
      return d3Shape.curveBundle;
    case 'cardinal':
      return d3Shape.curveCardinal;
    case 'cardinalClosed':
      return d3Shape.curveCardinalClosed;
    case 'cardinalOpen':
      return d3Shape.curveCardinalOpen;
    case 'catmullRom':
      return d3Shape.curveCatmullRom;
    case 'catmullRomClosed':
      return d3Shape.curveCatmullRomClosed;
    case 'catmullRomOpen':
      return d3Shape.curveCatmullRomOpen;
    case 'linear':
      return d3Shape.curveLinear;
    case 'linearClosed':
      return d3Shape.curveLinearClosed;
    case 'monotoneX':
      return d3Shape.curveMonotoneX;
    case 'monotoneY':
      return d3Shape.curveMonotoneY;
    case 'natural':
      return d3Shape.curveNatural;
    case 'step':
      return d3Shape.curveStep;
    case 'stepAfter':
      return d3Shape.curveStepAfter;
    case 'stepBefore':
      return d3Shape.curveStepBefore;
    default:
      return DEFAULT_CURVE;
  }
};

export type Curve =
  | PredefinedCurve
  | d3Shape.CurveFactory
  | d3Shape.CurveFactoryLineOnly;

const toCurve = (curve?: Curve) => {
  if (typeof curve === 'string') {
    return predefinedToCurve(curve);
  }
  return curve || DEFAULT_CURVE;
};

export type XAxisLabel<X extends Scalar = number> = {
  x: X;
  text: string;
};

export type YAxisLabel<Y extends Scalar = number> = {
  y: Y;
  text: string;
};

export type PointData<X extends Scalar = number, Y extends Scalar = number> = {
  x: X;
  y: Y;
  pixelX: number;
  pixelY: number;
};

export type GridLine<X extends Scalar = number, Y extends Scalar = number> = {
  p1: PointData<X, Y>;
  p2: PointData<X, Y>;
};

type IAxisTick<
  X extends Scalar = number,
  Y extends Scalar = number
> = XAxisLabel<X> &
  YAxisLabel<Y> & {
    pixelX: number;
    pixelY: number;
    textProps: TextProps;
    gridLine: GridLine<X, Y>;
  };

export type PixelOffset = { horizontal: number; vertical: number };
const DEFAULT_OFFSET: PixelOffset = { horizontal: 0, vertical: 0 };

const DEFAULT_AXIS_TEXT_PROPS: TextProps = {
  fontSize: 12,
};

const DEFAULT_XAXIS_TEXT_PROPS: TextProps = {
  ...DEFAULT_AXIS_TEXT_PROPS,
  textAnchor: 'middle',
};

const DEFAULT_YAXIS_TEXT_PROPS: TextProps = {
  ...DEFAULT_AXIS_TEXT_PROPS,
};

export type XAxisPixelOffsetProp<X extends Scalar = number> =
  | PixelOffset
  | ((label: XAxisLabel<X>, index: number) => PixelOffset);

export type GridLineStrokeType = 'dotted' | 'dashed' | 'solid' | 'none';
export type GridLineProps = LineProps & {
  startExtendPixels?: number;
  endExtendPixels?: number;
  strokeType?: GridLineStrokeType;
};

const DEFAULT_GRIDLINE_STROKE_TYPE: GridLineStrokeType = 'solid';
const DEFAULT_DASHED_DASHARRAY = '5, 5';
const DEFAULT_DOTTED_DASHARRAY = '1, 5';
const DEFAULT_DOTTED_WIDTH = 2;

const DEFAULT_GRIDLINE_LINE_PROPS: LineProps = {
  stroke: 'lightgray',
};

export type BasicRectProps = Pick<RectProps, 'fill' | 'stroke'>;
const DEFAULT_GRAPH_RECT_PROPS: BasicRectProps = {
  fill: 'white',
};
const DEFAULT_CONTAINER_RECT_PROPS: BasicRectProps = {
  fill: 'white',
};

const DEFAULT_XAXIS_TOP_EXTEND = 0;
const DEFAULT_XAXIS_BOTTOM_EXTEND = 0;
const DEFAULT_YAXIS_LEFT_EXTEND = 0;
const DEFAULT_YAXIS_RIGHT_EXTEND = 0;

const DEFAULT_PADDING_TOP = 10;
const DEFAULT_PADDING_RIGHT = 10;
const DEFAULT_PADDING_BOTTOM = 20;
const DEFAULT_PADDING_LEFT = 20;

export type CommonAxisLabelDecorations = {
  // https://github.com/d3/d3-scale#continuous_tickFormat
  // https://github.com/d3/d3-time-format
  formatSpecifier?: string;
  textProps?: TextProps;
  gridLineProps?: GridLineProps;
  nice?: true | number;
};

export type XAxisLabelDecoration<
  X extends Scalar = number
> = CommonAxisLabelDecorations & {
  labels?: XAxisLabel<X>[] | number;
  labelPixelOffset?: XAxisPixelOffsetProp<X>;
  pixelY?: 'top' | 'bottom' | number;
  visibleX?: [X, X];
};

export type YAxisPixelOffsetProp<Y extends Scalar = number> =
  | PixelOffset
  | ((label: YAxisLabel<Y>, index: number) => PixelOffset);

export type YAxisLabelDecoration<
  Y extends Scalar = number
> = CommonAxisLabelDecorations & {
  labels?: YAxisLabel<Y>[] | number;
  labelPixelOffset?: YAxisPixelOffsetProp<Y>;
  pixelX?: 'left' | 'right' | number;
  visibleY?: [Y, Y];
};

export type ScaleInfo = {
  x: Scale;
  y: Scale;
};

export type LineGraphProps<
  X extends Scalar = number,
  Y extends Scalar = number
> = {
  data: Datum<X, Y>[];
  width: number;
  height: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  graphRectProps?: BasicRectProps;
  containerRectProps?: BasicRectProps;
  dotProps?:
    | CircleProps
    | ((
        datum: Datum<X, Y>,
        pixelX: number,
        pixelY: number,
        index: number,
      ) => CircleProps | JSX.Element);
  lineProps?: PathProps | ((data: Datum<X, Y>[]) => PathProps | typeof Line);
  curve?: Curve;
  xAxis?: XAxisLabelDecoration<X>;
  yAxis?: YAxisLabelDecoration<Y>;
  title?: {
    text: string;
    pixelLocation?: PixelOffset;
    textProps?: TextProps;
    containerProps?: RectProps;
  };
  children?: (scales: ScaleInfo) => React.ReactNode;
};

const LineGraph = <X extends Scalar = number, Y extends Scalar = number>(
  props: LineGraphProps<X, Y>,
) => {
  const {
    data,
    width,
    height,
    paddingTop = DEFAULT_PADDING_TOP,
    paddingRight = DEFAULT_PADDING_RIGHT,
    paddingBottom = DEFAULT_PADDING_BOTTOM,
    paddingLeft = DEFAULT_PADDING_LEFT,
    graphRectProps = DEFAULT_GRAPH_RECT_PROPS,
    containerRectProps = DEFAULT_CONTAINER_RECT_PROPS,
    dotProps,
    lineProps,
    curve,
    xAxis,
    yAxis,
    title,
    children,
  } = props;
  const chartBottomPixel = height - paddingBottom;
  const chartLeftPixel = paddingLeft;
  const chartTopPixel = paddingTop;
  const chartRightPixel = width - paddingRight;
  const chartWidthPixel = chartRightPixel - chartLeftPixel;
  const chartHeightPixel = chartBottomPixel - chartTopPixel;

  const defaultDomain = (key: 'x' | 'y') => {
    const values = data.map(e => e[key]);
    const lowest = min(values);
    const highest = max(values);
    return [lowest, highest];
  };
  const xDomain = xAxis?.visibleX || defaultDomain('x') || [];

  const maybeWithNice = (_without: Scale, nice?: true | number) => {
    if (!nice) {
      return _without;
    }
    const count = nice === true ? undefined : nice;
    return _without.nice(count);
  };

  const _xBeforeNice: Scale =
    data[0] && data[0].x instanceof Date
      ? d3Scale
          .scaleTime<number, number>()
          .domain(xDomain)
          .range([chartLeftPixel, chartRightPixel])
      : d3Scale
          .scaleLinear<number, number>()
          .domain(xDomain)
          .range([chartLeftPixel, chartRightPixel]);
  const xScale = maybeWithNice(_xBeforeNice, xAxis?.nice);

  const yDomain = yAxis?.visibleY || defaultDomain('y');
  const _yBeforeNice: Scale =
    data[0] && data[0].y instanceof Date
      ? d3Scale
          .scaleTime<number, number>()
          .domain(yDomain)
          .range([chartBottomPixel, chartTopPixel])
      : d3Scale
          .scaleLinear<number, number>()
          .domain(yDomain)
          .range([chartBottomPixel, chartTopPixel]);

  const yScale = maybeWithNice(_yBeforeNice, yAxis?.nice);

  const dotData = () =>
    data.map((d, i) => {
      const x = xScale(d.x);
      const y = yScale(d.y);
      const circleProps = isFunction(dotProps)
        ? dotProps(d, x, y, i)
        : dotProps;
      if (React.isValidElement(circleProps)) {
        return circleProps;
      }
      const mergedProps = { ...DEFAULT_DOT_PROPS, ...circleProps };
      return {
        ...mergedProps,
        cx: x,
        cy: y,
        key: `[${x},${y}]`,
      } as CircleProps & Attributes;
    });
  const dots = dotData();

  type ElementType = typeof data[number];
  const lineGen = () =>
    d3Shape
      .line<ElementType>()
      .x(({ x }) => xScale(x))
      .y(({ y }) => yScale(y))
      .curve(toCurve(curve))(data);

  const LineComponent = () => {
    let pathProps: PathProps = { d: lineGen() || '', ...DEFAULT_LINE_PROPS };
    if (isFunction(lineProps)) {
      const newProps = lineProps(data);
      if (React.isValidElement(newProps)) {
        return newProps;
      }
      pathProps = { ...pathProps, ...newProps };
    } else {
      pathProps = { ...pathProps, ...lineProps };
    }
    return <Path {...pathProps} />;
  };

  const xTickCount =
    typeof xAxis?.labels === 'number' ? xAxis.labels : data.length;
  const xTickFormat = xAxis?.formatSpecifier;
  type XFormatFunction = (d: X | { valueOf(): X }) => string;
  const xFormatFunction = xScale.tickFormat(
    xTickCount,
    xTickFormat,
  ) as XFormatFunction;

  const xGridLineProps = xAxis?.gridLineProps;
  const xStartExtend =
    xGridLineProps?.startExtendPixels || DEFAULT_XAXIS_TOP_EXTEND;
  const xEndExtend =
    xGridLineProps?.endExtendPixels || DEFAULT_XAXIS_BOTTOM_EXTEND;

  const xTickToGridLine = (_x: X, pixelX: number): GridLine<X, Y> => {
    const y1 = yScale.invert(chartTopPixel - xStartExtend) as Y;
    const pixelY1 = yScale(y1);
    const y2 = yScale.invert(chartBottomPixel + xEndExtend) as Y;
    const pixelY2 = yScale(y2);
    return {
      p1: {
        x: _x,
        y: y1,
        pixelX,
        pixelY: pixelY1,
      },
      p2: {
        x: _x,
        y: y2,
        pixelX,
        pixelY: pixelY2,
      },
    };
  };

  const yTickCount =
    typeof yAxis?.labels === 'number' ? yAxis.labels : data.length;
  const yTickFormat = yAxis?.formatSpecifier;
  type YFormatFunction = (d: Y | { valueOf(): Y }) => string;
  const yFormatFunction = yScale.tickFormat(
    yTickCount,
    yTickFormat,
  ) as YFormatFunction;

  const yGridLineProps = yAxis?.gridLineProps;
  const yStartExtend =
    yGridLineProps?.startExtendPixels || DEFAULT_YAXIS_LEFT_EXTEND;
  const yEndExtend =
    yGridLineProps?.endExtendPixels || DEFAULT_YAXIS_RIGHT_EXTEND;

  const yTickToGridLine = (_y: Y, pixelY: number): GridLine<X, Y> => {
    const x1 = xScale.invert(chartLeftPixel - yStartExtend) as X;
    const pixelX0 = xScale(x1);
    const x2 = xScale.invert(chartRightPixel + yEndExtend) as X;
    const pixelX1 = xScale(x2);
    return {
      p1: {
        x: x1,
        y: _y,
        pixelX: pixelX0,
        pixelY,
      },
      p2: {
        x: x2,
        y: _y,
        pixelX: pixelX1,
        pixelY,
      },
    };
  };

  const xTickToAxisTick = (
    tick: X,
    index: number,
    offsetProp?: XAxisPixelOffsetProp<X>,
  ) => {
    const text = xFormatFunction(tick);
    const tempLabel: XAxisLabel<X> = { x: tick, text };
    return xLabelToAxisTick(
      tempLabel,
      xLabelToPixelOffset(tempLabel, index, offsetProp),
    );
  };

  const yTickToAxisTick = (
    tick: Y,
    index: number,
    offsetProp?: YAxisPixelOffsetProp<Y>,
  ) => {
    const text = yFormatFunction(tick);
    const tempLabel: YAxisLabel<Y> = { y: tick, text };
    return yLabelToAxisTick(
      tempLabel,
      yLabelToPixelOffset(tempLabel, index, offsetProp),
    );
  };

  const xLocationToPixelY = (location: 'top' | 'bottom') => {
    switch (location) {
      case 'top':
        // TODO: use the font height calculation
        return chartTopPixel - 4;
      case 'bottom':
        // TODO: use the font height calculation
        return chartBottomPixel + 12;
    }
  };
  const xAxisLocation = xAxis?.pixelY || 'bottom';
  const defaultXAxisPixelY =
    typeof xAxisLocation === 'number'
      ? xAxisLocation
      : xLocationToPixelY(xAxisLocation);

  const yLocationToPixelX = (location: 'left' | 'right') => {
    switch (location) {
      case 'left':
        return chartLeftPixel - 4;
      case 'right':
        return chartRightPixel + 4;
    }
  };

  const yLocationToAnchor = (location: 'left' | 'right'): TextAnchor => {
    switch (location) {
      case 'left':
        return 'end';
      case 'right':
        return 'start';
    }
  };

  const yAxisLocation = yAxis?.pixelX || 'left';
  const defaultYAxisPixelX =
    typeof yAxisLocation === 'number'
      ? yAxisLocation
      : yLocationToPixelX(yAxisLocation);
  const defaultYTextAnchor: TextAnchor =
    typeof yAxisLocation === 'number'
      ? 'start'
      : yLocationToAnchor(yAxisLocation);

  const xTextLabelProps = (
    pixelX: number,
    pixelY: number,
    offset: PixelOffset,
  ): TextProps => {
    return {
      ...DEFAULT_XAXIS_TEXT_PROPS,
      ...xAxis?.textProps,
      x: pixelX + offset.horizontal,
      y: pixelY + offset.vertical,
    };
  };

  const yTextLabelProps = (
    pixelX: number,
    pixelY: number,
    offset: PixelOffset,
  ): TextProps => {
    return {
      ...DEFAULT_YAXIS_TEXT_PROPS,
      textAnchor: defaultYTextAnchor,
      ...yAxis?.textProps,
      x: pixelX + offset.horizontal,
      y: pixelY + offset.vertical,
    };
  };

  const xLabelToAxisTick = (
    label: XAxisLabel<X>,
    offset: PixelOffset,
  ): IAxisTick<X, Y> => {
    const pixelY = defaultXAxisPixelY;
    const _y = yScale.invert(pixelY) as Y;
    const pixelX = xScale(label.x);
    const _x = label.x;
    return {
      x: _x,
      y: _y,
      pixelX,
      pixelY,
      text: label.text,
      textProps: xTextLabelProps(pixelX, pixelY, offset),
      gridLine: xTickToGridLine(_x, pixelX),
    };
  };

  const yLabelToAxisTick = (
    label: YAxisLabel<Y>,
    offset: PixelOffset,
  ): IAxisTick<X, Y> => {
    const pixelX = defaultYAxisPixelX;
    const _x = xScale.invert(pixelX) as X;
    const pixelY = yScale(label.y);
    const _y = label.y;
    return {
      x: _x,
      y: _y,
      pixelX,
      pixelY,
      text: label.text,
      textProps: yTextLabelProps(pixelX, pixelY, offset),
      gridLine: yTickToGridLine(_y, pixelY),
    };
  };

  const isXAxisLabel = (val: X | XAxisLabel<X>): val is XAxisLabel<X> => {
    const label = val as XAxisLabel<X>;
    return typeof label.text === 'string';
  };

  const isYAxisLabel = (val: Y | YAxisLabel<Y>): val is YAxisLabel<Y> => {
    const label = val as YAxisLabel<Y>;
    return typeof label.text === 'string';
  };

  const isXPixelOffset = (
    val?: XAxisPixelOffsetProp<X>,
  ): val is PixelOffset => {
    if (val === undefined) {
      return false;
    }
    const offset = val as PixelOffset;
    return (
      typeof offset.horizontal === 'number' &&
      typeof offset.vertical === 'number'
    );
  };

  const isYPixelOffset = (
    val?: YAxisPixelOffsetProp<Y>,
  ): val is PixelOffset => {
    if (val === undefined) {
      return false;
    }
    const offset = val as PixelOffset;
    return (
      typeof offset.horizontal === 'number' &&
      typeof offset.vertical === 'number'
    );
  };

  const xLabelToPixelOffset = (
    label: XAxisLabel<X>,
    index: number,
    _pixelOffset?: XAxisPixelOffsetProp<X>,
  ) => {
    return isFunction(_pixelOffset)
      ? _pixelOffset(label, index)
      : isXPixelOffset(_pixelOffset)
      ? _pixelOffset
      : DEFAULT_OFFSET;
  };

  const yLabelToPixelOffset = (
    label: YAxisLabel<Y>,
    index: number,
    _pixelOffset?: YAxisPixelOffsetProp<Y>,
  ) => {
    return isFunction(_pixelOffset)
      ? _pixelOffset(label, index)
      : isYPixelOffset(_pixelOffset)
      ? _pixelOffset
      : DEFAULT_OFFSET;
  };

  const toXAxisTicks = (ticks: X[] | XAxisLabel<X>[]) => {
    return (ticks as Array<X | XAxisLabel<X>>).map((tick, i) =>
      isXAxisLabel(tick)
        ? xLabelToAxisTick(
            tick,
            xLabelToPixelOffset(tick, i, xAxis?.labelPixelOffset),
          )
        : xTickToAxisTick(tick, i, xAxis?.labelPixelOffset),
    );
  };

  const toYAxisTicks = (ticks: Y[] | YAxisLabel<Y>[]) => {
    return (ticks as Array<Y | YAxisLabel<Y>>).map((tick, i) =>
      isYAxisLabel(tick)
        ? yLabelToAxisTick(
            tick,
            yLabelToPixelOffset(tick, i, yAxis?.labelPixelOffset),
          )
        : yTickToAxisTick(tick, i, yAxis?.labelPixelOffset),
    );
  };

  const xLabels = xAxis?.labels;
  const xTicks =
    xLabels instanceof Array
      ? (xLabels as XAxisLabel<X>[])
      : (xScale.ticks(xTickCount) as X[]);
  const xAxisTicks = toXAxisTicks(xTicks);

  const XTickLabels = () => {
    return (
      <>
        {xAxisTicks.map(({ x, text, textProps }) => {
          return (
            <Text key={`x_tick_${x}`} {...textProps}>
              {text}
            </Text>
          );
        })}
      </>
    );
  };

  const toStrokeArray = (gridLineProps?: GridLineProps): LineProps => {
    const strokeType =
      gridLineProps?.strokeType || DEFAULT_GRIDLINE_STROKE_TYPE;
    switch (strokeType) {
      case 'dashed':
        return { strokeDasharray: DEFAULT_DASHED_DASHARRAY };
      case 'dotted':
        return {
          strokeDasharray: DEFAULT_DOTTED_DASHARRAY,
          strokeLinecap: 'round',
          strokeWidth: DEFAULT_DOTTED_WIDTH,
        };
      case 'none':
        return {
          stroke: '#0000',
        };
      default:
        return {};
    }
  };

  const XGridLines = () => {
    const mergedProps = {
      ...DEFAULT_GRIDLINE_LINE_PROPS,
      ...toStrokeArray(xGridLineProps),
      ...xGridLineProps,
    };
    return (
      <>
        {xAxisTicks.map(({ gridLine }) => {
          return (
            <Line
              key={`grid_x_${gridLine.p1.x}`}
              x1={gridLine.p1.pixelX}
              x2={gridLine.p2.pixelX}
              y1={gridLine.p1.pixelY}
              y2={gridLine.p2.pixelY}
              {...mergedProps}
            />
          );
        })}
      </>
    );
  };

  const yLabel = yAxis?.labels;
  const yTicks =
    yLabel instanceof Array
      ? (yLabel as YAxisLabel<Y>[])
      : (yScale.ticks(yTickCount) as Y[]);
  const yAxisTicks = toYAxisTicks(yTicks);

  const YTickLabels = () => {
    return (
      <>
        {yAxisTicks.map(({ y, text, textProps }) => {
          return (
            <Text key={`y_tick_${y}`} {...textProps}>
              {text}
            </Text>
          );
        })}
      </>
    );
  };

  const YGridLines = () => {
    const mergedProps = {
      ...DEFAULT_GRIDLINE_LINE_PROPS,
      ...toStrokeArray(yGridLineProps),
      ...yGridLineProps,
    };
    return (
      <>
        {yAxisTicks.map(({ gridLine }) => {
          return (
            <Line
              key={`grid_y_${gridLine.p1.y}`}
              x1={gridLine.p1.pixelX}
              x2={gridLine.p2.pixelX}
              y1={gridLine.p1.pixelY}
              y2={gridLine.p2.pixelY}
              {...mergedProps}
            />
          );
        })}
      </>
    );
  };

  const scaleInfo: ScaleInfo = {
    x: xScale,
    y: yScale,
  };

  return (
    <View>
      <Text>{title?.text}</Text>
      <Svg width={width} height={height}>
        <Rect
          {...containerRectProps}
          width="100%"
          height="100%"
          rx={5}
          ry={5}
        />
        <Rect
          {...graphRectProps}
          width={chartWidthPixel}
          height={chartHeightPixel}
          x={chartLeftPixel}
          y={chartTopPixel}
        />
        <XGridLines />
        <YGridLines />
        <LineComponent />
        {dots.map(circleProps => {
          if (React.isValidElement(circleProps)) {
            return circleProps;
          }
          // TODO: valid key
          return <Circle key={Math.random()} {...circleProps} />;
        })}
        <XTickLabels />
        <YTickLabels />
        {children && children(scaleInfo)}
      </Svg>
    </View>
  );
};

export default LineGraph;

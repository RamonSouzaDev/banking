/*
 Highcharts JS v8.0.0 (2019-12-10)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
;(function (t) {
  'object' === typeof module && module.exports
    ? ((t['default'] = t), (module.exports = t))
    : 'function' === typeof define && define.amd
      ? define('highcharts/highcharts-more', ['highcharts'], function (A) {
          t(A)
          t.Highcharts = A
          return t
        })
      : t('undefined' !== typeof Highcharts ? Highcharts : void 0)
})(function (t) {
  function A(b, a, r, g) {
    b.hasOwnProperty(a) || (b[a] = g.apply(null, r))
  }
  t = t ? t._modules : {}
  A(t, 'parts-more/Pane.js', [t['parts/Globals.js'], t['parts/Utilities.js']], function (b, a) {
    function r(a, e) {
      this.init(a, e)
    }
    var g = a.extend,
      m = a.splat,
      k = b.CenteredSeriesMixin,
      w = b.merge
    b.Chart.prototype.collectionsWithUpdate.push('pane')
    g(r.prototype, {
      coll: 'pane',
      init: function (a, e) {
        this.chart = e
        this.background = []
        e.pane.push(this)
        this.setOptions(a)
      },
      setOptions: function (a) {
        this.options = w(this.defaultOptions, this.chart.angular ? { background: {} } : void 0, a)
      },
      render: function () {
        var a = this.options,
          e = this.options.background,
          l = this.chart.renderer
        this.group ||
          (this.group = l
            .g('pane-group')
            .attr({ zIndex: a.zIndex || 0 })
            .add())
        this.updateCenter()
        if (e)
          for (e = m(e), a = Math.max(e.length, this.background.length || 0), l = 0; l < a; l++)
            e[l] && this.axis
              ? this.renderBackground(w(this.defaultBackgroundOptions, e[l]), l)
              : this.background[l] &&
                ((this.background[l] = this.background[l].destroy()), this.background.splice(l, 1))
      },
      renderBackground: function (a, e) {
        var l = 'animate',
          b = { class: 'highcharts-pane ' + (a.className || '') }
        this.chart.styledMode ||
          g(b, { fill: a.backgroundColor, stroke: a.borderColor, 'stroke-width': a.borderWidth })
        this.background[e] ||
          ((this.background[e] = this.chart.renderer.path().add(this.group)), (l = 'attr'))
        this.background[e][l]({ d: this.axis.getPlotBandPath(a.from, a.to, a) }).attr(b)
      },
      defaultOptions: { center: ['50%', '50%'], size: '85%', startAngle: 0 },
      defaultBackgroundOptions: {
        shape: 'circle',
        borderWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, '#ffffff'],
            [1, '#e6e6e6']
          ]
        },
        from: -Number.MAX_VALUE,
        innerRadius: 0,
        to: Number.MAX_VALUE,
        outerRadius: '105%'
      },
      updateCenter: function (a) {
        this.center = (a || this.axis || {}).center = k.getCenter.call(this)
      },
      update: function (a, e) {
        w(!0, this.options, a)
        w(!0, this.chart.options.pane, a)
        this.setOptions(this.options)
        this.render()
        this.chart.axes.forEach(function (a) {
          a.pane === this && ((a.pane = null), a.update({}, e))
        }, this)
      }
    })
    b.Pane = r
  })
  A(
    t,
    'parts-more/RadialAxis.js',
    [t['parts/Globals.js'], t['parts/Utilities.js']],
    function (b, a) {
      var r = a.correctFloat,
        g = a.defined,
        m = a.extend,
        k = a.pick,
        w = a.pInt,
        z = a.relativeLength
      a = a.wrap
      var e = b.addEvent,
        l = b.Axis,
        u = b.merge,
        h = b.noop,
        d = b.Tick,
        B = l.prototype,
        x = d.prototype
      var n = {
        getOffset: h,
        redraw: function () {
          this.isDirty = !1
        },
        render: function () {
          this.isDirty = !1
        },
        createLabelCollector: function () {
          return !1
        },
        setScale: h,
        setCategories: h,
        setTitle: h
      }
      var p = {
        defaultRadialGaugeOptions: {
          labels: { align: 'center', x: 0, y: null },
          minorGridLineWidth: 0,
          minorTickInterval: 'auto',
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickWidth: 1,
          tickLength: 10,
          tickPosition: 'inside',
          tickWidth: 2,
          title: { rotation: 0 },
          zIndex: 2
        },
        defaultCircularOptions: {
          gridLineWidth: 1,
          labels: { align: null, distance: 15, x: 0, y: null, style: { textOverflow: 'none' } },
          maxPadding: 0,
          minPadding: 0,
          showLastLabel: !1,
          tickLength: 0
        },
        defaultRadialOptions: {
          gridLineInterpolation: 'circle',
          gridLineWidth: 1,
          labels: { align: 'right', x: -3, y: -2 },
          showLastLabel: !1,
          title: { x: 4, text: null, rotation: 90 }
        },
        setOptions: function (c) {
          c = this.options = u(this.defaultOptions, this.defaultPolarOptions, c)
          c.plotBands || (c.plotBands = [])
          b.fireEvent(this, 'afterSetOptions')
        },
        getOffset: function () {
          B.getOffset.call(this)
          this.chart.axisOffset[this.side] = 0
        },
        getLinePath: function (c, f) {
          c = this.center
          var q = this.chart,
            p = k(f, c[2] / 2 - this.offset)
          this.isCircular || 'undefined' !== typeof f
            ? ((f = this.chart.renderer.symbols.arc(this.left + c[0], this.top + c[1], p, p, {
                start: this.startAngleRad,
                end: this.endAngleRad,
                open: !0,
                innerR: 0
              })),
              (f.xBounds = [this.left + c[0]]),
              (f.yBounds = [this.top + c[1] - p]))
            : ((f = this.postTranslate(this.angleRad, p)),
              (f = ['M', c[0] + q.plotLeft, c[1] + q.plotTop, 'L', f.x, f.y]))
          return f
        },
        setAxisTranslation: function () {
          B.setAxisTranslation.call(this)
          this.center &&
            ((this.transA = this.isCircular
              ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1)
              : this.center[2] / 2 / (this.max - this.min || 1)),
            (this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0))
        },
        beforeSetTickPositions: function () {
          this.autoConnect =
            this.isCircular &&
            'undefined' === typeof k(this.userMax, this.options.max) &&
            r(this.endAngleRad - this.startAngleRad) === r(2 * Math.PI)
          !this.isCircular && this.chart.inverted && this.max++
          this.autoConnect &&
            (this.max += (this.categories && 1) || this.pointRange || this.closestPointRange || 0)
        },
        setAxisSize: function () {
          B.setAxisSize.call(this)
          this.isRadial &&
            (this.pane.updateCenter(this),
            this.isCircular && (this.sector = this.endAngleRad - this.startAngleRad),
            (this.len = this.width = this.height = (this.center[2] * k(this.sector, 1)) / 2))
        },
        getPosition: function (c, f) {
          c = this.translate(c)
          return this.postTranslate(
            this.isCircular ? c : this.angleRad,
            k(this.isCircular ? f : 0 > c ? 0 : c, this.center[2] / 2) - this.offset
          )
        },
        postTranslate: function (c, f) {
          var q = this.chart,
            p = this.center
          c = this.startAngleRad + c
          return { x: q.plotLeft + p[0] + Math.cos(c) * f, y: q.plotTop + p[1] + Math.sin(c) * f }
        },
        getPlotBandPath: function (c, f, q) {
          var p = this.center,
            d = this.startAngleRad,
            h = p[2] / 2,
            v = [k(q.outerRadius, '100%'), q.innerRadius, k(q.thickness, 10)],
            a = Math.min(this.offset, 0),
            n = /%$/
          var e = this.isCircular
          if ('polygon' === this.options.gridLineInterpolation)
            v = this.getPlotLinePath({ value: c }).concat(
              this.getPlotLinePath({ value: f, reverse: !0 })
            )
          else {
            c = Math.max(c, this.min)
            f = Math.min(f, this.max)
            e || ((v[0] = this.translate(c)), (v[1] = this.translate(f)))
            v = v.map(function (f) {
              n.test(f) && (f = (w(f, 10) * h) / 100)
              return f
            })
            if ('circle' !== q.shape && e) (c = d + this.translate(c)), (f = d + this.translate(f))
            else {
              c = -Math.PI / 2
              f = 1.5 * Math.PI
              var g = !0
            }
            v[0] -= a
            v[2] -= a
            v = this.chart.renderer.symbols.arc(this.left + p[0], this.top + p[1], v[0], v[0], {
              start: Math.min(c, f),
              end: Math.max(c, f),
              innerR: k(v[1], v[0] - v[2]),
              open: g
            })
            e &&
              ((e = (f + c) / 2),
              (a = this.left + p[0] + (p[2] / 2) * Math.cos(e)),
              (v.xBounds =
                e > -Math.PI / 2 && e < Math.PI / 2 ? [a, this.chart.plotWidth] : [0, a]),
              (v.yBounds = [this.top + p[1] + (p[2] / 2) * Math.sin(e)]),
              (v.yBounds[0] += (e > -Math.PI && 0 > e) || e > Math.PI ? -10 : 10))
          }
          return v
        },
        getCrosshairPosition: function (c, f, q) {
          var p = c.value
          if (this.isCircular) {
            if (g(p))
              c.point &&
                ((d = c.point.shapeArgs || {}),
                d.start && (p = this.translate(c.point.rectPlotY, !0)))
            else {
              var d = c.chartX || 0
              var a = c.chartY || 0
              p = this.translate(Math.atan2(a - q, d - f) - this.startAngleRad, !0)
            }
            c = this.getPosition(p)
            d = c.x
            a = c.y
          } else
            g(p) || ((d = c.chartX), (a = c.chartY)),
              g(d) &&
                g(a) &&
                (p = this.translate(
                  Math.min(Math.sqrt(Math.pow(d - f, 2) + Math.pow(a - q, 2)), this.len),
                  !0
                ))
          return [p, d || 0, a || 0]
        },
        getPlotLinePath: function (c) {
          var f = this,
            q = f.center,
            p = f.chart,
            d = p.inverted,
            a = c.value,
            e = c.reverse,
            h = f.getPosition(a),
            n = f.pane.options.background
              ? f.pane.options.background[0] || f.pane.options.background
              : {},
            g = n.innerRadius || '0%',
            l = n.outerRadius || '100%'
          n = q[0] + p.plotLeft
          q = q[1] + p.plotTop
          var b = h.x
          h = h.y
          var u, m
          c.isCrosshair &&
            ((h = this.getCrosshairPosition(c, n, q)), (a = h[0]), (b = h[1]), (h = h[2]))
          if (f.isCircular) {
            e =
              'string' === typeof g
                ? z(g, 1)
                : g / Math.sqrt(Math.pow(b - n, 2) + Math.pow(h - q, 2))
            c =
              'string' === typeof l
                ? z(l, 1)
                : l / Math.sqrt(Math.pow(b - n, 2) + Math.pow(h - q, 2))
            var r = [
              'M',
              n + e * (b - n),
              q - e * (q - h),
              'L',
              b - (1 - c) * (b - n),
              h + (1 - c) * (q - h)
            ]
          } else
            (a = f.translate(a)),
              !c.isCrosshair && (0 > a || a > f.height) && d && (a = 0),
              'circle' === f.options.gridLineInterpolation
                ? (r = f.getLinePath(0, a))
                : (p[d ? 'yAxis' : 'xAxis'].forEach(function (c) {
                    c.pane === f.pane && (u = c)
                  }),
                  (r = []),
                  (n = u.tickPositions),
                  u.autoConnect && (n = n.concat([n[0]])),
                  e && (n = [].concat(n).reverse()),
                  n.forEach(function (f, c) {
                    m = u.getPosition(f, a)
                    r.push(c ? 'L' : 'M', m.x, m.y)
                  }))
          return r
        },
        getTitlePosition: function () {
          var c = this.center,
            f = this.chart,
            q = this.options.title
          return {
            x: f.plotLeft + c[0] + (q.x || 0),
            y: f.plotTop + c[1] - { high: 0.5, middle: 0.25, low: 0 }[q.align] * c[2] + (q.y || 0)
          }
        },
        createLabelCollector: function () {
          var c = this
          return function () {
            if (c.isRadial && c.tickPositions && !0 !== c.options.labels.allowOverlap)
              return c.tickPositions
                .map(function (f) {
                  return c.ticks[f] && c.ticks[f].label
                })
                .filter(function (f) {
                  return !!f
                })
          }
        }
      }
      e(l, 'init', function (c) {
        var f = this.chart,
          q = f.inverted,
          d = f.angular,
          a = f.polar,
          h = this.isXAxis,
          e = this.coll,
          g = d && h,
          l,
          b = f.options
        c = c.userOptions.pane || 0
        c = this.pane = f.pane && f.pane[c]
        if ('colorAxis' === e) this.isRadial = !1
        else {
          if (d) {
            if ((m(this, g ? n : p), (l = !h)))
              this.defaultPolarOptions = this.defaultRadialGaugeOptions
          } else
            a &&
              (m(this, p),
              (this.defaultPolarOptions = (l = this.horiz)
                ? this.defaultCircularOptions
                : u(
                    'xAxis' === e ? this.defaultOptions : this.defaultYAxisOptions,
                    this.defaultRadialOptions
                  )),
              q &&
                'yAxis' === e &&
                (this.defaultPolarOptions.stackLabels = this.defaultYAxisOptions.stackLabels))
          d || a
            ? ((this.isRadial = !0),
              (b.chart.zoomType = null),
              this.labelCollector || (this.labelCollector = this.createLabelCollector()),
              this.labelCollector && f.labelCollectors.push(this.labelCollector))
            : (this.isRadial = !1)
          c && l && (c.axis = this)
          this.isCircular = l
        }
      })
      e(l, 'afterInit', function () {
        var c = this.chart,
          f = this.options,
          q = this.pane,
          p = q && q.options
        ;(c.angular && this.isXAxis) ||
          !q ||
          (!c.angular && !c.polar) ||
          ((this.angleRad = ((f.angle || 0) * Math.PI) / 180),
          (this.startAngleRad = ((p.startAngle - 90) * Math.PI) / 180),
          (this.endAngleRad = ((k(p.endAngle, p.startAngle + 360) - 90) * Math.PI) / 180),
          (this.offset = f.offset || 0))
      })
      e(l, 'autoLabelAlign', function (c) {
        this.isRadial && ((c.align = void 0), c.preventDefault())
      })
      e(l, 'destroy', function () {
        if (this.chart && this.chart.labelCollectors) {
          var c = this.chart.labelCollectors.indexOf(this.labelCollector)
          0 <= c && this.chart.labelCollectors.splice(c, 1)
        }
      })
      e(d, 'afterGetPosition', function (c) {
        this.axis.getPosition && m(c.pos, this.axis.getPosition(this.pos))
      })
      e(d, 'afterGetLabelPosition', function (c) {
        var f = this.axis,
          q = this.label,
          p = q.getBBox(),
          d = f.options.labels,
          a = d.y,
          h = 20,
          n = d.align,
          e = (((f.translate(this.pos) + f.startAngleRad + Math.PI / 2) / Math.PI) * 180) % 360,
          l = Math.round(e),
          g = 'end',
          b = 0 > l ? l + 360 : l,
          u = b,
          m = 0,
          r = 0,
          B = null === d.y ? 0.3 * -p.height : 0
        if (f.isRadial) {
          var x = f.getPosition(
            this.pos,
            f.center[2] / 2 + z(k(d.distance, -25), f.center[2] / 2, -f.center[2] / 2)
          )
          'auto' === d.rotation
            ? q.attr({ rotation: e })
            : null === a &&
              (a = f.chart.renderer.fontMetrics(q.styles && q.styles.fontSize).b - p.height / 2)
          null === n &&
            (f.isCircular
              ? (p.width > (f.len * f.tickInterval) / (f.max - f.min) && (h = 0),
                (n =
                  e > h && e < 180 - h ? 'left' : e > 180 + h && e < 360 - h ? 'right' : 'center'))
              : (n = 'center'),
            q.attr({ align: n }))
          if ('auto' === n && 2 === f.tickPositions.length && f.isCircular) {
            90 < b && 180 > b ? (b = 180 - b) : 270 < b && 360 >= b && (b = 540 - b)
            180 < u && 360 >= u && (u = 360 - u)
            if (
              f.pane.options.startAngle === l ||
              f.pane.options.startAngle === l + 360 ||
              f.pane.options.startAngle === l - 360
            )
              g = 'start'
            n =
              (-90 <= l && 90 >= l) || (-360 <= l && -270 >= l) || (270 <= l && 360 >= l)
                ? 'start' === g
                  ? 'right'
                  : 'left'
                : 'start' === g
                  ? 'left'
                  : 'right'
            70 < u && 110 > u && (n = 'center')
            15 > b || (180 <= b && 195 > b)
              ? (m = 0.3 * p.height)
              : 15 <= b && 35 >= b
                ? (m = 'start' === g ? 0 : 0.75 * p.height)
                : 195 <= b && 215 >= b
                  ? (m = 'start' === g ? 0.75 * p.height : 0)
                  : 35 < b && 90 >= b
                    ? (m = 'start' === g ? 0.25 * -p.height : p.height)
                    : 215 < b && 270 >= b && (m = 'start' === g ? p.height : 0.25 * -p.height)
            15 > u
              ? (r = 'start' === g ? 0.15 * -p.height : 0.15 * p.height)
              : 165 < u && 180 >= u && (r = 'start' === g ? 0.15 * p.height : 0.15 * -p.height)
            q.attr({ align: n })
            q.translate(r, m + B)
          }
          c.pos.x = x.x + d.x
          c.pos.y = x.y + a
        }
      })
      a(x, 'getMarkPath', function (c, f, q, p, d, a, h) {
        var n = this.axis
        n.isRadial
          ? ((c = n.getPosition(this.pos, n.center[2] / 2 + p)), (f = ['M', f, q, 'L', c.x, c.y]))
          : (f = c.call(this, f, q, p, d, a, h))
        return f
      })
    }
  )
  A(
    t,
    'parts-more/AreaRangeSeries.js',
    [t['parts/Globals.js'], t['parts/Utilities.js']],
    function (b, a) {
      var r = a.defined,
        g = a.extend,
        m = a.isArray,
        k = a.isNumber,
        w = a.pick
      a = b.seriesType
      var z = b.seriesTypes,
        e = b.Series.prototype,
        l = b.Point.prototype
      a(
        'arearange',
        'area',
        {
          lineWidth: 1,
          threshold: null,
          tooltip: {
            pointFormat:
              '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
          },
          trackByArea: !0,
          dataLabels: { align: null, verticalAlign: null, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0 }
        },
        {
          pointArrayMap: ['low', 'high'],
          pointValKey: 'low',
          deferTranslatePolar: !0,
          toYData: function (a) {
            return [a.low, a.high]
          },
          highToXY: function (a) {
            var h = this.chart,
              d = this.xAxis.postTranslate(a.rectPlotX, this.yAxis.len - a.plotHigh)
            a.plotHighX = d.x - h.plotLeft
            a.plotHigh = d.y - h.plotTop
            a.plotLowX = a.plotX
          },
          translate: function () {
            var a = this,
              h = a.yAxis,
              d = !!a.modifyValue
            z.area.prototype.translate.apply(a)
            a.points.forEach(function (e) {
              var b = e.high,
                n = e.plotY
              e.isNull
                ? (e.plotY = null)
                : ((e.plotLow = n),
                  (e.plotHigh = h.translate(d ? a.modifyValue(b, e) : b, 0, 1, 0, 1)),
                  d && (e.yBottom = e.plotHigh))
            })
            this.chart.polar &&
              this.points.forEach(function (d) {
                a.highToXY(d)
                d.tooltipPos = [(d.plotHighX + d.plotLowX) / 2, (d.plotHigh + d.plotLow) / 2]
              })
          },
          getGraphPath: function (a) {
            var e = [],
              d = [],
              b,
              l = z.area.prototype.getGraphPath
            var n = this.options
            var p = this.chart.polar && !1 !== n.connectEnds,
              c = n.connectNulls,
              f = n.step
            a = a || this.points
            for (b = a.length; b--; ) {
              var q = a[b]
              q.isNull ||
                p ||
                c ||
                (a[b + 1] && !a[b + 1].isNull) ||
                d.push({ plotX: q.plotX, plotY: q.plotY, doCurve: !1 })
              var F = {
                polarPlotY: q.polarPlotY,
                rectPlotX: q.rectPlotX,
                yBottom: q.yBottom,
                plotX: w(q.plotHighX, q.plotX),
                plotY: q.plotHigh,
                isNull: q.isNull
              }
              d.push(F)
              e.push(F)
              q.isNull ||
                p ||
                c ||
                (a[b - 1] && !a[b - 1].isNull) ||
                d.push({ plotX: q.plotX, plotY: q.plotY, doCurve: !1 })
            }
            a = l.call(this, a)
            f &&
              (!0 === f && (f = 'left'),
              (n.step = { left: 'right', center: 'center', right: 'left' }[f]))
            e = l.call(this, e)
            d = l.call(this, d)
            n.step = f
            n = [].concat(a, e)
            this.chart.polar || 'M' !== d[0] || (d[0] = 'L')
            this.graphPath = n
            this.areaPath = a.concat(d)
            n.isArea = !0
            n.xMap = a.xMap
            this.areaPath.xMap = a.xMap
            return n
          },
          drawDataLabels: function () {
            var a = this.points,
              h = a.length,
              d,
              b = [],
              l = this.options.dataLabels,
              n,
              p = this.chart.inverted
            if (m(l))
              if (1 < l.length) {
                var c = l[0]
                var f = l[1]
              } else (c = l[0]), (f = { enabled: !1 })
            else
              (c = g({}, l)),
                (c.x = l.xHigh),
                (c.y = l.yHigh),
                (f = g({}, l)),
                (f.x = l.xLow),
                (f.y = l.yLow)
            if (c.enabled || this._hasPointLabels) {
              for (d = h; d--; )
                if ((n = a[d])) {
                  var q = c.inside ? n.plotHigh < n.plotLow : n.plotHigh > n.plotLow
                  n.y = n.high
                  n._plotY = n.plotY
                  n.plotY = n.plotHigh
                  b[d] = n.dataLabel
                  n.dataLabel = n.dataLabelUpper
                  n.below = q
                  p
                    ? c.align || (c.align = q ? 'right' : 'left')
                    : c.verticalAlign || (c.verticalAlign = q ? 'top' : 'bottom')
                }
              this.options.dataLabels = c
              e.drawDataLabels && e.drawDataLabels.apply(this, arguments)
              for (d = h; d--; )
                if ((n = a[d]))
                  (n.dataLabelUpper = n.dataLabel),
                    (n.dataLabel = b[d]),
                    delete n.dataLabels,
                    (n.y = n.low),
                    (n.plotY = n._plotY)
            }
            if (f.enabled || this._hasPointLabels) {
              for (d = h; d--; )
                if ((n = a[d]))
                  (q = f.inside ? n.plotHigh < n.plotLow : n.plotHigh > n.plotLow),
                    (n.below = !q),
                    p
                      ? f.align || (f.align = q ? 'left' : 'right')
                      : f.verticalAlign || (f.verticalAlign = q ? 'bottom' : 'top')
              this.options.dataLabels = f
              e.drawDataLabels && e.drawDataLabels.apply(this, arguments)
            }
            if (c.enabled)
              for (d = h; d--; )
                if ((n = a[d]))
                  n.dataLabels = [n.dataLabelUpper, n.dataLabel].filter(function (f) {
                    return !!f
                  })
            this.options.dataLabels = l
          },
          alignDataLabel: function () {
            z.column.prototype.alignDataLabel.apply(this, arguments)
          },
          drawPoints: function () {
            var a = this.points.length,
              h
            e.drawPoints.apply(this, arguments)
            for (h = 0; h < a; ) {
              var d = this.points[h]
              d.origProps = {
                plotY: d.plotY,
                plotX: d.plotX,
                isInside: d.isInside,
                negative: d.negative,
                zone: d.zone,
                y: d.y
              }
              d.lowerGraphic = d.graphic
              d.graphic = d.upperGraphic
              d.plotY = d.plotHigh
              r(d.plotHighX) && (d.plotX = d.plotHighX)
              d.y = d.high
              d.negative = d.high < (this.options.threshold || 0)
              d.zone = this.zones.length && d.getZone()
              this.chart.polar ||
                (d.isInside = d.isTopInside =
                  'undefined' !== typeof d.plotY &&
                  0 <= d.plotY &&
                  d.plotY <= this.yAxis.len &&
                  0 <= d.plotX &&
                  d.plotX <= this.xAxis.len)
              h++
            }
            e.drawPoints.apply(this, arguments)
            for (h = 0; h < a; )
              (d = this.points[h]),
                (d.upperGraphic = d.graphic),
                (d.graphic = d.lowerGraphic),
                g(d, d.origProps),
                delete d.origProps,
                h++
          },
          setStackedPoints: b.noop
        },
        {
          setState: function () {
            var a = this.state,
              e = this.series,
              d = e.chart.polar
            r(this.plotHigh) || (this.plotHigh = e.yAxis.toPixels(this.high, !0))
            r(this.plotLow) || (this.plotLow = this.plotY = e.yAxis.toPixels(this.low, !0))
            e.stateMarkerGraphic &&
              ((e.lowerStateMarkerGraphic = e.stateMarkerGraphic),
              (e.stateMarkerGraphic = e.upperStateMarkerGraphic))
            this.graphic = this.upperGraphic
            this.plotY = this.plotHigh
            d && (this.plotX = this.plotHighX)
            l.setState.apply(this, arguments)
            this.state = a
            this.plotY = this.plotLow
            this.graphic = this.lowerGraphic
            d && (this.plotX = this.plotLowX)
            e.stateMarkerGraphic &&
              ((e.upperStateMarkerGraphic = e.stateMarkerGraphic),
              (e.stateMarkerGraphic = e.lowerStateMarkerGraphic),
              (e.lowerStateMarkerGraphic = void 0))
            l.setState.apply(this, arguments)
          },
          haloPath: function () {
            var a = this.series.chart.polar,
              e = []
            this.plotY = this.plotLow
            a && (this.plotX = this.plotLowX)
            this.isInside && (e = l.haloPath.apply(this, arguments))
            this.plotY = this.plotHigh
            a && (this.plotX = this.plotHighX)
            this.isTopInside && (e = e.concat(l.haloPath.apply(this, arguments)))
            return e
          },
          destroyElements: function () {
            ;['lowerGraphic', 'upperGraphic'].forEach(function (a) {
              this[a] && (this[a] = this[a].destroy())
            }, this)
            this.graphic = null
            return l.destroyElements.apply(this, arguments)
          },
          isValid: function () {
            return k(this.low) && k(this.high)
          }
        }
      )
      ;('')
    }
  )
  A(t, 'parts-more/AreaSplineRangeSeries.js', [t['parts/Globals.js']], function (b) {
    var a = b.seriesType
    a('areasplinerange', 'arearange', null, {
      getPointSpline: b.seriesTypes.spline.prototype.getPointSpline
    })
    ;('')
  })
  A(
    t,
    'parts-more/ColumnRangeSeries.js',
    [t['parts/Globals.js'], t['parts/Utilities.js']],
    function (b, a) {
      var r = a.clamp,
        g = a.pick
      a = b.defaultPlotOptions
      var m = b.merge,
        k = b.noop,
        w = b.seriesType,
        z = b.seriesTypes.column.prototype
      w(
        'columnrange',
        'arearange',
        m(a.column, a.arearange, {
          pointRange: null,
          marker: null,
          states: { hover: { halo: !1 } }
        }),
        {
          translate: function () {
            var a = this,
              l = a.yAxis,
              b = a.xAxis,
              h = b.startAngleRad,
              d,
              m = a.chart,
              k = a.xAxis.isRadial,
              n = Math.max(m.chartWidth, m.chartHeight) + 999,
              p
            z.translate.apply(a)
            a.points.forEach(function (c) {
              var f = c.shapeArgs,
                q = a.options.minPointLength
              c.plotHigh = p = r(l.translate(c.high, 0, 1, 0, 1), -n, n)
              c.plotLow = r(c.plotY, -n, n)
              var e = p
              var C = g(c.rectPlotY, c.plotY) - p
              Math.abs(C) < q ? ((q -= C), (C += q), (e -= q / 2)) : 0 > C && ((C *= -1), (e -= C))
              k
                ? ((d = c.barX + h),
                  (c.shapeType = 'path'),
                  (c.shapeArgs = { d: a.polarArc(e + C, e, d, d + c.pointWidth) }))
                : ((f.height = C),
                  (f.y = e),
                  (c.tooltipPos = m.inverted
                    ? [
                        l.len + l.pos - m.plotLeft - e - C / 2,
                        b.len + b.pos - m.plotTop - f.x - f.width / 2,
                        C
                      ]
                    : [b.left - m.plotLeft + f.x + f.width / 2, l.pos - m.plotTop + e + C / 2, C]))
            })
          },
          directTouch: !0,
          trackerGroups: ['group', 'dataLabelsGroup'],
          drawGraph: k,
          getSymbol: k,
          crispCol: function () {
            return z.crispCol.apply(this, arguments)
          },
          drawPoints: function () {
            return z.drawPoints.apply(this, arguments)
          },
          drawTracker: function () {
            return z.drawTracker.apply(this, arguments)
          },
          getColumnMetrics: function () {
            return z.getColumnMetrics.apply(this, arguments)
          },
          pointAttribs: function () {
            return z.pointAttribs.apply(this, arguments)
          },
          animate: function () {
            return z.animate.apply(this, arguments)
          },
          polarArc: function () {
            return z.polarArc.apply(this, arguments)
          },
          translate3dPoints: function () {
            return z.translate3dPoints.apply(this, arguments)
          },
          translate3dShapes: function () {
            return z.translate3dShapes.apply(this, arguments)
          }
        },
        { setState: z.pointClass.prototype.setState }
      )
      ;('')
    }
  )
  A(
    t,
    'parts-more/ColumnPyramidSeries.js',
    [t['parts/Globals.js'], t['parts/Utilities.js']],
    function (b, a) {
      var r = a.clamp,
        g = a.pick
      a = b.seriesType
      var m = b.seriesTypes.column.prototype
      a(
        'columnpyramid',
        'column',
        {},
        {
          translate: function () {
            var a = this,
              b = a.chart,
              z = a.options,
              e = (a.dense = 2 > a.closestPointRange * a.xAxis.transA)
            e = a.borderWidth = g(z.borderWidth, e ? 0 : 1)
            var l = a.yAxis,
              u = z.threshold,
              h = (a.translatedThreshold = l.getThreshold(u)),
              d = g(z.minPointLength, 5),
              B = a.getColumnMetrics(),
              x = B.width,
              n = (a.barW = Math.max(x, 1 + 2 * e)),
              p = (a.pointXOffset = B.offset)
            b.inverted && (h -= 0.5)
            z.pointPadding && (n = Math.ceil(n))
            m.translate.apply(a)
            a.points.forEach(function (c) {
              var f = g(c.yBottom, h),
                q = 999 + Math.abs(f),
                e = r(c.plotY, -q, l.len + q)
              q = c.plotX + p
              var C = n / 2,
                E = Math.min(e, f)
              f = Math.max(e, f) - E
              c.barX = q
              c.pointWidth = x
              c.tooltipPos = b.inverted
                ? [l.len + l.pos - b.plotLeft - e, a.xAxis.len - q - C, f]
                : [q + C, e + l.pos - b.plotTop, f]
              e = u + (c.total || c.y)
              'percent' === z.stacking && (e = u + (0 > c.y) ? -100 : 100)
              e = l.toPixels(e, !0)
              var v = b.plotHeight - e - (b.plotHeight - h)
              var m = (C * (E - e)) / v
              var k = (C * (E + f - e)) / v
              v = q - m + C
              m = q + m + C
              var w = q + k + C
              k = q - k + C
              var B = E - d
              var y = E + f
              0 > c.y && ((B = E), (y = E + f + d))
              b.inverted &&
                ((w = b.plotWidth - E),
                (v = e - (b.plotWidth - h)),
                (m = (C * (e - w)) / v),
                (k = (C * (e - (w - f))) / v),
                (v = q + C + m),
                (m = v - 2 * m),
                (w = q - k + C),
                (k = q + k + C),
                (B = E),
                (y = E + f - d),
                0 > c.y && (y = E + f + d))
              c.shapeType = 'path'
              c.shapeArgs = {
                x: v,
                y: B,
                width: m - v,
                height: f,
                d: ['M', v, B, 'L', m, B, w, y, k, y, 'Z']
              }
            })
          }
        }
      )
      ;('')
    }
  )
  A(
    t,
    'parts-more/GaugeSeries.js',
    [t['parts/Globals.js'], t['parts/Utilities.js']],
    function (b, a) {
      var r = a.clamp,
        g = a.isNumber,
        m = a.pick,
        k = a.pInt,
        w = b.merge,
        z = b.Series
      a = b.seriesType
      var e = b.TrackerMixin
      a(
        'gauge',
        'line',
        {
          dataLabels: {
            borderColor: '#cccccc',
            borderRadius: 3,
            borderWidth: 1,
            crop: !1,
            defer: !1,
            enabled: !0,
            verticalAlign: 'top',
            y: 15,
            zIndex: 2
          },
          dial: {},
          pivot: {},
          tooltip: { headerFormat: '' },
          showInLegend: !1
        },
        {
          angular: !0,
          directTouch: !0,
          drawGraph: b.noop,
          fixedBox: !0,
          forceDL: !0,
          noSharedTooltip: !0,
          trackerGroups: ['group', 'dataLabelsGroup'],
          translate: function () {
            var a = this.yAxis,
              e = this.options,
              h = a.center
            this.generatePoints()
            this.points.forEach(function (d) {
              var b = w(e.dial, d.dial),
                l = (k(m(b.radius, '80%')) * h[2]) / 200,
                n = (k(m(b.baseLength, '70%')) * l) / 100,
                p = (k(m(b.rearLength, '10%')) * l) / 100,
                c = b.baseWidth || 3,
                f = b.topWidth || 1,
                q = e.overshoot,
                F = a.startAngleRad + a.translate(d.y, null, null, null, !0)
              if (g(q) || !1 === e.wrap)
                (q = g(q) ? (q / 180) * Math.PI : 0),
                  (F = r(F, a.startAngleRad - q, a.endAngleRad + q))
              F = (180 * F) / Math.PI
              d.shapeType = 'path'
              d.shapeArgs = {
                d: b.path || [
                  'M',
                  -p,
                  -c / 2,
                  'L',
                  n,
                  -c / 2,
                  l,
                  -f / 2,
                  l,
                  f / 2,
                  n,
                  c / 2,
                  -p,
                  c / 2,
                  'z'
                ],
                translateX: h[0],
                translateY: h[1],
                rotation: F
              }
              d.plotX = h[0]
              d.plotY = h[1]
            })
          },
          drawPoints: function () {
            var a = this,
              e = a.chart,
              h = a.yAxis.center,
              d = a.pivot,
              b = a.options,
              g = b.pivot,
              n = e.renderer
            a.points.forEach(function (p) {
              var c = p.graphic,
                f = p.shapeArgs,
                q = f.d,
                d = w(b.dial, p.dial)
              c
                ? (c.animate(f), (f.d = q))
                : (p.graphic = n[p.shapeType](f)
                    .attr({ rotation: f.rotation, zIndex: 1 })
                    .addClass('highcharts-dial')
                    .add(a.group))
              if (!e.styledMode)
                p.graphic[c ? 'animate' : 'attr']({
                  stroke: d.borderColor || 'none',
                  'stroke-width': d.borderWidth || 0,
                  fill: d.backgroundColor || '#000000'
                })
            })
            d
              ? d.animate({ translateX: h[0], translateY: h[1] })
              : ((a.pivot = n
                  .circle(0, 0, m(g.radius, 5))
                  .attr({ zIndex: 2 })
                  .addClass('highcharts-pivot')
                  .translate(h[0], h[1])
                  .add(a.group)),
                e.styledMode ||
                  a.pivot.attr({
                    'stroke-width': g.borderWidth || 0,
                    stroke: g.borderColor || '#cccccc',
                    fill: g.backgroundColor || '#000000'
                  }))
          },
          animate: function (a) {
            var e = this
            a ||
              (e.points.forEach(function (a) {
                var d = a.graphic
                d &&
                  (d.attr({ rotation: (180 * e.yAxis.startAngleRad) / Math.PI }),
                  d.animate({ rotation: a.shapeArgs.rotation }, e.options.animation))
              }),
              (e.animate = null))
          },
          render: function () {
            this.group = this.plotGroup(
              'group',
              'series',
              this.visible ? 'visible' : 'hidden',
              this.options.zIndex,
              this.chart.seriesGroup
            )
            z.prototype.render.call(this)
            this.group.clip(this.chart.clipRect)
          },
          setData: function (a, e) {
            z.prototype.setData.call(this, a, !1)
            this.processData()
            this.generatePoints()
            m(e, !0) && this.chart.redraw()
          },
          hasData: function () {
            return !!this.points.length
          },
          drawTracker: e && e.drawTrackerPoint
        },
        {
          setState: function (a) {
            this.state = a
          }
        }
      )
      ;('')
    }
  )
  A(
    t,
    'parts-more/BoxPlotSeries.js',
    [t['parts/Globals.js'], t['parts/Utilities.js']],
    function (b, a) {
      var r = a.pick
      a = b.noop
      var g = b.seriesType,
        m = b.seriesTypes
      g(
        'boxplot',
        'column',
        {
          threshold: null,
          tooltip: {
            pointFormat:
              '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'
          },
          whiskerLength: '50%',
          fillColor: '#ffffff',
          lineWidth: 1,
          medianWidth: 2,
          whiskerWidth: 2
        },
        {
          pointArrayMap: ['low', 'q1', 'median', 'q3', 'high'],
          toYData: function (a) {
            return [a.low, a.q1, a.median, a.q3, a.high]
          },
          pointValKey: 'high',
          pointAttribs: function () {
            return {}
          },
          drawDataLabels: a,
          translate: function () {
            var a = this.yAxis,
              b = this.pointArrayMap
            m.column.prototype.translate.apply(this)
            this.points.forEach(function (g) {
              b.forEach(function (e) {
                null !== g[e] && (g[e + 'Plot'] = a.translate(g[e], 0, 1, 0, 1))
              })
            })
          },
          drawPoints: function () {
            var a = this,
              b = a.options,
              g = a.chart,
              e = g.renderer,
              l,
              m,
              h,
              d,
              B,
              x,
              n = 0,
              p,
              c,
              f,
              q,
              F = !1 !== a.doQuartiles,
              C,
              E = a.options.whiskerLength
            a.points.forEach(function (v) {
              var G = v.graphic,
                k = G ? 'animate' : 'attr',
                w = v.shapeArgs,
                u = {},
                y = {},
                D = {},
                J = {},
                t = v.color || a.color
              'undefined' !== typeof v.plotY &&
                ((p = w.width),
                (c = Math.floor(w.x)),
                (f = c + p),
                (q = Math.round(p / 2)),
                (l = Math.floor(F ? v.q1Plot : v.lowPlot)),
                (m = Math.floor(F ? v.q3Plot : v.lowPlot)),
                (h = Math.floor(v.highPlot)),
                (d = Math.floor(v.lowPlot)),
                G ||
                  ((v.graphic = G = e.g('point').add(a.group)),
                  (v.stem = e.path().addClass('highcharts-boxplot-stem').add(G)),
                  E && (v.whiskers = e.path().addClass('highcharts-boxplot-whisker').add(G)),
                  F &&
                    (v.box = e
                      .path(void 0)
                      .addClass('highcharts-boxplot-box')
                      .add(G)),
                  (v.medianShape = e
                    .path(void 0)
                    .addClass('highcharts-boxplot-median')
                    .add(G))),
                g.styledMode ||
                  ((y.stroke = v.stemColor || b.stemColor || t),
                  (y['stroke-width'] = r(v.stemWidth, b.stemWidth, b.lineWidth)),
                  (y.dashstyle = v.stemDashStyle || b.stemDashStyle),
                  v.stem.attr(y),
                  E &&
                    ((D.stroke = v.whiskerColor || b.whiskerColor || t),
                    (D['stroke-width'] = r(v.whiskerWidth, b.whiskerWidth, b.lineWidth)),
                    v.whiskers.attr(D)),
                  F &&
                    ((u.fill = v.fillColor || b.fillColor || t),
                    (u.stroke = b.lineColor || t),
                    (u['stroke-width'] = b.lineWidth || 0),
                    v.box.attr(u)),
                  (J.stroke = v.medianColor || b.medianColor || t),
                  (J['stroke-width'] = r(v.medianWidth, b.medianWidth, b.lineWidth)),
                  v.medianShape.attr(J)),
                (x = (v.stem.strokeWidth() % 2) / 2),
                (n = c + q + x),
                v.stem[k]({ d: ['M', n, m, 'L', n, h, 'M', n, l, 'L', n, d] }),
                F &&
                  ((x = (v.box.strokeWidth() % 2) / 2),
                  (l = Math.floor(l) + x),
                  (m = Math.floor(m) + x),
                  (c += x),
                  (f += x),
                  v.box[k]({ d: ['M', c, m, 'L', c, l, 'L', f, l, 'L', f, m, 'L', c, m, 'z'] })),
                E &&
                  ((x = (v.whiskers.strokeWidth() % 2) / 2),
                  (h += x),
                  (d += x),
                  (C = /%$/.test(E) ? (q * parseFloat(E)) / 100 : E / 2),
                  v.whiskers[k]({
                    d: ['M', n - C, h, 'L', n + C, h, 'M', n - C, d, 'L', n + C, d]
                  })),
                (B = Math.round(v.medianPlot)),
                (x = (v.medianShape.strokeWidth() % 2) / 2),
                (B += x),
                v.medianShape[k]({ d: ['M', c, B, 'L', f, B] }))
            })
          },
          setStackedPoints: a
        }
      )
      ;('')
    }
  )
  A(t, 'parts-more/ErrorBarSeries.js', [t['parts/Globals.js']], function (b) {
    var a = b.noop,
      r = b.seriesType,
      g = b.seriesTypes
    r(
      'errorbar',
      'boxplot',
      {
        color: '#000000',
        grouping: !1,
        linkedTo: ':previous',
        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
        },
        whiskerWidth: null
      },
      {
        type: 'errorbar',
        pointArrayMap: ['low', 'high'],
        toYData: function (a) {
          return [a.low, a.high]
        },
        pointValKey: 'high',
        doQuartiles: !1,
        drawDataLabels: g.arearange
          ? function () {
              var a = this.pointValKey
              g.arearange.prototype.drawDataLabels.call(this)
              this.data.forEach(function (b) {
                b.y = b[a]
              })
            }
          : a,
        getColumnMetrics: function () {
          return (
            (this.linkedParent && this.linkedParent.columnMetrics) ||
            g.column.prototype.getColumnMetrics.call(this)
          )
        }
      }
    )
    ;('')
  })
  A(
    t,
    'parts-more/WaterfallSeries.js',
    [t['parts/Globals.js'], t['parts/Utilities.js']],
    function (b, a) {
      var r = a.arrayMax,
        g = a.arrayMin,
        m = a.correctFloat,
        k = a.isNumber,
        w = a.objectEach,
        t = a.pick
      a = b.addEvent
      var e = b.Axis,
        l = b.Chart,
        u = b.Point,
        h = b.Series,
        d = b.StackItem,
        B = b.seriesType,
        x = b.seriesTypes
      a(e, 'afterInit', function () {
        this.isXAxis || (this.waterfallStacks = { changed: !1 })
      })
      a(e, 'afterBuildStacks', function () {
        this.waterfallStacks.changed = !1
        delete this.waterfallStacks.alreadyChanged
      })
      a(l, 'beforeRedraw', function () {
        for (var a = this.axes, p = this.series, c = p.length; c--; )
          p[c].options.stacking &&
            (a.forEach(function (f) {
              f.isXAxis || (f.waterfallStacks.changed = !0)
            }),
            (c = 0))
      })
      a(e, 'afterRender', function () {
        var a = this.options.stackLabels
        a && a.enabled && this.waterfallStacks && this.renderWaterfallStackTotals()
      })
      e.prototype.renderWaterfallStackTotals = function () {
        var a = this.waterfallStacks,
          p = this.stackTotalGroup,
          c = new d(this, this.options.stackLabels, !1, 0, void 0)
        this.dummyStackItem = c
        w(a, function (f) {
          w(f, function (f) {
            c.total = f.stackTotal
            f.label && (c.label = f.label)
            d.prototype.render.call(c, p)
            f.label = c.label
            delete c.label
          })
        })
        c.total = null
      }
      B(
        'waterfall',
        'column',
        {
          dataLabels: { inside: !0 },
          lineWidth: 1,
          lineColor: '#333333',
          dashStyle: 'Dot',
          borderColor: '#333333',
          states: { hover: { lineWidthPlus: 0 } }
        },
        {
          pointValKey: 'y',
          showLine: !0,
          generatePoints: function () {
            var a
            x.column.prototype.generatePoints.apply(this)
            var p = 0
            for (a = this.points.length; p < a; p++) {
              var c = this.points[p]
              var f = this.processedYData[p]
              if (c.isIntermediateSum || c.isSum) c.y = m(f)
            }
          },
          translate: function () {
            var a = this.options,
              p = this.yAxis,
              c,
              f = t(a.minPointLength, 5),
              q = f / 2,
              e = a.threshold,
              d = a.stacking,
              b = p.waterfallStacks[this.stackKey]
            x.column.prototype.translate.apply(this)
            var h = (c = e)
            var g = this.points
            var l = 0
            for (a = g.length; l < a; l++) {
              var m = g[l]
              var r = this.processedYData[l]
              var y = m.shapeArgs
              var k = [0, r]
              var u = m.y
              if (d) {
                if (b) {
                  k = b[l]
                  if ('overlap' === d) {
                    var w = k.stackState[k.stateIndex--]
                    w = 0 <= u ? w : w - u
                    Object.hasOwnProperty.call(k, 'absolutePos') && delete k.absolutePos
                    Object.hasOwnProperty.call(k, 'absoluteNeg') && delete k.absoluteNeg
                  } else
                    0 <= u
                      ? ((w = k.threshold + k.posTotal), (k.posTotal -= u))
                      : ((w = k.threshold + k.negTotal), (k.negTotal -= u), (w -= u)),
                      !k.posTotal &&
                        Object.hasOwnProperty.call(k, 'absolutePos') &&
                        ((k.posTotal = k.absolutePos), delete k.absolutePos),
                      !k.negTotal &&
                        Object.hasOwnProperty.call(k, 'absoluteNeg') &&
                        ((k.negTotal = k.absoluteNeg), delete k.absoluteNeg)
                  m.isSum || (k.connectorThreshold = k.threshold + k.stackTotal)
                  p.reversed ? ((r = 0 <= u ? w - u : w + u), (u = w)) : ((r = w), (u = w - u))
                  m.below = r <= t(e, 0)
                  y.y = p.translate(r, 0, 1, 0, 1)
                  y.height = Math.abs(y.y - p.translate(u, 0, 1, 0, 1))
                }
                if ((u = p.dummyStackItem))
                  (u.x = l),
                    (u.label = b[l].label),
                    u.setOffset(
                      this.pointXOffset || 0,
                      this.barW || 0,
                      this.stackedYNeg[l],
                      this.stackedYPos[l]
                    )
              } else
                (w = Math.max(h, h + u) + k[0]),
                  (y.y = p.translate(w, 0, 1, 0, 1)),
                  m.isSum
                    ? ((y.y = p.translate(k[1], 0, 1, 0, 1)),
                      (y.height = Math.min(p.translate(k[0], 0, 1, 0, 1), p.len) - y.y))
                    : m.isIntermediateSum
                      ? (0 <= u ? ((r = k[1] + c), (u = c)) : ((r = c), (u = k[1] + c)),
                        p.reversed && ((r ^= u), (u ^= r), (r ^= u)),
                        (y.y = p.translate(r, 0, 1, 0, 1)),
                        (y.height = Math.abs(y.y - Math.min(p.translate(u, 0, 1, 0, 1), p.len))),
                        (c += k[1]))
                      : ((y.height =
                          0 < r
                            ? p.translate(h, 0, 1, 0, 1) - y.y
                            : p.translate(h, 0, 1, 0, 1) - p.translate(h - r, 0, 1, 0, 1)),
                        (h += r),
                        (m.below = h < t(e, 0))),
                  0 > y.height && ((y.y += y.height), (y.height *= -1))
              m.plotY = y.y = Math.round(y.y) - (this.borderWidth % 2) / 2
              y.height = Math.max(Math.round(y.height), 0.001)
              m.yBottom = y.y + y.height
              y.height <= f && !m.isNull
                ? ((y.height = f),
                  (y.y -= q),
                  (m.plotY = y.y),
                  (m.minPointLengthOffset = 0 > m.y ? -q : q))
                : (m.isNull && (y.width = 0), (m.minPointLengthOffset = 0))
              y = m.plotY + (m.negative ? y.height : 0)
              this.chart.inverted ? (m.tooltipPos[0] = p.len - y) : (m.tooltipPos[1] = y)
            }
          },
          processData: function (a) {
            var p = this.options,
              c = this.yData,
              f = p.data,
              q = c.length,
              e = p.threshold || 0,
              d,
              b,
              n,
              g,
              l
            for (l = b = d = n = g = 0; l < q; l++) {
              var r = c[l]
              var k = f && f[l] ? f[l] : {}
              'sum' === r || k.isSum
                ? (c[l] = m(b))
                : 'intermediateSum' === r || k.isIntermediateSum
                  ? ((c[l] = m(d)), (d = 0))
                  : ((b += r), (d += r))
              n = Math.min(b, n)
              g = Math.max(b, g)
            }
            h.prototype.processData.call(this, a)
            p.stacking || ((this.dataMin = n + e), (this.dataMax = g))
          },
          toYData: function (a) {
            return a.isSum ? 'sum' : a.isIntermediateSum ? 'intermediateSum' : a.y
          },
          updateParallelArrays: function (a, p) {
            h.prototype.updateParallelArrays.call(this, a, p)
            if ('sum' === this.yData[0] || 'intermediateSum' === this.yData[0]) this.yData[0] = null
          },
          pointAttribs: function (a, p) {
            var c = this.options.upColor
            c && !a.options.color && (a.color = 0 < a.y ? c : null)
            a = x.column.prototype.pointAttribs.call(this, a, p)
            delete a.dashstyle
            return a
          },
          getGraphPath: function () {
            return ['M', 0, 0]
          },
          getCrispPath: function () {
            var a = this.data,
              p = this.yAxis,
              c = a.length,
              f = (Math.round(this.graph.strokeWidth()) % 2) / 2,
              q = (Math.round(this.borderWidth) % 2) / 2,
              e = this.xAxis.reversed,
              d = this.yAxis.reversed,
              b = this.options.stacking,
              h = [],
              l
            for (l = 1; l < c; l++) {
              var g = a[l].shapeArgs
              var m = a[l - 1]
              var r = a[l - 1].shapeArgs
              var k = p.waterfallStacks[this.stackKey]
              var u = 0 < m.y ? -r.height : 0
              if (k) {
                k = k[l - 1]
                b
                  ? ((k = k.connectorThreshold),
                    (u = Math.round(p.translate(k, 0, 1, 0, 1) + (d ? u : 0)) - f))
                  : (u = r.y + m.minPointLengthOffset + q - f)
                var w = ['M', r.x + (e ? 0 : r.width), u, 'L', g.x + (e ? g.width : 0), u]
              }
              if ((!b && w && 0 > m.y && !d) || (0 < m.y && d))
                (w[2] += r.height), (w[5] += r.height)
              h = h.concat(w)
            }
            return h
          },
          drawGraph: function () {
            h.prototype.drawGraph.call(this)
            this.graph.attr({ d: this.getCrispPath() })
          },
          setStackedPoints: function () {
            function a(f, a, c, q) {
              if (A) for (c; c < A; c++) x.stackState[c] += q
              else (x.stackState[0] = f), (A = x.stackState.length)
              x.stackState.push(x.stackState[A - 1] + a)
            }
            var p = this.options,
              c = this.yAxis.waterfallStacks,
              f = p.threshold,
              q = f || 0,
              e = q,
              d = this.stackKey,
              b = this.xData,
              h = b.length,
              l,
              g,
              m
            this.yAxis.usePercentage = !1
            var r = (g = m = q)
            if (this.visible || !this.chart.options.chart.ignoreHiddenSeries) {
              var k = c.changed
              ;(l = c.alreadyChanged) && 0 > l.indexOf(d) && (k = !0)
              c[d] || (c[d] = {})
              l = c[d]
              for (var u = 0; u < h; u++) {
                var w = b[u]
                if (!l[w] || k)
                  l[w] = {
                    negTotal: 0,
                    posTotal: 0,
                    stackTotal: 0,
                    threshold: 0,
                    stateIndex: 0,
                    stackState: [],
                    label: k && l[w] ? l[w].label : void 0
                  }
                var x = l[w]
                var B = this.yData[u]
                0 <= B ? (x.posTotal += B) : (x.negTotal += B)
                var t = p.data[u]
                w = x.absolutePos = x.posTotal
                var z = (x.absoluteNeg = x.negTotal)
                x.stackTotal = w + z
                var A = x.stackState.length
                t && t.isIntermediateSum
                  ? (a(m, g, 0, m), (m = g), (g = f), (q ^= e), (e ^= q), (q ^= e))
                  : t && t.isSum
                    ? (a(f, r, A), (q = f))
                    : (a(q, B, 0, r), t && ((r += B), (g += B)))
                x.stateIndex++
                x.threshold = q
                q += x.stackTotal
              }
              c.changed = !1
              c.alreadyChanged || (c.alreadyChanged = [])
              c.alreadyChanged.push(d)
            }
          },
          getExtremes: function () {
            var a = this.options.stacking
            if (a) {
              var e = this.yAxis
              e = e.waterfallStacks
              var c = (this.stackedYNeg = [])
              var f = (this.stackedYPos = [])
              'overlap' === a
                ? w(e[this.stackKey], function (a) {
                    c.push(g(a.stackState))
                    f.push(r(a.stackState))
                  })
                : w(e[this.stackKey], function (a) {
                    c.push(a.negTotal + a.threshold)
                    f.push(a.posTotal + a.threshold)
                  })
              this.dataMin = g(c)
              this.dataMax = r(f)
            }
          }
        },
        {
          getClassName: function () {
            var a = u.prototype.getClassName.call(this)
            this.isSum
              ? (a += ' highcharts-sum')
              : this.isIntermediateSum && (a += ' highcharts-intermediate-sum')
            return a
          },
          isValid: function () {
            return k(this.y) || this.isSum || this.isIntermediateSum
          }
        }
      )
      ;('')
    }
  )
  A(t, 'parts-more/PolygonSeries.js', [t['parts/Globals.js']], function (b) {
    var a = b.Series,
      r = b.seriesType,
      g = b.seriesTypes
    r(
      'polygon',
      'scatter',
      {
        marker: { enabled: !1, states: { hover: { enabled: !1 } } },
        stickyTracking: !1,
        tooltip: { followPointer: !0, pointFormat: '' },
        trackByArea: !0
      },
      {
        type: 'polygon',
        getGraphPath: function () {
          for (var b = a.prototype.getGraphPath.call(this), g = b.length + 1; g--; )
            (g === b.length || 'M' === b[g]) && 0 < g && b.splice(g, 0, 'z')
          return (this.areaPath = b)
        },
        drawGraph: function () {
          this.options.fillColor = this.color
          g.area.prototype.drawGraph.call(this)
        },
        drawLegendSymbol: b.LegendSymbolMixin.drawRectangle,
        drawTracker: a.prototype.drawTracker,
        setStackedPoints: b.noop
      }
    )
    ;('')
  })
  A(
    t,
    'parts-more/BubbleLegend.js',
    [t['parts/Globals.js'], t['parts/Utilities.js']],
    function (b, a) {
      var r = a.arrayMax,
        g = a.arrayMin,
        m = a.isNumber,
        k = a.objectEach,
        w = a.pick
      a = a.wrap
      var t = b.Series,
        e = b.Legend,
        l = b.Chart,
        u = b.addEvent,
        h = b.color,
        d = b.merge,
        B = b.noop,
        x = b.stableSort,
        n = b.setOptions
      n({
        legend: {
          bubbleLegend: {
            borderColor: void 0,
            borderWidth: 2,
            className: void 0,
            color: void 0,
            connectorClassName: void 0,
            connectorColor: void 0,
            connectorDistance: 60,
            connectorWidth: 1,
            enabled: !1,
            labels: {
              className: void 0,
              allowOverlap: !1,
              format: '',
              formatter: void 0,
              align: 'right',
              style: { fontSize: 10, color: void 0 },
              x: 0,
              y: 0
            },
            maxSize: 60,
            minSize: 10,
            legendIndex: 0,
            ranges: { value: void 0, borderColor: void 0, color: void 0, connectorColor: void 0 },
            sizeBy: 'area',
            sizeByAbsoluteValue: !1,
            zIndex: 1,
            zThreshold: 0
          }
        }
      })
      b.BubbleLegend = function (a, c) {
        this.init(a, c)
      }
      b.BubbleLegend.prototype = {
        init: function (a, c) {
          this.options = a
          this.visible = !0
          this.chart = c.chart
          this.legend = c
        },
        setState: B,
        addToLegend: function (a) {
          a.splice(this.options.legendIndex, 0, this)
        },
        drawLegendSymbol: function (a) {
          var c = this.chart,
            f = this.options,
            q = w(a.options.itemDistance, 20),
            e = f.ranges
          var d = f.connectorDistance
          this.fontMetrics = c.renderer.fontMetrics(f.labels.style.fontSize.toString() + 'px')
          e && e.length && m(e[0].value)
            ? (x(e, function (f, a) {
                return a.value - f.value
              }),
              (this.ranges = e),
              this.setOptions(),
              this.render(),
              (c = this.getMaxLabelSize()),
              (e = this.ranges[0].radius),
              (a = 2 * e),
              (d = d - e + c.width),
              (d = 0 < d ? d : 0),
              (this.maxLabel = c),
              (this.movementX = 'left' === f.labels.align ? d : 0),
              (this.legendItemWidth = a + d + q),
              (this.legendItemHeight = a + this.fontMetrics.h / 2))
            : (a.options.bubbleLegend.autoRanges = !0)
        },
        setOptions: function () {
          var a = this.ranges,
            c = this.options,
            f = this.chart.series[c.seriesIndex],
            e = this.legend.baseline,
            b = { 'z-index': c.zIndex, 'stroke-width': c.borderWidth },
            l = { 'z-index': c.zIndex, 'stroke-width': c.connectorWidth },
            g = this.getLabelStyles(),
            n = f.options.marker.fillOpacity,
            m = this.chart.styledMode
          a.forEach(function (q, p) {
            m ||
              ((b.stroke = w(q.borderColor, c.borderColor, f.color)),
              (b.fill = w(
                q.color,
                c.color,
                1 !== n ? h(f.color).setOpacity(n).get('rgba') : f.color
              )),
              (l.stroke = w(q.connectorColor, c.connectorColor, f.color)))
            a[p].radius = this.getRangeRadius(q.value)
            a[p] = d(a[p], { center: a[0].radius - a[p].radius + e })
            m || d(!0, a[p], { bubbleStyle: d(!1, b), connectorStyle: d(!1, l), labelStyle: g })
          }, this)
        },
        getLabelStyles: function () {
          var a = this.options,
            c = {},
            f = 'left' === a.labels.align,
            e = this.legend.options.rtl
          k(a.labels.style, function (f, a) {
            'color' !== a && 'fontSize' !== a && 'z-index' !== a && (c[a] = f)
          })
          return d(!1, c, {
            'font-size': a.labels.style.fontSize,
            fill: w(a.labels.style.color, '#000000'),
            'z-index': a.zIndex,
            align: e || f ? 'right' : 'left'
          })
        },
        getRangeRadius: function (a) {
          var c = this.options
          return this.chart.series[this.options.seriesIndex].getRadius.call(
            this,
            c.ranges[c.ranges.length - 1].value,
            c.ranges[0].value,
            c.minSize,
            c.maxSize,
            a
          )
        },
        render: function () {
          var a = this.chart.renderer,
            c = this.options.zThreshold
          this.symbols || (this.symbols = { connectors: [], bubbleItems: [], labels: [] })
          this.legendSymbol = a.g('bubble-legend')
          this.legendItem = a.g('bubble-legend-item')
          this.legendSymbol.translateX = 0
          this.legendSymbol.translateY = 0
          this.ranges.forEach(function (f) {
            f.value >= c && this.renderRange(f)
          }, this)
          this.legendSymbol.add(this.legendItem)
          this.legendItem.add(this.legendGroup)
          this.hideOverlappingLabels()
        },
        renderRange: function (a) {
          var c = this.options,
            f = c.labels,
            e = this.chart.renderer,
            d = this.symbols,
            p = d.labels,
            b = a.center,
            h = Math.abs(a.radius),
            l = c.connectorDistance,
            n = f.align,
            g = f.style.fontSize
          l = this.legend.options.rtl || 'left' === n ? -l : l
          f = c.connectorWidth
          var m = this.ranges[0].radius,
            r = b - h - c.borderWidth / 2 + f / 2
          g = g / 2 - (this.fontMetrics.h - g) / 2
          var k = e.styledMode
          'center' === n && ((l = 0), (c.connectorDistance = 0), (a.labelStyle.align = 'center'))
          n = r + c.labels.y
          var u = m + l + c.labels.x
          d.bubbleItems.push(
            e
              .circle(m, b + ((r % 1 ? 1 : 0.5) - (f % 2 ? 0 : 0.5)), h)
              .attr(k ? {} : a.bubbleStyle)
              .addClass(
                (k ? 'highcharts-color-' + this.options.seriesIndex + ' ' : '') +
                  'highcharts-bubble-legend-symbol ' +
                  (c.className || '')
              )
              .add(this.legendSymbol)
          )
          d.connectors.push(
            e
              .path(e.crispLine(['M', m, r, 'L', m + l, r], c.connectorWidth))
              .attr(k ? {} : a.connectorStyle)
              .addClass(
                (k ? 'highcharts-color-' + this.options.seriesIndex + ' ' : '') +
                  'highcharts-bubble-legend-connectors ' +
                  (c.connectorClassName || '')
              )
              .add(this.legendSymbol)
          )
          a = e
            .text(this.formatLabel(a), u, n + g)
            .attr(k ? {} : a.labelStyle)
            .addClass('highcharts-bubble-legend-labels ' + (c.labels.className || ''))
            .add(this.legendSymbol)
          p.push(a)
          a.placed = !0
          a.alignAttr = { x: u, y: n + g }
        },
        getMaxLabelSize: function () {
          var a, c
          this.symbols.labels.forEach(function (f) {
            c = f.getBBox(!0)
            a = a ? (c.width > a.width ? c : a) : c
          })
          return a || {}
        },
        formatLabel: function (a) {
          var c = this.options,
            f = c.labels.formatter
          c = c.labels.format
          var e = this.chart.numberFormatter
          return c ? b.format(c, a) : f ? f.call(a) : e(a.value, 1)
        },
        hideOverlappingLabels: function () {
          var a = this.chart,
            c = this.symbols
          !this.options.labels.allowOverlap &&
            c &&
            (a.hideOverlappingLabels(c.labels),
            c.labels.forEach(function (f, a) {
              f.newOpacity
                ? f.newOpacity !== f.oldOpacity && c.connectors[a].show()
                : c.connectors[a].hide()
            }))
        },
        getRanges: function () {
          var a = this.legend.bubbleLegend,
            c = a.options.ranges,
            f,
            e = Number.MAX_VALUE,
            b = -Number.MAX_VALUE
          a.chart.series.forEach(function (a) {
            a.isBubble &&
              !a.ignoreSeries &&
              ((f = a.zData.filter(m)),
              f.length &&
                ((e = w(
                  a.options.zMin,
                  Math.min(
                    e,
                    Math.max(
                      g(f),
                      !1 === a.options.displayNegative ? a.options.zThreshold : -Number.MAX_VALUE
                    )
                  )
                )),
                (b = w(a.options.zMax, Math.max(b, r(f))))))
          })
          var h =
            e === b
              ? [{ value: b }]
              : [{ value: e }, { value: (e + b) / 2 }, { value: b, autoRanges: !0 }]
          c.length && c[0].radius && h.reverse()
          h.forEach(function (a, f) {
            c && c[f] && (h[f] = d(!1, c[f], a))
          })
          return h
        },
        predictBubbleSizes: function () {
          var a = this.chart,
            c = this.fontMetrics,
            f = a.legend.options,
            e = 'horizontal' === f.layout,
            d = e ? a.legend.lastLineHeight : 0,
            b = a.plotSizeX,
            h = a.plotSizeY,
            l = a.series[this.options.seriesIndex]
          a = Math.ceil(l.minPxSize)
          var n = Math.ceil(l.maxPxSize)
          l = l.options.maxSize
          var g = Math.min(h, b)
          if (f.floating || !/%$/.test(l)) c = n
          else if (
            ((l = parseFloat(l)),
            (c = ((g + d - c.h / 2) * l) / 100 / (l / 100 + 1)),
            (e && h - c >= b) || (!e && b - c >= h))
          )
            c = n
          return [a, Math.ceil(c)]
        },
        updateRanges: function (a, c) {
          var f = this.legend.options.bubbleLegend
          f.minSize = a
          f.maxSize = c
          f.ranges = this.getRanges()
        },
        correctSizes: function () {
          var a = this.legend,
            c = this.chart.series[this.options.seriesIndex]
          1 < Math.abs(Math.ceil(c.maxPxSize) - this.options.maxSize) &&
            (this.updateRanges(this.options.minSize, c.maxPxSize), a.render())
        }
      }
      u(b.Legend, 'afterGetAllItems', function (a) {
        var c = this.bubbleLegend,
          f = this.options,
          e = f.bubbleLegend,
          d = this.chart.getVisibleBubbleSeriesIndex()
        c &&
          c.ranges &&
          c.ranges.length &&
          (e.ranges.length && (e.autoRanges = !!e.ranges[0].autoRanges), this.destroyItem(c))
        0 <= d &&
          f.enabled &&
          e.enabled &&
          ((e.seriesIndex = d),
          (this.bubbleLegend = new b.BubbleLegend(e, this)),
          this.bubbleLegend.addToLegend(a.allItems))
      })
      l.prototype.getVisibleBubbleSeriesIndex = function () {
        for (var a = this.series, c = 0; c < a.length; ) {
          if (a[c] && a[c].isBubble && a[c].visible && a[c].zData.length) return c
          c++
        }
        return -1
      }
      e.prototype.getLinesHeights = function () {
        var a = this.allItems,
          c = [],
          f = a.length,
          e,
          d = 0
        for (e = 0; e < f; e++)
          if (
            (a[e].legendItemHeight && (a[e].itemHeight = a[e].legendItemHeight),
            a[e] === a[f - 1] ||
              (a[e + 1] && a[e]._legendItemPos[1] !== a[e + 1]._legendItemPos[1]))
          ) {
            c.push({ height: 0 })
            var b = c[c.length - 1]
            for (d; d <= e; d++) a[d].itemHeight > b.height && (b.height = a[d].itemHeight)
            b.step = e
          }
        return c
      }
      e.prototype.retranslateItems = function (a) {
        var c,
          f,
          e,
          d = this.options.rtl,
          b = 0
        this.allItems.forEach(function (q, h) {
          c = q.legendGroup.translateX
          f = q._legendItemPos[1]
          if ((e = q.movementX) || (d && q.ranges))
            (e = d ? c - q.options.maxSize / 2 : c + e), q.legendGroup.attr({ translateX: e })
          h > a[b].step && b++
          q.legendGroup.attr({ translateY: Math.round(f + a[b].height / 2) })
          q._legendItemPos[1] = f + a[b].height / 2
        })
      }
      u(t, 'legendItemClick', function () {
        var a = this.chart,
          c = this.visible,
          f = this.chart.legend
        f &&
          f.bubbleLegend &&
          ((this.visible = !c),
          (this.ignoreSeries = c),
          (a = 0 <= a.getVisibleBubbleSeriesIndex()),
          f.bubbleLegend.visible !== a &&
            (f.update({ bubbleLegend: { enabled: a } }), (f.bubbleLegend.visible = a)),
          (this.visible = c))
      })
      a(l.prototype, 'drawChartBox', function (a, c, f) {
        var e = this.legend,
          d = 0 <= this.getVisibleBubbleSeriesIndex()
        if (e && e.options.enabled && e.bubbleLegend && e.options.bubbleLegend.autoRanges && d) {
          var b = e.bubbleLegend.options
          d = e.bubbleLegend.predictBubbleSizes()
          e.bubbleLegend.updateRanges(d[0], d[1])
          b.placed ||
            ((e.group.placed = !1),
            e.allItems.forEach(function (a) {
              a.legendGroup.translateY = null
            }))
          e.render()
          this.getMargins()
          this.axes.forEach(function (a) {
            a.visible && a.render()
            b.placed ||
              (a.setScale(),
              a.updateNames(),
              k(a.ticks, function (a) {
                a.isNew = !0
                a.isNewLabel = !0
              }))
          })
          b.placed = !0
          this.getMargins()
          a.call(this, c, f)
          e.bubbleLegend.correctSizes()
          e.retranslateItems(e.getLinesHeights())
        } else
          a.call(this, c, f),
            e &&
              e.options.enabled &&
              e.bubbleLegend &&
              (e.render(), e.retranslateItems(e.getLinesHeights()))
      })
    }
  )
  A(
    t,
    'parts-more/BubbleSeries.js',
    [t['parts/Globals.js'], t['parts/Utilities.js']],
    function (b, a) {
      var r = a.arrayMax,
        g = a.arrayMin,
        m = a.clamp,
        k = a.extend,
        w = a.isNumber,
        t = a.pick,
        e = a.pInt
      a = b.Axis
      var l = b.color,
        u = b.noop,
        h = b.Point,
        d = b.Series,
        B = b.seriesType,
        x = b.seriesTypes
      B(
        'bubble',
        'scatter',
        {
          dataLabels: {
            formatter: function () {
              return this.point.z
            },
            inside: !0,
            verticalAlign: 'middle'
          },
          animationLimit: 250,
          marker: {
            lineColor: null,
            lineWidth: 1,
            fillOpacity: 0.5,
            radius: null,
            states: { hover: { radiusPlus: 0 } },
            symbol: 'circle'
          },
          minSize: 8,
          maxSize: '20%',
          softThreshold: !1,
          states: { hover: { halo: { size: 5 } } },
          tooltip: { pointFormat: '({point.x}, {point.y}), Size: {point.z}' },
          turboThreshold: 0,
          zThreshold: 0,
          zoneAxis: 'z'
        },
        {
          pointArrayMap: ['y', 'z'],
          parallelArrays: ['x', 'y', 'z'],
          trackerGroups: ['group', 'dataLabelsGroup'],
          specialGroup: 'group',
          bubblePadding: !0,
          zoneAxis: 'z',
          directTouch: !0,
          isBubble: !0,
          pointAttribs: function (a, e) {
            var c = this.options.marker.fillOpacity
            a = d.prototype.pointAttribs.call(this, a, e)
            1 !== c && (a.fill = l(a.fill).setOpacity(c).get('rgba'))
            return a
          },
          getRadii: function (a, e, c) {
            var f = this.zData,
              d = this.yData,
              b = c.minPxSize,
              h = c.maxPxSize,
              l = []
            var g = 0
            for (c = f.length; g < c; g++) {
              var p = f[g]
              l.push(this.getRadius(a, e, b, h, p, d[g]))
            }
            this.radii = l
          },
          getRadius: function (a, e, c, f, d, b) {
            var q = this.options,
              h = 'width' !== q.sizeBy,
              l = q.zThreshold,
              g = e - a,
              p = 0.5
            if (null === b || null === d) return null
            if (w(d)) {
              q.sizeByAbsoluteValue &&
                ((d = Math.abs(d - l)), (g = Math.max(e - l, Math.abs(a - l))), (a = 0))
              if (d < a) return c / 2 - 1
              0 < g && (p = (d - a) / g)
            }
            h && 0 <= p && (p = Math.sqrt(p))
            return Math.ceil(c + p * (f - c)) / 2
          },
          animate: function (a) {
            !a &&
              this.points.length < this.options.animationLimit &&
              (this.points.forEach(function (a) {
                var e = a.graphic
                if (e && e.width) {
                  var f = { x: e.x, y: e.y, width: e.width, height: e.height }
                  e.attr({ x: a.plotX, y: a.plotY, width: 1, height: 1 })
                  e.animate(f, this.options.animation)
                }
              }, this),
              (this.animate = null))
          },
          hasData: function () {
            return !!this.processedXData.length
          },
          translate: function () {
            var a,
              e = this.data,
              c = this.radii
            x.scatter.prototype.translate.call(this)
            for (a = e.length; a--; ) {
              var f = e[a]
              var d = c ? c[a] : 0
              w(d) && d >= this.minPxSize / 2
                ? ((f.marker = k(f.marker, { radius: d, width: 2 * d, height: 2 * d })),
                  (f.dlBox = { x: f.plotX - d, y: f.plotY - d, width: 2 * d, height: 2 * d }))
                : (f.shapeArgs = f.plotY = f.dlBox = void 0)
            }
          },
          alignDataLabel: x.column.prototype.alignDataLabel,
          buildKDTree: u,
          applyZones: u
        },
        {
          haloPath: function (a) {
            return h.prototype.haloPath.call(
              this,
              0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a
            )
          },
          ttBelow: !1
        }
      )
      a.prototype.beforePadding = function () {
        var a = this,
          d = this.len,
          c = this.chart,
          f = 0,
          b = d,
          h = this.isXAxis,
          l = h ? 'xData' : 'yData',
          k = this.min,
          v = {},
          u = Math.min(c.plotWidth, c.plotHeight),
          x = Number.MAX_VALUE,
          B = -Number.MAX_VALUE,
          z = this.max - k,
          y = d / z,
          D = []
        this.series.forEach(function (f) {
          var d = f.options
          !f.bubblePadding ||
            (!f.visible && c.options.chart.ignoreHiddenSeries) ||
            ((a.allowZoomOutside = !0),
            D.push(f),
            h &&
              (['minSize', 'maxSize'].forEach(function (a) {
                var f = d[a],
                  c = /%$/.test(f)
                f = e(f)
                v[a] = c ? (u * f) / 100 : f
              }),
              (f.minPxSize = v.minSize),
              (f.maxPxSize = Math.max(v.maxSize, v.minSize)),
              (f = f.zData.filter(w)),
              f.length &&
                ((x = t(
                  d.zMin,
                  m(g(f), !1 === d.displayNegative ? d.zThreshold : -Number.MAX_VALUE, x)
                )),
                (B = t(d.zMax, Math.max(B, r(f)))))))
        })
        D.forEach(function (e) {
          var c = e[l],
            d = c.length
          h && e.getRadii(x, B, e)
          if (0 < z)
            for (; d--; )
              if (w(c[d]) && a.dataMin <= c[d] && c[d] <= a.max) {
                var q = e.radii ? e.radii[d] : 0
                f = Math.min((c[d] - k) * y - q, f)
                b = Math.max((c[d] - k) * y + q, b)
              }
        })
        D.length &&
          0 < z &&
          !this.isLog &&
          ((b -= d),
          (y *= (d + Math.max(0, f) - Math.min(b, d)) / d),
          [
            ['min', 'userMin', f],
            ['max', 'userMax', b]
          ].forEach(function (f) {
            'undefined' === typeof t(a.options[f[0]], a[f[1]]) && (a[f[0]] += f[2] / y)
          }))
      }
      ;('')
    }
  )
  A(t, 'modules/networkgraph/integrations.js', [t['parts/Globals.js']], function (b) {
    b.networkgraphIntegrations = {
      verlet: {
        attractiveForceFunction: function (a, b) {
          return (b - a) / a
        },
        repulsiveForceFunction: function (a, b) {
          return ((b - a) / a) * (b > a ? 1 : 0)
        },
        barycenter: function () {
          var a = this.options.gravitationalConstant,
            b = this.barycenter.xFactor,
            g = this.barycenter.yFactor
          b = (b - (this.box.left + this.box.width) / 2) * a
          g = (g - (this.box.top + this.box.height) / 2) * a
          this.nodes.forEach(function (a) {
            a.fixedPosition ||
              ((a.plotX -= b / a.mass / a.degree), (a.plotY -= g / a.mass / a.degree))
          })
        },
        repulsive: function (a, b, g) {
          b = (b * this.diffTemperature) / a.mass / a.degree
          a.fixedPosition || ((a.plotX += g.x * b), (a.plotY += g.y * b))
        },
        attractive: function (a, b, g) {
          var m = a.getMass(),
            k = -g.x * b * this.diffTemperature
          b = -g.y * b * this.diffTemperature
          a.fromNode.fixedPosition ||
            ((a.fromNode.plotX -= (k * m.fromNode) / a.fromNode.degree),
            (a.fromNode.plotY -= (b * m.fromNode) / a.fromNode.degree))
          a.toNode.fixedPosition ||
            ((a.toNode.plotX += (k * m.toNode) / a.toNode.degree),
            (a.toNode.plotY += (b * m.toNode) / a.toNode.degree))
        },
        integrate: function (a, b) {
          var g = -a.options.friction,
            m = a.options.maxSpeed,
            k = (b.plotX + b.dispX - b.prevX) * g
          g *= b.plotY + b.dispY - b.prevY
          var r = Math.abs,
            t = r(k) / (k || 1)
          r = r(g) / (g || 1)
          k = t * Math.min(m, Math.abs(k))
          g = r * Math.min(m, Math.abs(g))
          b.prevX = b.plotX + b.dispX
          b.prevY = b.plotY + b.dispY
          b.plotX += k
          b.plotY += g
          b.temperature = a.vectorLength({ x: k, y: g })
        },
        getK: function (a) {
          return Math.pow((a.box.width * a.box.height) / a.nodes.length, 0.5)
        }
      },
      euler: {
        attractiveForceFunction: function (a, b) {
          return (a * a) / b
        },
        repulsiveForceFunction: function (a, b) {
          return (b * b) / a
        },
        barycenter: function () {
          var a = this.options.gravitationalConstant,
            b = this.barycenter.xFactor,
            g = this.barycenter.yFactor
          this.nodes.forEach(function (m) {
            if (!m.fixedPosition) {
              var k = m.getDegree()
              k *= 1 + k / 2
              m.dispX += ((b - m.plotX) * a * k) / m.degree
              m.dispY += ((g - m.plotY) * a * k) / m.degree
            }
          })
        },
        repulsive: function (a, b, g, m) {
          a.dispX += ((g.x / m) * b) / a.degree
          a.dispY += ((g.y / m) * b) / a.degree
        },
        attractive: function (a, b, g, m) {
          var k = a.getMass(),
            r = (g.x / m) * b
          b *= g.y / m
          a.fromNode.fixedPosition ||
            ((a.fromNode.dispX -= (r * k.fromNode) / a.fromNode.degree),
            (a.fromNode.dispY -= (b * k.fromNode) / a.fromNode.degree))
          a.toNode.fixedPosition ||
            ((a.toNode.dispX += (r * k.toNode) / a.toNode.degree),
            (a.toNode.dispY += (b * k.toNode) / a.toNode.degree))
        },
        integrate: function (a, b) {
          b.dispX += b.dispX * a.options.friction
          b.dispY += b.dispY * a.options.friction
          var g = (b.temperature = a.vectorLength({ x: b.dispX, y: b.dispY }))
          0 !== g &&
            ((b.plotX += (b.dispX / g) * Math.min(Math.abs(b.dispX), a.temperature)),
            (b.plotY += (b.dispY / g) * Math.min(Math.abs(b.dispY), a.temperature)))
        },
        getK: function (a) {
          return Math.pow((a.box.width * a.box.height) / a.nodes.length, 0.3)
        }
      }
    }
  })
  A(
    t,
    'modules/networkgraph/QuadTree.js',
    [t['parts/Globals.js'], t['parts/Utilities.js']],
    function (b, a) {
      a = a.extend
      var r = (b.QuadTreeNode = function (a) {
        this.box = a
        this.boxSize = Math.min(a.width, a.height)
        this.nodes = []
        this.body = this.isInternal = !1
        this.isEmpty = !0
      })
      a(r.prototype, {
        insert: function (a, b) {
          this.isInternal
            ? this.nodes[this.getBoxPosition(a)].insert(a, b - 1)
            : ((this.isEmpty = !1),
              this.body
                ? b
                  ? ((this.isInternal = !0),
                    this.divideBox(),
                    !0 !== this.body &&
                      (this.nodes[this.getBoxPosition(this.body)].insert(this.body, b - 1),
                      (this.body = !0)),
                    this.nodes[this.getBoxPosition(a)].insert(a, b - 1))
                  : ((b = new r({ top: a.plotX, left: a.plotY, width: 0.1, height: 0.1 })),
                    (b.body = a),
                    (b.isInternal = !1),
                    this.nodes.push(b))
                : ((this.isInternal = !1), (this.body = a)))
        },
        updateMassAndCenter: function () {
          var a = 0,
            b = 0,
            k = 0
          this.isInternal
            ? (this.nodes.forEach(function (g) {
                g.isEmpty || ((a += g.mass), (b += g.plotX * g.mass), (k += g.plotY * g.mass))
              }),
              (b /= a),
              (k /= a))
            : this.body && ((a = this.body.mass), (b = this.body.plotX), (k = this.body.plotY))
          this.mass = a
          this.plotX = b
          this.plotY = k
        },
        divideBox: function () {
          var a = this.box.width / 2,
            b = this.box.height / 2
          this.nodes[0] = new r({ left: this.box.left, top: this.box.top, width: a, height: b })
          this.nodes[1] = new r({ left: this.box.left + a, top: this.box.top, width: a, height: b })
          this.nodes[2] = new r({
            left: this.box.left + a,
            top: this.box.top + b,
            width: a,
            height: b
          })
          this.nodes[3] = new r({ left: this.box.left, top: this.box.top + b, width: a, height: b })
        },
        getBoxPosition: function (a) {
          var b = a.plotY < this.box.top + this.box.height / 2
          return a.plotX < this.box.left + this.box.width / 2 ? (b ? 0 : 3) : b ? 1 : 2
        }
      })
      b = b.QuadTree = function (a, b, k, w) {
        this.box = { left: a, top: b, width: k, height: w }
        this.maxDepth = 25
        this.root = new r(this.box, '0')
        this.root.isInternal = !0
        this.root.isRoot = !0
        this.root.divideBox()
      }
      a(b.prototype, {
        insertNodes: function (a) {
          a.forEach(function (a) {
            this.root.insert(a, this.maxDepth)
          }, this)
        },
        visitNodeRecursive: function (a, b, k) {
          var g
          a || (a = this.root)
          a === this.root && b && (g = b(a))
          !1 !== g &&
            (a.nodes.forEach(function (a) {
              if (a.isInternal) {
                b && (g = b(a))
                if (!1 === g) return
                this.visitNodeRecursive(a, b, k)
              } else a.body && b && b(a.body)
              k && k(a)
            }, this),
            a === this.root && k && k(a))
        },
        calculateMassAndCenter: function () {
          this.visitNodeRecursive(null, null, function (a) {
            a.updateMassAndCenter()
          })
        }
      })
    }
  )
  A(
    t,
    'modules/networkgraph/layouts.js',
    [t['parts/Globals.js'], t['parts/Utilities.js']],
    function (b, a) {
      var r = a.clamp,
        g = a.defined,
        m = a.extend,
        k = a.pick,
        w = a.setAnimation
      a = b.addEvent
      var t = b.Chart
      b.layouts = { 'reingold-fruchterman': function () {} }
      m(b.layouts['reingold-fruchterman'].prototype, {
        init: function (a) {
          this.options = a
          this.nodes = []
          this.links = []
          this.series = []
          this.box = { x: 0, y: 0, width: 0, height: 0 }
          this.setInitialRendering(!0)
          this.integration = b.networkgraphIntegrations[a.integration]
          this.attractiveForce = k(a.attractiveForce, this.integration.attractiveForceFunction)
          this.repulsiveForce = k(a.repulsiveForce, this.integration.repulsiveForceFunction)
          this.approximation = a.approximation
        },
        start: function () {
          var a = this.series,
            b = this.options
          this.currentStep = 0
          this.forces = (a[0] && a[0].forces) || []
          this.initialRendering &&
            (this.initPositions(),
            a.forEach(function (a) {
              a.render()
            }))
          this.setK()
          this.resetSimulation(b)
          b.enableSimulation && this.step()
        },
        step: function () {
          var a = this,
            l = this.series,
            g = this.options
          a.currentStep++
          'barnes-hut' === a.approximation &&
            (a.createQuadTree(), a.quadTree.calculateMassAndCenter())
          a.forces.forEach(function (b) {
            a[b + 'Forces'](a.temperature)
          })
          a.applyLimits(a.temperature)
          a.temperature = a.coolDown(a.startTemperature, a.diffTemperature, a.currentStep)
          a.prevSystemTemperature = a.systemTemperature
          a.systemTemperature = a.getSystemTemperature()
          g.enableSimulation &&
            (l.forEach(function (a) {
              a.chart && a.render()
            }),
            a.maxIterations-- && isFinite(a.temperature) && !a.isStable()
              ? (a.simulation && b.win.cancelAnimationFrame(a.simulation),
                (a.simulation = b.win.requestAnimationFrame(function () {
                  a.step()
                })))
              : (a.simulation = !1))
        },
        stop: function () {
          this.simulation && b.win.cancelAnimationFrame(this.simulation)
        },
        setArea: function (a, b, g, h) {
          this.box = { left: a, top: b, width: g, height: h }
        },
        setK: function () {
          this.k = this.options.linkLength || this.integration.getK(this)
        },
        addElementsToCollection: function (a, b) {
          a.forEach(function (a) {
            ;-1 === b.indexOf(a) && b.push(a)
          })
        },
        removeElementFromCollection: function (a, b) {
          a = b.indexOf(a)
          ;-1 !== a && b.splice(a, 1)
        },
        clear: function () {
          this.nodes.length = 0
          this.links.length = 0
          this.series.length = 0
          this.resetSimulation()
        },
        resetSimulation: function () {
          this.forcedStop = !1
          this.systemTemperature = 0
          this.setMaxIterations()
          this.setTemperature()
          this.setDiffTemperature()
        },
        setMaxIterations: function (a) {
          this.maxIterations = k(a, this.options.maxIterations)
        },
        setTemperature: function () {
          this.temperature = this.startTemperature = Math.sqrt(this.nodes.length)
        },
        setDiffTemperature: function () {
          this.diffTemperature = this.startTemperature / (this.options.maxIterations + 1)
        },
        setInitialRendering: function (a) {
          this.initialRendering = a
        },
        createQuadTree: function () {
          this.quadTree = new b.QuadTree(
            this.box.left,
            this.box.top,
            this.box.width,
            this.box.height
          )
          this.quadTree.insertNodes(this.nodes)
        },
        initPositions: function () {
          var a = this.options.initialPositions
          b.isFunction(a)
            ? (a.call(this),
              this.nodes.forEach(function (a) {
                g(a.prevX) || (a.prevX = a.plotX)
                g(a.prevY) || (a.prevY = a.plotY)
                a.dispX = 0
                a.dispY = 0
              }))
            : 'circle' === a
              ? this.setCircularPositions()
              : this.setRandomPositions()
        },
        setCircularPositions: function () {
          function a(b) {
            b.linksFrom.forEach(function (b) {
              x[b.toNode.id] || ((x[b.toNode.id] = !0), m.push(b.toNode), a(b.toNode))
            })
          }
          var b = this.box,
            g = this.nodes,
            h = (2 * Math.PI) / (g.length + 1),
            d = g.filter(function (a) {
              return 0 === a.linksTo.length
            }),
            m = [],
            x = {},
            n = this.options.initialPositionRadius
          d.forEach(function (b) {
            m.push(b)
            a(b)
          })
          m.length
            ? g.forEach(function (a) {
                ;-1 === m.indexOf(a) && m.push(a)
              })
            : (m = g)
          m.forEach(function (a, c) {
            a.plotX = a.prevX = k(a.plotX, b.width / 2 + n * Math.cos(c * h))
            a.plotY = a.prevY = k(a.plotY, b.height / 2 + n * Math.sin(c * h))
            a.dispX = 0
            a.dispY = 0
          })
        },
        setRandomPositions: function () {
          function a(a) {
            a = (a * a) / Math.PI
            return (a -= Math.floor(a))
          }
          var b = this.box,
            g = this.nodes,
            h = g.length + 1
          g.forEach(function (d, e) {
            d.plotX = d.prevX = k(d.plotX, b.width * a(e))
            d.plotY = d.prevY = k(d.plotY, b.height * a(h + e))
            d.dispX = 0
            d.dispY = 0
          })
        },
        force: function (a) {
          this.integration[a].apply(this, Array.prototype.slice.call(arguments, 1))
        },
        barycenterForces: function () {
          this.getBarycenter()
          this.force('barycenter')
        },
        getBarycenter: function () {
          var a = 0,
            b = 0,
            g = 0
          this.nodes.forEach(function (e) {
            b += e.plotX * e.mass
            g += e.plotY * e.mass
            a += e.mass
          })
          return (this.barycenter = { x: b, y: g, xFactor: b / a, yFactor: g / a })
        },
        barnesHutApproximation: function (a, b) {
          var e = this.getDistXY(a, b),
            h = this.vectorLength(e)
          if (a !== b && 0 !== h)
            if (b.isInternal)
              if (b.boxSize / h < this.options.theta && 0 !== h) {
                var d = this.repulsiveForce(h, this.k)
                this.force('repulsive', a, d * b.mass, e, h)
                var g = !1
              } else g = !0
            else (d = this.repulsiveForce(h, this.k)), this.force('repulsive', a, d * b.mass, e, h)
          return g
        },
        repulsiveForces: function () {
          var a = this
          'barnes-hut' === a.approximation
            ? a.nodes.forEach(function (b) {
                a.quadTree.visitNodeRecursive(null, function (e) {
                  return a.barnesHutApproximation(b, e)
                })
              })
            : a.nodes.forEach(function (b) {
                a.nodes.forEach(function (e) {
                  if (b !== e && !b.fixedPosition) {
                    var h = a.getDistXY(b, e)
                    var d = a.vectorLength(h)
                    if (0 !== d) {
                      var g = a.repulsiveForce(d, a.k)
                      a.force('repulsive', b, g * e.mass, h, d)
                    }
                  }
                })
              })
        },
        attractiveForces: function () {
          var a = this,
            b,
            g,
            h
          a.links.forEach(function (d) {
            d.fromNode &&
              d.toNode &&
              ((b = a.getDistXY(d.fromNode, d.toNode)),
              (g = a.vectorLength(b)),
              0 !== g && ((h = a.attractiveForce(g, a.k)), a.force('attractive', d, h, b, g)))
          })
        },
        applyLimits: function () {
          var a = this
          a.nodes.forEach(function (b) {
            b.fixedPosition ||
              (a.integration.integrate(a, b),
              a.applyLimitBox(b, a.box),
              (b.dispX = 0),
              (b.dispY = 0))
          })
        },
        applyLimitBox: function (a, b) {
          var e = a.radius
          a.plotX = r(a.plotX, b.left + e, b.width - e)
          a.plotY = r(a.plotY, b.top + e, b.height - e)
        },
        coolDown: function (a, b, g) {
          return a - b * g
        },
        isStable: function () {
          return (
            0.00001 > Math.abs(this.systemTemperature - this.prevSystemTemperature) ||
            0 >= this.temperature
          )
        },
        getSystemTemperature: function () {
          return this.nodes.reduce(function (a, b) {
            return a + b.temperature
          }, 0)
        },
        vectorLength: function (a) {
          return Math.sqrt(a.x * a.x + a.y * a.y)
        },
        getDistR: function (a, b) {
          a = this.getDistXY(a, b)
          return this.vectorLength(a)
        },
        getDistXY: function (a, b) {
          var e = a.plotX - b.plotX
          a = a.plotY - b.plotY
          return { x: e, y: a, absX: Math.abs(e), absY: Math.abs(a) }
        }
      })
      a(t, 'predraw', function () {
        this.graphLayoutsLookup &&
          this.graphLayoutsLookup.forEach(function (a) {
            a.stop()
          })
      })
      a(t, 'render', function () {
        function a(a) {
          a.maxIterations-- &&
            isFinite(a.temperature) &&
            !a.isStable() &&
            !a.options.enableSimulation &&
            (a.beforeStep && a.beforeStep(), a.step(), (g = !1), (b = !0))
        }
        var b = !1
        if (this.graphLayoutsLookup) {
          w(!1, this)
          for (
            this.graphLayoutsLookup.forEach(function (a) {
              a.start()
            });
            !g;

          ) {
            var g = !0
            this.graphLayoutsLookup.forEach(a)
          }
          b &&
            this.series.forEach(function (a) {
              a && a.layout && a.render()
            })
        }
      })
    }
  )
  A(t, 'modules/networkgraph/draggable-nodes.js', [t['parts/Globals.js']], function (b) {
    var a = b.Chart,
      r = b.addEvent
    b.dragNodesMixin = {
      onMouseDown: function (a, b) {
        b = this.chart.pointer.normalize(b)
        a.fixedPosition = { chartX: b.chartX, chartY: b.chartY, plotX: a.plotX, plotY: a.plotY }
        a.inDragMode = !0
      },
      onMouseMove: function (a, b) {
        if (a.fixedPosition && a.inDragMode) {
          var g = this.chart,
            m = g.pointer.normalize(b)
          b = a.fixedPosition.chartX - m.chartX
          m = a.fixedPosition.chartY - m.chartY
          if (5 < Math.abs(b) || 5 < Math.abs(m))
            (b = a.fixedPosition.plotX - b),
              (m = a.fixedPosition.plotY - m),
              g.isInsidePlot(b, m) &&
                ((a.plotX = b),
                (a.plotY = m),
                (a.hasDragged = !0),
                this.redrawHalo(a),
                this.layout.simulation
                  ? this.layout.resetSimulation()
                  : (this.layout.setInitialRendering(!1),
                    this.layout.enableSimulation
                      ? this.layout.start()
                      : this.layout.setMaxIterations(1),
                    this.chart.redraw(),
                    this.layout.setInitialRendering(!0)))
        }
      },
      onMouseUp: function (a, b) {
        a.fixedPosition &&
          a.hasDragged &&
          (this.layout.enableSimulation ? this.layout.start() : this.chart.redraw(),
          (a.inDragMode = a.hasDragged = !1),
          this.options.fixedDraggable || delete a.fixedPosition)
      },
      redrawHalo: function (a) {
        a && this.halo && this.halo.attr({ d: a.haloPath(this.options.states.hover.halo.size) })
      }
    }
    r(a, 'load', function () {
      var a = this,
        b,
        k,
        t
      a.container &&
        (b = r(a.container, 'mousedown', function (b) {
          var e = a.hoverPoint
          e &&
            e.series &&
            e.series.hasDraggableNodes &&
            e.series.options.draggable &&
            (e.series.onMouseDown(e, b),
            (k = r(a.container, 'mousemove', function (a) {
              return e && e.series && e.series.onMouseMove(e, a)
            })),
            (t = r(a.container.ownerDocument, 'mouseup', function (a) {
              k()
              t()
              return e && e.series && e.series.onMouseUp(e, a)
            })))
        }))
      r(a, 'destroy', function () {
        b()
      })
    })
  })
  A(
    t,
    'parts-more/PackedBubbleSeries.js',
    [t['parts/Globals.js'], t['parts/Utilities.js']],
    function (b, a) {
      var r = a.clamp,
        g = a.defined,
        m = a.extend,
        k = a.extendClass,
        t = a.isArray,
        z = a.isNumber,
        e = a.pick
      a = b.seriesType
      var l = b.Series,
        u = b.Point,
        h = b.addEvent,
        d = b.fireEvent,
        B = b.Chart,
        x = b.Color,
        n = b.layouts['reingold-fruchterman'],
        p = b.seriesTypes.bubble.prototype.pointClass,
        c = b.dragNodesMixin
      b.networkgraphIntegrations.packedbubble = {
        repulsiveForceFunction: function (a, b, c, d) {
          return Math.min(a, (c.marker.radius + d.marker.radius) / 2)
        },
        barycenter: function () {
          var a = this,
            b = a.options.gravitationalConstant,
            c = a.box,
            d = a.nodes,
            e,
            h
          d.forEach(function (f) {
            a.options.splitSeries && !f.isParentNode
              ? ((e = f.series.parentNode.plotX), (h = f.series.parentNode.plotY))
              : ((e = c.width / 2), (h = c.height / 2))
            f.fixedPosition ||
              ((f.plotX -= ((f.plotX - e) * b) / (f.mass * Math.sqrt(d.length))),
              (f.plotY -= ((f.plotY - h) * b) / (f.mass * Math.sqrt(d.length))))
          })
        },
        repulsive: function (a, b, c, d) {
          var f = (b * this.diffTemperature) / a.mass / a.degree
          b = c.x * f
          c = c.y * f
          a.fixedPosition || ((a.plotX += b), (a.plotY += c))
          d.fixedPosition || ((d.plotX -= b), (d.plotY -= c))
        },
        integrate: b.networkgraphIntegrations.verlet.integrate,
        getK: b.noop
      }
      b.layouts.packedbubble = k(n, {
        beforeStep: function () {
          this.options.marker &&
            this.series.forEach(function (a) {
              a && a.calculateParentRadius()
            })
        },
        setCircularPositions: function () {
          var a = this,
            b = a.box,
            c = a.nodes,
            d = (2 * Math.PI) / (c.length + 1),
            h,
            g,
            n = a.options.initialPositionRadius
          c.forEach(function (f, c) {
            a.options.splitSeries && !f.isParentNode
              ? ((h = f.series.parentNode.plotX), (g = f.series.parentNode.plotY))
              : ((h = b.width / 2), (g = b.height / 2))
            f.plotX = f.prevX = e(f.plotX, h + n * Math.cos(f.index || c * d))
            f.plotY = f.prevY = e(f.plotY, g + n * Math.sin(f.index || c * d))
            f.dispX = 0
            f.dispY = 0
          })
        },
        repulsiveForces: function () {
          var a = this,
            b,
            c,
            d,
            e = a.options.bubblePadding
          a.nodes.forEach(function (f) {
            f.degree = f.mass
            f.neighbours = 0
            a.nodes.forEach(function (q) {
              b = 0
              f === q ||
                f.fixedPosition ||
                (!a.options.seriesInteraction && f.series !== q.series) ||
                ((d = a.getDistXY(f, q)),
                (c = a.vectorLength(d) - (f.marker.radius + q.marker.radius + e)),
                0 > c &&
                  ((f.degree += 0.01),
                  f.neighbours++,
                  (b = a.repulsiveForce(-c / Math.sqrt(f.neighbours), a.k, f, q))),
                a.force('repulsive', f, b * q.mass, d, q, c))
            })
          })
        },
        applyLimitBox: function (a) {
          if (this.options.splitSeries && !a.isParentNode && this.options.parentNodeLimit) {
            var f = this.getDistXY(a, a.series.parentNode)
            var b = a.series.parentNodeRadius - a.marker.radius - this.vectorLength(f)
            0 > b && b > -2 * a.marker.radius && ((a.plotX -= 0.01 * f.x), (a.plotY -= 0.01 * f.y))
          }
          n.prototype.applyLimitBox.apply(this, arguments)
        },
        isStable: function () {
          return (
            0.00001 > Math.abs(this.systemTemperature - this.prevSystemTemperature) ||
            0 >= this.temperature ||
            (0 < this.systemTemperature &&
              0.02 > this.systemTemperature / this.nodes.length &&
              this.enableSimulation)
          )
        }
      })
      a(
        'packedbubble',
        'bubble',
        {
          minSize: '10%',
          maxSize: '50%',
          sizeBy: 'area',
          zoneAxis: 'y',
          tooltip: { pointFormat: 'Value: {point.value}' },
          draggable: !0,
          useSimulation: !0,
          dataLabels: {
            formatter: function () {
              return this.point.value
            },
            parentNodeFormatter: function () {
              return this.name
            },
            parentNodeTextPath: { enabled: !0 },
            padding: 0
          },
          layoutAlgorithm: {
            initialPositions: 'circle',
            initialPositionRadius: 20,
            bubblePadding: 5,
            parentNodeLimit: !1,
            seriesInteraction: !0,
            dragBetweenSeries: !1,
            parentNodeOptions: {
              maxIterations: 400,
              gravitationalConstant: 0.03,
              maxSpeed: 50,
              initialPositionRadius: 100,
              seriesInteraction: !0,
              marker: {
                fillColor: null,
                fillOpacity: 1,
                lineWidth: 1,
                lineColor: null,
                symbol: 'circle'
              }
            },
            enableSimulation: !0,
            type: 'packedbubble',
            integration: 'packedbubble',
            maxIterations: 1e3,
            splitSeries: !1,
            maxSpeed: 5,
            gravitationalConstant: 0.01,
            friction: -0.981
          }
        },
        {
          hasDraggableNodes: !0,
          forces: ['barycenter', 'repulsive'],
          pointArrayMap: ['value'],
          pointValKey: 'value',
          isCartesian: !1,
          requireSorting: !1,
          directTouch: !0,
          axisTypes: [],
          noSharedTooltip: !0,
          searchPoint: b.noop,
          accumulateAllPoints: function (a) {
            var f = a.chart,
              b = [],
              c,
              d
            for (c = 0; c < f.series.length; c++)
              if (((a = f.series[c]), a.visible || !f.options.chart.ignoreHiddenSeries))
                for (d = 0; d < a.yData.length; d++)
                  b.push([null, null, a.yData[d], a.index, d, { id: d, marker: { radius: 0 } }])
            return b
          },
          init: function () {
            l.prototype.init.apply(this, arguments)
            h(this, 'updatedData', function () {
              this.chart.series.forEach(function (a) {
                a.type === this.type && (a.isDirty = !0)
              }, this)
            })
            return this
          },
          render: function () {
            var a = []
            l.prototype.render.apply(this, arguments)
            this.options.dataLabels.allowOverlap ||
              (this.data.forEach(function (f) {
                t(f.dataLabels) &&
                  f.dataLabels.forEach(function (f) {
                    a.push(f)
                  })
              }),
              this.chart.hideOverlappingLabels(a))
          },
          setVisible: function () {
            var a = this
            l.prototype.setVisible.apply(a, arguments)
            a.parentNodeLayout && a.graph
              ? a.visible
                ? (a.graph.show(), a.parentNode.dataLabel && a.parentNode.dataLabel.show())
                : (a.graph.hide(),
                  a.parentNodeLayout.removeElementFromCollection(
                    a.parentNode,
                    a.parentNodeLayout.nodes
                  ),
                  a.parentNode.dataLabel && a.parentNode.dataLabel.hide())
              : a.layout &&
                (a.visible
                  ? a.layout.addElementsToCollection(a.points, a.layout.nodes)
                  : a.points.forEach(function (b) {
                      a.layout.removeElementFromCollection(b, a.layout.nodes)
                    }))
          },
          drawDataLabels: function () {
            var a = this.options.dataLabels.textPath,
              b = this.points
            l.prototype.drawDataLabels.apply(this, arguments)
            this.parentNode &&
              ((this.parentNode.formatPrefix = 'parentNode'),
              (this.points = [this.parentNode]),
              (this.options.dataLabels.textPath = this.options.dataLabels.parentNodeTextPath),
              l.prototype.drawDataLabels.apply(this, arguments),
              (this.points = b),
              (this.options.dataLabels.textPath = a))
          },
          seriesBox: function () {
            var a = this.chart,
              b = Math.max,
              c = Math.min,
              d,
              e = [a.plotLeft, a.plotLeft + a.plotWidth, a.plotTop, a.plotTop + a.plotHeight]
            this.data.forEach(function (a) {
              g(a.plotX) &&
                g(a.plotY) &&
                a.marker.radius &&
                ((d = a.marker.radius),
                (e[0] = c(e[0], a.plotX - d)),
                (e[1] = b(e[1], a.plotX + d)),
                (e[2] = c(e[2], a.plotY - d)),
                (e[3] = b(e[3], a.plotY + d)))
            })
            return z(e.width / e.height) ? e : null
          },
          calculateParentRadius: function () {
            var a = this.seriesBox()
            this.parentNodeRadius = r(
              Math.sqrt((2 * this.parentNodeMass) / Math.PI) + 20,
              20,
              a
                ? Math.max(Math.sqrt(Math.pow(a.width, 2) + Math.pow(a.height, 2)) / 2 + 20, 20)
                : Math.sqrt((2 * this.parentNodeMass) / Math.PI) + 20
            )
            this.parentNode &&
              (this.parentNode.marker.radius = this.parentNode.radius = this.parentNodeRadius)
          },
          drawGraph: function () {
            if (this.layout && this.layout.options.splitSeries) {
              var a = this.chart,
                c = this.layout.options.parentNodeOptions.marker
              c = {
                fill: c.fillColor || x(this.color).brighten(0.4).get(),
                opacity: c.fillOpacity,
                stroke: c.lineColor || this.color,
                'stroke-width': c.lineWidth
              }
              var d = this.visible ? 'inherit' : 'hidden'
              this.parentNodesGroup ||
                ((this.parentNodesGroup = this.plotGroup(
                  'parentNodesGroup',
                  'parentNode',
                  d,
                  0.1,
                  a.seriesGroup
                )),
                this.group.attr({ zIndex: 2 }))
              this.calculateParentRadius()
              d = b.merge(
                {
                  x: this.parentNode.plotX - this.parentNodeRadius,
                  y: this.parentNode.plotY - this.parentNodeRadius,
                  width: 2 * this.parentNodeRadius,
                  height: 2 * this.parentNodeRadius
                },
                c
              )
              this.parentNode.graphic ||
                (this.graph = this.parentNode.graphic =
                  a.renderer.symbol(c.symbol).add(this.parentNodesGroup))
              this.parentNode.graphic.attr(d)
            }
          },
          createParentNodes: function () {
            var a = this,
              b = a.chart,
              c = a.parentNodeLayout,
              d,
              e = a.parentNode
            a.parentNodeMass = 0
            a.points.forEach(function (b) {
              a.parentNodeMass += Math.PI * Math.pow(b.marker.radius, 2)
            })
            a.calculateParentRadius()
            c.nodes.forEach(function (b) {
              b.seriesIndex === a.index && (d = !0)
            })
            c.setArea(0, 0, b.plotWidth, b.plotHeight)
            d ||
              (e ||
                (e = new p().init(this, {
                  mass: a.parentNodeRadius / 2,
                  marker: { radius: a.parentNodeRadius },
                  dataLabels: { inside: !1 },
                  dataLabelOnNull: !0,
                  degree: a.parentNodeRadius,
                  isParentNode: !0,
                  seriesIndex: a.index
                })),
              a.parentNode && ((e.plotX = a.parentNode.plotX), (e.plotY = a.parentNode.plotY)),
              (a.parentNode = e),
              c.addElementsToCollection([a], c.series),
              c.addElementsToCollection([e], c.nodes))
          },
          addSeriesLayout: function () {
            var a = this.options.layoutAlgorithm,
              c = this.chart.graphLayoutsStorage,
              d = this.chart.graphLayoutsLookup,
              e = b.merge(a, a.parentNodeOptions, {
                enableSimulation: this.layout.options.enableSimulation
              })
            var h = c[a.type + '-series']
            h ||
              ((c[a.type + '-series'] = h = new b.layouts[a.type]()),
              h.init(e),
              d.splice(h.index, 0, h))
            this.parentNodeLayout = h
            this.createParentNodes()
          },
          addLayout: function () {
            var a = this.options.layoutAlgorithm,
              c = this.chart.graphLayoutsStorage,
              d = this.chart.graphLayoutsLookup,
              e = this.chart.options.chart
            c ||
              ((this.chart.graphLayoutsStorage = c = {}), (this.chart.graphLayoutsLookup = d = []))
            var h = c[a.type]
            h ||
              ((a.enableSimulation = g(e.forExport) ? !e.forExport : a.enableSimulation),
              (c[a.type] = h = new b.layouts[a.type]()),
              h.init(a),
              d.splice(h.index, 0, h))
            this.layout = h
            this.points.forEach(function (a) {
              a.mass = 2
              a.degree = 1
              a.collisionNmb = 1
            })
            h.setArea(0, 0, this.chart.plotWidth, this.chart.plotHeight)
            h.addElementsToCollection([this], h.series)
            h.addElementsToCollection(this.points, h.nodes)
          },
          deferLayout: function () {
            var a = this.options.layoutAlgorithm
            this.visible && (this.addLayout(), a.splitSeries && this.addSeriesLayout())
          },
          translate: function () {
            var a = this.chart,
              b = this.data,
              c = this.index,
              e,
              h = this.options.useSimulation
            this.processedXData = this.xData
            this.generatePoints()
            g(a.allDataPoints) ||
              ((a.allDataPoints = this.accumulateAllPoints(this)), this.getPointRadius())
            if (h) var n = a.allDataPoints
            else (n = this.placeBubbles(a.allDataPoints)), (this.options.draggable = !1)
            for (e = 0; e < n.length; e++)
              if (n[e][3] === c) {
                var p = b[n[e][4]]
                var l = n[e][2]
                h ||
                  ((p.plotX = n[e][0] - a.plotLeft + a.diffX),
                  (p.plotY = n[e][1] - a.plotTop + a.diffY))
                p.marker = m(p.marker, { radius: l, width: 2 * l, height: 2 * l })
                p.radius = l
              }
            h && this.deferLayout()
            d(this, 'afterTranslate')
          },
          checkOverlap: function (a, b) {
            var f = a[0] - b[0],
              c = a[1] - b[1]
            return -0.001 > Math.sqrt(f * f + c * c) - Math.abs(a[2] + b[2])
          },
          positionBubble: function (a, b, c) {
            var f = Math.sqrt,
              d = Math.asin,
              e = Math.acos,
              h = Math.pow,
              g = Math.abs
            f = f(h(a[0] - b[0], 2) + h(a[1] - b[1], 2))
            e = e((h(f, 2) + h(c[2] + b[2], 2) - h(c[2] + a[2], 2)) / (2 * (c[2] + b[2]) * f))
            d = d(g(a[0] - b[0]) / f)
            a =
              (0 > a[1] - b[1] ? 0 : Math.PI) + e + d * (0 > (a[0] - b[0]) * (a[1] - b[1]) ? 1 : -1)
            return [
              b[0] + (b[2] + c[2]) * Math.sin(a),
              b[1] - (b[2] + c[2]) * Math.cos(a),
              c[2],
              c[3],
              c[4]
            ]
          },
          placeBubbles: function (a) {
            var b = this.checkOverlap,
              c = this.positionBubble,
              d = [],
              f = 1,
              e = 0,
              h = 0
            var g = []
            var n
            a = a.sort(function (a, b) {
              return b[2] - a[2]
            })
            if (a.length) {
              d.push([[0, 0, a[0][2], a[0][3], a[0][4]]])
              if (1 < a.length)
                for (
                  d.push([[0, 0 - a[1][2] - a[0][2], a[1][2], a[1][3], a[1][4]]]), n = 2;
                  n < a.length;
                  n++
                )
                  (a[n][2] = a[n][2] || 1),
                    (g = c(d[f][e], d[f - 1][h], a[n])),
                    b(g, d[f][0])
                      ? (d.push([]),
                        (h = 0),
                        d[f + 1].push(c(d[f][e], d[f][0], a[n])),
                        f++,
                        (e = 0))
                      : 1 < f && d[f - 1][h + 1] && b(g, d[f - 1][h + 1])
                        ? (h++, d[f].push(c(d[f][e], d[f - 1][h], a[n])), e++)
                        : (e++, d[f].push(g))
              this.chart.stages = d
              this.chart.rawPositions = [].concat.apply([], d)
              this.resizeRadius()
              g = this.chart.rawPositions
            }
            return g
          },
          resizeRadius: function () {
            var a = this.chart,
              b = a.rawPositions,
              c = Math.min,
              d = Math.max,
              e = a.plotLeft,
              h = a.plotTop,
              g = a.plotHeight,
              n = a.plotWidth,
              p,
              l,
              k
            var m = (p = Number.POSITIVE_INFINITY)
            var x = (l = Number.NEGATIVE_INFINITY)
            for (k = 0; k < b.length; k++) {
              var r = b[k][2]
              m = c(m, b[k][0] - r)
              x = d(x, b[k][0] + r)
              p = c(p, b[k][1] - r)
              l = d(l, b[k][1] + r)
            }
            k = [x - m, l - p]
            c = c.apply([], [(n - e) / k[0], (g - h) / k[1]])
            if (1e-10 < Math.abs(c - 1)) {
              for (k = 0; k < b.length; k++) b[k][2] *= c
              this.placeBubbles(b)
            } else (a.diffY = g / 2 + h - p - (l - p) / 2), (a.diffX = n / 2 + e - m - (x - m) / 2)
          },
          calculateZExtremes: function () {
            var a = this.options.zMin,
              b = this.options.zMax,
              c = Infinity,
              d = -Infinity
            if (a && b) return [a, b]
            this.chart.series.forEach(function (a) {
              a.yData.forEach(function (a) {
                g(a) && (a > d && (d = a), a < c && (c = a))
              })
            })
            a = e(a, c)
            b = e(b, d)
            return [a, b]
          },
          getPointRadius: function () {
            var a = this,
              b = a.chart,
              c = a.options,
              d = c.useSimulation,
              e = Math.min(b.plotWidth, b.plotHeight),
              h = {},
              g = [],
              n = b.allDataPoints,
              p,
              l,
              k,
              m
            ;['minSize', 'maxSize'].forEach(function (a) {
              var b = parseInt(c[a], 10),
                d = /%$/.test(c[a])
              h[a] = d ? (e * b) / 100 : b * Math.sqrt(n.length)
            })
            b.minRadius = p = h.minSize / Math.sqrt(n.length)
            b.maxRadius = l = h.maxSize / Math.sqrt(n.length)
            var x = d ? a.calculateZExtremes() : [p, l]
            ;(n || []).forEach(function (b, c) {
              k = d ? r(b[2], x[0], x[1]) : b[2]
              m = a.getRadius(x[0], x[1], p, l, k)
              0 === m && (m = null)
              n[c][2] = m
              g.push(m)
            })
            a.radii = g
          },
          redrawHalo: c.redrawHalo,
          onMouseDown: c.onMouseDown,
          onMouseMove: c.onMouseMove,
          onMouseUp: function (a) {
            if (a.fixedPosition && !a.removed) {
              var d,
                f,
                e = this.layout,
                h = this.parentNodeLayout
              h &&
                e.options.dragBetweenSeries &&
                h.nodes.forEach(function (c) {
                  a &&
                    a.marker &&
                    c !== a.series.parentNode &&
                    ((d = e.getDistXY(a, c)),
                    (f = e.vectorLength(d) - c.marker.radius - a.marker.radius),
                    0 > f &&
                      (c.series.addPoint(
                        b.merge(a.options, { plotX: a.plotX, plotY: a.plotY }),
                        !1
                      ),
                      e.removeElementFromCollection(a, e.nodes),
                      a.remove()))
                })
              c.onMouseUp.apply(this, arguments)
            }
          },
          destroy: function () {
            this.chart.graphLayoutsLookup &&
              this.chart.graphLayoutsLookup.forEach(function (a) {
                a.removeElementFromCollection(this, a.series)
              }, this)
            this.parentNode &&
              (this.parentNodeLayout.removeElementFromCollection(
                this.parentNode,
                this.parentNodeLayout.nodes
              ),
              this.parentNode.dataLabel &&
                (this.parentNode.dataLabel = this.parentNode.dataLabel.destroy()))
            b.Series.prototype.destroy.apply(this, arguments)
          },
          alignDataLabel: b.Series.prototype.alignDataLabel
        },
        {
          destroy: function () {
            this.series.layout &&
              this.series.layout.removeElementFromCollection(this, this.series.layout.nodes)
            return u.prototype.destroy.apply(this, arguments)
          }
        }
      )
      h(B, 'beforeRedraw', function () {
        this.allDataPoints && delete this.allDataPoints
      })
      ;('')
    }
  )
  A(t, 'parts-more/Polar.js', [t['parts/Globals.js'], t['parts/Utilities.js']], function (b, a) {
    var r = a.defined,
      g = a.pick,
      m = a.splat,
      k = a.wrap,
      t = b.Series,
      z = b.seriesTypes,
      e = t.prototype,
      l = b.Pointer.prototype
    e.searchPointByAngle = function (a) {
      var b = this.chart,
        e = this.xAxis.pane.center
      return this.searchKDTree({
        clientX:
          180 +
          (-180 / Math.PI) * Math.atan2(a.chartX - e[0] - b.plotLeft, a.chartY - e[1] - b.plotTop)
      })
    }
    e.getConnectors = function (a, b, e, g) {
      var d = g ? 1 : 0
      var h = 0 <= b && b <= a.length - 1 ? b : 0 > b ? a.length - 1 + b : 0
      b = 0 > h - 1 ? a.length - (1 + d) : h - 1
      d = h + 1 > a.length - 1 ? d : h + 1
      var c = a[b]
      d = a[d]
      var f = c.plotX
      c = c.plotY
      var l = d.plotX
      var k = d.plotY
      d = a[h].plotX
      h = a[h].plotY
      f = (1.5 * d + f) / 2.5
      c = (1.5 * h + c) / 2.5
      l = (1.5 * d + l) / 2.5
      var m = (1.5 * h + k) / 2.5
      k = Math.sqrt(Math.pow(f - d, 2) + Math.pow(c - h, 2))
      var x = Math.sqrt(Math.pow(l - d, 2) + Math.pow(m - h, 2))
      f = Math.atan2(c - h, f - d)
      m = Math.PI / 2 + (f + Math.atan2(m - h, l - d)) / 2
      Math.abs(f - m) > Math.PI / 2 && (m -= Math.PI)
      f = d + Math.cos(m) * k
      c = h + Math.sin(m) * k
      l = d + Math.cos(Math.PI + m) * x
      m = h + Math.sin(Math.PI + m) * x
      d = { rightContX: l, rightContY: m, leftContX: f, leftContY: c, plotX: d, plotY: h }
      e && (d.prevPointCont = this.getConnectors(a, b, !1, g))
      return d
    }
    e.toXY = function (a) {
      var b = this.chart,
        e = this.xAxis
      var h = this.yAxis
      var g = a.plotX,
        l = a.plotY,
        c = a.series,
        f = b.inverted,
        k = a.y
      f && c && !c.isRadialBar && (a.plotY = l = 'number' === typeof k ? h.translate(k) || 0 : 0)
      a.rectPlotX = g
      a.rectPlotY = l
      h = f ? e.postTranslate(l, g) : e.postTranslate(g, h.len - l)
      a.plotX = a.polarPlotX = h.x - b.plotLeft
      a.plotY = a.polarPlotY = h.y - b.plotTop
      this.kdByAngle
        ? ((b = ((g / Math.PI) * 180 + e.pane.options.startAngle) % 360),
          0 > b && (b += 360),
          (a.clientX = b))
        : (a.clientX = a.plotX)
    }
    z.spline &&
      (k(z.spline.prototype, 'getPointSpline', function (a, b, e, g) {
        this.chart.polar
          ? g
            ? ((a = this.getConnectors(b, g, !0, this.connectEnds)),
              (a = [
                'C',
                a.prevPointCont.rightContX,
                a.prevPointCont.rightContY,
                a.leftContX,
                a.leftContY,
                a.plotX,
                a.plotY
              ]))
            : (a = ['M', e.plotX, e.plotY])
          : (a = a.call(this, b, e, g))
        return a
      }),
      z.areasplinerange &&
        (z.areasplinerange.prototype.getPointSpline = z.spline.prototype.getPointSpline))
    b.addEvent(
      t,
      'afterTranslate',
      function () {
        var a = this.chart
        if (a.polar && this.xAxis) {
          ;(this.kdByAngle = a.tooltip && a.tooltip.shared)
            ? (this.searchPoint = this.searchPointByAngle)
            : (this.options.findNearestPointBy = 'xy')
          if (!this.preventPostTranslate)
            for (var d = this.points, e = d.length; e--; )
              this.toXY(d[e]),
                !a.hasParallelCoordinates &&
                  !this.yAxis.reversed &&
                  d[e].y < this.yAxis.min &&
                  (d[e].isNull = !0)
          this.hasClipCircleSetter ||
            (this.hasClipCircleSetter = !!this.eventsToUnbind.push(
              b.addEvent(this, 'afterRender', function () {
                if (a.polar) {
                  var d = this.yAxis.center
                  this.clipCircle
                    ? this.clipCircle.animate({ x: d[0], y: d[1], r: d[2] / 2 })
                    : (this.clipCircle = a.renderer.clipCircle(d[0], d[1], d[2] / 2))
                  this.group.clip(this.clipCircle)
                  this.setClip = b.noop
                }
              })
            ))
        }
      },
      { order: 2 }
    )
    k(e, 'getGraphPath', function (a, b) {
      var d = this,
        e
      if (this.chart.polar) {
        b = b || this.points
        for (e = 0; e < b.length; e++)
          if (!b[e].isNull) {
            var h = e
            break
          }
        if (!1 !== this.options.connectEnds && 'undefined' !== typeof h) {
          this.connectEnds = !0
          b.splice(b.length, 0, b[h])
          var g = !0
        }
        b.forEach(function (a) {
          'undefined' === typeof a.polarPlotY && d.toXY(a)
        })
      }
      e = a.apply(this, [].slice.call(arguments, 1))
      g && b.pop()
      return e
    })
    var u = function (a, d) {
      var e = this.chart,
        h = this.options.animation,
        l = this.group,
        k = this.markerGroup,
        c = this.xAxis.center,
        f = e.plotLeft,
        m = e.plotTop
      e.polar
        ? this.isRadialBar
          ? d ||
            ((this.startAngleRad = g(this.translatedThreshold, this.xAxis.startAngleRad)),
            b.seriesTypes.pie.prototype.animate.call(this, d))
          : e.renderer.isSVG &&
            ((h = b.animObject(h)),
            d
              ? ((a = { translateX: c[0] + f, translateY: c[1] + m, scaleX: 0.001, scaleY: 0.001 }),
                l.attr(a),
                k && k.attr(a))
              : ((a = { translateX: f, translateY: m, scaleX: 1, scaleY: 1 }),
                l.animate(a, h),
                k && k.animate(a, h),
                (this.animate = null)))
        : a.call(this, d)
    }
    k(e, 'animate', u)
    z.column &&
      ((t = z.column.prototype),
      (t.polarArc = function (a, b, e, l) {
        var d = this.xAxis.center,
          h = this.yAxis.len
        return this.chart.renderer.symbols.arc(d[0], d[1], h - b, null, {
          start: e,
          end: l,
          innerR: h - g(a, h)
        })
      }),
      k(t, 'animate', u),
      k(t, 'translate', function (e) {
        var d = this.options,
          h = d.stacking,
          g = this.chart,
          l = this.xAxis,
          k = this.yAxis,
          c = k.reversed,
          f = l.center,
          m = l.startAngleRad,
          t = l.endAngleRad - m
        this.preventPostTranslate = !0
        e.call(this)
        if (l.isRadial) {
          e = this.points
          var u = e.length
          var w = k.translate(k.min)
          var v = k.translate(k.max)
          d = d.threshold || 0
          if (g.inverted && b.isNumber(d)) {
            var z = k.translate(d)
            r(z) && (0 > z ? (z = 0) : z > t && (z = t), (this.translatedThreshold = z + m))
          }
          for (; u--; ) {
            d = e[u]
            var A = d.barX
            var I = d.x
            var H = d.y
            if (g.inverted) {
              d.shapeType = 'arc'
              d.plotY = k.translate(H)
              if (h) {
                if (
                  ((H = k.stacks[(0 > H ? '-' : '') + this.stackKey]),
                  this.visible && H && H[I] && !d.isNull)
                ) {
                  var y = H[I].points[this.getStackIndicator(void 0, I, this.index).key]
                  var D = k.translate(y[0])
                  y = k.translate(y[1])
                  r(D) && (D = a.clamp(D, 0, t))
                }
              } else (D = z), (y = d.plotY)
              D > y && (y = [D, (D = y)][0])
              if (!c)
                if (D < w) D = w
                else if (y > v) y = v
                else {
                  if (y < w || D > v) D = y = 0
                }
              else if (y > w) y = w
              else if (D < v) D = v
              else if (D > w || y < v) D = y = t
              k.min > k.max && (D = y = c ? t : 0)
              D += m
              y += m
              I = Math.max(A, 0)
              A = Math.max(A + d.pointWidth, 0)
              d.shapeArgs = { x: f[0], y: f[1], r: A, innerR: I, start: D, end: y }
              d.opacity = D === y ? 0 : void 0
              d.plotY = (r(this.translatedThreshold) && (D < this.translatedThreshold ? D : y)) - m
            } else
              (d.shapeType = 'path'),
                (D = A + m),
                (d.shapeArgs = { d: this.polarArc(d.yBottom, d.plotY, D, D + d.pointWidth) })
            this.toXY(d)
            g.inverted
              ? ((A = l.postTranslate(d.rectPlotY, d.barX + d.pointWidth / 2)),
                (d.tooltipPos = [A.x - g.plotLeft, A.y - g.plotTop]))
              : (d.tooltipPos = [d.plotX, d.plotY])
            d.ttBelow = d.plotY > f[1]
          }
        }
      }),
      (t.findAlignments = function (a, b) {
        null === b.align &&
          (b.align = 20 < a && 160 > a ? 'left' : 200 < a && 340 > a ? 'right' : 'center')
        null === b.verticalAlign &&
          (b.verticalAlign = 45 > a || 315 < a ? 'bottom' : 135 < a && 225 > a ? 'top' : 'middle')
        return b
      }),
      k(t, 'alignDataLabel', function (a, b, l, k, m, p) {
        var c = this.chart,
          d = g(k.inside, !!this.options.stacking)
        c.polar
          ? ((a = (b.rectPlotX / Math.PI) * 180),
            c.inverted
              ? ((this.forceDL = c.isInsidePlot(b.plotX, Math.round(b.plotY), !1)),
                d && b.shapeArgs
                  ? ((m = b.shapeArgs),
                    (m = this.xAxis.postTranslate(
                      (m.start + m.end) / 2 - this.xAxis.startAngleRad,
                      b.barX + b.pointWidth / 2
                    )),
                    (m = { x: m.x - c.plotLeft, y: m.y - c.plotTop }))
                  : b.tooltipPos && (m = { x: b.tooltipPos[0], y: b.tooltipPos[1] }),
                (k.align = g(k.align, 'center')),
                (k.verticalAlign = g(k.verticalAlign, 'middle')))
              : (k = this.findAlignments(a, k)),
            e.alignDataLabel.call(this, b, l, k, m, p),
            this.isRadialBar && b.shapeArgs && b.shapeArgs.start === b.shapeArgs.end && l.hide(!0))
          : a.call(this, b, l, k, m, p)
      }))
    k(l, 'getCoordinates', function (a, b) {
      var d = this.chart,
        e = { xAxis: [], yAxis: [] }
      d.polar
        ? d.axes.forEach(function (a) {
            var h = a.isXAxis,
              c = a.center
            if ('colorAxis' !== a.coll) {
              var f = b.chartX - c[0] - d.plotLeft
              c = b.chartY - c[1] - d.plotTop
              e[h ? 'xAxis' : 'yAxis'].push({
                axis: a,
                value: a.translate(
                  h ? Math.PI - Math.atan2(f, c) : Math.sqrt(Math.pow(f, 2) + Math.pow(c, 2)),
                  !0
                )
              })
            }
          })
        : (e = a.call(this, b))
      return e
    })
    b.SVGRenderer.prototype.clipCircle = function (a, d, e) {
      var h = b.uniqueKey(),
        g = this.createElement('clipPath').attr({ id: h }).add(this.defs)
      a = this.circle(a, d, e).add(g)
      a.id = h
      a.clipPath = g
      return a
    }
    b.addEvent(b.Chart, 'getAxes', function () {
      this.pane || (this.pane = [])
      m(this.options.pane).forEach(function (a) {
        new b.Pane(a, this)
      }, this)
    })
    b.addEvent(b.Chart, 'afterDrawChartBox', function () {
      this.pane.forEach(function (a) {
        a.render()
      })
    })
    b.addEvent(b.Series, 'afterInit', function () {
      var a = this.chart
      a.inverted &&
        a.polar &&
        ((this.isRadialSeries = !0), this instanceof z.column && (this.isRadialBar = !0))
    })
    k(b.Chart.prototype, 'get', function (a, d) {
      return (
        b.find(this.pane, function (a) {
          return a.options.id === d
        }) || a.call(this, d)
      )
    })
  })
  A(t, 'masters/highcharts-more.src.js', [], function () {})
})
//# sourceMappingURL=highcharts-more.js.map

import { memo, useEffect, useRef, useState } from "react";
import { CrosshairMode, createChart } from "lightweight-charts";

import dayjs from "dayjs";

export const TradingChart = ({ id, data, days, currency }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    // console.log("days", data);
    const localChartData = data.map((price) => {
      return {
        time: dayjs(price?.date).format("YYYY/MM/DD"),
        open: price?.open,
        high: price?.high,
        low: price?.low,
        close: price?.close
      };
    });

    const handleResize = () => {
      chart.applyOptions({
        width: window.innerWidth > 1024 ? window.innerWidth - 320 : window.innerWidth - 30
      });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        textColor: "rgba(255, 255, 255, 0.9)",
        background: { type: "solid", color: "#000000" }
      },
      grid: {
        vertLines: {
          color: "#0f172a"
        },
        horzLines: {
          color: "#0f172a"
        }
      },
      // timeScale: {
      //   tickMarkFormatter: (time) => {
      //     if (days === "1") {
      //       return dayjs(time).format("hh:mm");
      //     }
      //     if (days === "30") {
      //       return dayjs(time).format("D-MMM");
      //     }
      //     if (days === "90") {
      //       return dayjs(time).format("D-MMM");
      //     }
      //     if (days === "365") {
      //       return dayjs(time).format("DD-MM");
      //     }
      //   }
      // },
      width: window.innerWidth > 1024 ? window.innerWidth - 320 : window.innerWidth - 30,
      height: 600,
      crosshair: {
        mode: CrosshairMode.Normal
      }
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350"
    });

    if (!data) {
      newSeries.setData([]);
    }

    newSeries.setData(localChartData);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data]);

  return (
    <div className="flex flex-col justify-center mx-auto mb-8">
      <div ref={chartContainerRef} />
    </div>
  );
};

export const LineChart = ({ id, data, days, name, currency }) => {
  const chartContainerRef = useRef();
  const toolTipRef = useRef();

  useEffect(() => {
    const localChartData = data.map((price) => {
      return {
        time: dayjs(price?.date).format("YYYY/MM/DD"),
        value: price?.open
      };
    });

    const handleResize = () => {
      chart.applyOptions({
        width: window.innerWidth > 1024 ? window.innerWidth - 320 : window.innerWidth - 30
      });
    };

    const chart = createChart(chartContainerRef.current, {
      width: window.innerWidth > 1024 ? window.innerWidth - 320 : window.innerWidth - 30,
      height: 600,
      layout: {
        textColor: "rgba(255, 255, 255, 0.9)",
        background: { type: "solid", color: "#000000" }
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.35,
          bottom: 0.2
        },
        borderVisible: false
      },
      grid: {
        vertLines: {
          color: "#0f172a"
        },
        horzLines: {
          color: "#0f172a",
          visible: false
        }
      },
      // timeScale: {
      //   tickMarkFormatter: (time) => {
      //     if (days === "1") {
      //       return dayjs.unix(time).format("hh:mm");
      //     }
      //     if (days === "30") {
      //       return dayjs.unix(time).format("D-MMM");
      //     }
      //     if (days === "90") {
      //       return dayjs.unix(time).format("D-MMM");
      //     }
      //     if (days === "365") {
      //       return dayjs.unix(time).format("DD-MMM");
      //     }
      //   },
      //   borderVisible: false
      // },
      crosshair: {
        horzLine: {
          visible: false,
          labelVisible: false
        },
        vertLine: {
          visible: true,
          style: 0,
          width: 2,
          color: "rgba(32, 38, 46, 0.1)",
          labelVisible: false
        }
      }
    });

    chart.timeScale().fitContent();
    const newSeries = chart.addAreaSeries({
      topColor:
        localChartData[localChartData.length - 1].value >=
        localChartData[localChartData.length - 2].value
          ? "rgba(32, 226, 47, 0.56)"
          : "rgba(226,32,32, 0.56)",
      bottomColor:
        localChartData[localChartData.length - 1].value >=
        localChartData[localChartData.length - 2].value
          ? "rgba(32, 226, 47, 0.04)"
          : "rgba(226,32,32, 0.04)",
      lineColor:
        localChartData[localChartData.length - 1].value >=
        localChartData[localChartData.length - 2].value
          ? "rgba(32, 226, 47, 1)"
          : "rgba(226,32,32, 1)",
      lineWidth: 3
    });

    if (!data) {
      newSeries.setData([]);
    }

    newSeries.setData(localChartData);

    toolTipRef.current.className = "three-line-legend";
    toolTipRef.current.style.display = "block";
    toolTipRef.current.style.left = 3 + "px";
    toolTipRef.current.style.top = 3 + "px";

    function setLastBarText() {
      var dateStr = dayjs(data[data.length - 1]?.time).format("YYYY-MM-DD");

      toolTipRef.current.innerHTML =
        `<div style="font-size: 24px; margin: 4px 0px; color: #ffffff">${name}</div>` +
        '<div style="font-size: 22px; margin: 4px 0px; color: #ffffff">' +
        localChartData[data.length - 1].value +
        ` ${currency}` +
        "</div>" +
        '<div style="font-size: 22px; margin: 4px 0px; color: #ffffff">' +
        dateStr +
        "</div>";
    }

    setLastBarText();

    chart.subscribeCrosshairMove(function (param) {
      let width = window.innerWidth > 1024 ? window.innerWidth - 320 : window.innerWidth;
      if (
        param === undefined ||
        param.time === undefined ||
        param.point.x < 0 ||
        param.point.x > width ||
        param.point.y > 600
      ) {
        setLastBarText();
      } else {
        console.log(param?.time);
        let dateStr = `${param?.time?.year}-${param?.time?.month}-${param?.time?.day}`;
        var price = param.seriesPrices.get(newSeries);
        toolTipRef.current.innerHTML =
          `<div style="font-size: 24px; margin: 4px 0px; color: #ffffff">${name}</div>` +
          '<div style="font-size: 22px; margin: 4px 0px; color: #ffffff">' +
          price.toFixed(3) +
          ` ${currency}` +
          "</div>" +
          '<div style="font-size: 22px; margin: 4px 0px; color: #ffffff">' +
          dateStr +
          "</div>";
      }
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data]);

  return (
    <div className="relative mx-auto mb-8">
      <div ref={chartContainerRef}>
        <div ref={toolTipRef}></div>
      </div>
    </div>
  );
};

export const HistoricalChart = memo(TradingChart);
export const HistoricalLineChart = memo(LineChart);

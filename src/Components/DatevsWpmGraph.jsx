import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function DatevsWpmGraph({ graphLabels, graphData }) {
  return <div >
    <Line data={{
        labels:graphLabels,//array of dates on x axis
        datasets:[{
            label:"WPM vs Date",
            data:graphData,//Y Axis
            borderColor:'blue',
            tension:0.5,
        }]//Y Axis
    }}/>
  </div>;
}

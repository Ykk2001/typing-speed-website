import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import {Line} from 'react-chartjs-2';
ChartJs.register(CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

export default function Graph({graphLabels,graphData,charData,wordData}) {
  return (
    <div>
      <Line data={{
          labels:graphLabels,//x -Axis
          datasets:[
         {  
            data:graphData,
            label:'WPM',
            borderColor:'yellow',
            tension:0.3
          },
          {
           data:charData,
           label:'Character /sec',
           borderColor:'blue',
           tension:0.3
          },
          {
           data:wordData,
           label:'Word /sec',
           borderColor:'green',
           tension:0.3
          }
        ]//Y-axis
      }}/>
    </div>
  );
}

//Notes---> Without CategoryScale-->, the chart cannot display label categories on the X-axis.
//LinearScale-->used for numeric values on the Y-axis
//PointElement-->Draws the dots on the line charts
//LineElement-->Connect the two points with line
//Title-->Adds charts title
//Tooltip-->when we hover on the points then it shows the data values
//Legend-->shows the dataset Labels on the chart example ■ graph1 ■ graph2
//register-->this tells Chart.js: "These features are allowed to be used in the chasrts
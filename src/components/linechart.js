import React from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import {Line} from "react-chartjs-2"

const options = {
    responsive: true,
    maintainAspectRatio:false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Random Line Chart',
      },
    },
};

export default function LineChart({data}) {
  
  const dataSets = Object.values(data.dataset).filter(data =>data != null)

  
  return (
              <Line
                  options={options}
                  data={{                    
                    labels: data.dates,
                    datasets: 
                    dataSets.map((data,i)=>
                    
                      ({
                       label:`Dataset${i+1}`,
                       data:data.data,
                       borderColor: `rgba(${data.color.red},
                        ${data.color.blue},
                        ${data.color.green},
                        ${data.color.alpha}`,
                       backgroundColor: 'rgba(255, 99, 132, 0.5)',
                       pointHoverBorderWidth:9,
                       
                     })
                      
                        
                                                 )
                }}
          />

  
    
  )
}

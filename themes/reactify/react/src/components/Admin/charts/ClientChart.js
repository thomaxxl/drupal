import React from 'react'
import {PieChart} from 'react-d3-basic'

const ClientChart = ({clients}) => {

  const getClientChartData = clients => {
    const leadAmount = clients.filter(client => client.client_type[0].value === 'lead').length
    const newClientAmount = clients.length - leadAmount
    return [
      {
        "type": "lead",
        "amount": leadAmount
      },
      {
        "type": "new client",
        "amount": newClientAmount
      }
    ]
  }

  var generalChartData = [
    {
      "type": "lead",
      "amount": 2
    }, {
      "type": "new client",
      "amount": 1
    }
  ]

  var width = 700,
      height = 400,
      value = d => +d.amount,
      name = d => d.type,
      chartSeries = [
        {
          "field": "lead",
          "name": "Leads"
        },
        {
          "field": "new client",
          "name": "New clients"
        }
      ];
    return (
        <PieChart
            data={getClientChartData(clients)}
            width={width}
            height={height}
            chartSeries={chartSeries}
            value={value}
            name={name}
        />
    )

}

export default ClientChart
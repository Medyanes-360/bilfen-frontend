
"use client"
// RevenueChart.jsx - Aktivite takip grafiği bileşeni
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { statistics } from './mockData';

const RevenueChart = () => {
  // Aktivite verisi - mock
  const activityData = statistics.dailyStats.map(stat => ({
    name: stat.day,
    aktifÖğrenci: stat.activeStudents,
    tamamlamaOranı: stat.completionRate,
  }));

  // İçerik tür verileri
  const contentTypeData = statistics.contentTypeStats.map(stat => ({
    name: stat.type,
    tamamlamaOranı: stat.completionRate,
    içerikSayısı: stat.count
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Günlük Aktivite</h2>
          <div className="flex space-x-2">
            <select className="text-sm border rounded-md px-2 py-1 text-gray-600">
              <option>Bu Hafta</option>
              <option>Bu Ay</option>
              <option>Bu Yıl</option>
            </select>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={activityData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="aktifÖğrenci"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Aktif Öğrenci"
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="tamamlamaOranı" 
                stroke="#82ca9d" 
                name="Tamamlama Oranı (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">İçerik Türüne Göre Performans</h2>
          <div className="flex space-x-2">
            <select className="text-sm border rounded-md px-2 py-1 text-gray-600">
              <option>Tüm Yaş Grupları</option>
              <option>3-4 Yaş</option>
              <option>4-5 Yaş</option>
              <option>5-6 Yaş</option>
            </select>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={contentTypeData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar 
                yAxisId="left" 
                dataKey="tamamlamaOranı" 
                name="Tamamlama Oranı (%)" 
                fill="#8884d8" 
              />
              <Bar 
                yAxisId="right" 
                dataKey="içerikSayısı" 
                name="İçerik Sayısı" 
                fill="#82ca9d" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
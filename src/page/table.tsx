import React from 'react'
import {IColumns, Table} from '@biqi/ui'

interface IWeather {
  date: string
  high: string
  low: string
  ymd: string
  week: string
  sunrise: string
  sunset: string
  aqi: number
  fx: string
  fl: string
  type: string
  notice: string
}

const columns: IColumns<IWeather>[] = [
  {dataIndex: 'ymd', width: 100},
  {dataIndex: 'week', width: 50},
  {dataIndex: 'high', width: 80},
  {dataIndex: 'low', width: 80},
  // {dataIndex: 'sunrise', width: 50},
  // {dataIndex: 'sunset', width: 50},
  // {dataIndex: 'aqi', width: 30},
  {dataIndex: 'fx', width: 50},
  {dataIndex: 'fl', width: 50},
  {dataIndex: 'type', width: 50},
  {dataIndex: 'notice', width: 220}
]

export const Demo = () => {
  const weather = [
    {date: '19', high: '高温 27℃', low: '低温 15℃', ymd: '2021-04-19', week: '星期一', sunrise: '05:31', sunset: '18:56', aqi: 85, fx: '南风', fl: '2级', type: '多云', notice: '阴晴之间，谨防紫外线侵扰'},
    {date: '20', high: '高温 25℃', low: '低温 12℃', ymd: '2021-04-20', week: '星期二', sunrise: '05:29', sunset: '18:57', aqi: 89, fx: '南风', fl: '2级', type: '多云', notice: '阴晴之间，谨防紫外线侵扰'},
    {date: '21', high: '高温 16℃', low: '低温 12℃', ymd: '2021-04-21', week: '星期三', sunrise: '05:28', sunset: '18:58', aqi: 96, fx: '南风', fl: '2级', type: '多云', notice: '阴晴之间，谨防紫外线侵扰'},
    {date: '22', high: '高温 16℃', low: '低温 11℃', ymd: '2021-04-22', week: '星期四', sunrise: '05:26', sunset: '18:59', aqi: 90, fx: '东风', fl: '2级', type: '阴', notice: '不要被阴云遮挡住好心情'},
    {date: '23', high: '高温 18℃', low: '低温 10℃', ymd: '2021-04-23', week: '星期五', sunrise: '05:25', sunset: '19:00', aqi: 88, fx: '东南风', fl: '2级', type: '阴', notice: '不要被阴云遮挡住好心情'},
    {date: '24', high: '高温 21℃', low: '低温 12℃', ymd: '2021-04-24', week: '星期六', sunrise: '05:24', sunset: '19:01', aqi: 71, fx: '东南风', fl: '2级', type: '多云', notice: '阴晴之间，谨防紫外线侵扰'},
    {date: '25', high: '高温 22℃', low: '低温 12℃', ymd: '2021-04-25', week: '星期日', sunrise: '05:22', sunset: '19:02', aqi: 66, fx: '南风', fl: '3级', type: '多云', notice: '阴晴之间，谨防紫外线侵扰'},
    {date: '26', high: '高温 23℃', low: '低温 13℃', ymd: '2021-04-26', week: '星期一', sunrise: '05:21', sunset: '19:03', aqi: 75, fx: '南风', fl: '3级', type: '多云', notice: '阴晴之间，谨防紫外线侵扰'},
    {date: '27', high: '高温 23℃', low: '低温 15℃', ymd: '2021-04-27', week: '星期二', sunrise: '05:20', sunset: '19:04', aqi: 52, fx: '西北风', fl: '3级', type: '阴', notice: '不要被阴云遮挡住好心情'},
    {date: '28', high: '高温 25℃', low: '低温 13℃', ymd: '2021-04-28', week: '星期三', sunrise: '05:18', sunset: '19:05', aqi: 9, fx: '西风', fl: '3级', type: '阴', notice: '不要被阴云遮挡住好心情'},
    {date: '29', high: '高温 23℃', low: '低温 16℃', ymd: '2021-04-29', week: '星期四', sunrise: '05:17', sunset: '19:06', aqi: 40, fx: '西南风', fl: '2级', type: '多云', notice: '阴晴之间，谨防紫外线侵扰'},
    {date: '30', high: '高温 28℃', low: '低温 15℃', ymd: '2021-04-30', week: '星期五', sunrise: '05:16', sunset: '19:07', aqi: 7, fx: '西北风', fl: '2级', type: '小雨', notice: '雨虽小，注意保暖别感冒'},
    {date: '01', high: '高温 24℃', low: '低温 14℃', ymd: '2021-05-01', week: '星期六', sunrise: '05:15', sunset: '19:08', aqi: 18, fx: '东风', fl: '2级', type: '晴', notice: '愿你拥有比阳光明媚的心情'},
    {date: '02', high: '高温 23℃', low: '低温 14℃', ymd: '2021-05-02', week: '星期日', sunrise: '05:13', sunset: '19:09', aqi: 8, fx: '西北风', fl: '3级', type: '晴', notice: '愿你拥有比阳光明媚的心情'},
    {date: '03', high: '高温 23℃', low: '低温 12℃', ymd: '2021-05-03', week: '星期一', sunrise: '05:12', sunset: '19:10', aqi: 66, fx: '北风', fl: '3级', type: '多云', notice: '阴晴之间，谨防紫外线侵扰'}
  ]
  return <Table<IWeather> datasource={weather} columns={columns} />
}

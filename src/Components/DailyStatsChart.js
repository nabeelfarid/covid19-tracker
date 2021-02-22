import { Line } from 'react-chartjs-2';

export const DailyStatsChart = ({ stats, dailyStats }) => {
    return (

        <Line
            data={{
                labels: dailyStats.map(({ date }) => new Date(date).toLocaleDateString()),
                datasets: [{
                    data: dailyStats.map((data) => data.infected),
                    label: 'Infected',
                    borderColor: 'rgba(0, 0, 255, 0.5)',
                    fill: false,
                }, {
                    data: dailyStats.map((data) => data.deaths),
                    label: 'Deaths',
                    borderColor: 'rgba(255, 0, 0, 0.5)',
                    fill: false,
                }, {
                    data: dailyStats.map((data) => data.recovered),
                    label: 'Recovered',
                    borderColor: 'rgba(0, 255, 0, 0.5)',
                    fill: false,
                },
                ],
            }}
            options={{
                title: {
                    display: true,
                    text: `Historical data over last year: ${stats.country ? stats.country : 'Worldwide'}`
                },
                legend: {
                    display: false
                }
            }}></Line>
    );
};

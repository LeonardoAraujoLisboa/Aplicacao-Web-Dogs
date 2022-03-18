import React from 'react';
import styles from './UserStatsGraphs.module.css';
import {VictoryPie, VictoryChart, VictoryBar} from 'victory'//na chave eu coloco o tipo de gráfico q eu quero

const UserStatsGraphs = ({data}) => {
  const [graph, setGraph] = React.useState([]);
  const [total, setTotal] = React.useState(0);//total de acessos

  React.useEffect(() => {
    const graphData = data.map((item) => {
      return {
        x: item.title,
        y: Number(item.acessos)
      }
    });
    setTotal(data.map(({acessos}) => Number(acessos)).reduce((a, b) => a + b, 0));//esse reduce faz com que some arrays ai eu coloquei o anterior "a" e o seguinte "b" e depois retornei a + b. Esse 0 é porque ele tava dando erro dizendo que não existe reduce de uma array vazia
    setGraph(graphData);
  }, [data]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie data={graph} innerRadius={50} padding={{top: 20, bottom: 20, left: 80, right: 80}} style={{
          data: {
            fillOpacity: 0.9,
            stroke: '#fff',
            strokeWidth: 2,
          },
          labels: {
            fontSize: 14,
            fill: '#333'
          }
        }}/>
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment='start' data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  )
}

export default UserStatsGraphs

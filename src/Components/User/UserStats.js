import React from 'react'
import { STATS_GET } from '../../api';
import useFetch from '../../Hooks/useFetch'
import Error from '../Helper/Error';
import Head from '../Helper/Head'
import Loading from '../Helper/Loading';
/* import UserStatsGraphs from './UserStatsGraphs';//eu uso o lazy aqui, nesse arquivo userstats foi onde eu importei o userstatsgraphs q dentro desse userstatsgraph foi onde eu importei o victory e eu to fazendo isso do lazy para eu so carregar as tabelas la do victory quando eu apertei em estatisticas e ai para fazer isso eu faço isso que ta embaixo e posso apagar o import UserStatsGraphs from './UserStatsGraphs';*/
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'));

const UserStats = () => {
  const {data, error, loading, request} = useFetch();

  React.useEffect(() => {
    async function getData() {
      const {url, options} = STATS_GET()
      await request(url, options);
    }
    getData();
  }, [request]);

  if(loading) {
    <Loading />
  }
  if (error) {
    <Error error={error}/>
  }
  if (data) {
    return (
      <React.Suspense fallback={<div></div>}>
        <Head title="Estatísticas"/>
        <UserStatsGraphs data={data}/>
      </React.Suspense>
    );
  } else {
    return null;
  }
}

export default UserStats

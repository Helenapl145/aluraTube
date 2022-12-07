import React from "react";
import config from "../config.json"
import styled from "styled-components"

import Menu from "../src/components/Menu/index";
import { StyledTimeline } from "../src/components/Timeline";

import { videoService } from "../src/services/videoService"


function HomePage() {
    
    const estiloDaHomePage ={
        display: "flex",
        flexDirection: "column",
        flex: 1
    
    };


    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylist] = React.useState({});


    React.useEffect(() => {
        service
            .getAllVideos()
            .then((dados) => {
                const novasPlaylists = {...playlists};
                dados.data.forEach((video) => {
                    if(!novasPlaylists[video.playlist]) {
                        novasPlaylists[video.playlist] = [];
                    }
                    novasPlaylists[video.playlist].push(video);
                })
                setPlaylist(novasPlaylists);
            })
    },[])

   

    return (
        <>
    
            <div style={estiloDaHomePage}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists} favoritos={config.favoritos}/>
            </div>
        
        </>
       
    );
  }
  

  export default HomePage



  const StyledHeader = styled.div` // styled component do header
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.backgroundLevel1};
   img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
  }
  .user-info {
      display: flex;
      align-items:center;
      background-color: ${({ theme }) => theme.backgroundBase};
      width: 100%;
      padding: 16px 32px;
      gap: 16px;
     
  }
  
`;
const StyledBanner = styled.div` // styled component do banner
  width: 100%;
  height:300px;
  max-height: 250px;
  background-image: url(${({bg}) => bg});
  background-position: center;
  background-size: cover;
  overflow-x: hidden;
  @media only screen and (min-width: 1650px) {
      max-height: 33vh;        
  }
`;

  function Header(){
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg}/>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`}/>
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
                
            </section>
            
           
        </StyledHeader>
    )
  }


  function Timeline({searchValue, ...propriedades}){

    const playlistNames = Object.keys(propriedades.playlists);
    const favoritosNames = Object.keys(propriedades.favoritos);
    return (

        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName]
                return (
                    <section key={playlistName}>
                        <h2>
                            {playlistName}
                        </h2>
                        <div>
                            {
                                videos.filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                }).map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </section>
                )
            })}

            {favoritosNames.map((favoritosName) => {
                const canais = propriedades.favoritos[favoritosName]

                return(
                    <section>
                        <h2> {favoritosName} </h2>

                        <div>
                            {
                                canais.map((canal) =>{
                                    return(
                                        <a href={canal.url}>
                                            <img className="canalFoto" src={canal.foto}/>
                                            <span className="nomeCanal">
                                                {canal.nome}
                                            </span>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </section>
                )
            }

            )}
        </StyledTimeline>
    )
  }